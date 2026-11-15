// PrimitiveMesh.createPlane: every parameter as a slider
import type { Mount } from '@/types.ts';
import { PrimitiveMesh } from '@galacean/engine';
import { primitiveLab } from '../../shared/gfx-mesh.ts';

const mount: Mount = (el, ctx) =>
  primitiveLab(el, ctx, {
    call: 'createPlane',
    distance: 6.5,
    params: [
    { label: 'width', min: 0.5, max: 4, step: 0.1, value: 3 },
    { label: 'height', min: 0.5, max: 4, step: 0.1, value: 3 },
    { label: 'horizontalSegments', min: 1, max: 16, step: 1, value: 4 },
    { label: 'verticalSegments', min: 1, max: 16, step: 1, value: 4 },
    ],
    make: (engine, v) => PrimitiveMesh.createPlane(engine, v[0]!, v[1]!, v[2]!, v[3]!),
  });

export default mount;
