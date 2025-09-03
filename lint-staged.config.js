export default {
  // TypeScript and JavaScript files
  "**/*.{ts,tsx,js,jsx}": ["prettier --write", "eslint --fix"],

  // JSON files (including config files)
  "**/*.json": ["prettier --write"],

  // Markdown files
  "**/*.md": ["prettier --write"],

  // YAML files (like GitHub workflows)
  "**/*.{yml,yaml}": ["prettier --write"],
};
