// Two toolbars: one built under custom default props, one built under the originals
import tippy, { type DefaultProps } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import './style.css';

const ACTIONS = [
  ['Save', 'Saves a copy to your drive and keeps the last ten versions.'],
  ['Share', 'Creates a private link that anyone in your team can open.'],
] as const;

const HOUSE_STYLE: Partial<DefaultProps> = { delay: [300, 0], placement: 'bottom', maxWidth: 170, arrow: false, duration: [150, 100] };

function toolbar(parent: HTMLElement, title: string): { buttons: HTMLButtonElement[]; box: HTMLElement } {
  const box = document.createElement('div');
  box.className = 'group';
  const caption = document.createElement('div');
  caption.className = 'caption';
  caption.textContent = title;
  const row = document.createElement('div');
  row.className = 'row';
  const buttons = ACTIONS.map(([name, tip]) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = name;
    b.setAttribute('data-tippy-content', tip);
    row.append(b);
    return b;
  });
  box.append(caption, row);
  parent.append(box);
  return { buttons, box };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, hint: 'Hover a button in each toolbar and compare.' });
  const house = toolbar(stage.root, 'Built under the house style');
  const plain = toolbar(stage.root, 'Built under the factory settings');
  const printed = readout(stage.root);
  printed.className = 'readout';
  printed.style.fontSize = '10px';

  // Defaults are page-wide, so: remember them, change them, create the tips, put them back.
  const before = { ...tippy.defaultProps };
  tippy.setDefaultProps(HOUSE_STYLE);
  const inside = tippy.defaultProps;
  const styled = tippy(house.buttons, { appendTo: stage.root });
  printed.textContent = `house style: ${inside.placement} · delay ${JSON.stringify(inside.delay)} · arrow ${inside.arrow}`;
  tippy.setDefaultProps(before);
  stage.own(styled);

  printed.textContent += `\nrestored:    ${tippy.defaultProps.placement} · delay ${JSON.stringify(tippy.defaultProps.delay)} · arrow ${tippy.defaultProps.arrow}`;
  // Created after the restore, so it follows the factory settings.
  stage.own(tippy(plain.buttons, { appendTo: stage.root, placement: 'bottom' }));

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const group of [house, plain]) {
        await stage.ghost.hover(group.buttons[0]!, 600);
        await wait(1500);
        stage.ghost.leave();
        await wait(300);
      }
    });
  }

  return stage.dispose;
};

export default mount;
