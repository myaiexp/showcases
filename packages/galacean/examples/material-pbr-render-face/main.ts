// PBRMaterial.renderFace chooses which side of a triangle is drawn
import { PBRMaterial, PrimitiveMesh, RenderFace } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, tick } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { matDemo } from '../../shared/mat-demo.ts';

const FACES = [RenderFace.Front, RenderFace.Back, RenderFace.Double];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'Planes with Front, Back, Double, each turning about its up axis.' });
  caption(stage, 'RenderFace.Front | Back | Double');
  const colors: [number, number, number][] = [[0.9, 0.4, 0.3], [0.3, 0.7, 0.9], [0.5, 0.9, 0.4]];
  const planes = FACES.map((face, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin(colors[i]!), 1);
    m.metallic = 0;
    m.roughness = 0.5;
    m.renderFace = face;
    const plane = add(root, PrimitiveMesh.createPlane(engine, 2.4, 2.4), m, [(i - 1) * 3, 0, 0]);
    plane.entity.transform.setRotation(90, 0, 0);
    return plane;
  });
  tick(root, (_dt, t) => planes.forEach((p) => p.entity.transform.setRotation(90, t * 50, 0)));
  if (!stage.preview) select(stage.bar, 'middle plane', ['Front', 'Back', 'Double'] as const, (v) => (planes[1]!.renderer.getMaterial() as PBRMaterial).renderFace = RenderFace[v], 'Back');
  return stage.dispose;
};

export default mount;
