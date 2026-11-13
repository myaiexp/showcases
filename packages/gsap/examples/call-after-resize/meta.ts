// gsap example: Call after resize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Call after resize',
  summary:
    'A window is resized back and forth, firing dozens of resize events, while callAfterResize() waits until the resizing stops and runs your function once per resize. The red bar counts raw events, the green one counts debounced calls.',
  section: 'Helper functions',
  tags: ['callAfterResize', 'delayedCall', 'restart', 'debounce', 'resize'],
  docs: ['pages/gsap-com/docs/v3/HelperFunctions/helpers/callAfterResize.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
