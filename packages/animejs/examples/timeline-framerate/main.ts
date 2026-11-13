// Timeline frameRate and fps: change the timeline's fps live and count the real updates per second
import { createTimeline } from 'animejs';
import type { Mount } from '@/types.ts';
import { makeScene } from '../../shared/timeline-scene.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const sc = makeScene(el);
  let updates = 0;
  const tl = createTimeline({ frameRate: 60, loop: true, onUpdate: () => updates++ })
    .add(sc.circle, { x: '10rem' })
    .add(sc.triangle, { x: '10rem' }, '-=500')
    .add(sc.square, { x: '10rem' }, '-=500');

  if (preview) {
    // Alternate a smooth 60 fps with a choppy 6 fps.
    let low = false;
    sc.every(() => {
      low = !low;
      tl.fps = low ? 6 : 60;
    }, 2000);
  } else {
    const p = sc.panel();
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '1';
    range.max = '120';
    range.value = '60';
    range.step = '1';
    p.append(range);
    const setFps = sc.readout(p, 'fps', '60');
    const setRate = sc.readout(sc.panel(), 'measured onUpdate calls / s', '0');
    range.addEventListener(
      'input',
      () => {
        tl.fps = Number(range.value);
        setFps(range.value);
      },
      { signal: sc.ac.signal },
    );
    sc.every(() => {
      setRate(updates * 2);
      updates = 0;
    }, 500);
  }

  return () => {
    sc.dispose();
    tl.revert();
  };
};

export default mount;
