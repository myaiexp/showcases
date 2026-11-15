// enableTransparentShadow lets cutoff and transparent renderers cast
import { BlinnPhongMaterial, PrimitiveMesh, RenderFace, ShadowType } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, floor, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await demo(el, ctx, { camera: [3, 5, 8], target: [0, 0.8, 0] });
  const say = caption(stage);
  floor(root, engine, 0, 14);
  light.entity.transform.setRotation(-55, -35, 0);
  light.shadowType = ShadowType.SoftLow;
  const grille = canvasTexture(engine, (g, s) => {
    g.clearRect(0, 0, s, s);
    g.fillStyle = '#e9d9b0';
    for (let i = 0; i < 4; i++) g.fillRect((i * s) / 4 + s / 16, 0, s / 8, s);
    g.fillRect(0, s / 2 - s / 16, s, s / 8);
  });
  stage.own(() => grille.destroy());
  const cut = new BlinnPhongMaterial(engine);
  cut.baseTexture = grille;
  cut.alphaCutoff = 0.5;
  cut.renderFace = RenderFace.Double;
  const panel = add(root, PrimitiveMesh.createPlane(engine, 2.6, 2.6), cut, [-2, 1.6, 0], 'grille');
  panel.entity.transform.setRotation(70, 0, 0);
  const glass = glassMaterial(engine);
  add(root, PrimitiveMesh.createSphere(engine, 0.9, 32), glass, [2, 1.1, 0], 'glass');
  const apply = (on: boolean): void => {
    stage.scene.enableTransparentShadow = on;
    say(`enableTransparentShadow = ${on}`);
  };
  if (stage.preview) steps(root, 2.5, 2, (i) => apply(i === 1));
  else {
    apply(true);
    checkbox(stage.bar, 'enableTransparentShadow', true, apply);
  }
  return stage.dispose;
};

function glassMaterial(engine: Parameters<typeof canvasTexture>[0]): BlinnPhongMaterial {
  const m = new BlinnPhongMaterial(engine);
  m.baseColor.set(0.1, 0.35, 0.7, 0.45);
  m.isTransparent = true;
  return m;
}

export default mount;
