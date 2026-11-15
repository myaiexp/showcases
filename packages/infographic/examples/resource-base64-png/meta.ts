// AntV Infographic example: Resources: a base64 PNG built on a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resources: a base64 PNG built on a canvas',
  summary:
    'The standard base64 image form: icon data:image/png;base64, followed by the encoded picture. The PNG is not a stored file here; it is drawn on a canvas in code and read back with toDataURL, once per step, and each one is a different picture.',
  section: 'Resources',
  tags: ['icon', 'data:image/png;base64', 'base64', 'canvas', 'list-grid-compact-card'],
  docs: [
    'repo/site/src/content/learn/resources.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
