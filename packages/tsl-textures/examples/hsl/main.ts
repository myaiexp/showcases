// hsl(): a hue wheel around the model, saturation and lightness from uniforms
import * as THREE from 'three/webgpu';
import { atan, positionGeometry, vec3 } from 'three/tsl';
import { hsl } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';
import { note } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { u } = params(stage, { hueShift: range(0, 0, 1), saturation: range(0.85, 0, 1), lightness: range(0.5, 0, 1) });

  // The angle around the y axis, as a fraction of a turn, is the hue.
  const p = positionGeometry;
  const hue = atan(p.z, p.x).div(Math.PI * 2).add(u.hueShift);
  // Rising lightness towards the top shows what l does along a gradient.
  const lightness = u.lightness.add(p.y.mul(0.2));

  // hsl() takes vec3(h, s, l), all in [0, 1], and returns rgb. Hue wraps; s and l clamp.
  const material = new THREE.MeshBasicNodeMaterial();
  material.colorNode = hsl(vec3(hue, u.saturation, lightness));
  model(stage, material, { spin: 3 });

  if (stage.preview) {
    // Hue and lightness drift so the card keeps changing.
    stage.frame((t) => {
      u.hueShift.value = (t * 0.1) % 1;
      u.lightness.value = 0.5 + 0.2 * Math.sin(t * 0.8);
    });
  } else if (stage.panel) {
    note(stage.panel, 'The hue is the angle around the vertical axis; the lightness also rises with height.');
  }

  stage.start();
  return stage.dispose;
};

export default mount;
