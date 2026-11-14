// Transport.schedule: sounds that fire whenever the Transport reaches a bar:beat position
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { beatOf, drums, follow, hatAt, kickAt, lane, pingAt, posText } from '../../shared/transport-kit.ts';
import { bigLabel, flash } from '../../shared/widgets.ts';

type Spot = { at: string; row: number; label: string; play: (d: ReturnType<typeof drums>, time: number) => unknown };
const SPOTS: Spot[] = [
  { at: '0:0', row: 0, label: 'kick', play: kickAt },
  { at: '0:2', row: 1, label: 'hat', play: hatAt },
  { at: '1:0', row: 0, label: 'kick', play: kickAt },
  { at: '1:1:2', row: 2, label: 'C5', play: (d, t) => pingAt(d, 'C5', t) },
  { at: '1:3', row: 2, label: 'G5', play: (d, t) => pingAt(d, 'G5', t) },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const readout = bigLabel(stage.visual, '0:0:0');
  const view = lane(stage.visual, 3, 8);
  view.layout(8, 4);
  const marks = SPOTS.map((s) => view.mark(beatOf(s.at), s.at, s.row));
  let bpm = 120;

  return stage.run({
    build: () => {
      const d = drums();
      const t = Tone.getTransport();
      // Each call returns an id; the callback gets the exact time to play at.
      SPOTS.forEach((s, i) =>
        t.schedule((time) => {
          s.play(d, time);
          stage.show(time, () => flash(marks[i]!, 0.4, '#ffb454'));
        }, s.at),
      );
      follow(stage, t, (beat) => {
        view.head(beat);
        readout.textContent = posText(beat);
      });
      return d;
    },
    play: (_, time) => {
      const t = Tone.getTransport();
      t.bpm.value = bpm;
      t.setLoopPoints(0, '2m');
      t.loop = true;
      t.start(time);
      return (end) => t.stop(end);
    },
    variants: [120, 180].map((v) => ({ label: `${v} BPM`, apply: () => void (bpm = v) })),
    controls: (_, bar) =>
      slider(bar, 'tempo', 60, 240, 1, 120, (v) => (Tone.getTransport().bpm.value = v), (v) => `${v} BPM`),
  });
};

export default mount;
