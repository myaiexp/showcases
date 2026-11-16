// Data: asPath turns an element into path data, path = null turns it back
import { Leafer, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Once the polygon is path data, changing sides does nothing. path = null gives the sides back.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.7;
  const poly = new Polygon({ ...mid(stage, S, S), y: 10, width: S, height: S, sides: 5, fill: '#32cd79' });
  leafer.add(poly);
  const show = label(stage, '', true);
  let sides = 5;
  const refresh = (said: string): void => show(`${said}\nsides ${poly.sides}   pathInputed ${poly.pathInputed}`);
  const more = (): void => {
    sides = sides >= 8 ? 3 : sides + 1;
    poly.sides = sides;
    refresh(`sides = ${sides}`);
  };
  const toPath = (): void => {
    poly.asPath(); // = poly.path = poly.getPath()
    refresh('asPath()');
  };
  const toShape = (): void => {
    poly.path = null as never;
    refresh('path = null');
  };
  refresh('five sides');
  if (stage.bar) {
    button(stage.bar, 'sides + 1', more);
    button(stage.bar, 'asPath()', toPath);
    button(stage.bar, 'path = null', toShape);
  } else {
    const steps = [more, more, toPath, more, more, toShape];
    let i = 0;
    stage.every(1100, () => steps[i++ % steps.length]!());
  }

  return stage.dispose;
};

export default mount;
