const fs = require("fs");
const path = require("path");

const config = require("./config.js");
const { generateStyles } = require("./styles.js");
const { generateHtml, generateAllFilesHtml } = require("./template.js");

function readFileContent(filePath) {
  return fs.readFileSync(filePath, config.encoding);
}

function getFilterList() {
  return readFileContent(config.files.filter)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function formatBytes(bytes, decimals = config.size.decimals) {
  if (bytes === 0) return config.size.empty_message;
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = config.size.sizes;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

function getDirectoryInfo(dir) {
  let totalSize = 0;
  let fileCount = 0;
  const filterList = getFilterList();

  function calculateDirSize(directory) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        calculateDirSize(filePath);
      } else if (!filterList.includes(file)) {
        totalSize += stats.size;
        fileCount += 1;
      }
    });
  }

  calculateDirSize(dir);

  return {
    totalSizeBytes: totalSize,
    totalSizeFormatted: formatBytes(totalSize),
    fileCount,
  };
}

function getFileList(dir) {
  const filterList = getFilterList();
  return fs
    .readdirSync(dir)
    .map((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        isDirectory: stats.isDirectory(),
      };
    })
    .filter((file) => !filterList.includes(file.name));
}

function generateIndex(dir) {
  const relativeDir = path
    .relative(config.root.directory, dir)
    .replace(/\\/g, "/");
  const parentDir = relativeDir.split("/").slice(0, -1).join("/") || "";
  const dirInfo = getDirectoryInfo(dir);
  const files = getFileList(dir);

  const metaTags = readFileContent(config.files.meta_tags);
  const seoTags = readFileContent(config.files.seo_tags);
  const styles = generateStyles();

  const htmlContent = generateHtml({
    relativeDir,
    parentDir,
    dirInfo,
    files,
    metaTags,
    seoTags,
    styles,
  });

  fs.writeFileSync(path.join(dir, "index.html"), htmlContent);

  files
    .filter((file) => file.isDirectory)
    .forEach((file) => generateIndex(path.join(dir, file.name)));
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  const filterList = getFilterList();

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const relativePath = path.relative(config.root.directory, filePath).replace(/\\/g, "/");

    if (stats.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (!filterList.includes(file)) {
      fileList.push({
        name: file,
        path: relativePath,
        size: formatBytes(stats.size),
        lastModified: stats.mtime.toISOString().split('T')[0]
      });
    }
  });

  return fileList;
}

function generateAllFilesPage() {
  const allFiles = getAllFiles(config.root.directory);
  const publicDir = path.join(config.root.directory, '.');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const metaTags = readFileContent(config.files.meta_tags);
  const seoTags = readFileContent(config.files.seo_tags);
  const styles = generateStyles("all-files");

  const htmlContent = generateAllFilesHtml({
    allFiles,
    metaTags,
    seoTags,
    styles,
  });

  fs.writeFileSync(path.join(publicDir, "all-files.html"), htmlContent);
}

generateIndex(config.root.directory);
generateAllFilesPage();