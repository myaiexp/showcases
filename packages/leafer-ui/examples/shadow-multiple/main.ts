// Appearance: an array of shadows forming a layered glow
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Add layers one at a time.", paper: 'transparent' });
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#1d2b53' }));
  const S = size(stage) * 0.8;
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.25, fill: '#fff' });
  leafer.add(rect);
  const layers = [
    { x: 0, y: 0, blur: 6, color: '#FF4B4B' },
    { x: 0, y: 0, blur: 18, spread: 4, color: '#FEB027' },
    { x: 0, y: 0, blur: 36, spread: 8, color: '#32cd79' },
  ];
  drive(stage, 'layers', [1, 3, 1], 3, (n) => (rect.shadow = layers.slice(0, n)), 6);

  return stage.dispose;
};

export default mount;
