// camera.antiAliasing = AntiAliasing.FXAA, with MSAA off to see it alone
import { AntiAliasing, BlinnPhongMaterial, MSAASamples, PrimitiveMesh, RenderFace } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 5], hint: 'MSAA is off here (msaaSamples = None) so only FXAA smooths the edges.' });
  const say = caption(stage);
  camera.msaaSamples = MSAASamples.None;
  const bars = PrimitiveMesh.createCuboid(engine, 0.12, 3.4, 0.12);
  for (let i = 0; i < 7; i++) {
    const m = new BlinnPhongMaterial(engine);
    m.baseColor.set(0.9, 0.75, 0.4, 1);
    const bar = add(root, bars, m, [(i - 3) * 0.55 - 1.2, 0, 0], 'bar');
    bar.entity.transform.setRotation(0, 0, 14 + i * 6);
  }
  const texture = canvasTexture(engine, (g, s) => {
    g.clearRect(0, 0, s, s);
    g.fillStyle = '#7fb5ff';
    for (let i = 0; i < 10; i++) g.fillRect(0, (i * s) / 10 + 4, s, 10);
    g.beginPath();
    g.arc(s / 2, s / 2, s * 0.3, 0, Math.PI * 2);
    g.fill();
  });
  const cut = new BlinnPhongMaterial(engine);
  cut.baseTexture = texture;
  cut.alphaCutoff = 0.5;
  cut.renderFace = RenderFace.Double;
  const grille = add(root, PrimitiveMesh.createPlane(engine, 2.2, 2.2), cut, [1.7, 0, 0], 'cut-out');
  grille.entity.transform.setRotation(90, 0, 0);
  spin(grille.entity, [0, 0, 0]);
  const apply = (on: boolean): void => {
    camera.antiAliasing = on ? AntiAliasing.FXAA : AntiAliasing.None;
    say(`antiAliasing = AntiAliasing.${on ? 'FXAA' : 'None'}`);
  };
  if (stage.preview) steps(root, 2.2, 2, (i) => apply(i === 1));
  else {
    apply(false);
    checkbox(stage.bar, 'FXAA', false, apply);
  }
  stage.own(() => {
    bars.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
