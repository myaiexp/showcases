// fabric example: Serialization: undo and redo from toObject snapshots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: undo and redo from toObject snapshots',
  summary:
    'After each add, remove or object:modified the canvas.toObject() result is stored as a string. Undo and redo call loadFromJSON with the snapshot at the new position in the list.',
  section: 'Serialization',
  tags: ['toObject', 'loadFromJSON', 'object:modified', 'object:added', 'object:removed'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
