// Pause, then set currentTime to scrub every animation together
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // A 5-second wave: negative delays put each ring further along, by its distance @dr.
  const doodle = stage.doodle(`
    @grid: 9 / 100% / #0b132b;
    background: #5bc0be;
    border-radius: 50%;
    animation: pulse 5s ease-in-out infinite;
    animation-delay: $s(@dr * -.25);
    @keyframes pulse {
      0%, 100% { scale: .2; }
      50% { scale: 1; background: #f4d35e; }
    }
  `);
  doodle.pause();

  const seek = (ms: number): void => {
    doodle.currentTime = ms; // moves every animation of the doodle to that moment
    stage.say(`currentTime = ${Math.round(ms)} ms`);
  };
  if (stage.bar) {
    slider(stage.bar, 'currentTime', 0, 5000, 10, 0, seek, (v) => `${v} ms`);
    seek(0);
  } else {
    // Step frame by frame (1000 / 60 ms each), forward then back.
    let frame = 0;
    let dir = 1;
    stage.every(50, () => {
      frame += dir * 4;
      if (frame >= 300 || frame <= 0) dir = -dir;
      seek((frame * 1000) / 60);
    });
  }
  return () => stage.dispose();
};

export default mount;
