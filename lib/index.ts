import { ESLint } from "eslint";
import { match } from "./match";
import { notMatch } from "./notMatch";

export const plugin: ESLint.Plugin = {
  rules: {
    match,
    "not-match": notMatch,
  },
};

export default plugin;
