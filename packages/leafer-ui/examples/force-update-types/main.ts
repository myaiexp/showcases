// forceUpdate: telling an element its data changed behind its back
import { Leafer, Path, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button stretches the path data in place, then forces an update. Compare the drawn shape with the measured box.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 0.7 : 2.2;
  const data = [1, 20, 60, 2, 80, 60, 2, 50, 20, 2, 20, 60, 11]; // M L L L Z as numbers: [command, x, y, ...]
  const path = new Path({ x: 30, y: 40, path: data, fill: GREEN, stroke: '#222', strokeWidth: 3, scale: k });
  const frame = new Rect({ stroke: '#d33', strokeWidth: 1, dashPattern: [4, 3], hittable: false });
  leafer.add([frame, path]);
  const say = label(stage, '', true);

  const measured = (): void => {
    const b = path.boxBounds;
    frame.set({ x: path.x! + b.x * k, y: path.y! + b.y * k, width: b.width * k, height: b.height * k });
  };
  stage.loop(measured);
  let grown = false;
  const grow = (type?: 'bounds' | 'surface' | 'stroke'): void => {
    grown = !grown;
    const x = grown ? 150 : 80;
    data[4] = x; // change the second point in place: no setter runs
    data[7] = grown ? 110 : 50;
    path.forceUpdate(type);
    say(`path.forceUpdate(${type ? `'${type}'` : ''})   width ${Math.round(path.boxBounds.width)}`);
  };

  if (stage.bar) {
    button(stage.bar, 'forceUpdate()', () => grow());
    button(stage.bar, "forceUpdate('surface')", () => grow('surface'));
    button(stage.bar, "forceUpdate('stroke')", () => grow('stroke'));
  } else {
    script(stage, async () => {
      grow();
      await stage.wait(1500);
      grow('surface');
      await stage.wait(1500);
    });
  }
  return stage.dispose;
};

export default mount;
