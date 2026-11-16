// fabric example: Serialization: edit the JSON, load it back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: edit the JSON, load it back',
  summary:
    'A text box holds canvas.toJSON() output; every edit goes to canvas.loadFromJSON(text). Bad JSON or an unregistered type rejects the promise, which the status line reports.',
  section: 'Serialization',
  tags: ['loadFromJSON', 'toJSON', 'classRegistry'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/api/variables/classRegistry.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
