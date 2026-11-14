// Abbreviations made focusable with tabindex so keyboard users get their tips too
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const TERMS = [
  { word: 'WCAG', tip: 'Web Content Accessibility Guidelines', tag: 'abbr' },
  { word: 'ARIA', tip: 'Accessible Rich Internet Applications', tag: 'span' },
  { word: 'CSS', tip: 'Cascading Style Sheets', tag: 'abbr' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover a dotted word, or press Tab to step through them.' });

  const para = document.createElement('p');
  para.className = 'para';
  const how = document.createElement('div');
  how.className = 'how';
  how.textContent = 'Opened by: nothing yet';
  const terms: HTMLElement[] = [];
  para.append('Our forms follow ');
  TERMS.forEach(({ word, tip, tag }, i) => {
    const term = document.createElement(tag);
    term.className = 'term';
    // Neither <abbr> nor <span> can take focus by default: tabindex="0" lets Tab reach them.
    term.tabIndex = 0;
    term.textContent = word;
    terms.push(term);
    para.append(term, i === 0 ? ', label inputs with ' : i === 1 ? ' and keep styles in ' : ' files.');
    stage.own(
      tippy(term, {
        content: tip,
        maxWidth: 160,
        placement: 'bottom',
        appendTo: stage.root,
        onTrigger(_instance, event) {
          how.textContent = `Opened by: ${event.type === 'focus' ? 'keyboard focus' : 'mouse hover'}`;
        },
      }),
    );
  });
  stage.root.append(para, how);

  if (stage.preview) {
    // Card: the focus ring is drawn with a class, since the ghost sends events but does not focus.
    stage.play(async (wait) => {
      for (const term of terms.slice(0, 2)) {
        term.classList.add('ring');
        stage.ghost.focus(term);
        await wait(1500);
        stage.ghost.blur(term);
        term.classList.remove('ring');
        await wait(350);
      }
      await stage.ghost.hover(terms[2]!, 700);
      await wait(1300);
      stage.ghost.leave();
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
