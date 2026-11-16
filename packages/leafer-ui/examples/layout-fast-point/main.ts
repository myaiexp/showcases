// Layout: worldToLocal, worldToInner, innerToWorld and localToWorld rewrite the point you pass
import { Group, Leafer, Rect } from 'leafer-ui';
import type { IPointData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { pick } from '../../shared/shapes.ts';
import { pt } from '../../shared/layout-kit.ts';

type Fn = 'worldToLocal' | 'worldToInner' | 'innerToWorld' | 'localToWorld';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The quick conversions modify the point you give them. The rect is at (100, 100) inside a group at (100, 100) scaled 2.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const k = stage.preview ? 0.5 : 0.8;
  const group = new Group({ x: 100 * k, y: 40 * k, scaleX: 2, scaleY: 2 });
  const rect = new Rect({ x: 100 * k / 2, y: 100 * k / 2, width: 30 * k, height: 30 * k, fill: '#32cd79', draggable: true });
  group.add(rect);
  leafer.add(group);
  const show = label(stage, '', true);
  pick(stage, 'method', ['worldToLocal', 'worldToInner', 'innerToWorld', 'localToWorld'] as const, (fn: Fn) => {
    const point: IPointData = { x: 100 * k, y: 100 * k };
    const before = pt(point);
    rect[fn](point);
    show(`const point = { x: ${before} }\nrect.${fn}(point)\npoint is now { ${pt(point)} }`);
  }, 2000);

  return stage.dispose;
};

export default mount;
