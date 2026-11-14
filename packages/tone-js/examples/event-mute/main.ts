// Event mute: silence a Loop without stopping it, so it stays in step when it returns
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, hatAt, kickAt, pingAt } from '../../shared/transport-kit.ts';
import { pads } from '../../shared/widgets.ts';

const PARTS = ['kick', 'hat', 'ping'];
const CASES = [
  { label: 'all playing', muted: [] as number[] },
  { label: 'kick muted', muted: [0] },
  { label: 'hat + ping muted', muted: [1, 2] },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const lights = pads(stage.visual, PARTS.map((p) => `${p}\nplaying`));
  lights.pads.forEach((p) => (p.style.whiteSpace = 'pre'));
  const paint = (muted: readonly number[]): void =>
    lights.pads.forEach((p, i) => {
      const off = muted.includes(i);
      p.style.opacity = off ? '0.35' : '1';
      p.textContent = `${PARTS[i]}\n${off ? 'muted' : 'playing'}`;
    });
  let muted: number[] = [];

  return stage.run({
    build: () => {
      const d = drums();
      const loops = [
        new Tone.Loop((time) => {
          kickAt(d, time);
          stage.show(time, () => lights.hit(0, 0.2));
        }, '4n'),
        new Tone.Loop((time) => {
          hatAt(d, time);
          stage.show(time, () => lights.hit(1, 0.15));
        }, '8n'),
        new Tone.Loop((time) => {
          pingAt(d, 'G5', time);
          stage.show(time, () => lights.hit(2, 0.3));
        }, '2n'),
      ];
      return { d, loops };
    },
    play: ({ loops }, time) => {
      const m = muted.slice();
      loops.forEach((l, i) => {
        l.mute = m.includes(i);
        l.start(0);
      });
      stage.show(time, () => paint(m));
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: CASES.map((c) => ({ label: c.label, apply: () => void (muted = c.muted) })),
    controls: ({ loops }, bar) =>
      PARTS.forEach((p, i) =>
        checkbox(bar, `mute ${p}`, false, (on) => {
          loops[i]!.mute = on;
          muted = on ? [...muted, i] : muted.filter((x) => x !== i);
          paint(muted);
        }),
      ),
    dispose: ({ d, loops }) => {
      for (const l of loops) l.dispose();
      for (const n of Object.values(d)) n.dispose();
    },
  });
};

export default mount;
