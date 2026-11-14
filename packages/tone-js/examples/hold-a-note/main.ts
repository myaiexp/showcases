// Hold a note: triggerAttack starts a note, triggerRelease a second later ends it
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel, keyboard } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const state = bigLabel(stage.visual, 'note off');
  const keys = keyboard(stage.visual, 'C4', 'C5');

  return stage.run({
    build: () => new Tone.Synth({ envelope: { release: 0.6 } }).toDestination(),

    // The attack starts the note now; the release, one second later, lets it fade.
    play: (synth, time) => {
      synth.triggerAttack('C4', time);
      synth.triggerRelease(time + 1);
      stage.show(time, () => {
        state.textContent = 'note on: holding C4';
        keys.press('C4', 1);
      });
      stage.show(time + 1, () => (state.textContent = 'note off: releasing'));
    },
    stop: (synth, time) => synth.triggerRelease(time),

    controls: (synth) => {
      for (const key of keys.el.children) {
        const note = (key as HTMLElement).dataset.note!;
        key.addEventListener('pointerdown', async () => {
          await Tone.start();
          synth.triggerAttack(note);
          state.textContent = `note on: holding ${note}`;
        });
        for (const type of ['pointerup', 'pointerleave'] as const) {
          key.addEventListener(type, () => {
            if (!state.textContent.startsWith('note on')) return;
            synth.triggerRelease();
            state.textContent = 'note off: releasing';
          });
        }
      }
    },
  });
};

export default mount;
