// PrimitiveMesh.createTorus: every parameter as a slider
import type { Mount } from '@/types.ts';
import { PrimitiveMesh } from '@galacean/engine';
import { primitiveLab } from '../../shared/gfx-mesh.ts';

const mount: Mount = (el, ctx) =>
  primitiveLab(el, ctx, {
    call: 'createTorus',
    distance: 6.5,
    params: [
    { label: 'radius', min: 0.5, max: 2, step: 0.05, value: 1 },
    { label: 'tubeRadius', min: 0.1, max: 0.8, step: 0.02, value: 0.35 },
    { label: 'radialSegments', min: 3, max: 32, step: 1, value: 16, sweep: [3, 28] },
    { label: 'tubularSegments', min: 3, max: 64, step: 1, value: 32, sweep: [3, 48] },
    { label: 'arc', min: 30, max: 360, step: 5, value: 360, sweep: [120, 360] },
    ],
    make: (engine, v) => PrimitiveMesh.createTorus(engine, v[0]!, v[1]!, v[2]!, v[3]!, v[4]!),
  });

export default mount;
