// Send and receive: channels send to a named bus that feeds one Reverb
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { band, PARTS, type Band } from '../../shared/band-kit.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  band: Band;
  channels: Tone.Channel[];
  sends: Tone.Gain<'decibels'>[];
  bus: Tone.Channel;
  reverb: Tone.Reverb;
}

const NODES = [
  { id: 'c0', label: 'bass channel', x: 52, y: 22, w: 84 },
  { id: 'c1', label: 'keys channel', x: 52, y: 60, w: 84 },
  { id: 'c2', label: 'lead channel', x: 52, y: 98, w: 84 },
  { id: 'bus', label: 'bus "verb"', x: 200, y: 60, w: 72 },
  { id: 'rev', label: 'Reverb', x: 290, y: 60, w: 56 },
  { id: 'out', label: 'out', x: 363, y: 60, w: 36 },
];
const EDGES = [
  { id: 's0', from: 'c0', to: 'bus' },
  { id: 's1', from: 'c1', to: 'bus' },
  { id: 's2', from: 'c2', to: 'bus' },
  { id: 'r', from: 'bus', to: 'rev' },
  { id: 'o', from: 'rev', to: 'out' },
];
// Bus names are page-wide and never freed, so every mount takes a fresh one.
let counter = 0;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const pic = diagram(stage.visual, NODES, EDGES);
  let send = [-60, -60, -60];
  const paint = (s: number[]): void => s.forEach((db, i) => pic.setEdge(`s${i}`, db > -50));

  return stage.run({
    build: async (): Promise<Graph> => {
      const b = band();
      const name = `showcase-verb-${++counter}-${Math.random().toString(36).slice(2)}`;
      const reverb = new Tone.Reverb({ decay: 2.5, wet: 1 }).toDestination();
      await reverb.ready;
      // The receiving channel: whatever is sent to the bus arrives here, then goes to the reverb.
      const bus = new Tone.Channel(0, 0).connect(reverb).receive(name);
      const channels = b.parts.map((p) => {
        const c = new Tone.Channel(0, 0).toDestination();
        p.connect(c);
        return c;
      });
      const sends = channels.map((c) => c.send(name, -60));
      return { band: b, channels, sends, bus, reverb };
    },
    play: (g, time) => {
      g.sends.forEach((s, i) => (s.gain.value = send[i]!));
      const now = [...send];
      stage.show(time, () => paint(now));
      g.band.start(time, 2, (part, at) => stage.show(at, () => pic.flash(`c${part}`)));
    },
    stop: (g, time) => g.band.stop(time),
    dispose: (g) => {
      g.band.dispose();
      g.sends.forEach((s) => s.dispose());
      g.channels.forEach((c) => c.dispose());
      g.bus.dispose();
      g.reverb.dispose();
    },
    variants: [
      { label: 'no sends: dry', s: [-60, -60, -60] },
      { label: 'keys sent to the reverb', s: [-60, -6, -60] },
      { label: 'all three sent to one reverb', s: [-6, -6, -6] },
    ].map(({ label, s }) => ({
      label,
      apply: () => {
        send = s;
      },
    })),
    controls: (g, box) => {
      PARTS.forEach((name, i) =>
        slider(box, `${name} send`, -60, 0, 1, -60, (v) => {
          send[i] = v;
          g.sends[i]!.gain.value = v;
          paint(send);
        }, (v) => (v <= -60 ? 'off' : `${v} dB`)),
      );
    },
  });
};

export default mount;
