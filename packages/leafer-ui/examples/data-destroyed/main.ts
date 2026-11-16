// Data: destroy() frees an element and its children, and destroyed says so
import { Ellipse, Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Destroying the group destroys the rect and the circle inside it too.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const show = label(stage, '', true);
  let group: Group, rect: Rect, dot: Ellipse;
  const build = (): void => {
    rect = new Rect({ width: S, height: S, fill: '#32cd79' });
    dot = new Ellipse({ x: S * 0.4, y: S * 0.4, width: S * 0.6, height: S * 0.6, fill: '#FEB027' });
    group = new Group({ ...mid(stage, S, S), y: 14, children: [rect, dot] });
    leafer.add(group);
    refresh();
  };
  const refresh = (): void => show(`group.destroyed ${group.destroyed}\nrect.destroyed  ${rect.destroyed}\ndot.destroyed   ${dot.destroyed}`);
  const kill = (): void => {
    group.destroy();
    refresh();
  };
  build();
  if (stage.bar) {
    button(stage.bar, 'group.destroy()', kill);
    button(stage.bar, 'build again', build);
  } else {
    stage.every(1200, () => (group.destroyed ? build() : kill()));
  }

  return stage.dispose;
};

export default mount;
