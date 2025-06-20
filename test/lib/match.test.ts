import { RuleTester } from "eslint";
import { describe, expect, test } from "vitest";
import { match } from "../../lib/match";

const tester = new RuleTester();
const testRule =
  (tests: {
    valid: Array<string | RuleTester.ValidTestCase>;
    invalid: RuleTester.InvalidTestCase[];
  }) =>
  () =>
    tester.run("match", match, tests);
const code = '"hello world";';

test(
  "single regex",
  testRule({
    valid: [
      {
        code,
        filename: "/foo/bar/test.txt",
        options: [/^test(?:\..*)?$/],
      },
      {
        code,
        filename: "/foo/bar/test.txt",
        options: ["/^test(?:\\..*)/"],
      },
    ],
    invalid: [
      {
        code,
        filename: "/foo/bar/test_.txt",
        options: [/^test(?:\..*)?$/],
        errors: [
          {
            message: "Filename 'test_.txt' does not match /^test(?:\\..*)?$/.",
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  })
);

test(
  "includePath",
  testRule({
    valid: [
      {
        code,
        filename: "/foo/bar/test.txt",
        options: [
          {
            pattern: /^.*bar.*$/,
            includePath: true,
          },
        ],
      },
    ],
    invalid: [
      {
        code,
        filename: "/foo/bar/test.txt",
        options: [
          {
            pattern: /^.*baz.*$/,
            includePath: true,
          },
        ],
        errors: [
          {
            message: "Filename '/foo/bar/test.txt' does not match /^.*baz.*$/.",
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  })
);

test("throws on unknown alias", () => {
  expect(
    testRule({
      valid: [
        {
          code,
          filename: "/foo/bar/module.js",
          options: ["bla"],
        },
      ],
      invalid: [],
    })
  ).toThrow(
    `ESLint configuration in rule-tester is invalid: Key "rules": Key "rule-to-test/match":
\tValue "bla" should be equal to one of the allowed values.
\tValue "bla" should match pattern "/.*./".
\tValue "bla" should be object.
\tValue ["bla"] should match exactly one schema in oneOf.
`
  );
});

describe.each(["camelcase", "camelCase"] as const)("test alias %s", (alias) => {
  test(
    `single alias - ${alias}`,
    testRule({
      valid: [
        {
          code,
          filename: "/foo/bar/module.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/anotherModule.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/module.test.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/module.test01.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/someComponent01.js",
          options: [alias],
        },
      ],
      invalid: [
        {
          code,
          filename: "/foo/bar/Module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'Module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/AnotherModule.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'AnotherModule.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/another-module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'another-module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/another_module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'another_module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
      ],
    })
  );
});

["pascalcase", "PascalCase"].forEach((alias) => {
  test(
    `single alias - ${alias}`,
    testRule({
      valid: [
        {
          code,
          filename: "/foo/bar/Url.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/AnotherModule.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/AnotherModule.test.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/ModuleNameWithACRONYM.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/Component01.js",
          options: [alias],
        },
      ],
      invalid: [
        {
          code,
          filename: "/foo/bar/URL.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'URL.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/url.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'url.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/anotherModule.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'anotherModule.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/Another-Module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'Another-Module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/Another_Module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'Another_Module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
      ],
    })
  );
});

["snakecase", "snake_case"].forEach((alias) => {
  test(
    `single alias - ${alias}`,
    testRule({
      valid: [
        {
          code,
          filename: "/foo/bar/module.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/another_module.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/another_module.test.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/component_01.js",
          options: [alias],
        },

        {
          code,
          filename: "/foo/bar/component.01.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/01_component.js",
          options: [alias],
        },
      ],
      invalid: [
        {
          code,
          filename: "/foo/bar/Module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'Module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/AnotherModule.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'AnotherModule.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/anotherModule.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'anotherModule.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/another-module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'another-module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/Another_Module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'Another_Module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
      ],
    })
  );
});

["kebabcase", "kebab-case"].forEach((alias) => {
  test(
    `single alias - ${alias}`,
    testRule({
      valid: [
        {
          code,
          filename: "/foo/bar/module.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/another-module.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/another-module.test.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/icon-01.js",
          options: [alias],
        },
        {
          code,
          filename: "/foo/bar/01-component.js",
          options: [alias],
        },
      ],
      invalid: [
        {
          code,
          filename: "/foo/bar/Module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'Module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/AnotherModule.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'AnotherModule.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/anotherModule.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'anotherModule.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/Another-Module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'Another-Module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
        {
          code,
          filename: "/foo/bar/another_module.js",
          options: [alias],
          errors: [
            {
              message: `Filename 'another_module.js' does not match ${alias}.`,
              column: 1,
              line: 1,
            },
          ],
        },
      ],
    })
  );
});

test(
  "file extension mapping",
  testRule({
    valid: [
      {
        code,
        filename: "/foo/bar/someModule.js",
        options: [{ ".js": "camelcase", ".ts": /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
      },
      {
        code,
        filename: "/foo/bar/some-module.ts",
        options: [{ ".js": "camelcase", ".ts": /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
      },
      {
        code,
        filename: "/foo/bar/SkippedModule.jsx",
        options: [{ ".js": "camelcase", ".ts": /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
      },
    ],
    invalid: [
      {
        code,
        filename: "/foo/bar/some-module.js",
        options: [{ ".js": "camelcase", ".ts": /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
        errors: [
          {
            message: "Filename 'some-module.js' does not match camelcase.",
            column: 1,
            line: 1,
          },
        ],
      },
      {
        code,
        filename: "/foo/bar/someModule.ts",
        options: [{ ".js": "camelcase", ".ts": /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
        errors: [
          {
            message:
              "Filename 'someModule.ts' does not match /^([a-z]+-)*[a-z]+(?:\\..*)?$/.",
            column: 1,
            line: 1,
          },
        ],
      },
    ],
  })
);
