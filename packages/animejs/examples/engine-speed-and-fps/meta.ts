// animejs example: engine.speed and engine.fps
import { defineMeta } from '@/types.ts';

const base = 'pages/animejs-com/documentation/engine/engine-parameters/';

export default defineMeta({
  title: 'Engine speed and fps',
  summary:
    'A field of looping particles all driven by the global engine. Two sliders set engine.speed (slow motion or fast-forward) and engine.fps for every animation at once.',
  section: 'Engine',
  tags: ['engine', 'engine.speed', 'engine.fps', 'animate', 'loop', 'utils.random'],
  docs: [`${base}speed.md`, `${base}fps.md`, 'pages/animejs-com/documentation/engine/engine-properties.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
