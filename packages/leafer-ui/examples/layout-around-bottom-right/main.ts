// Layout: around at the bottom-right corner
import type { Mount } from '@/types.ts';
import { anchorScene } from '../../shared/anchor-demo.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const { stage, rect } = anchorScene(el, ctx, 'around', "around: 'bottom-right': the rect's far corner sits on its (x, y), the white dot. Drag the square.");
  rect.around = 'bottom-right';
  drive(stage, 'rotation', [-180, 180, 1], 0, (v) => (rect.rotation = v), 4);

  return stage.dispose;
};

export default mount;
