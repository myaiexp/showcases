// ky example: the json option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send data with the json option',
  summary:
    'Servers expect data as text with a label saying what kind it is. Hand Ky an object through the json option and it turns it into JSON text and adds the content-type label (unless you set your own). Edit the form and see exactly what the server received.',
  section: 'Requests',
  tags: ['json', 'content-type', 'ky.post'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
