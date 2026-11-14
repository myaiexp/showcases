// Tone.Pattern: one list of notes walked in a classic arpeggiator order, with the order traced
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { playable } from '../../shared/instrument-phrase.ts';
import { toneStage } from '../../shared/stage.ts';
import { blip } from '../../shared/time-kit.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

type Name = Tone.Pattern<string>['pattern'];
const VALUES = ['C4', 'D4', 'E4', 'G4', 'A4', 'C5'];
const CARD: Name[] = ['up', 'down', 'upDown', 'downUp'];
const ALL: Name[] = ['up', 'down', 'upDown', 'downUp', 'alternateUp', 'alternateDown', 'random', 'randomOnce', 'randomWalk'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 4 });
  const caption = bigLabel(stage.visual, '');
  const trace = bigLabel(stage.visual, '');
  trace.style.fontSize = '14px';
  const keys = keyboard(stage.visual, 'C4', 'C5');
  let name: Name = 'up';
  let order: number[] = [];

  return stage.run({
    build: () => {
      const synth = blip();
      const pattern = new Tone.Pattern(
        (time, note) => {
          synth.triggerAttackRelease(note!, '16n', time);
          const i = VALUES.indexOf(note!);
          stage.show(time, () => {
            keys.press(note!, 0.25);
            order.push(i + 1);
            trace.textContent = order.slice(-14).join(' ');
          });
        },
        VALUES,
        'up',
      );
      pattern.interval = '8n';
      pattern.start(0);
      return { synth, pattern };
    },
    play: ({ pattern }, time) => {
      const n = name;
      pattern.pattern = n;
      stage.show(time, () => {
        order = [];
        trace.textContent = '';
        caption.textContent = `"${n}"`;
      });
      Tone.getTransport().start(time);
      return (end) => Tone.getTransport().stop(end);
    },
    variants: CARD.map((n) => ({ label: n, apply: () => void (name = n) })),
    controls: ({ pattern, synth }, bar) => {
      playable(keys, synth);
      select(bar, 'pattern', ALL, (n) => {
        name = n;
        pattern.pattern = n;
        caption.textContent = `"${n}"`;
      }, 'up');
    },
    dispose: ({ synth, pattern }) => {
      pattern.dispose();
      synth.dispose();
    },
  });
};

export default mount;
