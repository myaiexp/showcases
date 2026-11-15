// DynamicCollider.centerOfMass: a weighted ball rights itself
import { PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { add, blinn } from '../../shared/gfx-kit.ts';
import { ball, PALETTE, rounds, world } from '../../shared/phys-kit.ts';
import { tagger } from '../../shared/phys-tag.ts';

const mount: Mount = async (el, ctx) => {
  const w = await world(el, ctx, { camera: [0, 2.2, 8], target: [0, 1, 0], hint: 'The red dot marks local (0, -0.7, 0).' });
  const tags = tagger(w);
  const round = rounds(w, 8, (_n, holder) => {
    tags.clear();
    [false, true].forEach((weighted, i) => {
      const b = ball(holder, [(i * 2 - 1) * 2, 0.8, 0], 0.8, PALETTE.cyan);
      b.entity.transform.setRotation(0, 0, 110);
      add(b.entity, PrimitiveMesh.createSphere(w.engine, 0.2, 12), blinn(w.engine, [...PALETTE.red]), [0, -0.7, 0.55]);
      b.body.angularDamping = 0.6;
      if (weighted) {
        b.body.automaticCenterOfMass = false;
        b.body.centerOfMass = new Vector3(0, -0.7, 0);
      }
      tags.add(b.entity, weighted ? 'centerOfMass (0, -0.7, 0)' : 'automatic').el.style.transform = 'translate(-50%,-190%)';
    });
  });
  if (!w.stage.preview) button(w.stage.bar, 'Release again', () => round.restart());
  w.say('automaticCenterOfMass = false on the right');
  return w.stage.dispose;
};

export default mount;
