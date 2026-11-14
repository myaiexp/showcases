// Meter with channelCount 2: one decibel level per ear
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { source, type Source } from '../../shared/fx-kit.ts';
import { BLUE, PINK, bar, column, dbFrac, dbOf, dbText } from '../../shared/routing-kit.ts';
import { probe, rmsAt, type Probe } from '../../shared/stereo-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 2;
interface Graph {
  src: Source;
  panner: Tone.Panner;
  meter: Tone.Meter;
}

/** The sound and its panning: a riff moving from the left speaker to the right. */
async function makeAndPlay(sweep: boolean, tap: boolean): Promise<Graph> {
  const src = await source('riff');
  const panner = new Tone.Panner(sweep ? -1 : 0).toDestination();
  const meter = new Tone.Meter({ channelCount: 2, smoothing: 0.8 });
  src.out.connect(panner);
  if (tap) panner.connect(meter);
  return { src, panner, meter };
}

const mount: Mount = async (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS, channels: 2 });
  const col = column(stage.visual, 10);
  const left = bar(col, 'L', BLUE);
  const right = bar(col, 'R', PINK);
  let live: Graph | undefined;
  let sweeping = true;
  let smoothL = 0;
  let smoothR = 0;

  // Analysers read silence in a card, so a card renders the same sound once more on its
  // own and reads the left and right levels from that audio.
  let measured: Probe | null = null;
  if (ctx.preview) {
    measured = await probe(stage, SECONDS, 2, async () => {
      const g = await makeAndPlay(true, false);
      g.panner.pan.setValueAtTime(-1, 0);
      g.panner.pan.linearRampToValueAtTime(1, SECONDS);
      g.src.start(0);
    });
  }

  return stage.run({
    build: async () => {
      live = await makeAndPlay(sweeping, true);
      return live;
    },
    play: (g, time) => {
      g.panner.pan.cancelScheduledValues(time);
      if (sweeping) {
        g.panner.pan.setValueAtTime(-1, time);
        g.panner.pan.linearRampToValueAtTime(1, time + SECONDS);
      } else {
        g.panner.pan.setValueAtTime(0, time);
      }
      g.src.start(time);
    },
    stop: (g, time) => g.src.stop(time),
    dispose: (g) => {
      live = undefined;
      g.src.dispose();
      g.panner.dispose();
      g.meter.dispose();
    },
    controls: (g, box) => {
      select(box, 'pan', ['sweep', 'centre'] as const, (m) => {
        sweeping = m === 'sweep';
        if (!sweeping) {
          g.panner.pan.cancelScheduledValues(0);
          g.panner.pan.value = 0;
        }
      });
    },
    frame: (time) => {
      let l: number;
      let r: number;
      if (measured) {
        smoothL = Math.max(rmsAt(measured, 0, time, 0.03), smoothL * 0.8);
        smoothR = Math.max(rmsAt(measured, 1, time, 0.03), smoothR * 0.8);
        [l, r] = [dbOf(smoothL), dbOf(smoothR)];
      } else {
        const v = live ? (live.meter.getValue() as number[]) : [-100, -100];
        [l, r] = [v[0]!, v[1]!];
      }
      left.set(dbFrac(l), dbText(l));
      right.set(dbFrac(r), dbText(r));
    },
  });
};

export default mount;
