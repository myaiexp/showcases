// PrimitiveMesh.createSphere: every parameter as a slider
import type { Mount } from '@/types.ts';
import { PrimitiveMesh } from '@galacean/engine';
import { primitiveLab } from '../../shared/gfx-mesh.ts';

const mount: Mount = (el, ctx) =>
  primitiveLab(el, ctx, {
    call: 'createSphere',
    distance: 4.8,
    params: [
    { label: 'radius', min: 0.3, max: 1.6, step: 0.05, value: 1 },
    { label: 'segments', min: 2, max: 40, step: 1, value: 18, sweep: [3, 36] },
    ],
    make: (engine, v) => PrimitiveMesh.createSphere(engine, v[0]!, v[1]!),
  });

export default mount;
