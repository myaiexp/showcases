// selectPlanar(): the 0-to-1 weight of a tilted layer, drawn as colour
import * as THREE from 'three/webgpu';
import { fract, positionGeometry, smoothstep } from 'three/tsl';
import { selectPlanar } from 'tsl-textures';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { params, range, xy, xyz } from '../../shared/params.ts';
import { model } from '../../shared/shapes.ts';
import { note } from '../../shared/panel.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const PI = Math.PI;
  const { u } = params(stage, {
    // The layer's normal, as spherical angles: phi in [0, PI], theta in [-2 PI, 2 PI].
    angles: xy(PI / 2, 0.6, [0, -2 * PI], [PI, 2 * PI]),
    center: xyz(0, 0, 0, -1.5, 1.5),
    width: range(1, 0.1, 4),
  });

  // 0 on the near side of the layer, 1 beyond it, a smooth ramp across its width.
  const s = selectPlanar(positionGeometry, u.angles, u.center, u.width);
  const below = new THREE.Color(0x1d3557);
  const above = new THREE.Color(0xffb347);
  // Dark lines at every tenth of the weight show the ramp's shape.
  const contour = smoothstep(0.42, 0.5, fract(s.mul(10)).sub(0.5).abs()).oneMinus().mul(0.35);

  const material = new THREE.MeshBasicNodeMaterial();
  material.colorNode = s.mix(below, above).mul(contour.oneMinus());
  model(stage, material, { spin: 0 });

  if (stage.preview) {
    stage.frame((t) => {
      u.angles.value.set(PI / 2, t * 0.5);
      u.center.value.set(0, 0.5 * Math.sin(t * 0.8), 0);
      u.width.value = 1 + 0.5 * Math.sin(t * 0.6);
    });
  } else if (stage.panel) {
    note(stage.panel, 'This weight is what rotator, scaler and translator use: 0 leaves a vertex alone, 1 applies the whole change.');
  }

  stage.start();
  return stage.dispose;
};

export default mount;
