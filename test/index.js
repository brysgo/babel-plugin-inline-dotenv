const path = require("path");
const fs = require("fs");
const assert = require("assert");
const { transformFileSync } = require("babel-core");

function trim(str) {
  return str.replace(/^\s+|\s+$/, "");
}

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

      assert.equal(trim(actual), trim(expected));
    });
  });
});
