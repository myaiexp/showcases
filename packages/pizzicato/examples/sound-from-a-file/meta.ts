// Pizzicato.js example: a sound loaded from an audio file
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play a sound file',
  summary:
    "With source 'file' and a path, Pizzicato downloads and decodes the file, then calls your callback once the sound is ready to play. Here the file is a short drum loop.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'file'", 'path', 'callback'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
