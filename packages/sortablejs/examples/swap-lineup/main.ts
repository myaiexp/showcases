// A relay team's running order that reports who traded legs with whom
import Sortable, { Swap } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const RUNNERS = [
  ['Ines', 'var(--blue)'],
  ['Tomas', 'var(--green)'],
  ['Aiko', 'var(--orange)'],
  ['Dara', 'var(--red)'],
  ['Bo', 'var(--accent)'],
] as const;

mountOnce(new Swap());

const mount: Mount = (el, { preview, signal }) => {
  const team = document.createElement('div');
  team.className = 'team';
  const lane = document.createElement('div');
  lane.className = 'lane';
  RUNNERS.slice(0, preview ? 4 : 5).forEach(([name, color]) => {
    const runner = document.createElement('div');
    runner.className = 'runner';
    runner.style.setProperty('--shirt', color);
    runner.innerHTML = '<span class="bib"></span><span class="name"></span>';
    runner.querySelector('.name')!.textContent = name;
    lane.append(runner);
  });
  const news = document.createElement('div');
  news.className = 'news';
  team.append(lane, news);
  el.append(team);

  const legs = (): void => {
    [...lane.children].forEach((r, i) => {
      if (!r.classList.contains('sortable-fallback')) r.querySelector('.bib')!.textContent = `leg ${i + 1}`;
    });
  };
  legs();
  const headlines: string[] = [];

  const sortable = Sortable.create(lane, {
    swap: true,
    swapClass: 'next-to-trade',
    draggable: '.runner',
    animation: 200,
    onEnd(evt) {
      legs();
      // swapItem is the runner that was under the pointer when you let go (the dragged one itself if none).
      const other = evt.swapItem;
      if (!other || other === evt.item) return;
      const name = (r: HTMLElement): string => r.querySelector('.name')!.textContent!;
      headlines.unshift(`${name(evt.item)} and ${name(other)} traded places: legs ${evt.oldIndex! + 1} and ${evt.newIndex! + 1}`);
      headlines.length = Math.min(headlines.length, preview ? 2 : 4);
      news.replaceChildren(...headlines.map((h) => Object.assign(document.createElement('div'), { textContent: h })));
    },
  });

  if (preview) {
    const pairs: [number, number][] = [[0, 3], [1, 2], [3, 1]];
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const [a, b] = pairs[turn++ % pairs.length]!;
      const runners = [...lane.children].filter((c) => c.classList.contains('runner') && !c.classList.contains('sortable-fallback'));
      await hand.drag(runners[a]!, runners[b]!, 1.1);
    }, 0.8);
  } else {
    news.textContent = 'Swap two runners to see the news here.';
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drop a runner on another to trade legs. The report names both, read from the swapItem property of the drop event.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
