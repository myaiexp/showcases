// animejs example: engine.pauseOnDocumentHidden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Engine pauseOnDocumentHidden clocks',
  summary:
    'A wall-clock counter runs beside a timer on the engine clock. Toggle pauseOnDocumentHidden, switch tabs, and see whether the engine time catches up.',
  section: 'Engine',
  tags: ['engine', 'engine.pauseOnDocumentHidden', 'createTimer', 'currentTime'],
  docs: [
    'pages/animejs-com/documentation/engine/engine-parameters/pauseondocumenthidden.md',
    'pages/animejs-com/documentation/engine/engine-properties.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
