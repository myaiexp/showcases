// Noise colours: a Tone.Noise in white, pink or brown, each with a different tilt
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const COLOURS = ['white', 'pink', 'brown'] as const;
const SWATCH = { white: '#e8ecf2', pink: '#ff8fb1', brown: '#9a6a48' };
const NOTE: Record<(typeof COLOURS)[number], string> = {
  white: 'every pitch equally: bright hiss',
  pink: 'less treble: a softer rush, like rain',
  brown: 'mostly bass: a deep rumble, like thunder',
};

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const label = bigLabel(stage.visual);
  label.style.cssText += ';padding:18px 8px;border-radius:10px;color:#10131a;transition:background .2s';
  const paint = (c: (typeof COLOURS)[number]): void => {
    label.style.background = SWATCH[c];
    label.textContent = `${c} noise\n${NOTE[c]}`;
  };
  paint('white');

  return stage.run({
    build: () => new Tone.Noise('white').toDestination(),
    play: (noise, time) => {
      const c = noise.type;
      stage.show(time, () => paint(c));
      noise.volume.value = -14;
      noise.start(time);
      return (end) => noise.stop(end);
    },
    variants: COLOURS.map((c) => ({ label: c, apply: (noise: Tone.Noise) => (noise.type = c) })),
    controls: (noise, bar) => {
      select(bar, 'noise type', COLOURS, (c) => {
        noise.type = c;
        paint(c);
      });
    },
  });
};

export default mount;
