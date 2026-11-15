// scene.background.mode switches between SolidColor, Texture and Sky
import { BackgroundMode, PrimitiveMesh, SkyProceduralMaterial, Texture2D } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { checker, canvasTexture } from '../../shared/textures.ts';

const MODES = ['SolidColor', 'Texture', 'Sky'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 5] });
  const say = caption(stage);
  spin(add(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), pbr(engine, [0.9, 0.55, 0.3], 0, 0.5)).entity, [20, 40, 0]);
  const { background } = stage.scene;
  background.solidColor.set(0.04, 0.12, 0.2, 1);
  const texture: Texture2D = canvasTexture(engine, checker('#d6c9a8', '#3b5a8a', 8), { size: 256 });
  stage.own(() => texture.destroy());
  background.texture = texture;
  background.sky.material = new SkyProceduralMaterial(engine);
  background.sky.mesh = PrimitiveMesh.createSphere(engine);
  const apply = (m: (typeof MODES)[number]): void => {
    background.mode = BackgroundMode[m];
    say(`background.mode = BackgroundMode.${m}`);
  };
  if (stage.preview) steps(camera.entity, 2.2, MODES.length, (i) => apply(MODES[i]!));
  else {
    apply('SolidColor');
    select(stage.bar, 'mode', MODES, apply);
  }
  return stage.dispose;
};

export default mount;
