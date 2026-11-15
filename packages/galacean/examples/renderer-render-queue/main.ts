// A material's isTransparent and alphaCutoff pick the render queue
import { MeshRenderer, PrimitiveMesh, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, spin, steps, unlit } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { canvasTexture, softDot } from '../../shared/textures.ts';

const MODES = ['Opaque', 'AlphaTest', 'Transparent'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 5], light: false });
  const say = caption(stage);
  spin(add(root, PrimitiveMesh.createTorus(engine, 1.4, 0.3, 16, 40), unlit(engine, [0.9, 0.35, 0.3]), [0, 0, -0.4], 'ring').entity, [0, 0, 30]);
  const texture = canvasTexture(engine, softDot('#ffe9a8'), { size: 256 });
  stage.own(() => texture.destroy());
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const quad = root.createChild('quad');
  quad.transform.setRotation(90, 0, 0);
  const renderer = quad.addComponent(MeshRenderer);
  renderer.mesh = PrimitiveMesh.createPlane(engine, 3, 3);
  renderer.setMaterial(material);
  const apply = (mode: (typeof MODES)[number]): void => {
    material.isTransparent = mode === 'Transparent';
    material.alphaCutoff = mode === 'AlphaTest' ? 0.5 : 0;
    say(`isTransparent ${material.isTransparent}, alphaCutoff ${material.alphaCutoff}  ->  ${mode} queue`);
  };
  if (stage.preview) steps(root, 2.2, MODES.length, (i) => apply(MODES[i]!));
  else {
    apply('Transparent');
    select(stage.bar, 'queue', MODES, apply, 'Transparent');
  }
  stage.own(() => renderer.mesh.destroy());
  return stage.dispose;
};

export default mount;
