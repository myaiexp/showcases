// Two rows of icon buttons: tips announced as a label (labelledby) or a description
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const ICONS = [
  { icon: '✂', label: 'Cut' },
  { icon: '⧉', label: 'Copy' },
  { icon: '⌫', label: 'Delete' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover or Tab to the icons in each row.' });

  const buttons: HTMLButtonElement[] = [];
  const makeRow = (title: string, content: 'labelledby' | 'describedby'): void => {
    const row = document.createElement('div');
    row.className = 'row';
    const name = document.createElement('span');
    name.className = 'row-title';
    name.textContent = title;
    row.append(name);
    for (const { icon, label } of ICONS) {
      const b = document.createElement('button');
      b.className = 'btn icon';
      b.textContent = icon;
      row.append(b);
      buttons.push(b);
      // `aria.content` chooses how the reference points at the tip.
      stage.own(
        tippy(b, { content: label, placement: 'right', aria: { content }, appendTo: stage.root }),
      );
    }
    stage.root.append(row);
  };
  makeRow('As label', 'labelledby');
  makeRow('As description', 'describedby');

  const panel = document.createElement('div');
  panel.className = 'panel';
  const attrLine = document.createElement('div');
  const roleLine = document.createElement('div');
  const speech = document.createElement('div');
  speech.className = 'speech';
  panel.append(attrLine, roleLine, speech);
  stage.root.append(panel);

  const render = (b: HTMLElement): void => {
    const labelled = b.getAttribute('aria-labelledby');
    const described = b.getAttribute('aria-describedby');
    const id = labelled ?? described;
    const box = id ? document.getElementById(id)?.querySelector('.tippy-box') : null;
    attrLine.textContent = labelled
      ? `aria-labelledby="${labelled}"`
      : described
        ? `aria-describedby="${described}"`
        : 'tip closed: no aria attribute';
    roleLine.textContent = box ? `tip role="${box.getAttribute('role')}"` : 'tip role: shown while open';
    const text = box?.textContent ?? '';
    speech.textContent = labelled
      ? `Reads: "${text}, button"`
      : described
        ? `Reads: "button" then "${text}"`
        : 'Reads: "button"';
  };
  render(buttons[0]!);
  const watcher = new MutationObserver((records) => render(records[records.length - 1]!.target as HTMLElement));
  for (const b of buttons) watcher.observe(b, { attributes: true, attributeFilter: ['aria-labelledby', 'aria-describedby'] });
  stage.onDispose(() => watcher.disconnect());

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(buttons[1]!, 700);
      await wait(1500);
      stage.ghost.leave();
      await wait(300);
      await stage.ghost.hover(buttons[4]!, 700);
      await wait(1500);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 220, y: 175 }, 500);
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;
