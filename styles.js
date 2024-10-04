const config = require("./config");

function generateStyles(page) {
  const { theme } = config;

  if (page === "all-files") {
    return `
  * {
    --color-accent: ${theme.colors.accent.default};
    --color-accent-hover: ${theme.colors.accent.hover};
    box-sizing: border-box;
  }
  
  body {
    font-family: ${theme.general.font_family};
    background: ${theme.colors.background.default};
    color: ${theme.colors.text.general};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    margin: 0;
  }
  
  .title {
    font-size: 2em;
    text-align: center;
    word-break: break-word;
  }
  
  .files {
    width: 100%;
    max-width: 800px;
    background: ${theme.colors.elements.files.background};
    border-radius: ${theme.element_styles.files.border_radius};
    box-shadow: 0 0 5px 0 ${theme.colors.elements.files.shadow};
    padding: 10px;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    background: ${theme.colors.elements.li_file.default};
    border-bottom: 1px solid var(--color-accent-hover);
    padding: 10px;
    transition: background 0.3s ease;
  }
  
  li:hover {
    background: ${theme.colors.elements.li_file.hover};
  }
  
  li:last-child {
    border-bottom: none;
  }
  
  a, a span {
    text-decoration: ${
      theme.general.link.underline === "true" ? "underline" : "none"
    };
    color: var(--color-accent);
    transition: color 0.3s ease;
  }
  
  a:hover, a:hover span {
    text-decoration: underline;
    color: var(--color-accent-hover);
  }
  
  .search {
    width: 100%; 
      max-width: 600px; 
      padding: 5px 10px; 
      margin-bottom: 20px; 
      border: none; 
      outline: 0; 
      border-radius: ${theme.element_styles.search.border_radius}; 
      font-size: 1em; 
      background:${theme.colors.elements.search.background}; 
  }
  
  .go-home {
    margin: 20px 0;
    font-size: 1.2em;
  }
  
  .go-home span {
    color: var(--color-accent) !important;
  }
  
  table {
    width: 100%;
    max-width: 800px;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    border-bottom: 1px solid rgb(45,45,45);
    text-align: left;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  th {
    background-color: rgb(20,20,20);
    border-bottom: 0;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1.5em;
    }
    
    .files, table {
      font-size: 0.9em;
    }
    
    th, td {
      padding: 8px;
    }
  }
  
  @media (max-width: 480px) {
    body {
      padding: 10px 5px;
    }
    
    .title {
      font-size: 1.2em;
    }
    
    .files, table {
      font-size: 0.8em;
    }
    
    th, td {
      padding: 6px;
    }
  }
`;
  } else {
    return `
    * { --color-accent: ${theme.colors.accent.default}; --color-accent-hover: ${
      theme.colors.accent.hover
    }; }
    *, ::after, ::before { box-sizing: border-box; color: ${
      theme.colors.text.general
    }; }
    :root { font-family: ${theme.general.font_family}; }
    body { 
      background: ${theme.colors.background.default}; 
      display: flex; 
      align-items: center; 
      justify-content: flex-start; 
      flex-direction: column; 
      padding: 20px 10px; 
    }
    .title { font-size: 2em; }
    .files { 
      max-width: 100%; 
      width: 80%; 
      min-width: 300px; 
      background: ${theme.colors.elements.files.background}; 
      border-radius: ${theme.element_styles.files.border_radius}; 
      box-shadow: 0 0 5px 0 ${theme.colors.elements.files.shadow}; 
      padding: 5px 20px; 
      display: flex; 
      align-items: center; 
      justify-content: flex-start; 
      flex-direction: column; 
    }
      .all-files-link {
        margin-top: 20px;
      }
    ul { 
      width: 100%; 
      margin: 0; 
      padding: 0; 
      list-style: none; 
      display: flex; 
      align-items: center; 
      justify-content: flex-start; 
      flex-direction: column; 
      gap: 5px; 
    }
    li { 
      width: 100%; 
      height: auto; 
      background: ${theme.colors.elements.li_file.default}; 
      display: flex; 
      align-items: center; 
      justify-content: flex-start; 
      flex-direction: row; 
      padding: 5px; 
      padding-top: 0; 
      border-bottom: 1px solid var(--color-accent-hover); 
    }
    li:hover { background: ${theme.colors.elements.li_file.hover}; }
    li:last-child { border-bottom: none; }
    a, a span { 
      text-decoration: ${
        theme.general.link.underline === "true" ? "underline" : "none"
      }; 
      color: var(--color-accent); 
    }
    a:hover, a:hover span { 
      text-decoration: underline; 
      color: var(--color-accent-hover); 
    }
    .search { 
      width: 100%; 
      max-width: 600px; 
      padding: 5px 10px; 
      margin-bottom: 20px; 
      border: none; 
      outline: 0; 
      border-radius: ${theme.element_styles.search.border_radius}; 
      font-size: 1em; 
      background:${theme.colors.elements.search.background}; 
    }
    .go-home { margin: 20px; }
    .go-home span { color: var(--color-accent) !important; }
    .file-info { 
      gap: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-bottom: 10px; 
      width: 80%; 
      min-width: 300px; 
      background: ${theme.colors.elements.file_info.background}; 
      border-radius: ${theme.element_styles.file_info.border_radius}; 
      padding: 5px 20px; 
      color: ${theme.colors.elements.file_info.text_color}; 
    }
    .file-info p { 
      padding: 0;
      margin: 0;
      position: relative;
      border-right: 1px solid ${theme.colors.elements.file_info.seperator};
      padding-right: 10px; 
    }
    .file-info p:last-child { border-right: none;}
    ${
      theme.media_query.use_query === "true"
        ? `@media (max-width: ${theme.media_query.file_info.remove_seperator}) {
          .file-info p { border-right: none; }
        }`
        : ""
    }
  `;
  }
}

module.exports = { generateStyles };