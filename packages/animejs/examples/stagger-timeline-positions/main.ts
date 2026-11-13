// Stagger as a timeline position: each target is added at its own staggered time
import { createTimeline, stagger } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  const shapes = [sc.circle, sc.triangle, sc.square];
  let tl: ReturnType<typeof createTimeline> | undefined;
  let step = 500;

  const reset = (): void => shapes.forEach((s) => (s.style.color = ''));
  const build = (): void => {
    tl?.revert();
    reset();
    const mark = (anim: { targets: unknown[] }): void => {
      (anim.targets as HTMLElement[]).forEach((t) => (t.style.color = 'hsl(0 80% 55%)'));
    };
    tl = createTimeline({ loop: true, loopDelay: 600, onLoop: reset })
      .add(sc.circle, { x: '10rem', onComplete: mark })
      .label('circle completes')
      // the position argument is a stagger: one position per target
      .add([sc.triangle, sc.square], { x: '10rem', onComplete: mark }, stagger(step, { start: 'circle completes-=500' }));
  };
  build();

  if (!preview) {
    const p = sc.panel();
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1000';
    slider.step = '50';
    slider.value = String(step);
    p.append(slider);
    const setStep = sc.readout(p, 'stagger step (ms)', String(step));
    slider.addEventListener(
      'input',
      () => {
        step = Number(slider.value);
        setStep(step);
        build();
      },
      { signal: sc.ac.signal },
    );
  }

  return () => {
    sc.dispose();
    tl?.revert();
    reset();
  };
};

export default mount;
