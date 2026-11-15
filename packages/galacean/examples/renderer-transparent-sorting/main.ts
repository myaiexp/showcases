// The transparent queue draws far to near, so overlapping panes blend
import { MeshRenderer, PrimitiveMesh, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { demo, orbit } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 6], light: false });
  const colors: [number, number, number][] = [[0.95, 0.3, 0.3], [0.3, 0.9, 0.4], [0.3, 0.45, 0.95]];
  const meshes = colors.map((c, i) => {
    const entity = root.createChild('pane');
    entity.transform.setPosition((i - 1) * 0.5, 0, (i - 1) * 0.9);
    const renderer = entity.addComponent(MeshRenderer);
    renderer.mesh = PrimitiveMesh.createPlane(engine, 2.4, 2.4);
    entity.transform.setRotation(90, 0, 0);
    const m = new UnlitMaterial(engine);
    m.baseColor.set(...c, 0.55);
    m.isTransparent = true;
    renderer.setMaterial(m);
    return renderer.mesh;
  });
  orbit(camera.entity, [0, 0, 0], 6, 1.2, 0.5);
  stage.own(() => meshes.forEach((m) => m.destroy()));
  return stage.dispose;
};

export default mount;
