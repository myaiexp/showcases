// The README's TL;DR: a sawtooth wave, a Delay, play
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 3 });
  const picture = flow(stage.visual, 'sawtooth', ['Delay']);

  return stage.run({
    build: () => {
      const sawtoothWave = new Pizzicato.Sound({
        source: 'wave',
        options: { type: 'sawtooth', frequency: 220, volume: 0.5 },
      });
      const delay = new Pizzicato.Effects.Delay();
      sawtoothWave.addEffect(delay);
      return { sawtoothWave, delay };
    },
    play: ({ sawtoothWave }, at) => {
      sawtoothWave.play();
      stage.show(() => picture.caption('play(): the note sounds'));
      // A short note, so the echoes are left on their own afterwards.
      at(0.4, () => {
        sawtoothWave.stop();
        stage.show(() => picture.caption('stop(): only the echoes are left'));
      });
    },
    controls: ({ delay }, bar) => {
      slider(bar, 'feedback', 0, 0.9, 0.05, delay.feedback, (v) => (delay.feedback = v));
      slider(bar, 'time', 0.05, 1, 0.05, delay.time, (v) => (delay.time = v), (v) => `${v.toFixed(2)} s`);
    },
  });
};

export default mount;
