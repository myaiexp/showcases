// A playlist with section headers that stay in place while the songs move around them
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const PLAYLIST: [string, string[]][] = [
  ['Morning', ['Sunrise Drive', 'Coffee Steam', 'Slow Bloom']],
  ['Afternoon', ['City Walk', 'Paper Planes']],
  ['Evening', ['Last Train', 'Lanterns']],
];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'playlist';
  for (const [section, songs] of PLAYLIST.slice(0, preview ? 2 : 3)) {
    const head = document.createElement('li');
    head.className = 'section';
    head.textContent = section;
    list.append(head);
    for (const s of preview ? songs.slice(0, 2) : songs) {
      const li = document.createElement('li');
      li.className = 'song';
      li.textContent = s;
      list.append(li);
    }
  }
  el.append(list);

  const sortable = Sortable.create(list, {
    // Only .song rows are draggable (and are neighbours to swap with). The section headers
    // do not respond to a press and never get pushed aside.
    draggable: '.song',
    animation: 150,
    ghostClass: 'ghost',
  });

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Move songs between sections. Try dragging a section title: it does not move.';
    el.append(hint);
  } else {
    // Send the first song of the morning to the end of the afternoon, then bring one back.
    let down = true;
    loopDrive(el, signal, async (hand) => {
      const songs = list.querySelectorAll('.song');
      if (down) await hand.drag(songs[0]!, songs[songs.length - 1]!, 1);
      else await hand.drag(songs[songs.length - 1]!, songs[0]!, 1);
      down = !down;
    }, 0.5);
  }

  return () => release(sortable);
};

export default mount;
