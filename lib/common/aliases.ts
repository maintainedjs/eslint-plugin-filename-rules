const patterns = {
  pascalcase: /^[A-Z]([A-Z0-9]*[a-z]+)+[A-Z0-9]*(?:\..*)?$/,
  camelcase: /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?(?:\..*)?$/,
  snakecase: /^([a-z0-9]+_)*[a-z0-9]+(?:\..*)?$/,
  kebabcase: /^([a-z0-9]+-)*[a-z0-9]+(?:\..*)?$/,
} as const;

export const aliases = {
  ...patterns,
  PascalCase: patterns.pascalcase,
  camelCase: patterns.camelcase,
  snake_case: patterns.snakecase,
  "kebab-case": patterns.kebabcase,
} as const;

export const aliasNames = [
  "PascalCase",
  "camelCase",
  "camelcase",
  "kebab-case",
  "kebabcase",
  "pascalcase",
  "snake_case",
  "snakecase",
] as const satisfies (keyof typeof aliases)[];

export function isAliasKey(value: unknown): value is keyof typeof aliases {
  return aliasNames.some((name) => name === value);
}
