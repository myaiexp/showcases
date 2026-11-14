// Tone.Part from objects: each event carries its own note and velocity
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { flash } from '../../shared/widgets.ts';

interface Note {
  time: string;
  note: string;
  velocity: number;
}
const EVENTS: Note[] = [
  { time: '0:0', note: 'C3', velocity: 1 },
  { time: '0:0:2', note: 'C4', velocity: 0.3 },
  { time: '0:1', note: 'E4', velocity: 0.6 },
  { time: '0:1:2', note: 'C4', velocity: 0.3 },
  { time: '0:2', note: 'G3', velocity: 0.9 },
  { time: '0:2:2', note: 'C4', velocity: 0.3 },
  { time: '0:3', note: 'E4', velocity: 0.6 },
  { time: '0:3:2', note: 'C4', velocity: 0.3 },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;align-items:flex-end;gap:6px;flex:1 1 auto;min-height:60px;width:100%';
  const bars = EVENTS.map((e) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'flex:1 1 0;height:100%;display:flex;align-items:flex-end;border:1px solid var(--border);border-radius:4px;background:var(--bg-surface)';
    const fill = document.createElement('div');
    fill.style.cssText = `width:100%;border-radius:3px;background:#4a5678;height:${e.velocity * 100}%`;
    fill.title = `${e.note} velocity ${e.velocity}`;
    cell.append(fill);
    row.append(cell);
    return fill;
  });
  stage.visual.append(row);
  let written = true;

  return stage.run({
    build: () => {
      const synth = blip(-6);
      // Objects need a time; the whole object comes back as the callback's second argument.
      const part = new Tone.Part((time, value: Note) => {
        const v = written ? value.velocity : 1;
        synth.triggerAttackRelease(value.note, '16n', time, v);
        const i = EVENTS.findIndex((e) => e.time === value.time);
        stage.show(time, () => flash(bars[i]!, 0.3, v > 0.7 ? '#ffb454' : '#7aa2ff'));
      }, EVENTS);
      part.set({ loop: true, loopEnd: '1m' });
      part.start(0);
      return { synth, part };
    },
    play: (_, time) => {
      const w = written;
      stage.show(time, () => bars.forEach((b, i) => (b.style.height = `${(w ? EVENTS[i]!.velocity : 1) * 100}%`)));
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: [true, false].map((w) => ({ label: w ? 'velocity from the objects' : 'every velocity 1', apply: () => void (written = w) })),
    controls: (_, bar) => checkbox(bar, 'use each object\'s velocity', true, (v) => (written = v)),
  });
};

export default mount;
