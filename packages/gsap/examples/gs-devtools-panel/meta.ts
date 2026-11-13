// gsap example: GSDevTools.create with a container, an animation and persist off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GSDevTools panel',
  summary:
    'GSDevTools mounts a scrubber, speed control, in/out markers and an animation menu for one timeline, inside the example instead of the page bottom. The card plays the same timeline without the panel.',
  section: 'GSDevTools',
  tags: ['GSDevTools', 'debugging', 'scrubber', 'keyboard', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/GSDevTools.md',
    'pages/gsap-com/docs/v3/Plugins/GSDevTools/static-create-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
