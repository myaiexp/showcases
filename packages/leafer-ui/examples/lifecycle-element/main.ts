// Advanced: listening to an element's lifecycle
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add and remove the rect: mounted and unmounted are logged.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const log: string[] = [];
  const say = label(stage, '');
  const note = (line: string): void => {
    log.push(line);
    if (log.length > (stage.preview ? 7 : 12)) log.shift();
    say(log.join('\n'));
  };

  const rect: Rect = new Rect({
    x: u(110),
    y: u(100),
    width: u(100),
    height: u(100),
    fill: GREEN,
    cornerRadius: [50, 80, 0, 80],
    draggable: true,
    event: {
      // bound when the element is created
      created() {
        note('created');
      },
    },
  });
  rect.on('mounted', () => note(`mounted (leafer: ${rect.leafer ? 'yes' : 'no'})`)); // on the tree: it can render
  rect.on('unmounted', () => note('unmounted'));

  const toggle = (): void => {
    if (rect.parent) rect.remove();
    else leafer.add(rect);
  };
  toggle();

  if (stage.preview) stage.every(1500, toggle);
  else button(stage.bar!, 'add / remove', toggle);

  return stage.dispose;
};

export default mount;
