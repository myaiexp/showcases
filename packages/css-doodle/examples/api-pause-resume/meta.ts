// pause() and resume(): stop and restart every animation in the doodle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'pause() and resume()',
  summary:
    'A grid of leaves spinning with a CSS animation, each delayed by its index. doodle.pause() stops every animation inside (the element gets a cssd-paused attribute) and resume() carries on from the same moment. The card toggles it on its own; the full view has the button from the docs.',
  section: 'Element API',
  tags: ['pause()', 'resume()', 'cssd-paused', '@keyframes'],
  docs: ['pages/css-doodle-com/reference/js-api-pause.md', 'pages/css-doodle-com/reference/selector-at-rules.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
