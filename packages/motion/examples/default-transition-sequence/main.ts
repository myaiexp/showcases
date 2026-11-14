// One list sequence replayed with different defaultTransition presets: snappy, smooth or springy
import { animate, delay, scopeMotion } from 'motion';
import type { AnimationSequence, Transition } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const PRESETS: Record<string, Transition> = {
  snappy: { duration: 0.2, ease: 'easeOut' },
  smooth: { duration: 0.6, ease: 'easeInOut' },
  springy: { type: 'spring', bounce: 0.55, visualDuration: 0.5 },
};
const NAMES = Object.keys(PRESETS);
const ROWS = ['Inbox', 'Drafts', 'Sent', 'Archive'];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="mail">
      <div class="label"></div>
      <ul>${ROWS.map((r) => `<li>${r}</li>`).join('')}</ul>
    </div>`;
  const label = el.querySelector<HTMLElement>('.label')!;

  const scope = scopeMotion(el, (s) => {
    let timeline: ReturnType<typeof animate> | undefined;
    const play = (name: string): void => {
      timeline?.cancel();
      label.textContent = `defaultTransition: ${JSON.stringify(PRESETS[name] ?? {}).replaceAll('"', '')}`;
      // The segments set no transition of their own, so they all take defaultTransition.
      timeline = animate(
        ROWS.map((_, i): AnimationSequence[number] => [`li:nth-child(${i + 1})`, { opacity: [0, 1], y: [-30, 0] }, { at: i * 0.12 }]),
        { defaultTransition: PRESETS[name] ?? {} },
      );
    };

    if (preview) {
      let i = 0;
      const cycle = (): void => {
        play(NAMES[i++ % NAMES.length] ?? 'snappy');
        delay(cycle, 2.4);
      };
      cycle();
      return;
    }
    let current = 'springy';
    const p = panel(el);
    p.select('defaultTransition', NAMES, 'springy', (v) => s.run(() => play((current = v))));
    p.button('Replay', () => s.run(() => play(current)));
    hint(el, 'The four rows are the same segments each time. Only the one defaultTransition object changes, and with it the feel of the whole list.');
    play(current);
    return () => p.dispose();
  });
  return () => scope.cancel();
};

export default mount;
