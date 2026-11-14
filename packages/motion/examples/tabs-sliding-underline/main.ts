// Tabs: the underline is removed from one tab and added to another with the same data-layout-id
import { animateLayout, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const TABS = [['Account', 'Name, email and password.'], ['Billing', 'Plan, invoices and cards.'], ['Team', 'Invite people and set roles.'], ['Alerts', 'Choose what we email you.']] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="tabs">
      <ul class="bar">${TABS.map(([t]) => `<li><button class="tab" data-tab="${t}">${t}</button></li>`).join('')}</ul>
      <p class="body"></p>
    </div>`;
  if (!preview) hint(el, 'Click a tab. The underline is a single element that is deleted and re-created under the new tab; the shared data-layout-id makes it slide.');
  const buttons = [...el.querySelectorAll<HTMLButtonElement>('.tab')];
  const body = el.querySelector('.body') as HTMLElement;
  let current = -1;
  let spring = true;

  const select = (i: number): void => {
    if (i === current) return;
    current = i;
    // The old underline leaves and a new one arrives under the chosen tab, in one update.
    const update = (): void => {
      el.querySelector('[data-layout-id="tabs-underline"]')?.remove();
      const line = document.createElement('div');
      line.setAttribute('data-layout-id', 'tabs-underline');
      line.className = 'underline';
      buttons[i]!.parentElement!.append(line);
      buttons.forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
      body.textContent = TABS[i]![1];
    };
    if (el.querySelector('.underline')) animateLayout(el, update, spring ? { type: 'spring', visualDuration: 0.4, bounce: 0.25 } : { duration: 0.3 });
    else update();
  };

  const scope = scopeMotion(el, () => {
    select(0);
    if (preview) {
      let n = 0;
      const tick = (): void => {
        select(++n % TABS.length);
        delay(tick, 1.1);
      };
      delay(tick, 1);
      return;
    }
    buttons.forEach((b, i) => b.addEventListener('click', () => scope.run(() => select(i))));
  });

  if (preview) return () => scope.cancel();
  const p = panel(el);
  p.toggle('Spring', true, (v) => { spring = v; });
  return () => {
    scope.cancel();
    p.dispose();
  };
};

export default mount;
