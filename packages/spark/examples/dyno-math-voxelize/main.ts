// round, floor, div and mix snapping a mesh to a voxel grid and a colour palette
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const f = (v: number) => dyno.dynoConst('float', v);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.8], orbit: 0.25 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  const cell = dyno.dynoFloat(0.12); // voxel edge length
  const levels = dyno.dynoFloat(4); // colour steps per channel
  const amount = dyno.dynoFloat(1); // 0 = original, 1 = fully snapped

  const voxelize = dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
    if (!gsplat) throw new Error('no gsplat');
    const { center, rgb, scales } = dyno.splitGsplat(gsplat).outputs;
    // Snap: divide by the cell, round to the nearest whole cell, multiply back.
    const snapped = dyno.mul(dyno.round(dyno.div(center, cell)), cell);
    // Posterise: scale the colour up, floor it to whole steps, scale it back down.
    const steps = dyno.div(dyno.floor(dyno.mul(rgb, levels)), dyno.sub(levels, f(1)));
    // Splats become cube-ish blobs the size of a cell, so the voxels read as solid.
    const block = dyno.mul(dyno.combine({ vectorType: 'vec3', x: cell, y: cell, z: cell }), f(0.55));
    return {
      gsplat: dyno.combineGsplat({
        gsplat,
        center: dyno.mix(center, snapped, amount),
        rgb: dyno.mix(rgb, dyno.clamp(steps, f(0), f(1)), amount),
        scales: dyno.mix(scales, block, amount),
      }),
    };
  });
  knot.objectModifiers = [voxelize];
  knot.updateGenerator();

  let auto = true;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'cell size', 0.03, 0.4, 0.01, cell.value, (v) => ((auto = false), (cell.value = v)));
    slider(bar, 'colour levels', 2, 12, 1, levels.value, (v) => ((auto = false), (levels.value = v)));
    slider(bar, 'amount', 0, 1, 0.02, amount.value, (v) => ((auto = false), (amount.value = v)));
  }

  stage.run((time) => {
    if (auto) {
      // Breathe between the smooth knot and its voxel version.
      amount.value = 0.5 + 0.5 * Math.sin(time * 0.9);
      cell.value = 0.1 + 0.04 * Math.sin(time * 0.37);
    }
    knot.updateVersion();
  });
  return () => stage.dispose();
};

export default mount;
