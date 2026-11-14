// Ad viewability: inView's amount and margin options, with the detection zone drawn around the scroll window
import { delay, inView, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const AMOUNTS = ['some', 'all', '0.5'] as const;
type Amount = (typeof AMOUNTS)[number];

const mount: Mount = (el, { preview }) => {
  el.innerHTML = '<p class="label"></p><div class="stage"><div class="zone"></div><div class="view"></div></div>';
  const stage = el.querySelector<HTMLElement>('.stage')!;
  stage.classList.toggle('full', !preview);
  const view = el.querySelector<HTMLElement>('.view')!;
  const zone = el.querySelector<HTMLElement>('.zone')!;
  const label = el.querySelector<HTMLElement>('.label')!;
  for (let i = 1; i <= 8; i++) {
    const ad = document.createElement('div');
    ad.className = 'ad';
    ad.textContent = `Ad slot ${i}: out`;
    view.append(ad);
  }
  const pad = preview ? 24 : 40;
  let amount: Amount = 'some';
  let margin = 0;
  let stop: VoidFunction = () => {};
  const cleanups: VoidFunction[] = [];

  const scope = scopeMotion(el, ({ bind }) => {
    const arm = bind((): void => {
      stop();
      view.querySelectorAll('.ad').forEach((a, i) => { a.classList.remove('in'); a.textContent = `Ad slot ${i + 1}: out`; });
      // Positive margin grows the detection zone past the window, negative pulls it in.
      zone.style.inset = `${pad - margin}px`;
      label.textContent = `amount: ${amount}   margin: ${margin}px`;
      stop = inView('.ad', bind((ad: Element) => {
        ad.classList.add('in');
        ad.textContent = `${ad.textContent!.split(':')[0]}: IN VIEW`;
        return () => {
          ad.classList.remove('in');
          ad.textContent = `${ad.textContent!.split(':')[0]}: out`;
        };
      }), { root: view, amount: amount === '0.5' ? 0.5 : amount, margin: `${margin}px` });
    });
    arm();

    if (preview) {
      autoScroll(view, { duration: 6 });
      // The card cycles through the options by itself.
      const steps: Array<[Amount, number]> = [['some', 0], ['all', 0], ['0.5', 0], ['some', 20]];
      let n = 0;
      const next = (): void => {
        [amount, margin] = steps[++n % steps.length]!;
        arm();
        delay(next, 3);
      };
      delay(next, 3);
    } else {
      hint(el, 'Scroll the window. The dashed line is the detection zone: a slot counts as seen once the chosen amount of it is inside. Positive margin counts slots before they appear.');
      const p = panel(el);
      p.select('amount', AMOUNTS, amount, (v) => { amount = v; arm(); });
      p.slider('margin px', { min: -40, max: 40, step: 10, value: 0 }, (v) => { margin = v; arm(); });
      cleanups.push(() => p.dispose());
    }
  });
  return () => { scope.cancel(); stop(); cleanups.forEach((c) => c()); };
};

export default mount;
