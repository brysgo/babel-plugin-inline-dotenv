var dotenv;

module.exports = function (opts) {
  var t = opts.types;
  return {
    visitor: {
      MemberExpression(path, state) {
        if (path.get("object").matchesPattern("process.env")) {
          if (!dotenv) { dotenv = require('dotenv').config(state.opts) }
          let key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            let name = key.value;
            let value = (state.opts.env && name in state.opts.env) ? state.opts.env[name] : process.env[name];
            path.replaceWith(t.valueToNode(value));
          }
        }
      }
    }
  };
}