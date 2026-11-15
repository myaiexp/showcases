// worldForward, worldRight and worldUp drawn as arrows on a turning entity
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { arrow, lit, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Red is worldRight, green worldUp, blue worldForward (which points down -Z until the entity turns).' });
  const { engine, root } = stage;
  const camera = lit(stage, [4, 3.5, 8]);
  const box = solid(root, PrimitiveMesh.createCuboid(engine, 1, 0.6, 1.6), phong(engine, PALETTE.grey));
  const arrows = [
    { name: 'worldRight', color: PALETTE.red, hex: '#ee5a5a' },
    { name: 'worldUp', color: PALETTE.green, hex: '#5ad96e' },
    { name: 'worldForward', color: PALETTE.blue, hex: '#6b8eff' },
  ].map((a) => ({ ...a, arrow: arrow(root, unlit(engine, a.color)) }));
  const tag = labels(stage, camera);
  const tags = arrows.map((a) => tag.add(a.name, a.hex));
  const info = panel(stage);
  const origin = new Vector3();
  const tip = new Vector3();
  tick(root, (_dt, t) => {
    box.transform.setRotation(Math.sin(t * 0.7) * 40, t * 35, Math.cos(t * 0.5) * 30);
    const { worldRight, worldUp, worldForward, worldPosition } = box.transform;
    origin.copyFrom(worldPosition);
    [worldRight, worldUp, worldForward].forEach((dir, i) => {
      arrows[i]!.arrow.set(origin, dir.clone().scale(2.2));
      tags[i]!.at(tip.copyFrom(origin).add(dir.clone().scale(2.5)));
    });
    info.text(`worldForward ${worldForward.x.toFixed(2)}, ${worldForward.y.toFixed(2)}, ${worldForward.z.toFixed(2)}`);
  });
  return stage.dispose;
};

export default mount;
