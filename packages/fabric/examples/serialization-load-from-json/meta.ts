// fabric example: Serialization: save, clear and restore with loadFromJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: save, clear and restore with loadFromJSON',
  summary:
    'JSON.stringify(canvas) saves the scene, canvas.clear() empties it and canvas.loadFromJSON(string, reviver) builds it again. The reviver is called with each serialized object and its new instance.',
  section: 'Serialization',
  tags: ['loadFromJSON', 'toJSON', 'clear', 'reviver'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
