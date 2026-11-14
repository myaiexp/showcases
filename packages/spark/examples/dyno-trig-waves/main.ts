// sin, cos, mix and smoothstep building a travelling wave in an objectModifier
import * as THREE from 'three';
import { SplatMesh, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { pushSheet } from './sheet.ts';

const f = (v: number) => dyno.dynoConst('float', v);
const SHAPES = ['plane wave', 'ring ripple', 'standing grid'] as const;
type Shape = (typeof SHAPES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.6, 2.6], target: [0, 0, 0], orbit: 0.15 });
  const sheet = new SplatMesh({ constructSplats: (splats) => pushSheet(splats, ctx.preview ? 110 : 170) });
  stage.scene.add(sheet);

  const wavenumber = dyno.dynoFloat(6);
  const amplitude = dyno.dynoFloat(0.18);
  const time = dyno.dynoFloat(0);

  const makeWave = (shape: Shape) =>
    dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
      if (!gsplat) throw new Error('no gsplat');
      const { center, rgb } = dyno.splitGsplat(gsplat).outputs;
      const { x, z } = dyno.split(center).outputs;
      const k = wavenumber;
      let phase;
      if (shape === 'plane wave') phase = dyno.sub(dyno.mul(x, k), dyno.mul(time, f(3)));
      else if (shape === 'ring ripple') phase = dyno.sub(dyno.mul(dyno.length(dyno.combine({ vectorType: 'vec2', x, y: z })), k), dyno.mul(time, f(3)));
      else phase = dyno.mul(dyno.sin(dyno.mul(x, k)), dyno.mul(dyno.cos(dyno.mul(z, k)), dyno.cos(dyno.mul(time, f(2)))));
      const wave = shape === 'standing grid' ? phase : dyno.sin(phase);
      // Fade the wave out towards the sheet's edge so it doesn't end in a hard line.
      const edge = dyno.sub(f(1), dyno.smoothstep(f(0.6), f(1), dyno.length(dyno.combine({ vectorType: 'vec2', x, y: z }))));
      const height = dyno.mul(dyno.mul(wave, amplitude), edge);
      // mix between a trough colour and a crest colour, by where the wave is.
      const t = dyno.add(dyno.mul(wave, f(0.5)), f(0.5));
      const trough = dyno.dynoConst('vec3', new THREE.Vector3(0.05, 0.2, 0.55));
      const crest = dyno.dynoConst('vec3', new THREE.Vector3(0.7, 0.95, 1));
      const { y } = dyno.split(center).outputs;
      return {
        gsplat: dyno.combineGsplat({
          gsplat,
          center: dyno.combine({ vectorType: 'vec3', x, y: dyno.add(y, height), z }),
          rgb: dyno.mix(dyno.mix(trough, crest, t), rgb, f(0.15)),
        }),
      };
    });

  const install = (shape: Shape): void => {
    sheet.objectModifiers = [makeWave(shape)];
    sheet.updateGenerator();
  };
  install('ring ripple');

  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'wave', SHAPES, install, 'ring ripple');
    slider(bar, 'wavenumber', 1, 14, 0.5, wavenumber.value, (v) => (wavenumber.value = v));
    slider(bar, 'amplitude', 0, 0.4, 0.01, amplitude.value, (v) => (amplitude.value = v));
  }

  stage.run((t) => {
    time.value = t;
    sheet.updateVersion();
  });
  return () => stage.dispose();
};

export default mount;
