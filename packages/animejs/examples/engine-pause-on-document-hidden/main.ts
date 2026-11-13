// Wall-clock time beside engine time, with pauseOnDocumentHidden toggled so a tab switch shows the difference
import { engine, createTimer } from 'animejs';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  if (preview) el.classList.add('is-preview');
  const card = (label: string): { root: HTMLElement; value: HTMLElement } => {
    const root = document.createElement('div');
    root.className = 'card';
    const l = document.createElement('span');
    l.className = 'label';
    l.textContent = label;
    const value = document.createElement('span');
    value.className = 'value';
    value.textContent = '0';
    root.append(l, value);
    return { root, value };
  };
  const global = card('global time (ms)');
  const clock = card('engine time (ms)');
  const row = document.createElement('div');
  row.className = 'cards';
  row.append(global.root, clock.root);
  el.append(row);

  const startTime = Date.now();
  const wall = window.setInterval(() => {
    global.value.textContent = String(Date.now() - startTime);
  }, 16);
  const timer = createTimer({
    onUpdate: (self) => (clock.value.textContent = String(Math.round(self.currentTime))),
  });

  const saved = engine.pauseOnDocumentHidden;
  let toggle: HTMLButtonElement | undefined;
  const onToggle = (): void => {
    engine.pauseOnDocumentHidden = !engine.pauseOnDocumentHidden;
    if (toggle) {
      toggle.textContent = engine.pauseOnDocumentHidden ? 'pauseOnDocumentHidden: true' : 'pauseOnDocumentHidden: false';
    }
  };
  if (!preview) {
    toggle = document.createElement('button');
    toggle.className = 'btn btn-primary';
    toggle.textContent = `pauseOnDocumentHidden: ${engine.pauseOnDocumentHidden}`;
    toggle.addEventListener('click', onToggle);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Toggle the setting, switch to another tab for a few seconds, then come back and compare the two clocks.';
    el.append(toggle, hint);
  }

  return () => {
    window.clearInterval(wall);
    toggle?.removeEventListener('click', onToggle);
    timer.revert();
    engine.pauseOnDocumentHidden = saved;
  };
};

export default mount;
