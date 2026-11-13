// Timeline init(): children with a from value wait at their natural spot unless init() renders them early
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  let tl: ReturnType<typeof createTimeline> | undefined;
  let setState = (_v: string | number): void => {};

  const build = (withInit: boolean): void => {
    tl?.revert();
    tl = createTimeline({ autoplay: false })
      .add(sc.square, { x: { from: '10rem' } })
      .add(sc.triangle, { x: { from: '10rem' } }, 500)
      .add(sc.circle, { x: { from: '10rem' } }, 1000);
    if (withInit) tl.init();
    setState(withInit ? 'init() called' : 'no init()');
  };

  if (preview) {
    let withInit = false;
    const cycle = (): void => {
      withInit = !withInit;
      build(withInit);
      sc.later(() => tl?.play(), 1300);
    };
    cycle();
    sc.every(cycle, 3600);
  } else {
    const p = sc.panel();
    sc.button(p, 'Build without init()', () => build(false));
    sc.button(p, 'Build with init()', () => build(true));
    sc.button(p, 'Play', () => tl?.play());
    setState = sc.readout(sc.panel(), 'paused timeline', 'none built');
    build(false);
  }

  return () => {
    sc.dispose();
    tl?.revert();
  };
};

export default mount;
