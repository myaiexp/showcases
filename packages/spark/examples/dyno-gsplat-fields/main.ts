// splitGsplat and combineGsplat: size by height, opacity by distance
import * as THREE from 'three';
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, controlBar, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const f = (v: number) => dyno.dynoConst('float', v);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.8], orbit: 0.2 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // A small marker shows where the opacity falloff is centred.
  const marker = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  stage.scene.add(marker);

  const focus = dyno.dynoVec3(new THREE.Vector3());
  const reach = dyno.dynoFloat(0.8);
  const sizeGain = dyno.dynoFloat(2.5);
  let bySize = true;
  let byDistance = true;

  const fields = () =>
    dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
      if (!gsplat) throw new Error('no gsplat');
      // splitGsplat exposes every field of the splat as a named output...
      const { center, scales, rgba, opacity, y } = dyno.splitGsplat(gsplat).outputs;
      // ...size grows with height: 0.4x at the bottom to sizeGain x at the top...
      const tall = dyno.smoothstep(f(-0.9), f(0.9), y);
      const factor = bySize ? dyno.mix(f(0.4), sizeGain, tall) : f(1);
      // ...and opacity fades with distance from the focus point.
      const near = dyno.sub(f(1), dyno.smoothstep(f(0), reach, dyno.distance(center, focus)));
      const newOpacity = byDistance ? dyno.mul(opacity, dyno.mix(f(0.05), f(1), near)) : opacity;
      // combineGsplat writes back only what is passed; everything else stays as it was.
      return {
        gsplat: dyno.combineGsplat({
          gsplat,
          scales: dyno.mul(scales, factor),
          rgba: dyno.combine({ vector: rgba, w: newOpacity }),
        }),
      };
    });

  const install = (): void => {
    knot.objectModifiers = [fields()];
    knot.updateGenerator();
  };
  install();

  if (!ctx.preview) {
    const bar = controlBar(el);
    checkbox(bar, 'size by height', true, (v) => ((bySize = v), install()));
    checkbox(bar, 'opacity by distance', true, (v) => ((byDistance = v), install()));
    slider(bar, 'max size factor', 1, 5, 0.1, sizeGain.value, (v) => (sizeGain.value = v));
    slider(bar, 'opacity reach', 0.2, 2, 0.05, reach.value, (v) => (reach.value = v));
  }

  stage.run((time) => {
    focus.value.set(Math.sin(time * 0.9) * 0.9, Math.cos(time * 0.6) * 0.5, Math.sin(time * 0.5) * 0.4);
    marker.position.copy(focus.value);
    knot.updateVersion();
  });
  return () => stage.dispose();
};

export default mount;
