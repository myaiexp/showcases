// A video progress bar: the chapter tip opens under the cursor, then stays where it opened
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const CHAPTERS = [
  { name: 'Intro', from: 0, to: 0.15 },
  { name: 'Setting up', from: 0.15, to: 0.4 },
  { name: 'The main idea', from: 0.4, to: 0.75 },
  { name: 'Wrap-up', from: 0.75, to: 1 },
];

const chapterAt = (f: number): string =>
  (CHAPTERS.find((c) => f >= c.from && f < c.to) ?? CHAPTERS[CHAPTERS.length - 1]!).name;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Rest the mouse on the bar, then move along it.' });

  const player = document.createElement('div');
  player.className = 'player';
  const bar = document.createElement('div');
  bar.className = 'bar';
  for (const c of CHAPTERS) {
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.style.flex = String(c.to - c.from);
    bar.append(seg);
  }
  player.append(bar);
  stage.root.append(player);

  const fraction = (clientX: number): number => {
    const r = bar.getBoundingClientRect();
    return Math.max(0, Math.min(0.999, (clientX - r.left) / r.width));
  };

  const tip = stage.own(
    tippy(bar, {
      content: CHAPTERS[0]!.name,
      // Follows the cursor until the tip opens (after the delay), then stays where it opened.
      followCursor: stage.preview ? false : 'initial',
      plugins: [followCursor],
      delay: [350, 0],
      placement: 'top',
      offset: [0, 10],
      appendTo: stage.root,
    }),
  );

  if (!stage.preview) {
    // The text keeps up with the cursor until the tip has opened, then freezes with it.
    bar.addEventListener('mousemove', (e) => {
      if (!tip.state.isVisible) tip.setContent(chapterAt(fraction(e.clientX)));
    });
  } else {
    // Card: the tip is pinned to where the drawn pointer was when the delay ran out.
    let frozen: DOMRect | null = null;
    tip.setProps({ getReferenceClientRect: () => frozen ?? stage.ghost.clientRect() });
    stage.play(async (wait) => {
      const box = stage.root.getBoundingClientRect();
      const r = bar.getBoundingClientRect();
      const at = (f: number): { x: number; y: number } => ({ x: r.left - box.left + r.width * f, y: r.top - box.top + r.height / 2 });
      for (const f of [0.55, 0.22]) {
        await stage.ghost.moveTo(at(f - 0.1), 500);
        await stage.ghost.moveTo(at(f), 500);
        await wait(350);
        tip.setContent(chapterAt(f));
        frozen = stage.ghost.clientRect();
        tip.show();
        await wait(500);
        await stage.ghost.moveTo(at(f + 0.3), 900);
        await wait(700);
        tip.hide();
        frozen = null;
        await wait(500);
      }
    });
  }

  return stage.dispose;
};

export default mount;
