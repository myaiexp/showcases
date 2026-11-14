// constructGrid: a lattice of splat points with live extents, step, radius and colour function
import * as THREE from 'three';
import { SplatMesh, constructGrid } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, select, readout } from '../../shared/controls.ts';

const COLORS = ['default (RGB cosines)', 'height rainbow', 'checker'] as const;
type ColorMode = (typeof COLORS)[number];

type ColorFn = (color: THREE.Color, point: THREE.Vector3) => void;
const colorFns: Record<ColorMode, ColorFn | undefined> = {
  // Leaving `color` out uses constructGrid's own RGB-modulated default.
  'default (RGB cosines)': undefined,
  // A function receives the colour to fill in and the grid point it belongs to.
  'height rainbow': (color, p) => void color.setHSL(0.75 - (p.y + 3) * 0.1, 0.8, 0.6),
  checker: (color, p) => {
    const odd = (Math.round(p.x * 4) + Math.round(p.y * 4) + Math.round(p.z * 4)) & 1;
    color.setRGB(odd ? 1 : 0.15, odd ? 0.6 : 0.5, odd ? 0.1 : 1);
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [3, 2.4, 4.5], orbit: 0.2 });
  const status = ctx.preview ? null : readout(el);
  const p = { half: ctx.preview ? 1.5 : 2, step: 0.5, radius: 0.04, shadow: 2, mode: COLORS[0] as ColorMode };

  let grid: SplatMesh | null = null;
  const rebuild = (): void => {
    if (grid) {
      stage.scene.remove(grid);
      grid.dispose();
    }
    grid = new SplatMesh({
      constructSplats: (splats) =>
        constructGrid({
          splats,
          extents: new THREE.Box3(new THREE.Vector3(-p.half, -p.half, -p.half), new THREE.Vector3(p.half, p.half, p.half)),
          stepSize: p.step,
          pointRadius: p.radius,
          pointShadowScale: p.shadow,
          color: colorFns[p.mode],
        }),
    });
    stage.scene.add(grid);
    // Each grid point becomes two splats: a black "shadow" copy behind a coloured one.
    const n = Math.floor((2 * p.half) / p.step + 1e-6) + 1;
    if (status) status.textContent = `${n}³ points, ${2 * n ** 3} splats`;
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'extents ±', 1, 3, 0.5, p.half, (v) => ((p.half = v), rebuild()));
    slider(bar, 'stepSize', 0.25, 1, 0.25, p.step, (v) => ((p.step = v), rebuild()));
    slider(bar, 'pointRadius', 0.01, 0.12, 0.01, p.radius, (v) => ((p.radius = v), rebuild()));
    slider(bar, 'pointShadowScale', 1, 4, 0.5, p.shadow, (v) => ((p.shadow = v), rebuild()));
    select(bar, 'color', COLORS, (v) => ((p.mode = v), rebuild()));
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
