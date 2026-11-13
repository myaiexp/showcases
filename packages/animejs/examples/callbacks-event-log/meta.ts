// animejs example: all animation callbacks logged live
import { defineMeta } from '@/types.ts';

const base = 'pages/animejs-com/documentation/animation/animation-callbacks/';

export default defineMeta({
  title: 'Animation callbacks event log',
  summary:
    'One looping animation with onBegin, onBeforeUpdate, onUpdate, onRender, onLoop, onPause, onComplete and then() wired to counters and a timestamped log.',
  section: 'Animation',
  tags: ['animate', 'onBegin', 'onBeforeUpdate', 'onUpdate', 'onRender', 'onLoop', 'onPause', 'onComplete', 'then'],
  docs: ['onbegin', 'onbeforeupdate', 'onupdate', 'onrender', 'onloop', 'onpause', 'oncomplete', 'then'].map(
    (n) => `${base}${n}.md`,
  ),
  provenance: 'pure',
  added: '2026-11-13',
});
