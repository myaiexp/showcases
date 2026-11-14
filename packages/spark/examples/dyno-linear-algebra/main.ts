// reflectVec, cross, dot and normalize folding a mesh across two moving mirror planes
import * as THREE from 'three';
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const f = (v: number) => dyno.dynoConst('float', v);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.5, 3.2], orbit: 0.2 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // The first mirror's normal is a uniform; the second is derived from it in the shader.
  const mirror = dyno.dynoVec3(new THREE.Vector3(1, 0, 0));
  let second = true;

  const fold = () =>
    dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
      if (!gsplat) throw new Error('no gsplat');
      const { center } = dyno.splitGsplat(gsplat).outputs;
      const n1 = dyno.normalize(mirror);
      // cross() of the first normal with the Y axis gives a plane perpendicular to the first.
      const n2 = dyno.normalize(dyno.cross(n1, dyno.dynoConst('vec3', new THREE.Vector3(0, 1, 0))));
      // For splats behind a mirror, reflectVec puts them at their mirror image in front of it.
      const foldAcross = (p: dyno.DynoVal<'vec3'>, n: dyno.DynoVal<'vec3'>) =>
        dyno.select(dyno.lessThan(dyno.dot(p, n), f(0)), dyno.reflectVec(p, n), p);
      let p = foldAcross(center, n1);
      if (second) p = foldAcross(p, n2);
      return { gsplat: dyno.combineGsplat({ gsplat, center: p }) };
    });

  const install = (): void => {
    knot.objectModifiers = [fold()];
    knot.updateGenerator();
  };
  install();

  let auto = true;
  let angle = 0;
  const aim = (a: number): void => {
    mirror.value.set(Math.cos(a), 0.3 * Math.sin(a * 0.7), Math.sin(a)).normalize();
    knot.updateVersion();
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'mirror angle', 0, 6.28, 0.05, 0, (v) => ((auto = false), (angle = v), aim(v)));
    checkbox(bar, 'second mirror (cross product)', true, (v) => ((second = v), install()));
  }

  stage.run((time) => {
    if (auto) aim(angle + time * 0.35);
  });
  return () => stage.dispose();
};

export default mount;
