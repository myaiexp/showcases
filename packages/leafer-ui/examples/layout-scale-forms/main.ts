// Layout: scale as a number, a point and a negative mirror
import { Box, Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, pick } from '../../shared/shapes.ts';

const FORMS: Record<string, number | { x: number; y: number }> = {
  '2': 2,
  '0.6': 0.6,
  '{ x: 1, y: 2 }': { x: 1, y: 2 },
  '{ x: -1, y: 1 }': { x: -1, y: 1 },
  '{ x: 1, y: -1 }': { x: 1, y: -1 },
  '1': 1,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'scale sets scaleX and scaleY together; a negative value mirrors. The F shows the direction.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const box = new Box({ x: stage.width / 2, y: 20 + S / 2, width: S, height: S, around: 'center' });
  box.add(new Rect({ width: S, height: S, fill: '#32cd79', cornerRadius: 8 }));
  box.add(new Text({ x: S * 0.26, y: S * 0.08, text: 'F', fontSize: S * 0.8, fontWeight: 'bold', fill: '#fff', hittable: false }));
  leafer.add(box);
  const show = label(stage, '', true);
  pick(stage, 'scale', Object.keys(FORMS), (name) => {
    box.scale = FORMS[name]!;
    show(`box.scale = ${name}\nscaleX ${box.scaleX}  scaleY ${box.scaleY}   box.scale reads ${JSON.stringify(box.scale)}`);
  }, 1500, '1');

  return stage.dispose;
};

export default mount;
