// Unlock sound: the context state before and after Tone.start(), then a chime
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3, playLabel: 'Play chime' });
  const label = bigLabel(stage.visual, 'context: suspended');

  return stage.run({
    build: () => new Tone.Synth({ oscillator: { type: 'sine' } }).toDestination(),

    play: (synth, time) => {
      ['E5', 'C5'].forEach((n, i) => synth.triggerAttackRelease(n, '8n', time + 1.2 + i * 0.25));
      // The card acts out a visit: silent and suspended, a click, then sound.
      if (!stage.preview) return;
      stage.show(time, () => (label.textContent = 'context: suspended\n(no sound possible)'));
      stage.show(time + 1, () => (label.textContent = 'click → Tone.start()\ncontext: running'));
    },

    controls: (_, bar) => {
      // The real state of this page's context, read every half second.
      const show = (): void => {
        label.textContent = `Tone.getContext().state\n"${Tone.getContext().state}"`;
      };
      show();
      const timer = window.setInterval(show, 500);
      stage.signal.addEventListener('abort', () => clearInterval(timer));
      button(bar, 'await Tone.start()', async () => {
        await Tone.start();
        show();
      });
    },
  });
};

export default mount;
