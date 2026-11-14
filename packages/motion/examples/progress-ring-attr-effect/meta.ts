// motion example: Upload progress ring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Upload progress ring',
  summary: 'A circular upload meter whose arc grows and shifts from red to green as the file goes up. attrEffect writes SVG attributes from one progress value, and also fills in the accessible aria-valuenow and a data attribute that the percentage label reads.',
  section: 'Effects',
  tags: ['attrEffect', 'mapValue', 'transformValue', 'ariaValuenow', 'dataValue'],
  docs: ['pages/motion-dev/docs/attr-effect.md', 'pages/motion-dev/docs/map-value.md', 'pages/motion-dev/docs/transform-value.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
