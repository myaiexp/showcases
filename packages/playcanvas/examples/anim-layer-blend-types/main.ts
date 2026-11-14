// Overwrite and additive layers side by side, over the same walking base layer
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene } from '../../shared/components.ts';
import { createPanel } from '../../shared/panel.ts';
import { addPad, createCreature, leanClip, locomotion } from '../../shared/animation.ts';

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, {
    floor: 18,
    orbit: { distance: 8, pitch: -12, yaw: 10, target: new pc.Vec3(0, 1.1, 0), autoRotate: ctx.preview ? 6 : 0 },
  });
  const { app } = scene;

  // The lean clip is the same for both; only the blend type of its layer differs.
  const lean = leanClip('Lean', 1, 0.6);
  const layers = [pc.ANIM_LAYER_OVERWRITE, pc.ANIM_LAYER_ADDITIVE].map((blendType, i) => {
    const creature = createCreature();
    creature.setLocalPosition(i ? 1.6 : -1.6, 0, 0);
    app.root.addChild(creature);
    addPad(creature);
    creature.addComponent('anim', { activate: true });
    creature.anim!.assignAnimation('Walk', locomotion('Walk', 1, 1));
    const layer = creature.anim!.addLayer('Lean', 0, undefined, blendType);
    layer.assignAnimation('Lean', lean);
    layer.play('Lean');
    return layer;
  });

  const setWeight = (w: number): void => layers.forEach((l) => (l.weight = w));
  if (ctx.preview) {
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      setWeight(0.5 + Math.sin(t * 0.9) * 0.5);
    });
  } else {
    const panel = createPanel(el);
    panel.slider('Lean layer weight', 0, 1, 0.05, 0, setWeight);
    panel.readout('Left: overwrite blends from the walk pose towards the lean pose. Right: additive adds the lean on top of the walk.');
    panel.row();
    panel.button('both blendToWeight(1, 1)', () => layers.forEach((l) => l.blendToWeight(1, 1)));
    panel.button('both blendToWeight(0, 1)', () => layers.forEach((l) => l.blendToWeight(0, 1)));
  }
  return () => scene.dispose();
};

export default mount;
