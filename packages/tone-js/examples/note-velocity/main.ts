// Velocity: the third triggerAttack argument says how hard a note is struck
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

const ORDERS: [string, number[]][] = [
  ['soft to loud', [0.15, 0.35, 0.55, 0.8, 1]],
  ['loud to soft', [1, 0.8, 0.55, 0.35, 0.15]],
  ['accents', [1, 0.3, 0.3, 1, 0.3]],
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3 });
  const row = pads(stage.visual, ['', '', '', '', '']);
  const label = bigLabel(stage.visual);
  let order = ORDERS[0]![1];
  const paint = (): void =>
    row.pads.forEach((p, i) => {
      p.textContent = String(order[i]);
      p.style.alignItems = 'flex-end';
      p.style.paddingBottom = '0';
      p.style.boxShadow = `inset 0 -${Math.round(order[i]! * 60)}px 0 rgba(122,162,255,0.35)`;
    });
  paint();

  return stage.run({
    build: () => new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination(),

    play: (synth, time) => {
      const velocities = order;
      stage.show(time, () => {
        order = velocities;
        paint();
      });
      velocities.forEach((v, i) => {
        const at = time + i * 0.55;
        synth.triggerAttackRelease('E4', 0.4, at, v);
        stage.show(at, () => {
          row.hit(i, 0.4);
          label.textContent = `triggerAttackRelease('E4', 0.4, time, ${v})`;
        });
      });
    },

    variants: ORDERS.map(([name, v]) => ({ label: name, apply: () => (order = v) })),

    controls: (synth) => {
      row.onHit(async (i) => {
        await Tone.start();
        synth.triggerAttackRelease('E4', 0.4, undefined, order[i]!);
      });
    },
  });
};

export default mount;
