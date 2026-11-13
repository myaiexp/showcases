// Change an animation's playbackRate (speed) and frameRate (fps) live, per animation
import { animate, utils, type JSAnimation } from 'animejs';
import type { Mount } from '@/types.ts';
import { buildLane } from './ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const make = (target: HTMLElement, extra: { playbackRate?: number; frameRate?: number }): JSAnimation =>
    animate(target, { x: '12rem', loop: true, alternate: true, duration: 1500, ease: 'inOutSine', ...extra });

  const rate = buildLane('playbackRate', preview ? '' : 'animation.speed', 0, 5, 0.01, 1);
  const fps = buildLane('frameRate', preview ? '' : 'animation.fps', 1, 120, 1, 60);
  el.append(rate.root, fps.root);

  const rateAnim = make(rate.circle, { playbackRate: 1 });
  const fpsAnim = make(fps.circle, { frameRate: 60 });

  const setRate = (v: number): void => {
    rate.value.textContent = utils.roundPad(v, 2);
    // utils.sync batches the write with the engine, as the playbackRate docs do.
    utils.sync(() => (rateAnim.speed = v));
  };
  const setFps = (v: number): void => {
    fps.value.textContent = String(v);
    fpsAnim.fps = v;
  };
  setRate(1);
  setFps(60);

  if (preview) {
    // Sample inputs on a timer instead of a slider.
    const rates = [1, 0.25, 2.5];
    const fpsSteps = [60, 6, 60];
    let i = 0;
    const timer = window.setInterval(() => {
      i = (i + 1) % rates.length;
      setRate(rates[i] ?? 1);
      setFps(fpsSteps[i] ?? 60);
    }, 2000);
    return () => {
      window.clearInterval(timer);
      rateAnim.revert();
      fpsAnim.revert();
    };
  }

  const onRate = (): void => setRate(+rate.input.value);
  const onFps = (): void => setFps(+fps.input.value);
  rate.input.addEventListener('input', onRate);
  fps.input.addEventListener('input', onFps);

  return () => {
    rate.input.removeEventListener('input', onRate);
    fps.input.removeEventListener('input', onFps);
    rateAnim.revert();
    fpsAnim.revert();
  };
};

export default mount;
