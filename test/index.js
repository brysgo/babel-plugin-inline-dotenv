import path from "path";
import fs from "fs";
import assert from "assert";
import { transformFileSync } from "@babel/core";
import prettier from "prettier";
import plugin from "../src";

describe("finds React components", () => {
  const fixturesDir = path.join(__dirname, "fixtures");
  fs.readdirSync(fixturesDir).map(caseName => {
    it(`should ${caseName.split("-").join(" ")}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      let actualPath = path.join(fixtureDir, "actual.js");
      const actual = transformFileSync(actualPath).code;

      if (path.sep === "\\") {
        // Specific case of windows, transformFileSync return code with '/'
        actualPath = actualPath.replace(/\\/g, "/");
      }

      const expected = fs
        .readFileSync(path.join(fixtureDir, "expected.js"))
        .toString()
        .replace(/%FIXTURE_PATH%/g, actualPath);

      assert.equal(
        prettier.format(actual, { parser: "babel" }),
        prettier.format(expected, { parser: "babel" })
      );
    });
  });
});
