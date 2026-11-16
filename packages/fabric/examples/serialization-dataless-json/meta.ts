// fabric example: Serialization: toDatalessJSON and sourcePath
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: toDatalessJSON and sourcePath',
  summary:
    'A Path with a sourcePath is written without its path data by canvas.toDatalessJSON(), so the JSON shrinks to a file name. loadFromJSON does not fetch it back: the example puts the data in before loading.',
  section: 'Serialization',
  tags: ['toDatalessJSON', 'sourcePath', 'Path', 'loadFromJSON'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/classes/Path.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
