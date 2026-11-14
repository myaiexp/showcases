// A page theme switch that also calls setProps({ theme }) on every existing tip
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const TOOLS = [
  { label: 'Home', tip: 'Back to the start' },
  { label: 'Inbox', tip: '3 unread messages' },
  { label: 'Settings', tip: 'Account and privacy' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover a button, flip the switch, hover again.' });
  stage.root.classList.add('light');

  const bar = document.createElement('div');
  bar.className = 'topbar';
  const nav = TOOLS.map((t) => {
    const b = document.createElement('button');
    b.className = 'tool';
    b.textContent = t.label;
    bar.append(b);
    return b;
  });
  const toggle = document.createElement('button');
  toggle.className = 'toggle';
  toggle.setAttribute('role', 'switch');
  toggle.setAttribute('aria-checked', 'false');
  toggle.textContent = stage.preview ? 'Dark' : 'Dark mode';
  bar.append(toggle);
  const body = document.createElement('p');
  body.className = 'body';
  body.textContent = 'The page and its tips should agree on how bright they are.';
  stage.root.append(bar, body);

  const base = { placement: 'bottom' as const, appendTo: stage.root };
  // A tip that sits on a light page is dark, and the other way round: the two named themes are in style.css.
  const tips: Instance[] = nav.map((b, i) => tippy(b, { ...base, content: TOOLS[i]!.tip, theme: 'on-light' }));
  const toggleTip = tippy(toggle, { ...base, content: 'Switch to dark mode', theme: 'on-light', placement: 'bottom-end' });
  stage.own([...tips, toggleTip]);

  const setDark = (dark: boolean): void => {
    stage.root.classList.toggle('dark', dark);
    stage.root.classList.toggle('light', !dark);
    toggle.setAttribute('aria-checked', String(dark));
    // Editing a data-tippy-theme attribute would not reach a tip that exists: setProps does.
    for (const t of tips) t.setProps({ theme: dark ? 'on-dark' : 'on-light' });
    toggleTip.setProps({ theme: dark ? 'on-dark' : 'on-light' });
    toggleTip.setContent(dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  toggle.addEventListener('click', () => setDark(!stage.root.classList.contains('dark')));

  if (stage.preview) {
    stage.play(async (wait) => {
      setDark(false);
      await stage.ghost.hover(nav[1]!, 800);
      await wait(1100);
      stage.ghost.leave();
      await stage.ghost.click(toggle, 700);
      await wait(300);
      await stage.ghost.hover(nav[1]!, 700);
      await wait(1200);
      stage.ghost.leave();
      await stage.ghost.click(toggle, 700);
      await wait(500);
      stage.ghost.leave();
    });
  }

  return stage.dispose;
};

export default mount;
