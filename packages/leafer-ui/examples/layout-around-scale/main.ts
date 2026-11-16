// Layout: scale around the point (50, 50) with around
import type { Mount } from '@/types.ts';
import { anchorScene } from '../../shared/anchor-demo.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, rect } = anchorScene(el, ctx, 'around', "around: 'center' puts the rect's centre on its (x, y), the white dot, and scales there. Drag the square.");
  rect.around = 'center';
  drive(stage, 'scale', [0.5, 2, 0.05], 1, (v) => (rect.scale = v), 4);

  return stage.dispose;
};

export default mount;
