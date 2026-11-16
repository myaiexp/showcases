// PathCreator: building path data with drawing calls
import { Leafer, Path, PathCreator } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The heart is a PathCreator chain; .path holds the numbers shown below it.' });
  const leafer = stage.own(new Leafer({ view: stage.view, }));
  const k = stage.preview ? 1.3 : 2;
  const x = (stage.width - 100 * k) / 2;
  const tile = new Path({ x, y: 10, scale: k, path: 'X 0 0 100 100 30', fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } });
  const drawer = new PathCreator();
  drawer.moveTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30);
  const heart = new Path({ x, y: 10, scale: k, path: drawer.path, fill: 'white' });
  leafer.add([tile, heart]);
  label(stage, `path: [${drawer.path.slice(0, 18).join(', ')} ...]`, true);
  stage.loop((_dt, t) => (heart.scale = k * (1 + Math.sin(t * 4) * 0.04)));
  return stage.dispose;
};

export default mount;
