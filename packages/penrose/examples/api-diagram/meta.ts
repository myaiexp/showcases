// penrose example: diagram(): one call from trio to SVG
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'diagram(): one call from trio to SVG',
  summary:
    '`diagram` wraps the whole pipeline: it takes a trio and a variation, an HTML element and a path resolver, compiles and optimizes, and appends the finished SVG to the element (or throws with the error message). Each new variation is a fresh call into a fresh element.',
  section: 'Language API',
  tags: ['diagram', 'PathResolver', 'variation'],
  docs: ['repo/packages/docs-site/docs/ref/api.md', 'repo/packages/core/src/index.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
