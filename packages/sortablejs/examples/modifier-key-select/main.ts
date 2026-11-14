// A file list where a plain click picks one file and Ctrl+click adds more
import Sortable, { MultiDrag } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const FILES = [
  ['📄', 'budget-2026.xlsx'],
  ['🖼️', 'team-photo.png'],
  ['📝', 'meeting-notes.md'],
  ['🎵', 'podcast-intro.mp3'],
  ['📦', 'backup.zip'],
  ['📊', 'quarterly-deck.pdf'],
] as const;

mountOnce(new MultiDrag());

// MultiDrag keeps ONE selection for the whole page. A selection left behind by a card would be
// dragged into the next list that multi-drags, so cards always unpick everything when they finish.
const utils = Sortable.utils as typeof Sortable.utils & { deselect(el: HTMLElement): void };
const untick = (...lists: HTMLElement[]): void => {
  for (const list of lists) for (const row of list.children) utils.deselect(row as HTMLElement);
};

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'files';
  const keyChip = document.createElement('div');
  keyChip.className = 'keychip';
  const list = document.createElement('ul');
  list.className = 'list';
  for (const [icon, name] of FILES.slice(0, preview ? 5 : 6)) {
    const row = document.createElement('li');
    row.className = 'file';
    row.innerHTML = `<span>${icon}</span><span class="name">${name}</span>`;
    list.append(row);
  }
  wrap.append(keyChip, list);
  el.append(wrap);

  const sortable = Sortable.create(list, {
    multiDrag: true,
    selectedClass: 'chosen-file',
    // Items are only added to the selection while this key is held. 'CTRL' is
    // understood case-insensitively; any other key is its KeyboardEvent.key name.
    multiDragKey: 'CTRL',
    animation: 150,
  });

  // The plugin reads the key from keydown/keyup on the document, so listening there shows what it sees.
  let keyLabel = 'Ctrl';
  const light = (on: boolean, key: string): void => {
    if (key.toLowerCase() === (keyLabel === 'Ctrl' ? 'control' : keyLabel.toLowerCase())) keyChip.classList.toggle('down', on);
  };
  const onDown = (e: KeyboardEvent): void => light(true, e.key);
  const onUp = (e: KeyboardEvent): void => light(false, e.key);
  document.addEventListener('keydown', onDown);
  document.addEventListener('keyup', onUp);
  const setKey = (label: string): void => {
    keyLabel = label;
    keyChip.textContent = `hold ${label} to add to the selection`;
    keyChip.classList.remove('down');
    sortable.option('multiDragKey', label); // switchable at any time; the plugin normalises the name
  };
  setKey('Ctrl');

  if (preview) {
    const key = (type: 'keydown' | 'keyup'): void => {
      document.dispatchEvent(new KeyboardEvent(type, { key: 'Control' }));
    };
    loopDrive(el, signal, async (hand) => {
      const rows = [...list.children];
      await hand.tap(rows[0]!); // plain click: just this file
      await hand.wait(0.5);
      key('keydown'); // holding Ctrl: the same event a real keyboard sends
      await hand.wait(0.3);
      await hand.tap(rows[2]!);
      await hand.wait(0.35);
      await hand.tap(rows[3]!);
      await hand.wait(0.8);
      key('keyup');
      await hand.wait(0.3);
      await hand.tap(rows[4]!); // plain click again: back to a single file
      await hand.wait(1);
      hand.down(el, { x: 2, y: 2 });
      hand.up();
      untick(list);
    }, 0.4);
  } else {
    const bar = document.createElement('div');
    bar.className = 'bar';
    select(bar, 'Modifier key', ['Ctrl', 'Alt', 'Shift'], setKey);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'A plain click selects only that file. Hold the key and click to add more, then drag any selected file. (On a Mac, pick Alt or Shift: Ctrl+click is a right-click there.)';
    el.append(bar, hint);
  }

  return () => {
    document.removeEventListener('keydown', onDown);
    document.removeEventListener('keyup', onUp);
    untick(list);
    release(sortable);
  };
};

export default mount;
