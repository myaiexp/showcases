// transformGsplat, or transformPos + transformQuat, moving a mesh in a modifier
import * as THREE from 'three';
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const WAYS = ['transformGsplat', 'transformPos + transformQuat'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 3.4], orbit: false });
  // Two copies: the untouched one is the reference for what the modifier did.
  const count = ctx.preview ? 9000 : 14000;
  const ghost = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, count) });
  ghost.opacity = 0.25;
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, count) });
  stage.scene.add(ghost, knot);

  // The transform parts, all uniforms so sliders and animation can drive them.
  const scale = dyno.dynoFloat(1);
  const squash = dyno.dynoVec3(new THREE.Vector3(1, 1, 1));
  const rotate = dyno.dynoVec4(new THREE.Quaternion());
  const translate = dyno.dynoVec3(new THREE.Vector3());

  const makeModifier = (way: (typeof WAYS)[number]) =>
    dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
      if (!gsplat) throw new Error('no gsplat');
      if (way === 'transformGsplat') {
        // One call moves centre, orientation and size together.
        return { gsplat: dyno.transformGsplat(gsplat, { scale, rotate, translate }) };
      }
      // The same pieces by hand: positions and orientations are transformed separately.
      const { center, quaternion } = dyno.splitGsplat(gsplat).outputs;
      return {
        gsplat: dyno.combineGsplat({
          gsplat,
          // `scales` squashes per axis (before the rotation); `scale` is uniform.
          center: dyno.transformPos(center, { scale, scales: squash, rotate, translate }),
          quaternion: dyno.transformQuat(quaternion, { rotate }),
        }),
      };
    });

  const install = (way: (typeof WAYS)[number]): void => {
    knot.objectModifiers = [makeModifier(way)];
    knot.updateGenerator();
  };
  install('transformGsplat');

  let angle = 0;
  let auto = true;
  const info = ctx.preview ? null : readout(el, 'The faint knot is untouched; the bright one is run through the transform.');
  const set = (): void => {
    rotate.value.setFromAxisAngle(new THREE.Vector3(1, 1, 0).normalize(), angle);
    knot.updateVersion();
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'implemented with', WAYS, (v) => {
      install(v);
      // Only transformPos reads `squash`, so reset it when switching back.
      if (v === WAYS[0]) squash.value.set(1, 1, 1);
      if (info) info.textContent = v === WAYS[0] ? 'transformGsplat: scale, rotate, translate and recolor in one block' : 'transformPos also takes per-axis `scales`: try the squash sliders';
    });
    slider(bar, 'rotate (rad)', -3.14, 3.14, 0.05, 0, (v) => ((auto = false), (angle = v), set()));
    slider(bar, 'scale', 0.3, 1.8, 0.05, 1, (v) => ((auto = false), (scale.value = v), knot.updateVersion()));
    slider(bar, 'translate x', -1.5, 1.5, 0.05, 0, (v) => ((auto = false), (translate.value.x = v), knot.updateVersion()));
    slider(bar, 'squash y', 0.2, 2, 0.05, 1, (v) => ((auto = false), (squash.value.y = v), knot.updateVersion()));
  }

  stage.run((time) => {
    if (!auto) return;
    angle = time * 0.8;
    scale.value = 0.8 + 0.2 * Math.sin(time * 1.1);
    translate.value.set(Math.sin(time * 0.7) * 0.8, 0, 0);
    set();
  });
  return () => stage.dispose();
};

export default mount;
