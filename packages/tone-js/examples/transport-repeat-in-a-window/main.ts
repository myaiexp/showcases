// Transport.scheduleRepeat: a ticking event with a start position and a duration
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, lane, pingAt } from '../../shared/transport-kit.ts';
import { bigLabel } from '../../shared/widgets.ts';

interface Window {
  label: string;
  duration: string | undefined;
  /** Length in beats, only for drawing the window. */
  beats: number | null;
}
const WINDOWS: Window[] = [
  { label: 'duration 1m', duration: '1m', beats: 4 },
  { label: 'duration 2n', duration: '2n', beats: 2 },
  { label: 'no duration', duration: undefined, beats: null },
];
const START = 2;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const view = lane(stage.visual, 1, 8);
  view.layout(8, 4);
  let cur = WINDOWS[0]!;
  const ids: number[] = [];

  return stage.run({
    build: () => drums(),
    play: (d, time) => {
      const t = Tone.getTransport();
      const w = cur;
      const ppq = t.PPQ;
      // Every eighth note from beat 2 (bar 1, beat 3), for as long as `duration` says.
      const id = t.scheduleRepeat(
        (at) => {
          pingAt(d, 'E5', at);
          const beat = t.getTicksAtTime(at) / ppq;
          stage.show(at, () => view.mark(beat, '', 0));
        },
        '8n',
        '0:2',
        w.duration,
      );
      stage.show(time, () => {
        view.clearMarks();
        view.region(START, w.beats === null ? 8 : START + w.beats);
        caption.textContent = `from 0:2 ${w.duration ? `for ${w.duration}` : 'with no end'}`;
      });
      t.start(time);
      ids.push(id);
      return (end) => t.stop(end);
    },
    stop: () => {
      for (const id of ids.splice(0)) Tone.getTransport().clear(id);
    },
    variants: WINDOWS.map((w) => ({ label: w.label, apply: () => void (cur = w) })),
    controls: (_, bar) =>
      select(bar, 'window', WINDOWS.map((w) => w.label), (l) => (cur = WINDOWS.find((w) => w.label === l) ?? cur)),
  });
};

export default mount;
