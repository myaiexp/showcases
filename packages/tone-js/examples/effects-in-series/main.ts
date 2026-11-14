// Series effects: chain() sends a riff through distortion, chorus, reverb
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { flow, rms, source, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  src: Source;
  dist: Tone.Distortion;
  chorus: Tone.Chorus;
  reverb: Tone.Reverb;
  caption: string;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.5, channels: 2 });
  const f = flow(stage.visual, 'riff', ['Distortion', 'Chorus', 'Reverb']);

  // Rebuilds the cable: source -> the chosen effects in order -> speakers.
  const wire = (g: Graph, on: readonly boolean[]): void => {
    const all = [g.dist, g.chorus, g.reverb];
    g.src.out.disconnect();
    all.forEach((n) => n.disconnect());
    g.src.out.chain(...all.filter((_, i) => on[i]), Tone.getDestination());
  };
  const variant = (label: string, on: readonly boolean[]) => ({
    label,
    apply: (g: Graph) => {
      wire(g, on);
      g.caption = label;
    },
  });

  return stage.run({
    build: async (): Promise<Graph> => {
      const src = await source('riff');
      const dist = new Tone.Distortion(0.5);
      const chorus = new Tone.Chorus(3, 3.5, 0.7).start();
      const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.4 });
      await reverb.ready;
      const g = { src, dist, chorus, reverb, caption: 'distortion, then chorus, then reverb' };
      wire(g, [true, true, true]);
      return g;
    },
    play: (g, time) => {
      g.src.start(time);
      const caption = g.caption;
      stage.show(time, () => f.set(caption, caption === 'dry'));
    },
    stop: (g, time) => g.src.stop(time),
    variants: [
      variant('dry', [false, false, false]),
      variant('distortion', [true, false, false]),
      variant('distortion, then chorus', [true, true, false]),
      variant('distortion, chorus, reverb', [true, true, true]),
    ],
    controls: (g, bar) => {
      const on = [true, true, true];
      ['Distortion', 'Chorus', 'Reverb'].forEach((name, i) =>
        checkbox(bar, name, true, (v) => {
          on[i] = v;
          wire(g, on);
        }),
      );
    },
    frame: () => f.level(rms(stage.samples())),
  });
};

export default mount;
