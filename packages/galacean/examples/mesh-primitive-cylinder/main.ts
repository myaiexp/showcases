// PrimitiveMesh.createCylinder: every parameter as a slider
import type { Mount } from '@/types.ts';
import { PrimitiveMesh } from '@galacean/engine';
import { primitiveLab } from '../../shared/gfx-mesh.ts';

const mount: Mount = (el, ctx) =>
  primitiveLab(el, ctx, {
    call: 'createCylinder',
    distance: 6,
    params: [
    { label: 'radiusTop', min: 0, max: 1.5, step: 0.05, value: 0.6 },
    { label: 'radiusBottom', min: 0, max: 1.5, step: 0.05, value: 1 },
    { label: 'height', min: 0.5, max: 3, step: 0.1, value: 2 },
    { label: 'radialSegments', min: 3, max: 40, step: 1, value: 20, sweep: [3, 30] },
    { label: 'heightSegments', min: 1, max: 10, step: 1, value: 1 },
    ],
    make: (engine, v) => PrimitiveMesh.createCylinder(engine, v[0]!, v[1]!, v[2]!, v[3]!, v[4]!),
  });

export default mount;
