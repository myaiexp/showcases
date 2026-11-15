// loading="lazy" draws each doodle only when it scrolls near; labels report it
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import type { CSSDoodle } from '../../shared/types.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll the list: each doodle draws as it comes into view.' });
  const side = stage.preview ? 100 : 160;
  const list = document.createElement('div');
  Object.assign(list.style, { width: `${side + 24}px`, height: `${side + 8}px`, overflowY: 'auto', outline: '1px dashed #888', padding: '4px', boxSizing: 'border-box' });
  stage.root.append(list);
  const doodles: CSSDoodle[] = [];
  for (let n = 1; n <= 6; n++) {
    const item = document.createElement('div');
    item.style.height = `${side + 8}px`;
    const label = document.createElement('div');
    label.textContent = `#${n} waiting`;
    label.style.fontSize = '11px';
    const doodle = document.createElement('css-doodle') as CSSDoodle;
    doodle.setAttribute('loading', 'lazy');
    // Until it draws, the doodle is a block: the page's width and height hold its place.
    Object.assign(doodle.style, { display: 'block', width: `${side - 14}px`, height: `${side - 14}px` });
    doodle.textContent = `@grid: 8 / 100%;\nbackground: @p(#f5c636, #1a1614);`;
    doodle.addEventListener('render', () => {
      label.textContent = `#${n} drawn`;
    });
    item.append(label, doodle);
    list.append(item);
    doodles.push(doodle);
  }
  if (stage.preview) {
    let dir = 1;
    stage.every(40, () => {
      const max = list.scrollHeight - list.clientHeight;
      list.scrollTop += dir * 2;
      if (list.scrollTop >= max || list.scrollTop <= 0) dir = -dir;
    });
  } else if (stage.bar) {
    button(stage.bar, 'update() the last one', () => doodles[5]!.update());
  }
  stage.say('Waiting doodles are blank blocks until they are near the viewport');
  return () => stage.dispose();
};

export default mount;
