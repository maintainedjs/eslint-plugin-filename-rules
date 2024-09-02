const path = require('path');
const { getRegex } = require('./common/getRegex');
const { aliasesNames} = require('./common/aliases');

const meta = {
  type: 'layout',
  name: 'not-match',
  docs: {
    description: 'checks that filenames do not match a chosen pattern',
  },
  fixable: false,
  messages: {
    match: "Filename '{{name}}' must not match {{value}}.",
  },
  schema: {
    type: 'array',
    minItems: 1,
    maxItems: 2,
    oneOf: [
      {
        items: [{ type: 'string', enum: aliasesNames }],
      },
      {
        items: [{ type: 'string', pattern: '/.*./' }],
      },
      {
        items: [{ type: 'object' }],
      },
    ],
  },
};

module.exports = {
  meta,
  create: (context) => ({
    Program: (node) => {
      const filename = context.getFilename();
      const includePath = !!(context.options[0] || {}).includePath;
      const name = includePath ? filename : path.basename(filename);
      const [regex, regexStr] = getRegex(context.options[0], name);
      if (!regex) return;
      if (regex.test(name)) {
        context.report({
          node,
          messageId: 'match',
          data: {
            name,
            value: regexStr,
          },
        });
      }
    },
  }),
};
