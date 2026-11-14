// A flashcard deck with Shuffle, A-Z and Reverse buttons that come from a plugin's utils
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import Shuffler from './plugin.ts';
import './style.css';

mountOnce(Shuffler as unknown as Parameters<typeof mountOnce>[0]);

// Sortable.utils now has the plugin's functions; the typings only know the built-in ones.
const tools = Sortable.utils as unknown as { shuffle(el: HTMLElement): void; sortAZ(el: HTMLElement): void; reverse(el: HTMLElement): void };

const WORDS = ['Obrigado', 'Bonjour', 'Arigato', 'Danke', 'Gracias', 'Grazie', 'Tack', 'Merci'];

const mount: Mount = (el, { preview, signal }) => {
  const desk = document.createElement('div');
  desk.className = 'desk';
  const bar = document.createElement('div');
  bar.className = 'bar';
  const deck = document.createElement('ul');
  deck.className = 'deck';
  for (const w of WORDS.slice(0, preview ? 6 : 8)) {
    const li = document.createElement('li');
    li.className = 'flash';
    li.textContent = w;
    deck.append(li);
  }
  desk.append(bar, deck);
  el.append(desk);

  const sortable = Sortable.create(deck, { animation: 150 });

  // The helpers come from the plugin, called through Sortable.utils like any built-in one.
  const shuffle = button(bar, 'Shuffle', () => tools.shuffle(deck));
  const az = button(bar, 'A to Z', () => tools.sortAZ(deck));
  const back = button(bar, 'Reverse', () => tools.reverse(deck));

  if (preview) {
    // A card sits inside a link, so a real click would open the full view: call the helpers directly.
    const steps = [() => tools.shuffle(deck), () => tools.sortAZ(deck), () => tools.reverse(deck)];
    const lit = [shuffle, az, back];
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const k = turn++ % steps.length;
      lit[k]!.classList.add('on');
      steps[k]!();
      await hand.wait(1.1);
      lit[k]!.classList.remove('on');
      const rows = [...deck.children].filter((c) => !c.classList.contains('sortable-fallback'));
      await hand.drag(rows[rows.length - 1]!, { el: rows[0]!, fy: 0.2 }, 0.8); // plain dragging still works
    }, 0.4);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'The three buttons call Sortable.utils.shuffle, sortAZ and reverse, which the plugin added. Drag cards by hand too.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
