// A context menu: contextmenu shows a manual interactive tip at the click point
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const FILES = ['report.pdf', 'photo.jpg', 'notes.txt', 'budget.xlsx'];
const ACTIONS = ['Open', 'Rename', 'Duplicate', 'Delete'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Right-click a file.' });
  const files = stage.preview ? FILES.slice(0, 3) : FILES;

  const area = document.createElement('div');
  area.className = 'files';
  const items = files.map((name) => {
    const file = document.createElement('div');
    file.className = 'file';
    const icon = document.createElement('div');
    icon.className = 'icon';
    const label = document.createElement('span');
    label.textContent = name;
    file.append(icon, label);
    area.append(file);
    return file;
  });
  const message = document.createElement('div');
  message.className = 'message';
  message.textContent = 'Nothing chosen yet';
  stage.root.append(area, message);

  let current: HTMLElement | null = null;
  const menu = document.createElement('div');
  menu.className = 'menu';

  const instance = stage.own(
    tippy(area, {
      content: menu,
      placement: 'right-start',
      trigger: 'manual',
      interactive: true,
      arrow: false,
      offset: [0, 0],
      appendTo: stage.root,
    }),
  );

  const menuButtons = ACTIONS.map((action) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = action;
    b.addEventListener('click', () => {
      message.textContent = `${action}: ${current?.textContent ?? ''}`;
      instance.hide();
    });
    menu.append(b);
    return b;
  });

  area.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    // Mark the file under the pointer, then aim the tip at a zero-size rect where the click was.
    current = (event.target as Element).closest<HTMLElement>('.file');
    for (const f of items) f.classList.toggle('picked', f === current);
    instance.setProps({
      getReferenceClientRect: () => new DOMRect(event.clientX, event.clientY, 0, 0),
    });
    instance.show();
  });
  instance.setProps({ onHidden: () => items.forEach((f) => f.classList.remove('picked')) });

  if (stage.preview) {
    stage.play(async (wait) => {
      message.textContent = 'Nothing chosen yet';
      await stage.ghost.moveTo(items[1]!, 700);
      await wait(300);
      await stage.ghost.rightClick(items[1]!);
      await wait(1000);
      await stage.ghost.click(menuButtons[1]!, 700);
      await wait(1400);
    });
  }

  return stage.dispose;
};

export default mount;
