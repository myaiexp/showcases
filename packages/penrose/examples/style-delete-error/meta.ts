// penrose example: Reading a deleted field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A deleted field cannot be read later',
  summary:
    'After `delete x.widget` for the subtype Hidden, a generic block that reads `x.widget.center` fails for the Hidden item: "Could not find x.widget.center". The first tab keeps the deleted field out of every later block and lays out cleanly; the second shows the error the docs warn about.',
  section: 'Style: Selector Blocks',
  tags: ['delete', 'subtype', 'error', 'field'],
  docs: ['repo/packages/docs-site/docs/ref/style/selector-blocks.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
