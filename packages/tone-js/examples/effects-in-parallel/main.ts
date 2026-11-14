// Parallel effects: a drum loop feeds a filter and a delay at once
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { flow, rms, source, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  src: Source;
  filter: Tone.Filter;
  delay: Tone.FeedbackDelay;
  caption: string;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.5 });
  const f = flow(stage.visual, 'drums', ['Filter + FeedbackDelay']);

  // The same source connects to each effect: they run side by side, not one after the other.
  const route = (g: Graph, filter: boolean, delay: boolean): void => {
    g.src.out.disconnect();
    if (filter) g.src.out.connect(g.filter);
    if (delay) g.src.out.connect(g.delay);
  };
  const variant = (label: string, filter: boolean, delay: boolean) => ({
    label,
    apply: (g: Graph) => {
      route(g, filter, delay);
      g.caption = label;
    },
  });

  return stage.run({
    build: async (): Promise<Graph> => {
      const src = await source('drums');
      const filter = new Tone.Filter(400, 'lowpass').toDestination();
      const delay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();
      const g = { src, filter, delay, caption: 'both, in parallel' };
      route(g, true, true);
      return g;
    },
    play: (g, time) => {
      g.src.start(time);
      const caption = g.caption;
      stage.show(time, () => f.set(caption));
    },
    stop: (g, time) => g.src.stop(time),
    variants: [variant('filter only', true, false), variant('delay only', false, true), variant('both in parallel', true, true)],
    controls: (g, bar) => {
      let filter = true;
      let delay = true;
      checkbox(bar, 'lowpass filter path', true, (v) => { filter = v; route(g, filter, delay); });
      checkbox(bar, 'feedback delay path', true, (v) => { delay = v; route(g, filter, delay); });
    },
    frame: () => f.level(rms(stage.samples())),
  });
};

export default mount;
