import { ESLint } from "eslint";
import { match } from "./match";
import { notMatch } from "./notMatch";

const plugin: ESLint.Plugin = {
  rules: {
    match,
    "not-match": notMatch,
  },
};

export default plugin;
