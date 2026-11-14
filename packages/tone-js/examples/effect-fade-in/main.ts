// Fade an effect in over time: Distortion on chord
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  let rampTime = 2.6;

  return stage.run(
    fxSpec(stage, {
      source: 'chord',
      stages: ['Distortion'],
      caption: 'wet.rampTo(1, time)',
      create: (src: Source) => {
        const fx = new Tone.Distortion(0.7).toDestination();
        src.out.connect(fx);
        return fx;
      },
      // Start clean, then slide to fully wet.
      onPlay: (fx, time) => {
        fx.wet.setValueAtTime(0, time);
        fx.wet.rampTo(1, rampTime, time);
      },
      onFrame: (_, time, f) => {
        const wet = Math.min(1, time / rampTime);
        f.set(`wet ${wet.toFixed(2)}`, wet < 0.03);
      },
      controls: (fx, bar) => {
        slider(bar, 'ramp time', 0.5, 2.8, 0.1, 2.6, (v) => { rampTime = v; }, (v) => `${v} s`);
      },
    }),
  );
};

export default mount;
