// Loop a recording: a Tone.Player loops a drum recording at a chosen playback rate
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });

  return stage.run({
    // The drum loop stands in for an audio file; a Player accepts a URL or a loaded buffer.
    build: async () => new Tone.Player({ url: await sample('drums'), loop: true }).toDestination(),

    play: (player, time) => {
      player.start(time);
      return (end) => player.stop(end);
    },

    variants: [0.5, 1, 1.5].map((rate) => ({
      label: `playbackRate ${rate}`,
      apply: (player: Tone.Player) => (player.playbackRate = rate),
    })),

    controls: (player, bar) => {
      slider(bar, 'playbackRate', 0.25, 2, 0.05, 1, (rate) => (player.playbackRate = rate));
    },
  });
};

export default mount;
