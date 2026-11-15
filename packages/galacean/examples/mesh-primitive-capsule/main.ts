// PrimitiveMesh.createCapsule: every parameter as a slider
import type { Mount } from '@/types.ts';
import { PrimitiveMesh } from '@galacean/engine';
import { primitiveLab } from '../../shared/gfx-mesh.ts';

const mount: Mount = (el, ctx) =>
  primitiveLab(el, ctx, {
    call: 'createCapsule',
    distance: 6.5,
    params: [
    { label: 'radius', min: 0.2, max: 1.2, step: 0.05, value: 0.6 },
    { label: 'height', min: 0, max: 3, step: 0.1, value: 1.2 },
    { label: 'radialSegments', min: 4, max: 40, step: 1, value: 20, sweep: [4, 30] },
    { label: 'heightSegments', min: 1, max: 10, step: 1, value: 1 },
    ],
    make: (engine, v) => PrimitiveMesh.createCapsule(engine, v[0]!, v[1]!, v[2]!, v[3]!),
  });

export default mount;
