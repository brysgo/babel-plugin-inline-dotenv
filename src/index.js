"use strict";

var fs = require('fs');

var dotenvContent;

function getValue(dotenvContent, systemContent, opts, name) {
  if (opts.env && name in opts.env) return opts.env[name];

  switch (opts.systemVar) {
    case "overwrite":
      if (name in dotenvContent && name in systemContent)
        return systemContent[name];
      if (name in dotenvContent) return dotenvContent[name];
      return;
    case "disable":
      if (name in dotenvContent) return dotenvContent[name];
      return;
    case "all":
    default:
      if (name in systemContent) return systemContent[name];
      if (name in dotenvContent) return dotenvContent[name];
      return;
  }
}

module.exports = function (options) {
  var t = options.types;

  return {
    visitor: {
      MemberExpression: function MemberExpression(path, state) {
        if(t.isAssignmentExpression(path.parent) && path.parent.left == path.node) return;
        if (path.get("object").matchesPattern("process.env")) {
          if (!dotenvContent) {
            var envFilePath = state.opts.path || './.env'              
            dotenvContent = require('dotenv').parse(fs.readFileSync(envFilePath));
            var dotenvExpand;
            try { dotenvExpand = require('dotenv-expand'); } catch(e) {}
            if (dotenvExpand)
              dotenvContent = dotenvExpand({parsed:dotenvContent, ignoreProcessEnv:true}).parsed;
          }
          var key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            var name = key.value;
            var value = getValue(dotenvContent, process.env, state.opts, name)
            var me = t.memberExpression;
            var i = t.identifier;
            var le = t.logicalExpression;
            var replace = state.opts.unsafe
              ? t.valueToNode(value)
              : le(
                  "||",
                  le(
                    "&&",
                    le("&&", i("process"), me(i("process"), i("env"))),
                    me(i("process.env"), i(name))
                  ),
                  t.valueToNode(value)
                );

            path.replaceWith(replace);
          }
        }
      }
    }
  };
};
