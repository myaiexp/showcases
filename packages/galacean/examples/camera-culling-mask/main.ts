// cullingMask selects which entity layers a camera renders
import { Layer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const layers = [Layer.Layer1, Layer.Layer2, Layer.Layer3];
const names = ['Layer1', 'Layer2', 'Layer3'];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 2, 7.5], target: [0, 0, 0] });
  const say = caption(stage);
  const meshes = [PrimitiveMesh.createSphere(engine, 0.9), PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), PrimitiveMesh.createTorus(engine, 0.8, 0.3)];
  const colors: [number, number, number][] = [[0.95, 0.4, 0.3], [0.35, 0.8, 0.5], [0.4, 0.55, 0.95]];
  meshes.forEach((mesh, i) => {
    const { entity } = add(root, mesh, pbr(engine, colors[i]!, 0, 0.4), [(i - 1) * 2.6, 0, 0], names[i]);
    entity.layer = layers[i]!;
    spin(entity, [20, 45, 0]);
  });
  const show = (mask: number): void => {
    camera.cullingMask = mask;
    say(`cullingMask = ${names.filter((_n, i) => mask & layers[i]!).join(' | ') || 'Nothing'}`);
  };
  if (stage.preview) {
    const masks = [Layer.Everything, layers[0]!, layers[1]!, layers[2]!, layers[0]! | layers[2]!];
    steps(camera.entity, 2, masks.length, (i) => show(masks[i]!));
  } else {
    let mask = Layer.Everything as number;
    show(mask);
    names.forEach((n, i) => checkbox(stage.bar, n, true, (on) => show((mask = on ? mask | layers[i]! : mask & ~layers[i]!))));
  }
  return stage.dispose;
};

export default mount;
