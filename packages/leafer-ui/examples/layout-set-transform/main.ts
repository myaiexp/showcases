// Layout: setTransform splits a matrix into x, y, scale, rotation, skew
import { Box, Leafer, Rect, Text } from 'leafer-ui';
import type { IMatrixData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, pick, toggle } from '../../shared/shapes.ts';

const rad = (d: number): number => (d * Math.PI) / 180;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'setTransform(matrix, resize) replaces the local matrix; its parts show up as x, y, scaleX, rotation, skewX. With resize the scale goes into width and height.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const x0 = stage.width / 2 - S / 2, y0 = 24;
  const rect = new Box({ x: x0, y: y0, width: S, height: S });
  rect.add(new Rect({ width: S, height: S, fill: '#32cd79', cornerRadius: 6 }));
  rect.add(new Text({ x: S * 0.1, y: S * 0.2, width: S * 0.8, text: 'F', fontSize: S * 0.55, fill: '#fff', textAlign: 'center', hittable: false }));
  leafer.add(rect);
  const MATRICES: Record<string, IMatrixData> = {
    'identity': { a: 1, b: 0, c: 0, d: 1, e: x0, f: y0 },
    'move 40, 10': { a: 1, b: 0, c: 0, d: 1, e: x0 + 40, f: y0 + 10 },
    'rotate 30': { a: Math.cos(rad(30)), b: Math.sin(rad(30)), c: -Math.sin(rad(30)), d: Math.cos(rad(30)), e: x0 + 30, f: y0 },
    'scale 1.5, 0.7': { a: 1.5, b: 0, c: 0, d: 0.7, e: x0, f: y0 },
    'shear c: 0.6': { a: 1, b: 0, c: 0.6, d: 1, e: x0, f: y0 },
  };
  const show = label(stage, '', true);
  let name = 'identity', resize = false;
  const run = (): void => {
    rect.set({ x: x0, y: y0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0, width: S, height: S });
    rect.setTransform(MATRICES[name]!, resize);
    show(`rect.setTransform(${name}, ${resize})\nx ${Math.round(rect.x!)} y ${Math.round(rect.y!)}  scale ${(rect.scaleX as number).toFixed(2)}, ${(rect.scaleY as number).toFixed(2)}  rotation ${Math.round(rect.rotation!)}  skewX ${Math.round(rect.skewX!)}  size ${Math.round(rect.width!)} x ${Math.round(rect.height!)}`);
  };
  pick(stage, 'matrix', Object.keys(MATRICES), (n) => ((name = n), run()), 1800);
  toggle(stage, 'resize', false, (v) => ((resize = v), run()), 5400);

  return stage.dispose;
};

export default mount;
