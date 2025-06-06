#!/usr/bin/env node
/**

main.js
Usage: node main.js
例: node main.js ./subs
結果: ./subs_vtt 配下に同じツリーができ、.srt は .vtt に変換される
*/
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const srt2vtt = require("srt-to-vtt");

if (process.argv.length < 3) {
  console.error("Usage: node convert.js folder_path");
  process.exit(1);
}

const inRoot = path.resolve(process.argv[2]);
const outRoot = `${inRoot}_vtt`;

(async () => {
  // 入力フォルダの存在確認
  const stat = await fsp.stat(inRoot).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    console.error(
      `Input path "${inRoot}" is not a directory or does not exist.`
    );
    process.exit(1);
  }

  await walkAndConvert(inRoot);

  console.log(`Done. Converted files are under ${outRoot}`);
})();

/**

再帰的にディレクトリをたどり .srt → .vtt 変換
*/
async function walkAndConvert(current) {
  const entries = await fsp.readdir(current, { withFileTypes: true });
  for (const entry of entries) {
    const inPath = path.join(current, entry.name);
    const relPath = path.relative(inRoot, inPath); // ルートからの相対
    const outPath = path.join(outRoot, relPath);

    if (entry.isDirectory()) {
      // 対応する出力ディレクトリを作る
      await fsp.mkdir(outPath, { recursive: true });
      await walkAndConvert(inPath); // 再帰
    } else if (entry.isFile()) {
      // .txt か .srt を .vtt に変換
      const ext = path.extname(entry.name).toLowerCase();
      if (ext !== ".txt" && ext !== ".srt") continue;
      const outVtt = outPath.replace(/\.[^.]+$/, ".vtt");
      await fsp.mkdir(path.dirname(outVtt), { recursive: true });

      await new Promise((resolve, reject) => {
        fs.createReadStream(inPath)
          .pipe(srt2vtt())
          .pipe(fs.createWriteStream(outVtt))
          .on("finish", resolve)
          .on("error", reject);
      });

      console.log(`converted: ${relPath} -> ${path.relative(outRoot, outVtt)}`);
    }
  }
}
