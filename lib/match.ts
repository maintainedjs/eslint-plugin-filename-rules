import type { ESLint, Rule } from "eslint";
import path from "node:path";
import { aliasNames } from "./common/aliases";
import { getRegex } from "./common/getRegex";

const meta: Rule.RuleMetaData = {
  type: "layout",
  docs: {
    description: "checks that filenames match a chosen pattern",
  },
  fixable: undefined,
  messages: {
    noMatch: "Filename '{{name}}' does not match {{value}}.",
  },
  schema: {
    type: "array",
    minItems: 1,
    maxItems: 2,
    oneOf: [
      {
        items: [
          { type: "string", enum: aliasNames, description: "alias presets" },
        ],
      },
      {
        items: [
          { type: "string", pattern: "/.*./", description: "regex pattern" },
        ],
      },
      {
        items: [
          {
            type: "object",
            description: 'either an object with single property "pattern" or ',
          },
        ],
      },
    ],
  },
};

export const match: Rule.RuleModule = {
  meta,
  create: (context: Rule.RuleContext) => ({
    Program: (node) => {
      const filename = context.filename;
      const includePath = !!(context.options[0] || {}).includePath;
      const name = includePath ? filename : path.basename(filename);
      const [regex, regexStr] = getRegex(context.options[0], name);

      if (!regex) return;

      if (!regex.test(name)) {
        context.report({
          node,
          messageId: "noMatch",
          data: {
            name,
            value: regexStr ?? "",
          },
        });
      }
    },
  }),
} satisfies Rule.RuleModule;
