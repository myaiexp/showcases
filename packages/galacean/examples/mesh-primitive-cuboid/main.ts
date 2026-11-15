// PrimitiveMesh.createCuboid: every parameter as a slider
import type { Mount } from '@/types.ts';
import { PrimitiveMesh } from '@galacean/engine';
import { primitiveLab } from '../../shared/gfx-mesh.ts';

const mount: Mount = (el, ctx) =>
  primitiveLab(el, ctx, {
    call: 'createCuboid',
    distance: 4.8,
    params: [
    { label: 'width', min: 0.3, max: 3, step: 0.05, value: 1.5 },
    { label: 'height', min: 0.3, max: 3, step: 0.05, value: 1.2 },
    { label: 'depth', min: 0.3, max: 3, step: 0.05, value: 1.0 },
    ],
    make: (engine, v) => PrimitiveMesh.createCuboid(engine, v[0]!, v[1]!, v[2]!),
  });

export default mount;
