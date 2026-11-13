// animejs example: engine.pause() and engine.resume()
import { defineMeta } from '@/types.ts';

const base = 'pages/animejs-com/documentation/engine/engine-methods/';

export default defineMeta({
  title: 'Engine pause and resume',
  summary:
    'Pause the whole engine to freeze every running animation, add new ones while it is paused, then resume. One button pauses for three seconds with a countdown.',
  section: 'Engine',
  tags: ['engine', 'engine.pause', 'engine.resume', 'engine.paused', 'animate'],
  docs: [`${base}pause.md`, `${base}resume.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
