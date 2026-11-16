// Layout: rotation around an origin at the rect's centre
import type { Mount } from '@/types.ts';
import { anchorScene } from '../../shared/anchor-demo.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, rect } = anchorScene(el, ctx, 'origin', "origin: 'center' and rotation, the docs' block. Drag the square; slide the angle.");
  rect.origin = 'center';
  drive(stage, 'rotation', [-180, 180, 1], 0, (v) => (rect.rotation = v), 4);

  return stage.dispose;
};

export default mount;
