// Texture.wrapModeU/V: Clamp, Repeat and Mirror outside the [0, 1] UV range
import { MeshRenderer, TextureWrapMode, UnlitMaterial, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, quadMesh, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { canvasTexture, uvGrid } from '../../shared/textures.ts';

const MODES = ['Clamp', 'Repeat', 'Mirror'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 6], light: false });
  const say = caption(stage);
  const texture = canvasTexture(engine, uvGrid, { size: 256 });
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  material.tilingOffset = new Vector4(2, 2, -0.5, -0.5);
  const quad = root.createChild('quad');
  const renderer = quad.addComponent(MeshRenderer);
  renderer.mesh = quadMesh(engine, 4.4, 4.4);
  renderer.setMaterial(material);
  const apply = (m: (typeof MODES)[number]): void => {
    texture.wrapModeU = texture.wrapModeV = TextureWrapMode[m];
    say(`wrapModeU = wrapModeV = TextureWrapMode.${m}`);
  };
  if (stage.preview) steps(quad, 2.2, MODES.length, (i) => apply(MODES[i]!));
  else {
    apply('Repeat');
    select(stage.bar, 'wrap mode', MODES, apply, 'Repeat');
  }
  stage.own(() => {
    renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
