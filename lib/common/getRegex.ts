import { z } from "zod";
import { aliases, isAliasKey } from "./aliases";
import { configOptionSchema } from "../configOptionSchema";

export function getRegex(
  value: z.infer<typeof configOptionSchema>,
  filename: string
): [pattern: RegExp, patternName: string] | [] {
  if (value instanceof RegExp) return [value, value.toString()];

  if (isAliasKey(value)) {
    const pattern = aliases[value];

    return [pattern, value];
  }

  if (typeof value === "string") {
    if (value[0] === "/") {
      const ix = value.lastIndexOf("/");
      if (ix > 0) {
        const regex = new RegExp(
          value.substring(1, ix),
          value.substring(ix + 1)
        );
        return [regex, value];
      }
    }

    throw new Error(`Unrecognized option "${value}"`);
  }

  if ("pattern" in value) return getRegex(value.pattern, filename);

  const extension = filename.substring(filename.lastIndexOf("."));
  const valueForExtension: string | undefined = value[extension];

  return valueForExtension ? getRegex(valueForExtension, filename) : [];
}
