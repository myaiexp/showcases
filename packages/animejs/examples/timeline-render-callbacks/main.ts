// Timeline onBeforeUpdate vs onRender: loopDelay and idle gaps stop renders but not updates
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  let updates = 0;
  let renders = 0;
  const p = preview ? undefined : sc.panel();
  const setUpdates = p ? sc.readout(p, 'onBeforeUpdate calls', '0') : () => {};
  const setRenders = p ? sc.readout(p, 'onRender calls', '0') : () => {};

  const tl = createTimeline({
    defaults: { duration: 500 },
    loopDelay: 1000,
    loop: true,
    onBeforeUpdate: () => setUpdates(++updates),
    onRender: () => setRenders(++renders),
  })
    .add(sc.circle, { x: '10rem' })
    .add(sc.triangle, { x: '10rem' }, '+=250')
    .add(sc.square, { x: '10rem' }, '+=250');

  return () => {
    sc.dispose();
    tl.revert();
  };
};

export default mount;
