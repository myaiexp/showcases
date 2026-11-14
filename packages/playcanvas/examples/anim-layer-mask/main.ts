// An upper-body layer over a walking base layer: mask, weight and blend type
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { creatureScene, locomotion, waveClip } from '../../shared/animation.ts';
import { createPanel } from '../../shared/panel.ts';

// Node paths start at the anim component's entity and are joined with '/'.
const UPPER_BODY = {
  // The spine and everything below it: arms, forearms and head.
  'Root/Hips/Spine': { children: true },
};

const mount: Mount = async (el, ctx) => {
  const { scene, creature } = await creatureScene(el, ctx);
  const { app } = scene;
  const anim = creature.anim!;

  // The base layer walks with the whole body.
  anim.assignAnimation('Walk', locomotion('Walk', 1, 1));

  // A second layer waves. Its mask keeps it off the legs, which stay with the layer below.
  const upper = anim.addLayer('UpperBody', 1, UPPER_BODY, pc.ANIM_LAYER_OVERWRITE);
  upper.assignAnimation('Wave', waveClip());
  // A layer made with addLayer has no transition out of START, so say which state to start in.
  upper.play('Wave');

  if (ctx.preview) {
    let t = 0;
    let masked = true;
    app.on('update', (dt: number) => {
      t += dt;
      if (t > 3) {
        t = 0;
        masked = !masked;
        // Without a mask the wave layer would take over every node it animates.
        upper.mask = masked ? UPPER_BODY : (null as never);
      }
    });
  } else {
    const panel = createPanel(el);
    panel.slider('layer weight', 0, 1, 0.05, 1, (v) => (upper.weight = v));
    panel.check('mask: spine and below', true, (on) => (upper.mask = on ? UPPER_BODY : (null as never)));
    panel.select('blend type', ['overwrite', 'additive'] as const, 'overwrite', (v) => {
      upper.blendType = v === 'overwrite' ? pc.ANIM_LAYER_OVERWRITE : pc.ANIM_LAYER_ADDITIVE;
    });
    panel.row();
    panel.button('blendToWeight(1, 0.5)', () => upper.blendToWeight(1, 0.5));
    panel.button('blendToWeight(0, 0.5)', () => upper.blendToWeight(0, 0.5));
    panel.check('normalizeWeights', false, (on) => (anim.normalizeWeights = on));
    const info = panel.readout();
    app.on('update', () => {
      info.textContent = `layers: ${anim.layers.map((l) => `${l.name} (weight ${l.weight.toFixed(2)})`).join(', ')}`;
    });
  }
  return () => scene.dispose();
};

export default mount;
