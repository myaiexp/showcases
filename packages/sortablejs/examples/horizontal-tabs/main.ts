// A browser-style tab strip you reorder by dragging tabs left and right
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const TABS: [string, string][] = [
  ['Inbox', 'var(--blue)'],
  ['Calendar', 'var(--green)'],
  ['Docs', 'var(--orange)'],
  ['Maps', 'var(--accent)'],
  ['Music', 'var(--red)'],
];

const mount: Mount = (el, { preview, signal }) => {
  const strip = document.createElement('div');
  strip.className = 'strip';
  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  for (const [name, color] of preview ? TABS.slice(0, 3) : TABS) {
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.style.setProperty('--tone', color);
    tab.textContent = name;
    tabs.append(tab);
  }
  const plus = document.createElement('div');
  plus.className = 'plus';
  plus.textContent = '+';
  strip.append(tabs, plus);

  const page = document.createElement('div');
  page.className = 'page';
  const open = (tab: Element): void => {
    for (const t of tabs.children) t.classList.toggle('active', t === tab);
    page.textContent = `${tab.textContent} is open`;
  };
  open(tabs.firstElementChild!);
  tabs.addEventListener('click', (e) => {
    const tab = (e.target as Element).closest('.tab');
    if (tab) open(tab);
  });
  el.append(strip, page);

  // The tabs sit in a row, so say so: the swap test then uses left and right edges instead of top and bottom.
  const sortable = Sortable.create(tabs, {
    direction: 'horizontal',
    animation: 150,
    ghostClass: 'ghost',
  });

  if (preview) {
    // Move the first tab to the far end of the strip, one position at a time.
    loopDrive(el, signal, async (hand) => {
      await hand.drag(tabs.firstElementChild!, { el: tabs.lastElementChild!, fx: 0.7 }, 1.1);
    });
  }

  return () => release(sortable);
};

export default mount;
