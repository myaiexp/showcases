// gsap example: Flip.batch with two actions, getState, setState, animate, and the split run(true)
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flip.batch',
  summary:
    'Two independent components, a grid/list of tiles and a list of chips, register actions on one Flip batch. A single run() reads both states, changes both, then animates both; the log shows that order.',
  section: 'Flip',
  tags: ['Flip', 'batch', 'getState', 'setState', 'animate', 'FlipBatch', 'actions'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/Flip/static-batch-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-getState-.md',
    'pages/gsap-com/docs/v3/Plugins/Flip/static-from-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
