// A tour: each step is its own manual tip, with Next and Back
import tippy, { type Instance, type Placement } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { button as barButton } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const STEPS: { part: string; title: string; text: string; placement: Placement }[] = [
  { part: 'search', title: 'Search', text: 'Find anything by name.', placement: 'bottom' },
  { part: 'rail', title: 'Side rail', text: 'Jump between sections.', placement: 'right' },
  { part: 'revenue', title: 'Revenue', text: 'Your month at a glance.', placement: 'bottom' },
  { part: 'me', title: 'Your profile', text: 'Settings and sign out.', placement: 'bottom-end' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Press Next in the tip to walk through the app.' });

  const top = document.createElement('div');
  top.className = 'topbar';
  const logo = document.createElement('span');
  logo.className = 'logo';
  logo.textContent = 'Acme';
  const search = document.createElement('span');
  search.className = 'search';
  search.textContent = 'Search…';
  const me = document.createElement('span');
  me.className = 'me';
  top.append(logo, search, me);
  const rail = document.createElement('div');
  rail.className = 'rail';
  rail.append(...[1, 2, 3].map(() => document.createElement('i')));
  const cards = document.createElement('div');
  cards.className = 'cards';
  const revenue = document.createElement('div');
  revenue.className = 'panel';
  revenue.textContent = 'Revenue';
  const orders = document.createElement('div');
  orders.className = 'panel';
  orders.textContent = 'Orders';
  cards.append(revenue, orders);
  stage.root.append(top, rail, cards);

  const targets: Record<string, HTMLElement> = { search, rail, revenue, me };
  const tips: Instance[] = [];
  const nextButtons: HTMLButtonElement[] = [];
  let current = -1;

  const go = (i: number): void => {
    if (current >= 0) tips[current]!.hide();
    current = i;
    if (i >= 0 && i < tips.length) tips[i]!.show();
    else current = -1;
  };

  STEPS.forEach((s, i) => {
    const box = document.createElement('div');
    box.className = 'step';
    const title = document.createElement('strong');
    title.textContent = s.title;
    const text = document.createElement('span');
    text.textContent = s.text;
    const count = document.createElement('span');
    count.className = 'count';
    count.textContent = `Step ${i + 1} of ${STEPS.length}`;
    const buttons = document.createElement('div');
    buttons.className = 'buttons';
    const back = document.createElement('button');
    back.className = 'btn';
    back.textContent = 'Back';
    back.disabled = i === 0;
    back.addEventListener('click', () => go(i - 1));
    const next = document.createElement('button');
    next.className = 'btn btn-primary';
    next.textContent = i === STEPS.length - 1 ? 'Done' : 'Next';
    next.addEventListener('click', () => go(i + 1));
    nextButtons.push(next);
    buttons.append(back, next);
    box.append(title, text, count, buttons);

    tips.push(
      stage.own(
        tippy(targets[s.part]!, {
          content: box,
          trigger: 'manual',
          hideOnClick: false,
          interactive: true,
          placement: s.placement,
          appendTo: stage.root,
        }),
      ),
    );
  });

  if (stage.bar) barButton(stage.bar, 'Restart the tour', () => go(0));

  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(400);
      go(0);
      for (let i = 0; i < STEPS.length; i += 1) {
        await wait(900);
        await stage.ghost.click(nextButtons[i]!, 700);
      }
      await wait(700);
    });
  } else {
    go(0);
  }

  return stage.dispose;
};

export default mount;
