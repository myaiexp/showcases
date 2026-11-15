// cobe example: what the CSS Anchors recipe makes cobe create
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CSS anchors under the hood',
  summary:
    'Three markers with ids, each followed by a 1px anchor div that cobe appends next to the canvas (outlined here). A live readout shows the :root style cobe writes with a --cobe-visible variable per id, and one label sits above San Francisco with position-anchor and anchor().',
  section: 'Recipes',
  tags: ['id', 'position-anchor', 'anchor()', '--cobe-{id}', '--cobe-visible-{id}', 'markers'],
  docs: ['repo/website/app/components/Recipes.tsx', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
