// The four themes that ship with Tippy, on buttons over a colourful backdrop
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/themes/translucent.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const THEMES = ['light', 'light-border', 'material', 'translucent'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Hover each button to see its theme.' });

  const row = document.createElement('div');
  row.className = 'row';
  const buttons = THEMES.map((theme) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = theme;
    row.append(b);
    return b;
  });
  stage.root.append(row);

  // One call per theme: the theme prop is the name of the stylesheet's look.
  buttons.forEach((button, i) => {
    stage.own(
      tippy(button, {
        content: `The “${THEMES[i]}” theme`,
        theme: THEMES[i],
        appendTo: stage.root,
      }),
    );
  });

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const button of buttons) {
        await stage.ghost.hover(button, 550);
        await wait(1100);
      }
      stage.ghost.leave();
      await wait(300);
    });
  }

  return stage.dispose;
};

export default mount;
