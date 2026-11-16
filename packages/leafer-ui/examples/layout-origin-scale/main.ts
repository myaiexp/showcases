// Layout: scale around an origin at the rect's centre
import type { Mount } from '@/types.ts';
import { anchorScene } from '../../shared/anchor-demo.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, rect } = anchorScene(el, ctx, 'origin', "origin: 'center' and scale, the docs' block. Drag the square; slide the scale.");
  rect.origin = 'center';
  drive(stage, 'scale', [0.5, 2, 0.05], 1, (v) => (rect.scale = v), 4);

  return stage.dispose;
};

export default mount;
