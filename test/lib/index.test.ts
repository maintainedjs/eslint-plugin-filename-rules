import { expect, test } from "vitest";
import lib from "../../lib";
import { match } from "../../lib/match";
import { notMatch } from "../../lib/notMatch";

test("exports the match rule", (t) => {
  expect(lib.rules?.match).toBe(match);
});

test("exports the notMatch rule", (t) => {
  expect(lib.rules?.["not-match"]).toBe(notMatch);
});
