// Scale multiplies everything below an entity; non-uniform scale skews a child
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addShape, createScene, material } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { orbit: { distance: 11, pitch: -22, autoRotate: 8 }, floor: 18 });
  const { app } = scene;

  // Left: scale on the leaf. The parent stays at scale 1, so the child keeps its own proportions.
  const tidy = new pc.Entity('tidy-parent');
  tidy.setPosition(-3, 1, 0);
  app.root.addChild(tidy);
  const leafBox = addShape(tidy, 'box', material('#7bc67b'), [0, 0, 0], [1, 2, 1], 'leaf');
  const leafChild = addShape(tidy, 'box', material('#f2c14e'), [1.4, 0, 0], 0.8, 'child');

  // Right: scale on the parent. A rotated child under a stretched parent is skewed.
  const stretched = new pc.Entity('stretched-parent');
  stretched.setPosition(3, 1, 0);
  app.root.addChild(stretched);
  const skewChild = addShape(stretched, 'box', material('#e8794a'), [1.4, 0, 0], 0.8, 'child');
  addShape(stretched, 'box', material('#4a5164'), [0, 0, 0], [0.4, 0.4, 0.4], 'marker');

  let stretch = 1;
  let angle = 0;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview) {
      stretch = 1 + (Math.sin(t) + 1) * 0.9;
      angle = 45 + Math.sin(t * 0.5) * 20;
    }
    // Non-uniform scale on the parent (stretch in Y), a rotation on the child.
    stretched.setLocalScale(1, stretch, 1);
    skewChild.setLocalEulerAngles(0, 0, angle);
    // The tidy side puts the same stretch on the leaf instead; the parent stays at 1.
    leafBox.setLocalScale(1, 2 * stretch, 1);
    leafChild.setLocalEulerAngles(0, 0, angle);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('Y stretch', 0.5, 3, 0.05, 1, (v) => (stretch = v));
    panel.slider('child rotation (Z)', 0, 90, 1, 0, (v) => (angle = v));
    panel.row();
    const out = panel.readout();
    app.on('update', () => (out.textContent = `stretched child getScale() ${skewChild.getScale().toString()}   tidy child ${leafChild.getScale().toString()}`));
    panel.row();
    panel.readout('Stretching a parent stretches its children too and, once they turn, shears them. Put scale on the leaves that draw things.');
  }

  return () => scene.dispose();
};

export default mount;
