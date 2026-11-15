// A domain-warped noise field with u_time and a hash
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A domain-warped noise field with u_time and a hash",
  summary: "A hash gives value noise, which is warped by itself twice and colored with a cosine palette. Everything is in the fragment source: no sections, no textures.",
  section: "Shaders",
  tags: ["@shaders", "u_time", "pos", "noise"],
  docs: ['pages/css-doodle-com/reference/function-shaders.md', 'repo/docs/languages.md', 'repo/docs/grammar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
