// A custom "rotate" entrance written in CSS and named in the animation prop
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const ICONS = [
  { icon: '⚙️', tip: 'Settings' },
  { icon: '✉️', tip: 'Messages' },
  { icon: '⭐', tip: 'Favourites' },
  { icon: '🔔', tip: 'Alerts' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Hover the icons: each tip spins into place.' });

  const bar = document.createElement('div');
  bar.className = 'iconbar';
  const buttons = ICONS.map((i) => {
    const b = document.createElement('button');
    b.className = 'icon';
    b.textContent = i.icon;
    bar.append(b);
    return b;
  });
  stage.root.append(bar);

  // 'rotate' is not built in: style.css defines what the hidden state looks like.
  buttons.forEach((button, i) => {
    stage.own(
      tippy(button, {
        content: ICONS[i]!.tip,
        animation: 'rotate',
        duration: 350,
        appendTo: stage.root,
      }),
    );
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of buttons) {
        await stage.ghost.hover(button, 450);
        await wait(900);
        stage.ghost.leave();
        await wait(450);
      }
    });
  }

  return stage.dispose;
};

export default mount;
