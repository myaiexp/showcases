// A file-upload row whose bar, percentage and colour are driven by function segments in a sequence
import { animate, scopeMotion } from 'motion';
import type { AnimationSequence } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="upload">
      <div class="row">
        <div class="file"><b>holiday-photos.zip</b><span class="pct">0%</span></div>
        <div class="track"><i class="fill"></i></div>
        <div class="status">Uploading</div>
      </div>
    </div>`;
  const fill = el.querySelector<HTMLElement>('.fill')!;
  const pct = el.querySelector<HTMLElement>('.pct')!;
  const status = el.querySelector<HTMLElement>('.status')!;

  const scope = scopeMotion(el, (s) => {
    let timeline: ReturnType<typeof animate> | undefined;
    const play = (seconds: number): void => {
      timeline?.cancel();
      const sequence: AnimationSequence = [
        ['.row', { opacity: [0, 1], y: [10, 0] }, { duration: 0.4 }],
        // A function in place of a subject gets progress from 0 to 1 on every frame of its segment.
        [
          (progress: number) => {
            fill.style.transform = `scaleX(${progress})`;
            pct.textContent = `${Math.round(progress * 100)}%`;
          },
          { duration: seconds, ease: 'linear' },
        ],
        // With keyframes, the function receives the in-between value instead (here a colour).
        [
          (colour: string) => {
            fill.style.background = colour;
            status.style.color = colour;
            status.textContent = 'Uploaded';
          },
          ['#6366f1', '#22c55e'],
          { duration: 0.5 },
        ],
      ];
      if (preview) sequence.push(['.row', { opacity: [1, 1, 0] }, { duration: 1.2, at: '+0.2' }]);
      timeline = animate(sequence, {
        repeat: preview ? Infinity : 0,
        onRepeat: () => {
          status.textContent = 'Uploading';
        },
      });
    };
    play(preview ? 2 : 3);
    if (preview) return;

    let seconds = 3;
    const p = panel(el);
    p.slider('Upload time (s)', { min: 1, max: 8, step: 1, value: 3 }, (v) => {
      seconds = v;
    });
    p.button('Upload again', () => s.run(() => {
      status.textContent = 'Uploading';
      play(seconds);
    }));
    hint(el, 'Nothing here moves an element directly: the bar, the percentage and the colour are all plain functions that the timeline calls with a progress number or a colour.');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
