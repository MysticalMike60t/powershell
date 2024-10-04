const fs = require("fs");

const settings = JSON.parse(fs.readFileSync("settings.json", "utf-8"));
const theme = JSON.parse(
  fs.readFileSync(settings.files.theme, settings.encoding)
);

module.exports = {
  root: settings.root,
  encoding: settings.encoding,
  files: settings.files,
  size: settings.size,
  theme: theme,
};