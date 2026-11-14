// An emoji reaction bar whose tips come from data-tippy-content attributes
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const REACTIONS = [
  ['👍', 'Like'], ['❤️', 'Love'], ['😂', 'Haha'], ['😮', 'Wow'], ['😢', 'Sad'], ['🙏', 'Thanks'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover or Tab through the reactions.' });

  const post = document.createElement('div');
  post.className = 'post';
  post.textContent = 'We just shipped dark mode. Tell us what you think!';
  const row = document.createElement('div');
  row.className = 'reactions';
  const buttons = REACTIONS.map(([emoji, name]) => {
    const b = document.createElement('button');
    b.className = 'react';
    b.textContent = emoji;
    // The tooltip text lives in the markup, right on the element.
    b.setAttribute('data-tippy-content', name);
    row.append(b);
    return b;
  });
  stage.root.append(post, row);

  // One call for every element that carries the attribute. (Scoped to this scene:
  // a bare selector string would also match other examples on the page.)
  stage.own(tippy(stage.root.querySelectorAll('[data-tippy-content]'), { appendTo: stage.root }));

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const b of buttons) {
        await stage.ghost.hover(b, 450);
        await wait(600);
      }
      stage.ghost.leave();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
