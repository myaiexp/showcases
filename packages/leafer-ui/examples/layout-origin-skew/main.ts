// Layout: skew around an origin at the rect's centre
import type { Mount } from '@/types.ts';
import { anchorScene } from '../../shared/anchor-demo.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, rect } = anchorScene(el, ctx, 'origin', "origin: 'center' and skewX, the docs' block. Drag the square; slide the skew.");
  rect.origin = 'center';
  drive(stage, 'skewX', [-60, 60, 1], 0, (v) => (rect.skewX = v), 4);

  return stage.dispose;
};

export default mount;
