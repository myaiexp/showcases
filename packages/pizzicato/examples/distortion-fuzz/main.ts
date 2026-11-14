// A clean sine riff through Distortion, with three gain settings
import Pizzicato, { type Distortion } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { phrase, tweak, wave } from '../../shared/fx.ts';
import { gauge } from '../../shared/fx-pictures.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';

const RIFF = [52, 52, 55, 57, 55, 52];

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: 2.2 });
  const picture = flow(stage.visual, 'riff', ['Distortion'], 'amp');
  const level = gauge(stage.visual, 'gain', '#ff8fb1');
  const show = (d: Distortion): void => {
    level.set(d.gain, d.gain.toFixed(2));
    picture.caption(d.gain < 0.15 ? 'clean' : d.gain < 0.6 ? 'crunch' : 'fuzz');
  };

  return stage.run({
    build: () => {
      const riff = wave('sine', 164, 0.5);
      const distortion = new Pizzicato.Effects.Distortion({ gain: 0.5 });
      riff.addEffect(distortion);
      return { riff, distortion };
    },
    play: ({ riff, distortion }, at) => {
      stage.show(() => show(distortion));
      phrase(riff, at, RIFF, 0.1, 0.34);
    },
    variants: [
      { label: 'gain 0', apply: ({ distortion }) => (distortion.gain = 0) },
      { label: 'gain 0.4', apply: ({ distortion }) => (distortion.gain = 0.4) },
      { label: 'gain 1', apply: ({ distortion }) => (distortion.gain = 1) },
    ],
    controls: ({ distortion }, bar) => {
      show(distortion);
      tweak(bar, distortion, [['gain', 0, 1, 0.05]], () => show(distortion));
    },
  });
};

export default mount;
