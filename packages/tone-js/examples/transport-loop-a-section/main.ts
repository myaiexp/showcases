// Transport loop points: play a four-bar phrase, then keep looping just a middle section
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox, select } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { follow, lane, phrasePart, posText } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

interface Loop {
  label: string;
  /** Bars (0-based, end exclusive) to loop, or null for no loop. */
  bars: [number, number] | null;
}
const LOOPS: Loop[] = [
  { label: 'no loop', bars: null },
  { label: 'loop bars 2-3', bars: [1, 3] },
  { label: 'loop bar 2', bars: [1, 2] },
];

const mount: Mount = (el, ctx) => {
  // 240 BPM makes a bar one second long.
  const stage = toneStage(el, ctx, { seconds: 6 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 16);
  view.layout(16, 4);
  let cur = LOOPS[0]!;

  return stage.run({
    build: () => {
      const synth = blip();
      const part = phrasePart(stage, synth, view).start(0);
      follow(stage, Tone.getTransport(), (beat) => {
        view.head(Math.min(beat, 15.99));
        caption.textContent = posText(beat);
      });
      return { synth, part };
    },
    play: (_, time) => {
      const t = Tone.getTransport();
      const l = cur;
      t.bpm.value = 240;
      if (l.bars) t.setLoopPoints(`${l.bars[0]}m`, `${l.bars[1]}m`);
      t.loop = l.bars !== null;
      stage.show(time, () => view.region(l.bars ? l.bars[0] * 4 : 0, l.bars ? l.bars[1] * 4 : null));
      t.start(time);
      return (end) => t.stop(end);
    },
    variants: LOOPS.map((l) => ({ label: l.label, apply: () => void (cur = l) })),
    controls: (_, bar) => {
      const t = Tone.getTransport();
      const bars = ['1', '2', '3', '4'];
      let from = 1;
      let to = 3;
      const apply = (): void => {
        t.setLoopPoints(`${from}m`, `${Math.max(to, from + 1)}m`);
        view.region(from * 4, Math.max(to, from + 1) * 4);
      };
      checkbox(bar, 'loop', false, (on) => {
        t.loop = on;
        if (on) apply();
        else view.region(0, null);
      });
      select(bar, 'from bar', bars, (v) => ((from = Number(v) - 1), apply()), '2');
      select(bar, 'to end of bar', bars, (v) => ((to = Number(v)), apply()), '3');
    },
    dispose: ({ synth, part }) => {
      part.dispose();
      synth.dispose();
    },
  });
};

export default mount;
