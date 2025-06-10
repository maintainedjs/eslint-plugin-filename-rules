import { z } from "zod";
import { aliases, aliasNames } from "./common/aliases";

const regexStr = z
  .string()
  .regex(/\/.*\//)
  .describe("Regex string");

export const configOptionSchema = z.union([
  z.enum(aliasNames).describe("Regex presets"),
  regexStr.describe("Custom filename pattern"),
  z.instanceof(RegExp).describe("Custom filename pattern"),
  z.object({ pattern: z.union([regexStr, z.instanceof(RegExp)]) }),
  z
    .object({})
    .catchall(regexStr)
    .describe("file name pattern for each file extension"),
]);
