// Buffer slice: ToneAudioBuffer.slice cuts a piece and a reversed copy plays it back
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { strip } from '../../shared/buffer-strip.ts';
import { sample } from '../../shared/samples.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const CUTS: [number, number][] = [[0, 1], [0.5, 1], [0, 0.5]];

interface Graph {
  whole: Tone.ToneAudioBuffer;
  fwd: Tone.Player;
  back: Tone.Player;
  cut: [number, number];
  /** Replaces the two players' buffers with a new slice and its mirror image. */
  recut(a: number, b: number): void;
  dispose(): void;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const wave = strip(stage.visual, ctx.preview ? 60 : 100);
  const label = bigLabel(stage.visual);
  let shown: readonly [number, number] = [0, 1];

  return stage.run<Graph>({
    build: async () => {
      const whole = await sample('melody');
      const fwd = new Tone.Player().toDestination();
      const back = new Tone.Player().toDestination();
      const g: Graph = {
        whole,
        fwd,
        back,
        cut: [0, 1],
        recut(a, b) {
          g.cut = [a, b];
          const piece = whole.slice(a, b);
          const mirror = piece.slice(0);
          mirror.reverse = true;
          fwd.buffer = piece;
          back.buffer = mirror;
        },
        dispose() {
          fwd.dispose();
          back.dispose();
          whole.dispose();
        },
      };
      g.recut(0, 1);
      return g;
    },

    // Forward, backward, forward, backward: each piece lasts b - a seconds.
    play: (g, time) => {
      const [a, b] = g.cut;
      const len = b - a;
      stage.show(time, () => (shown = [a, b]));
      stage.show(time, wave.prepare(g.whole.getChannelData(0), g.whole.duration));
      for (let i = 0; i < 4; i++) {
        const at = time + i * len;
        (i % 2 ? g.back : g.fwd).start(at);
        stage.show(at, () => {
          label.textContent = `slice(${a}, ${b}) ${i % 2 ? '← reversed copy' : '→ forward'}`;
        });
      }
    },
    stop: (g, time) => {
      g.fwd.stop(time);
      g.back.stop(time);
    },

    variants: CUTS.map(([a, b]) => ({ label: `slice ${a} to ${b} s`, apply: (g: Graph) => g.recut(a, b) })),

    controls: (g, bar) => {
      wave.setData(g.whole.getChannelData(0), g.whole.duration);
      let [a, b] = g.cut;
      slider(bar, 'slice start', 0, 1.75, 0.25, a, (v) => ((a = Math.min(v, b - 0.25)), g.recut(a, b), (shown = [a, b])), (v) => `${v} s`);
      slider(bar, 'slice end', 0.25, 2, 0.25, b, (v) => ((b = Math.max(v, a + 0.25)), g.recut(a, b), (shown = [a, b])), (v) => `${v} s`);
    },

    frame: () => wave.draw({ regions: [shown], active: 0 }),
  });
};
export default mount;
