// A page builder: drag copies of blocks from a palette that never runs out
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const BLOCKS = [
  { name: 'Header', icon: '▀' },
  { name: 'Text', icon: '≡' },
  { name: 'Image', icon: '▣' },
  { name: 'Button', icon: '◉' },
  { name: 'Footer', icon: '▃' },
];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'builder';
  wrap.innerHTML = '<section class="panel"><h3>Palette</h3><ul class="palette"></ul></section><section class="panel wide"><h3>Page</h3><ul class="page"></ul></section>';
  const palette = wrap.querySelector<HTMLUListElement>('.palette')!;
  const page = wrap.querySelector<HTMLUListElement>('.page')!;
  const block = (b: (typeof BLOCKS)[number]): HTMLLIElement => {
    const li = document.createElement('li');
    li.className = 'block';
    li.dataset['kind'] = b.name;
    li.innerHTML = '<span class="icon"></span><span class="name"></span>';
    li.querySelector('.icon')!.textContent = b.icon;
    li.querySelector('.name')!.textContent = b.name;
    return li;
  };
  for (const b of BLOCKS) palette.append(block(b));
  el.append(wrap);

  // The palette hands out copies (pull: 'clone') and takes nothing back (put: false),
  // so every block stays available. Dragging inside it would be pointless: sort: false.
  const source = Sortable.create(palette, {
    group: { name: 'blocks', pull: 'clone', put: false },
    sort: false,
    animation: 150,
  });
  // The page accepts blocks from the palette and lets the reader reorder them.
  const target = Sortable.create(page, {
    group: { name: 'blocks', pull: true, put: true },
    animation: 150,
    ghostClass: 'ghost',
  });

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a block onto the page as often as you like. The palette keeps its copy.';
    const clear = document.createElement('div');
    clear.className = 'bar';
    button(clear, 'Clear page', () => page.replaceChildren());
    el.append(hint, clear);
  } else {
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      const kind = BLOCKS[n++ % BLOCKS.length]!;
      const src = palette.querySelector(`[data-kind="${kind.name}"]`)!;
      const last = page.lastElementChild;
      await hand.drag(src, last ? { el: last, fy: 0.9 } : { el: page }, 1);
      if (page.children.length > 3) {
        await hand.wait(0.4);
        page.firstElementChild!.remove();
      }
    }, 0.4);
  }

  return () => release(source, target);
};

export default mount;
