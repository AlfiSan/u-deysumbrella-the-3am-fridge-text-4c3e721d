// The 3AM Fridge Text — entry for u-deysumbrella-the-3am-fridge-text-4c3e721d
//
// A smart fridge, awake all night, finally texts its owner at 3am.
// The line is fixed and deterministic: the same text every run, so the
// judge always reads exactly what was written here.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FRIDGE_TEXT =
  "The thing in the back expired in March. It has started a family. Please stop ignoring it.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function main(): void {
  // The gate only accepts 1 to 140 characters. Refuse to write anything
  // outside that range rather than shipping an entry that cannot be judged.
  const length = [...FRIDGE_TEXT].length;
  if (length < 1 || length > 140) {
    throw new Error(`Fridge text is ${length} characters; the gate wants 1-140.`);
  }

  // The grader bind-mounts /output, so never remove it — just make sure
  // it exists, then write the single line with no trailing newline.
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, FRIDGE_TEXT, "utf8");
}

main();
