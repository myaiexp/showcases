// A notification card whose icon and text overlap the card's slide-in, steered by each segment's `at`
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

type At = number | string | undefined;
const CHOICES = ['none (after previous)', '0.2', '+0.5', '-0.2', '<', '<+0.3'] as const;
const toAt = (c: string): At => (c.startsWith('none') ? undefined : c === '0.2' ? 0.2 : c);

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="toast">
      <div class="icon"></div>
      <div class="text"><b>Payment received</b><span>Ana sent you $24.00</span></div>
    </div>`;
  const code = document.createElement('code');
  code.className = 'at-code';
  if (!preview) el.append(code);

  const scope = scopeMotion(el, (s) => {
    let timeline: ReturnType<typeof animate> | undefined;
    // Rebuilds the sequence with a new `at` on the text segment, then plays it.
    const play = (choice: string): void => {
      timeline?.cancel();
      const at = toAt(choice);
      const text = at === undefined ? {} : { at };
      timeline = animate([
        ['.toast', { opacity: [0, 1], y: [-30, 0] }, { duration: 0.6 }],
        ['.icon', { scale: [0, 1] }, { type: 'spring', bounce: 0.5, visualDuration: 0.4, at: '-0.2' }],
        ['.text', { opacity: [0, 1], x: [-12, 0] }, { duration: 0.4, ...text }],
      ]);
      code.textContent = `['.text', { opacity: [0, 1] }, { at: ${JSON.stringify(at) ?? 'unset'} }]   total ${timeline.duration.toFixed(1)}s`;
    };

    if (preview) {
      let i = 0;
      const cycle = (): void => {
        play(['-0.2', '<', '+0.5'][i++ % 3] ?? '<');
        delay(cycle, 2.6);
      };
      cycle();
      return;
    }
    let choice = '-0.2';
    const p = panel(el);
    p.select('Text segment at', CHOICES, '-0.2', (v) => s.run(() => play((choice = v))));
    p.button('Replay', () => s.run(() => play(choice)));
    hint(el, 'The card, icon and text are three segments. Change when the text starts: a number is a clock time, "+" and "-" are relative to the previous end, "<" is the previous start.');
    play('-0.2');
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
