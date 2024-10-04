const config = require("./config");

function generateFileList(files, relativeDir) {
  return files
    .map((file) => {
      let bgcolor = "transparent";
      let txtcolor = config.theme.colors.accent.default;
      const extension = Object.keys(config.theme.colors.files).find((ext) =>
        file.name.endsWith(ext)
      );
      if (extension) {
        ({ bgcolor, txtcolor } = config.theme.colors.files[extension]);
      }
      return `
      <li class="file-item">
        <a href="${relativeDir ? `/${relativeDir}` : ""}/${file.name}${
        file.isDirectory ? "/" : ""
      }" 
           data-name="${file.name}" 
           data-is-directory="${file.isDirectory}" 
           style="padding: 0 20px; border-radius: ${
             config.theme.element_styles.file.border_radius
           };
           ${
             file.isDirectory
               ? `background: ${config.theme.colors.elements.file.is_folder.background}; 
                color: ${config.theme.colors.elements.file.is_folder.text_color};`
               : `background:${bgcolor};color:${txtcolor};`
           }"
        >${file.name}</a>
      </li>`;
    })
    .join("");
}

function generateHtml({
  relativeDir,
  parentDir,
  dirInfo,
  files,
  metaTags,
  seoTags,
  styles,
}) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${metaTags}
        ${seoTags}
        <title>${relativeDir || "/"}</title>
        <style>${styles}</style>
      </head>
      <body>
        <a class="go-home" href="${
          parentDir ? `/${parentDir}` : "/"
        }" rel="noopener noreferrer" target="_self" 
           style="font-size:${
             config.theme.element_styles.parent_dir.font_size
           }">
          ..<span style="font-size:${
            config.theme.element_styles.parent_dir.slash.font_size
          };
                         font-weight:${
                           config.theme.element_styles.parent_dir.slash
                             .font_weight
                         };">
            /
          </span>
        </a>
        <h1 class="title">${relativeDir || "/"}</h1>
        <input class="search" id="search" onkeyup="filterFiles()" placeholder="Search files...">
        <div class="file-info">
          <p>Total size: ${dirInfo.totalSizeFormatted}</p>
          <p>Number of files: ${dirInfo.fileCount}</p>
        </div>
        <div class="files">
          <ul id="fileList">
            ${generateFileList(files, relativeDir)}
          </ul>
        </div>
        <a href="/all-files.html" class="all-files-link">View All Files</a>
        <script>
          function filterFiles() {
            const searchInput = document.getElementById('search').value.toLowerCase();
            const fileItems = document.querySelectorAll('.file-item');
            fileItems.forEach(item => {
              const fileName = item.textContent.toLowerCase();
              if (fileName.includes(searchInput)) {
                item.style.display = '';
              } else {
                item.style.display = 'none';
              }
            });
          }
        </script>
      </body>
    </html>
  `;
}

function generateAllFilesHtml({ allFiles, metaTags, seoTags, styles }) {
  const fileList = allFiles
    .map(
      (file) => `
    <tr>
      <td><a href="/${file.path}">${file.name}</a></td>
      <td>${file.size}</td>
      <td>${file.lastModified}</td>
    </tr>
  `
    )
    .join("");

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${metaTags}
        ${seoTags}
        <title>All Files</title>
        <style>
          ${styles}
        </style>
      </head>
      <body>
        <h1 class="title">All Files</h1>
        <input class="search" id="search" onkeyup="filterFiles()" placeholder="Search files...">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody id="fileList">
            ${fileList}
          </tbody>
        </table>
        <script>
          function filterFiles() {
            const searchInput = document.getElementById('search').value.toLowerCase();
            const rows = document.querySelectorAll('#fileList tr');
            rows.forEach(row => {
              const text = row.textContent.toLowerCase();
              row.style.display = text.includes(searchInput) ? '' : 'none';
            });
          }
        </script>
      </body>
    </html>
  `;
}

module.exports = { generateHtml, generateAllFilesHtml };