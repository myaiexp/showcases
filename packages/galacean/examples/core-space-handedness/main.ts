// The right-handed world: +Y up, +Z toward the viewer, camera down -Z
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { arrow, lit, PALETTE, phong, solid, tick, unlit } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const VIEWS = { 'angled': [4.5, 3.5, 7], 'front (from +Z)': [0, 0.5, 9], 'top (from +Y)': [0, 9, 0.01], 'right (from +X)': [9, 0.5, 0] } as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'The cube turns with rotate(0, +angle, 0). From above (top view) positive angles go counterclockwise.' });
  const { engine, root } = stage;
  const camera = lit(stage, [...VIEWS.angled]);
  const tag = labels(stage, camera);
  const axes: [string, Vector3, readonly [number, number, number], string][] = [
    ['+X', new Vector3(3, 0, 0), PALETTE.red, '#ee5a5a'],
    ['+Y', new Vector3(0, 3, 0), PALETTE.green, '#5ad96e'],
    ['+Z', new Vector3(0, 0, 3), PALETTE.blue, '#6b8eff'],
  ];
  const origin = new Vector3();
  const tips = axes.map(([name, v, color, hex]) => {
    arrow(root, unlit(engine, color), 0.06).set(origin, v);
    const t = tag.add(name, hex);
    return () => t.at(v.clone().scale(1.12));
  });
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 0.4, 1), phong(engine, PALETTE.amber));
  solid(cube, PrimitiveMesh.createCuboid(engine, 0.3, 0.45, 0.3), phong(engine, PALETTE.white), [0.7, 0, 0], 'marker');
  const info = panel(stage);
  if (!stage.preview) {
    select(stage.bar, 'camera', Object.keys(VIEWS), (k) => {
      const p = VIEWS[k as keyof typeof VIEWS];
      camera.entity.transform.setPosition(p[0], p[1], p[2]);
      camera.entity.transform.lookAt(new Vector3(0, 0, 0), k.startsWith('top') ? new Vector3(0, 0, -1) : new Vector3(0, 1, 0));
    });
  }
  tick(root, (dt) => {
    cube.transform.rotate(0, 50 * dt, 0);
    for (const t of tips) t();
    const f = camera.entity.transform.worldForward;
    info.text(`camera forward ${f.x.toFixed(2)}, ${f.y.toFixed(2)}, ${f.z.toFixed(2)}\ncube rotation.y ${cube.transform.rotation.y.toFixed(0)} deg`);
  });
  return stage.dispose;
};

export default mount;
