// AntV Infographic example: Quick start: create, render, destroy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quick start: create, render, destroy',
  summary:
    'The React and Vue snippets on the quick start page create an Infographic when the component mounts and call destroy() when it unmounts. This example repeats that loop: a new instance, a render() call, then destroy(), which clears the container.',
  section: 'Quick start',
  tags: ['new Infographic', 'render', 'destroy', 'container'],
  docs: [
    'repo/site/src/content/learn/index.en.md',
    'repo/site/src/content/reference/infographic-api.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
