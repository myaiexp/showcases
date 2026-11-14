// greaterThan, select and step splitting a mesh along a moving plane
import * as THREE from 'three';
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const f = (v: number) => dyno.dynoConst('float', v);
const MODES = ['select(greaterThan)', 'step + mix'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.2, 3.3], orbit: 0.12 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // The plane, as a normal and an offset: points with dot(p, n) > offset are on the far side.
  const normal = dyno.dynoVec3(new THREE.Vector3(1, 0.3, 0).normalize());
  const offset = dyno.dynoFloat(0);
  const planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 2.4),
    new THREE.MeshBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0.12, side: THREE.DoubleSide }),
  );
  stage.scene.add(planeMesh);

  const makeSplit = (mode: Mode) =>
    dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
      if (!gsplat) throw new Error('no gsplat');
      const { center, rgb, scales } = dyno.splitGsplat(gsplat).outputs;
      const signedDistance = dyno.sub(dyno.dot(center, normal), offset);
      // Look B: grey, dim and shrunk to points.
      const grey = dyno.dot(rgb, dyno.dynoConst('vec3', new THREE.Vector3(0.3, 0.6, 0.1)));
      const lookB = dyno.mul(dyno.combine({ vectorType: 'vec3', x: grey, y: grey, z: grey }), f(0.5));
      let outRgb;
      let outScales;
      if (mode === 'select(greaterThan)') {
        // A boolean picks one of two values per splat: a hard edge.
        const far = dyno.greaterThan(signedDistance, f(0));
        outRgb = dyno.select(far, lookB, rgb);
        outScales = dyno.select(far, dyno.mul(scales, f(0.4)), scales);
      } else {
        // step() gives 0 or 1, and mix() blends by it, so a smoothstep would soften the edge.
        const t = dyno.step(f(0), signedDistance);
        outRgb = dyno.mix(rgb, lookB, t);
        outScales = dyno.mix(scales, dyno.mul(scales, f(0.4)), t);
      }
      return { gsplat: dyno.combineGsplat({ gsplat, rgb: outRgb, scales: outScales }) };
    });

  const install = (mode: Mode): void => {
    knot.objectModifiers = [makeSplit(mode)];
    knot.updateGenerator();
  };
  install('select(greaterThan)');

  let auto = true;
  const setPlane = (offsetValue: number, tilt: number): void => {
    offset.value = offsetValue;
    normal.value.set(Math.cos(tilt), Math.sin(tilt) * 0.6, Math.sin(tilt) * 0.3).normalize();
    // Keep the drawn plane on the same equation: n * offset is a point on it.
    planeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.value);
    planeMesh.position.copy(normal.value).multiplyScalar(offsetValue);
    knot.updateVersion();
  };
  let tiltNow = 0;
  let offsetNow = 0;

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'switch with', MODES, install);
    slider(bar, 'plane offset', -1, 1, 0.02, 0, (v) => ((auto = false), (offsetNow = v), setPlane(offsetNow, tiltNow)));
    slider(bar, 'plane tilt', -1.5, 1.5, 0.05, 0, (v) => ((auto = false), (tiltNow = v), setPlane(offsetNow, tiltNow)));
  }

  stage.run((time) => {
    if (auto) setPlane(Math.sin(time * 0.8) * 0.85, Math.sin(time * 0.35) * 1.1);
  });
  return () => {
    planeMesh.geometry.dispose();
    stage.dispose();
  };
};

export default mount;
