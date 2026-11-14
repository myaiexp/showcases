// Noise playback rate: slowing a Noise buffer's playbackRate removes the treble
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const label = bigLabel(stage.visual);
  const text = (r: number): string => `playbackRate ${r}\n${r < 1 ? 'slower: duller, rumbling' : r > 1 ? 'faster: hissier, higher' : 'normal'}`;
  label.textContent = text(1);

  return stage.run({
    build: () => new Tone.Noise({ type: 'white', volume: -14 }).toDestination(),
    play: (noise, time) => {
      const t = text(noise.playbackRate);
      stage.show(time, () => (label.textContent = t));
      noise.start(time);
      return (end) => noise.stop(end);
    },
    variants: [0.25, 0.5, 1, 2].map((rate) => ({
      label: `playbackRate ${rate}`,
      apply: (noise: Tone.Noise) => (noise.playbackRate = rate),
    })),
    controls: (noise, bar) => {
      slider(bar, 'playbackRate', 0.1, 3, 0.05, 1, (r) => {
        noise.playbackRate = r;
        label.textContent = text(r);
      });
    },
  });
};

export default mount;
