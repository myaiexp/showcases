// zephyr3d example: AnimationController: a one-shot that returns to the interrupted state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AnimationController: a one-shot that returns to the interrupted state',
  summary:
    'A jump state plays once with wait: \'complete\'. A response with returnTo: true sends the controller back to run when it finishes, returnTransition cross-fading the return, and onActive: { fadeOut } fades run out as the jump starts.',
  section: 'Animation',
  tags: ['returnTo', 'returnTransition', 'onActive', 'fadeOut', 'wait', 'complete', 'statecomplete', 'addState'],
  docs: ['repo/apps/doc/web/en/animation-controller.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
