// Output chain: Destination.chain adds a distortion and lowpass to the whole mix
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { disposeAll } from '../../shared/dispose.ts';
import { flow, rms, source, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  drums: Source;
  melody: Source;
  dist: Tone.Distortion;
  lowpass: Tone.Filter;
  caption: string;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });
  const f = flow(stage.visual, 'drums + melody', ['Destination.chain(Distortion, Filter)']);

  // chain() with no arguments puts the Destination back to a plain input -> output.
  const apply = (g: Graph, on: boolean): void => {
    const dest = Tone.getDestination();
    if (on) dest.chain(g.dist, g.lowpass);
    else dest.chain();
  };

  return stage.run({
    build: async (): Promise<Graph> => {
      const drums = await source('drums');
      const melody = await source('melody');
      // Both sources go straight to the speakers; neither knows about the effects.
      drums.out.toDestination();
      melody.out.toDestination();
      const g = { drums, melody, dist: new Tone.Distortion(0.4), lowpass: new Tone.Filter(2000, 'lowpass'), caption: 'whole mix through the chain' };
      apply(g, true);
      return g;
    },
    play: (g, time) => {
      g.drums.start(time);
      g.melody.start(time);
      const caption = g.caption;
      stage.show(time, () => f.set(caption, caption === 'dry'));
    },
    stop: (g, time) => {
      g.drums.stop(time);
      g.melody.stop(time);
    },
    variants: [
      { label: 'dry', apply: (g: Graph) => { apply(g, false); g.caption = 'dry'; } },
      { label: 'through the chain', apply: (g: Graph) => { apply(g, true); g.caption = 'whole mix through the chain'; } },
    ],
    controls: (g, bar) => {
      checkbox(bar, 'Destination.chain on', true, (v) => apply(g, v));
      slider(bar, 'distortion', 0, 1, 0.01, 0.4, (v) => { g.dist.distortion = v; });
      slider(bar, 'lowpass', 300, 8000, 50, 2000, (v) => { g.lowpass.frequency.value = v; }, (v) => `${v} Hz`);
    },
    frame: () => f.level(rms(stage.samples())),
    // The Destination is page-wide and the stage does not reset its chain: undo it here.
    dispose: (g) => {
      Tone.getDestination().chain();
      disposeAll(g);
    },
  });
};

export default mount;
