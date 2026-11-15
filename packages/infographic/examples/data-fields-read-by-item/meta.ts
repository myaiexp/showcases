// AntV Infographic example: Data: each item reads only some of the fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data: each item reads only some of the fields',
  summary:
    'The data page warns that structures and items may not consume every field. The same four fields (label, desc, value, icon) are given to three items: one shows label and description, one the label and icon, one the value as a progress ring.',
  section: 'Data',
  tags: ['data', 'label', 'desc', 'value', 'icon', 'simple', 'compact-card', 'circular-progress'],
  docs: [
    'repo/site/src/content/learn/data.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
