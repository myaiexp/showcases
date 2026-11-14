// Papa Parse example: encoding tells Papa how a file spells its letters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read an old Windows file correctly',
  summary:
    'Why do accented letters turn into odd symbols? A file is bytes, and the same byte can mean different letters in different encodings. For a local file, the encoding option tells Papa which one to read it with. It does not apply to text or downloads.',
  section: 'Parse config',
  tags: ['encoding', 'File', 'FileReader', 'windows-1252'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
