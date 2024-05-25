/** @type { import("lint-staged").Config } */
const config = {
  "*.{ts,tsx}": [
    "bash -c 'pnpm typecheck'",
    "prettier --write",
    "eslint --cache --fix",
  ],
  "*.{,c,m}js,*.json,*.md": ["prettier --write"],
};

module.exports = config;
