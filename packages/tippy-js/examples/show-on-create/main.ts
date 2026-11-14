// A dashboard header whose Export button announces itself with a tip that opens on creation
import tippy, { type Instance } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Press Export and the announcement goes away.' });

  const header = document.createElement('div');
  header.className = 'header';
  const title = document.createElement('strong');
  title.textContent = 'Monthly report';
  const actions = document.createElement('div');
  actions.className = 'actions';
  const share = document.createElement('button');
  share.className = 'btn';
  share.textContent = 'Share';
  const exp = document.createElement('button');
  exp.className = 'btn btn-primary';
  exp.textContent = 'Export';
  actions.append(share, exp);
  header.append(title, actions);
  const body = document.createElement('div');
  body.className = 'body';
  for (const h of [40, 62, 28, 74, 52]) {
    const bar = document.createElement('i');
    bar.style.height = `${h}%`;
    body.append(bar);
  }
  stage.root.append(header, body);

  let tip: Instance | null = null;
  const announce = (): void => {
    tip = tippy(exp, {
      content: 'New: export to PDF',
      // Opens by itself as soon as it is created.
      showOnCreate: true,
      trigger: 'manual',
      placement: 'bottom-end',
      appendTo: stage.root,
    });
  };
  const retire = (): void => {
    if (tip && !tip.state.isDestroyed) tip.destroy();
    tip = null;
  };
  stage.own({ destroy: retire });

  exp.addEventListener('click', retire);
  announce();

  if (stage.bar) {
    button(stage.bar, 'Show the announcement again', () => {
      retire();
      announce();
    });
  } else {
    stage.play(async (wait) => {
      announce();
      await wait(2400);
      await stage.ghost.click(exp, 800);
      await wait(1200);
      await stage.ghost.moveTo({ x: 60, y: 150 }, 600);
    });
  }

  return stage.dispose;
};

export default mount;
