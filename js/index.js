const fs = require("fs");
const path = require("path");
const vm = require("vm");

function main() {
  const asScript = [];
  const noError = [];
  const [_, ...emojis] = fs
    .readFileSync(path.join(__dirname, "../emoji.txt"), { encoding: "utf8" })
    .split("\n");
  for (const emoji of emojis) {
    let script;
    ok(() => (script = new vm.Script(emoji))) &&
      asScript.push(emoji) &&
      ok(() => script.runInNewContext()) &&
      noError.push(emoji);
  }
  console.log(`valid as script:`);
  console.log(asScript);

  console.log(`runs without error:`);
  console.log(noError);
}

const ok = (fn) => {
  try {
    fn();
    return true;
  } catch {
    return false;
  }
};

main();
