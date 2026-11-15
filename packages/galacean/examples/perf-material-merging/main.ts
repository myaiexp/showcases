// The same cubes with one shared material, then with a material each: fewer materials can batch into fewer draws
import { type BlinnPhongMaterial, MeshRenderer, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { lit, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Identical looks, different material counts. Frame time is the smoothed actualDeltaTime; on a software-rendered page the gap is larger than on a real GPU.' });
  const { engine, root } = stage;
  const count = stage.preview ? 120 : 400;
  const columns = Math.ceil(Math.sqrt(count * 1.8));
  lit(stage, [0, 0, 20]);
  const mesh = PrimitiveMesh.createCuboid(engine, 0.55, 0.55, 0.55);
  const shared: BlinnPhongMaterial = phong(engine, [0.85, 0.55, 0.25]);
  const unique = Array.from({ length: count }, () => phong(engine, [0.85, 0.55, 0.25]));
  const renderers: MeshRenderer[] = [];
  for (let i = 0; i < count; i++) {
    const e = solid(root, mesh, shared, [((i % columns) - columns / 2) * 0.7, (Math.floor(i / columns) - 3.5) * 0.7, 0]);
    renderers.push(e.getComponent(MeshRenderer)!);
  }
  const info = panel(stage, 'bl');
  let merged = true;
  const apply = (): void => renderers.forEach((r, i) => r.setMaterial(merged ? shared : unique[i]!));
  const box = stage.preview ? undefined : checkbox(stage.bar, 'one shared material', true, (v) => ((merged = v), apply()));
  let smooth = 0;
  let last = 0;
  tick(root, (_dt, t) => {
    smooth = smooth * 0.95 + engine.time.actualDeltaTime * 1000 * 0.05;
    root.transform.setRotation(0, Math.sin(t * 0.5) * 20, 0);
    if (stage.preview && t - last > 3) {
      last = t;
      merged = !merged;
      apply();
      if (box) box.checked = merged;
    }
    info.text(`${count} cubes, ${merged ? '1 material' : `${count} materials`}\nframe time ${smooth.toFixed(1)} ms`);
  });
  return stage.dispose;
};

export default mount;
