// Transport.clear: cancel a scheduled repeat by its id, then bring it back on the beat
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { drums, hatAt, kickAt, pingAt } from '../../shared/transport-kit.ts';
import { bigLabel, pads } from '../../shared/widgets.ts';

const PARTS = [
  { label: 'kick\nevery 4n', every: '4n' },
  { label: 'hat\nevery 8n', every: '8n' },
  { label: 'ping\nevery 2n', every: '2n' },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const note = bigLabel(stage.visual, '');
  const lights = pads(stage.visual, PARTS.map((p) => p.label));
  lights.pads.forEach((p) => (p.style.whiteSpace = 'pre'));
  const ids: number[] = [];

  const sound = (d: ReturnType<typeof drums>, i: number, time: number): void => {
    if (i === 0) kickAt(d, time);
    else if (i === 1) hatAt(d, time);
    else pingAt(d, 'C6', time);
    stage.show(time, () => lights.hit(i, 0.2));
  };
  // Each scheduleRepeat hands back an id: that is what clear() takes.
  const add = (d: ReturnType<typeof drums>, i: number, start?: string): void => {
    ids[i] = Tone.getTransport().scheduleRepeat((time) => sound(d, i, time), PARTS[i]!.every, start);
  };

  return stage.run({
    build: () => drums(),
    play: (d, time) => {
      const t = Tone.getTransport();
      PARTS.forEach((_, i) => add(d, i, '0'));
      stage.show(time, () => (note.textContent = ''));
      if (stage.preview) {
        // The card plays its own script: clear the hat id at the start of bar 2.
        t.schedule((at) => {
          t.clear(ids[1]!);
          stage.show(at, () => (note.textContent = 'hat cleared at bar 2'));
        }, '1:0');
      }
      t.start(time);
      return (end) => t.stop(end);
    },
    // The returned stop function runs at once in a card, so clearing waits for the full view's Stop.
    stop: () => {
      for (const id of ids.splice(0)) Tone.getTransport().clear(id);
    },
    controls: (d, bar) => {
      PARTS.forEach((p, i) =>
        checkbox(bar, p.label.replace('\n', ' '), true, (on) => {
          const t = Tone.getTransport();
          if (!on) return void t.clear(ids[i]!);
          // Restart on the next grid line so the part comes back in time.
          const next = Math.round(t.getTicksAtTime(t.nextSubdivision(p.every)));
          add(d, i, t.state === 'started' ? `${next}i` : '0');
        }),
      );
    },
  });
};

export default mount;
