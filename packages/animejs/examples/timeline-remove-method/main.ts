// Timeline remove(): drop an animation, a target or a single property from a running timeline
import { animate, createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  const dist = '10rem';
  let animation: ReturnType<typeof animate>;
  let tl: ReturnType<typeof createTimeline>;
  let setDuration = (_v: string | number): void => {};
  let setPaused = (_v: string | number): void => {};

  const build = (): void => {
    tl?.revert();
    animation?.revert();
    animation = animate(sc.circle, { x: dist, scale: [1, 0.5, 1] });
    tl = createTimeline({ loop: true, alternate: true })
      .sync(animation)
      .add(sc.triangle, { x: dist, rotate: 360 }, 100)
      .add(sc.square, { x: dist }, 200);
    setDuration(Math.round(tl.duration));
  };

  const removeAnimation = (): void => void tl.remove(animation);
  const removeTarget = (): void => void tl.remove(sc.square);
  const removeRotate = (): void => void tl.remove(sc.triangle, 'rotate');

  if (!preview) {
    const p = sc.panel();
    sc.button(p, 'remove(animation)', removeAnimation);
    sc.button(p, 'remove(square)', removeTarget);
    sc.button(p, "remove(triangle, 'rotate')", removeRotate);
    sc.button(p, 'Rebuild', build);
    const r = sc.panel();
    setDuration = sc.readout(r, 'duration (unchanged by remove)', '0');
    setPaused = sc.readout(r, 'paused', 'false');
    sc.every(() => setPaused(String(tl.paused)), 100);
  }
  build();

  if (preview) {
    // Remove one thing every 1.4 s, then rebuild.
    const steps = [removeAnimation, removeRotate, removeTarget, build];
    let i = 0;
    sc.every(() => {
      steps[i % steps.length]!();
      i++;
    }, 1400);
  }

  return () => {
    sc.dispose();
    tl.revert();
    animation.revert();
  };
};

export default mount;
