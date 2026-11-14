// A live panel showing the aria attribute Tippy puts on a button and what it would announce
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const NAME = 'Save draft';
const TIP = 'Saved on this device only';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover or Tab to the button and watch the panel.' });

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = NAME;
  const panel = document.createElement('div');
  panel.className = 'panel';
  const attrLine = document.createElement('div');
  const tipLine = document.createElement('div');
  const speech = document.createElement('div');
  speech.className = 'speech';
  panel.append(attrLine, tipLine, speech);
  stage.root.append(button, panel);

  const instance = stage.own(
    tippy(button, { content: TIP, placement: 'right', maxWidth: 150, appendTo: stage.root }),
  );

  // Redraw the panel from the button's real attributes whenever Tippy changes them.
  const render = (): void => {
    const describedby = button.getAttribute('aria-describedby');
    const labelledby = button.getAttribute('aria-labelledby');
    const id = describedby ?? labelledby;
    const text = id ? (document.getElementById(id)?.textContent ?? '') : '';
    attrLine.textContent = describedby
      ? `aria-describedby="${describedby}"`
      : labelledby
        ? `aria-labelledby="${labelledby}"`
        : 'no aria attribute (tip closed)';
    tipLine.textContent = text ? `points at: "${text}"` : 'points at: nothing';
    speech.textContent = labelledby
      ? `Reads: "${text}, button"`
      : `Reads: "${NAME}, button${text ? `, ${text}` : ''}"`;
  };
  render();
  const watcher = new MutationObserver(render);
  watcher.observe(button, { attributes: true, attributeFilter: ['aria-describedby', 'aria-labelledby'] });
  stage.onDispose(() => watcher.disconnect());

  if (stage.bar) {
    select(stage.bar, 'Announce the tip as', ['a description', 'a label', 'nothing'] as const, (v) => {
      instance.hide();
      instance.setProps({
        aria: { content: v === 'a description' ? 'describedby' : v === 'a label' ? 'labelledby' : null },
      });
    });
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.hover(button, 800);
      await wait(2000);
      stage.ghost.leave();
      await stage.ghost.moveTo({ x: 200, y: 110 }, 600);
      await wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
