import { Rule } from "eslint";
import path from "node:path";
import { aliasNames } from "./common/aliases";
import { getRegex } from "./common/getRegex";

const meta: Rule.RuleMetaData = {
  type: "layout",
  docs: {
    description: "checks that filenames do not match a chosen pattern",
  },
  fixable: undefined,
  messages: {
    match: "Filename '{{name}}' must not match {{value}}.",
  },
  schema: {
    type: "array",
    minItems: 1,
    maxItems: 2,
    oneOf: [
      {
        items: [{ type: "string", enum: aliasNames }],
      },
      {
        items: [{ type: "string", pattern: "/.*./" }],
      },
      {
        items: [{ type: "object" }],
      },
    ],
  },
};

export const notMatch: Rule.RuleModule = {
  meta,
  create: (context) => ({
    Program: (node) => {
      const filename = context.filename;
      const includePath = !!(context.options[0] || {}).includePath;
      const name = includePath ? filename : path.basename(filename);
      const [regex, regexStr] = getRegex(context.options[0], name);

      if (!regex) return;

      if (regex.test(name)) {
        context.report({
          node,
          messageId: "match",
          data: {
            name,
            value: regexStr ?? "",
          },
        });
      }
    },
  }),
};
