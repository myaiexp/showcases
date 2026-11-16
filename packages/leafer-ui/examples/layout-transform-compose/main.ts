// Layout: the matrix an element composes from its properties
import { Group, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'localTransform is built from rotation, skew, scale and translation in that order; worldTransform adds the group around it (scale 1.5).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.3;
  const group = new Group({ x: 10, y: 10, scale: 1.5 });
  const rect = new Rect({ x: S * 0.2, y: S * 0.2, width: S, height: S, fill: '#32cd79', cornerRadius: 6 });
  group.add(rect);
  leafer.add(group);
  const show = label(stage, '', true);
  const f = (m: { a: number; b: number; c: number; d: number; e: number; f: number }): string => [m.a, m.b, m.c, m.d, m.e, m.f].map((n) => n.toFixed(2)).join(', ');
  const refresh = (): void =>
    show(`x ${Math.round(rect.x!)}  rotation ${Math.round(rect.rotation!)}  skewX ${Math.round(rect.skewX!)}  scaleX ${(rect.scaleX as number).toFixed(2)}\nlocalTransform  a, b, c, d, e, f = ${f(rect.localTransform)}\nworldTransform  a, b, c, d, e, f = ${f(rect.worldTransform)}`);
  if (stage.bar) {
    slider(stage.bar, 'x', 0, 100, 1, rect.x!, (v) => ((rect.x = v), refresh()));
    slider(stage.bar, 'rotation', -90, 90, 1, 0, (v) => ((rect.rotation = v), refresh()));
    slider(stage.bar, 'skewX', -45, 45, 1, 0, (v) => ((rect.skewX = v), refresh()));
    slider(stage.bar, 'scaleX', 0.5, 2, 0.05, 1, (v) => ((rect.scaleX = v), refresh()));
  } else {
    stage.loop((_dt, t) => {
      rect.set({ rotation: Math.sin(t) * 40, skewX: Math.sin(t * 0.7) * 20, scaleX: 1 + 0.3 * Math.sin(t * 1.3), x: S * 0.2 + Math.sin(t * 0.5) * 10 });
    });
    stage.every(200, refresh);
  }

  return stage.dispose;
};

export default mount;
