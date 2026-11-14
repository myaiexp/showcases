// Select words in a paragraph and a Copy / Share bubble opens over the selection
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// The paragraph is split into runs so the card can highlight one without touching the page selection.
const RUNS = [
  'Tippy positions a box next to ',
  'anything you point it at',
  ', and keeps it on screen. Its reference can be a ',
  'rectangle you compute yourself',
  ', such as the one around some selected text.',
];
const PICKS = [1, 3];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Select a few words with the mouse.' });

  stage.root.classList.toggle('mini', stage.preview);
  const para = document.createElement('p');
  para.className = 'para';
  const spans = RUNS.map((text) => {
    const s = document.createElement('span');
    s.textContent = text;
    para.append(s);
    return s;
  });
  const status = document.createElement('div');
  status.className = 'picked';
  status.textContent = 'Nothing shared yet';
  stage.root.append(para, status);

  let rect: () => DOMRect = () => para.getBoundingClientRect();
  let chosen = '';

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  const act = (label: string, done: string): void => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'act';
    b.textContent = label;
    b.addEventListener('mousedown', (e) => e.preventDefault()); // keep the selection alive
    b.addEventListener('click', () => {
      status.textContent = `${done}: “${chosen}”`;
      if (!stage.preview && label === 'Copy') void navigator.clipboard?.writeText(chosen).catch(() => undefined);
      tip.hide();
    });
    bubble.append(b);
  };
  act('Copy', 'Copied');
  act('Share', 'Shared');

  const tip = stage.own(
    tippy(para, {
      content: bubble,
      trigger: 'manual',
      interactive: true,
      hideOnClick: false,
      placement: 'top',
      // The bubble is anchored to a computed rectangle: the selection's own.
      getReferenceClientRect: () => rect(),
      appendTo: stage.root,
    }),
  );

  if (!stage.preview) {
    const check = (): void => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !para.contains(sel.anchorNode) || !para.contains(sel.focusNode)) return;
      const range = sel.getRangeAt(0);
      chosen = sel.toString().trim();
      if (!chosen) return;
      rect = () => range.getBoundingClientRect();
      tip.show();
      void tip.popperInstance?.update();
    };
    para.addEventListener('mouseup', () => setTimeout(check));
    para.addEventListener('keyup', (e) => e.shiftKey && check());
    const onChange = (): void => {
      if (window.getSelection()?.isCollapsed) tip.hide();
    };
    document.addEventListener('selectionchange', onChange);
    stage.onDispose(() => document.removeEventListener('selectionchange', onChange));
  } else {
    // Card: highlight a run with a styled span (the page's real selection is left alone).
    let n = 0;
    stage.play(async (wait) => {
      const span = spans[PICKS[n++ % PICKS.length]!]!;
      chosen = span.textContent ?? '';
      rect = () => span.getBoundingClientRect();
      await wait(500);
      span.classList.add('lit');
      tip.show();
      void tip.popperInstance?.update();
      await wait(1900);
      tip.hide();
      span.classList.remove('lit');
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
