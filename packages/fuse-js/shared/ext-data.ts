// Sample lists for the operator examples: languages and file names, like the docs' table
export const LANGS = [
  'Scheme', 'Scheme language', 'Python', 'CPython', 'Python script', 'Jython', 'Ruby', 'JRuby', 'Java',
  'JavaScript', 'Erlang', 'Elixir', 'Node.js', 'Vue.js', 'main.go', 'server.go', 'Rust', 'Racket',
];

/** Ten of the data.ts FILES, for cards that have room for five rows of tiles. */
export const FILES_SMALL = [
  'src/index.ts', 'src/app.ts', 'src/views/home.ts', 'src/styles/base.css', 'test/app.test.ts',
  'test/router.test.ts', 'scripts/build.js', 'server/main.go', 'README.md', 'docs/guide.md',
];

/** Twelve of the LANGS, for cards that have room for four rows of tiles. */
export const LANGS_SMALL = LANGS.filter((n) => !['Python script', 'Jython', 'Rust', 'Racket', 'server.go', 'Elixir'].includes(n));
