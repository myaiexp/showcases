// A DirectLight component toggled with enabled: the entity stays, the effect goes
import { DirectLight, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { addCamera, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'directLight.enabled = false darkens the scene but the light entity is still there.' });
  const { engine, root } = stage;
  addCamera(root, [0, 1.5, 6]);
  stage.scene.ambientLight.diffuseSolidColor.set(0.08, 0.08, 0.1, 1);
  const lightEntity = root.createChild('light');
  lightEntity.transform.setRotation(-35, -40, 0);
  const directLight = lightEntity.addComponent(DirectLight);
  const ball = solid(root, PrimitiveMesh.createSphere(engine, 1.2, 32), phong(engine, PALETTE.amber));
  const info = panel(stage);
  let auto = true;
  const box = stage.preview ? undefined : checkbox(stage.bar, 'directLight.enabled', true, (v) => ((auto = false), (directLight.enabled = v)));
  tick(root, (_dt, t) => {
    if (auto) {
      directLight.enabled = Math.floor(t / 1.5) % 2 === 0;
      if (box) box.checked = directLight.enabled;
    }
    ball.transform.rotate(0, 0.5, 0);
    info.text(`directLight.enabled = ${directLight.enabled}\nlightEntity.isActive = ${lightEntity.isActive}`);
  });
  return stage.dispose;
};

export default mount;
