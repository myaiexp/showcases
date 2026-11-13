// constructSpherePoints: subdivided sphere of oriented discs with depth, radius, colour and filter
import * as THREE from 'three';
import { SplatMesh, constructSpherePoints } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, select, readout } from '../../shared/controls.ts';

const FILTERS = ['none', 'equator band', 'upper hemisphere', 'stripes'] as const;
type FilterName = (typeof FILTERS)[number];

// A filter gets each unit-sphere point and returns whether to keep it.
const filters: Record<FilterName, ((p: THREE.Vector3) => boolean) | null> = {
  none: null,
  'equator band': (p) => Math.abs(p.y) < 0.3,
  'upper hemisphere': (p) => p.y > 0,
  stripes: (p) => Math.sin(Math.atan2(p.z, p.x) * 6) > 0,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1, 3], orbit: 0.3 });
  const status = ctx.preview ? null : readout(el);
  const p = { depth: ctx.preview ? 3 : 4, radius: 1, filter: (ctx.preview ? 'equator band' : 'none') as FilterName };

  let sphere: SplatMesh | null = null;
  const rebuild = (): void => {
    if (sphere) {
      stage.scene.remove(sphere);
      sphere.dispose();
    }
    sphere = new SplatMesh({
      constructSplats: (splats) =>
        constructSpherePoints({
          splats,
          radius: p.radius,
          maxDepth: p.depth,
          filter: filters[p.filter],
          pointRadius: 0.025 * p.radius * (4 / (p.depth + 1)),
          // The colour function runs on the unit-sphere point: latitude picks the hue.
          color: (color, point) => void color.setHSL(0.6 - 0.5 * (point.y * 0.5 + 0.5), 0.8, 0.6),
        }),
    });
    stage.scene.add(sphere);
    const built = sphere;
    // Splats are constructed during initialisation, so read the count once it resolves.
    if (status) void built.initialized.then((m) => void (status.textContent = `${m.packedSplats?.numSplats ?? 0} points (maxDepth ${p.depth})`));
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'maxDepth', 0, 6, 1, p.depth, (v) => ((p.depth = v), rebuild()));
    slider(bar, 'radius', 0.5, 1.5, 0.1, p.radius, (v) => ((p.radius = v), rebuild()));
    select(bar, 'filter', FILTERS, (v) => ((p.filter = v), rebuild()));
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
