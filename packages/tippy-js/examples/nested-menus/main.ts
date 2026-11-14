// An app menu bar: File opens a menu, and its Export item opens a menu of its own
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FORMATS = ['PNG', 'SVG', 'PDF'];

function item(label: string, onClick?: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.className = 'item';
  b.textContent = label;
  if (onClick) b.addEventListener('click', onClick);
  return b;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Click File, point at Export, pick a format.' });

  const bar = document.createElement('div');
  bar.className = 'menubar';
  const file = document.createElement('button');
  file.className = 'top';
  file.textContent = 'File';
  const edit = document.createElement('button');
  edit.className = 'top';
  edit.textContent = 'Edit';
  bar.append(file, edit);
  const status = document.createElement('div');
  status.className = 'picked';
  status.textContent = 'Nothing exported yet';
  stage.root.append(bar, status);

  // The submenu: a plain element, shown beside the Export item.
  const submenu = document.createElement('div');
  submenu.className = 'menu';
  const formats = FORMATS.map((f) =>
    item(f, () => {
      status.textContent = `Exported as ${f}`;
      sub.hide();
      fileMenu.hide();
    }),
  );
  submenu.append(...formats);

  const menu = document.createElement('div');
  menu.className = 'menu';
  const exportItem = item('Export  ▸');
  menu.append(item('New'), item('Open…'), exportItem, item('Close'));

  const fileMenu = stage.own(
    tippy(file, {
      content: menu,
      trigger: 'click',
      interactive: true,
      placement: 'bottom-start',
      arrow: false,
      offset: [0, 2],
      appendTo: stage.root,
      onHide: () => sub.hide(),
    }),
  );

  // Nesting: a tippy on an element that lives inside another tippy. Appending it to
  // 'parent' keeps its box inside the File menu, so clicks in it never count as "outside".
  const sub = stage.own(
    tippy(exportItem, {
      content: submenu,
      // In a card the real mouse would open and move hover-triggered interactive tips.
      trigger: stage.preview ? 'manual' : 'mouseenter focus click',
      interactive: true,
      placement: 'right-start',
      arrow: false,
      offset: [0, 2],
      appendTo: 'parent',
    }),
  );

  if (stage.preview) {
    let n = 0;
    stage.play(async (wait) => {
      status.textContent = 'Nothing exported yet';
      await stage.ghost.click(file, 800);
      await wait(500);
      await stage.ghost.moveTo(exportItem, 500);
      sub.show();
      exportItem.classList.add('lit');
      await wait(500);
      const target = formats[n++ % formats.length]!;
      await stage.ghost.moveTo(target, 500);
      target.classList.add('lit');
      await wait(350);
      await stage.ghost.click(target);
      exportItem.classList.remove('lit');
      target.classList.remove('lit');
      await stage.ghost.moveTo({ x: 180, y: 150 }, 600);
      await wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
