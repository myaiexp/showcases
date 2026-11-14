// A reading list: hover previews an article, a click pins the preview open
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const ARTICLES: [string, string][] = [
  ['Why bridges sway', 'Footfall can set a bridge swaying when walkers fall into step with each other.'],
  ['The long life of sourdough', 'Some starters are older than the bakeries that keep them going.'],
  ['How tides really work', 'The moon pulls on the whole planet, not just the sea.'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 280, hint: 'Hover a link, then click it to pin its preview.' });

  const list = document.createElement('div');
  list.className = 'list';
  const heading = document.createElement('div');
  heading.className = 'heading';
  heading.textContent = 'Reading list';
  list.append(heading);

  const links = ARTICLES.map(([title, blurb]) => {
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'link';
    a.textContent = title;
    a.addEventListener('click', (e) => e.preventDefault());
    list.append(a);

    const tip = stage.own(
      tippy(a, {
        content: blurb,
        // Both: the mouse shows it, a click keeps it (the mouse leaving no longer hides it).
        trigger: 'mouseenter click',
        placement: 'right',
        maxWidth: 170,
        appendTo: stage.root,
        onHidden: () => a.classList.remove('pinned'),
      }),
    );
    // Tippy has handled the click by now: if the tip is still up, it was pinned.
    a.addEventListener('click', () => a.classList.toggle('pinned', tip.state.isVisible));
    return a;
  });
  stage.root.append(list);

  if (stage.preview) {
    stage.play(async (wait) => {
      const [a, b] = [links[0]!, links[1]!];
      await stage.ghost.hover(a, 700);
      await wait(1100);
      stage.ghost.leave();
      await wait(500);
      await stage.ghost.hover(b, 700);
      await stage.ghost.click();
      await wait(500);
      await stage.ghost.moveTo({ x: 200, y: 160 }, 700);
      await wait(1200);
      await stage.ghost.click(b, 700);
      await wait(700);
    });
  }

  return stage.dispose;
};

export default mount;
