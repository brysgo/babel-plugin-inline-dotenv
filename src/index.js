"use strict";

var dotenv;

module.exports = function (options) {
  var t = options.types;

  return {
    visitor: {
      MemberExpression: function MemberExpression(path, state) {
        if(t.isAssignmentExpression(path.parent) && path.parent.left == path.node) return;
        if (path.get("object").matchesPattern("process.env")) {
          if (!dotenv) {
            dotenv = require('dotenv').config(state.opts);
            var dotenvExpand;
            try { dotenvExpand = require('dotenv-expand'); } catch(e) {}
            if (dotenvExpand)
              dotenvExpand(dotenv);
          }
          var key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            var name = key.value;
            var value = state.opts.env && name in state.opts.env ? state.opts.env[name] : process.env[name];
            var me = t.memberExpression;
            var i = t.identifier;
            var le = t.logicalExpression;

            path.replaceWith(
              le('||', 
                le('&&', 
                  le('&&', i('process'), me(i('process'), i('env'))),
                  me(i('process.env'), i(name))
                ), 
                t.valueToNode(value)
              )
            );
          }
        }
      }
    }
  };
};