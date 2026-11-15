// Vizzu example: maxFractionDigits caps the decimals shown on number labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Maximum fraction digits',
  summary:
    'maxFractionDigits caps the digits after the decimal point on labels that show numbers. By default Vizzu shows four significant figures (3.142); the constants lose digits as the cap drops from 2 to 0.',
  section: 'Style',
  tags: ['style', 'plot.marker.label.maxFractionDigits'],
  docs: ['repo/docs/tutorial/style.md', 'repo/src/apps/weblib/typeschema-api/styles.yaml'],
  provenance: 'pure',
  added: '2026-11-15',
});
