// Timeline call(): three functions fire at 0, 800 and 1200 ms while a square slides
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  const lit = [sc.triangle, sc.square, sc.circle];
  const names = ['A', 'B', 'C'];
  const setters: Array<(v: string | number) => void> = [];
  if (!preview) {
    const p = sc.panel();
    names.forEach((n) => setters.push(sc.readout(p, `function ${n}`, '--')));
  }
  const fire = (i: number): void => {
    lit[i]!.classList.add('on');
    setters[i]?.(names[i]!);
  };

  const tl = createTimeline({
    loop: true,
    loopDelay: 800,
    onLoop: () => {
      lit.forEach((s) => s.classList.remove('on'));
      setters.forEach((s) => s('--'));
    },
  })
    .call(() => fire(0), 0)
    .call(() => fire(1), 800)
    .call(() => fire(2), 1200)
    .add(sc.square, { x: '10rem', duration: 1600 }, 0);

  return () => {
    sc.dispose();
    tl.revert();
  };
};

export default mount;
