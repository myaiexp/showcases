// dynoVec3 / dynoFloat uniforms updated live, against dynoConst rebuilds
import * as THREE from 'three';
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

const MODES = ['uniforms (dynoVec3, dynoFloat)', 'constants (dynoConst)'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 3], orbit: 0.2 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // The state the sliders edit.
  const scale = new THREE.Vector3(1, 1, 1);
  const tint = new THREE.Vector3(1, 0.4, 0.2);
  let amount = 0.5;

  // Uniforms are DynoVals whose `.value` can change under a compiled program.
  const uScale = dyno.dynoVec3(scale.clone());
  const uTint = dyno.dynoVec3(tint.clone());
  const uAmount = dyno.dynoFloat(amount);

  /** One modifier, written once against DynoVal inputs, so either kind of value fits. */
  const makeModifier = (s: dyno.DynoVal<'vec3'>, t: dyno.DynoVal<'vec3'>, a: dyno.DynoVal<'float'>) =>
    dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
      if (!gsplat) throw new Error('no gsplat');
      const { center, rgb } = dyno.splitGsplat(gsplat).outputs;
      return {
        gsplat: dyno.combineGsplat({
          gsplat,
          center: dyno.transformPos(center, { scales: s }),
          rgb: dyno.mix(rgb, t, a),
        }),
      };
    });

  let uniformMode = true;
  let writes = 0;
  let rebuilds = 0;
  const info = ctx.preview ? null : readout(el);
  const report = (): void => {
    if (info) info.textContent = `uniform writes: ${writes}   pipeline rebuilds: ${rebuilds}`;
  };

  // A constant is part of the shader source: new values mean a new graph and a new program.
  const build = () =>
    uniformMode
      ? makeModifier(uScale, uTint, uAmount)
      : makeModifier(dyno.dynoConst('vec3', scale.clone()), dyno.dynoConst('vec3', tint.clone()), dyno.dynoConst('float', amount));
  const install = (): void => {
    knot.objectModifiers = [build()];
    knot.updateGenerator();
  };
  install();

  /** Send the current state to the GPU, the cheap way or the expensive way. */
  const push = (): void => {
    if (uniformMode) {
      uScale.value.copy(scale);
      uTint.value.copy(tint);
      uAmount.value = amount;
      writes++;
      knot.updateVersion(); // regenerate the splats with the new numbers; no recompile
    } else {
      install();
      rebuilds++;
    }
    report();
  };

  const setMode = (mode: (typeof MODES)[number]): void => {
    uniformMode = mode === MODES[0];
    install();
    writes = rebuilds = 0;
    report();
  };

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'values as', MODES, setMode);
    slider(bar, 'scale x', 0.3, 1.6, 0.05, 1, (v) => ((scale.x = v), push()));
    slider(bar, 'scale y', 0.3, 1.6, 0.05, 1, (v) => ((scale.y = v), push()));
    slider(bar, 'scale z', 0.3, 1.6, 0.05, 1, (v) => ((scale.z = v), push()));
    slider(bar, 'tint hue', 0, 1, 0.01, 0.05, (v) => {
      const c = new THREE.Color().setHSL(v, 0.9, 0.55);
      tint.set(c.r, c.g, c.b);
      push();
    });
    slider(bar, 'tint amount', 0, 1, 0.05, amount, (v) => ((amount = v), push()));
    report();
  }

  stage.run((time) => {
    // Cards have no sliders, so they sweep the uniforms on their own.
    if (ctx.preview) {
      uScale.value.set(1 + 0.4 * Math.sin(time), 1 + 0.4 * Math.sin(time * 1.3 + 1), 1);
      uTint.value.set(0.5 + 0.5 * Math.sin(time * 0.7), 0.4, 1 - 0.5 * Math.sin(time * 0.7));
      knot.updateVersion();
    }
  });
  return () => stage.dispose();
};

export default mount;
