// aframe example: <a-videosphere>: a 360° video, paused and played
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-videosphere>: a 360° video, paused and played',
  summary:
    '<a-videosphere> wraps an equirectangular video around the camera, as <a-sky> does an image. The video here is painted in code, a sun circling the horizon. The buttons use the docs\' route to the <video>: components.material.material.map.image, then pause() and play().',
  section: 'Primitives',
  tags: ['a-videosphere', 'src', 'equirectangular', 'material.map.image', 'play', 'pause'],
  docs: ['repo/docs/primitives/a-videosphere.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
