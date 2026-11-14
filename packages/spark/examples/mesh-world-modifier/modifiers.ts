// Two GsplatModifiers: a standing ripple along X and a height colour band
import * as THREE from 'three';
import { dyno } from '@sparkjsdev/spark';

type Mod = ReturnType<typeof dyno.dynoBlock<{ gsplat: typeof dyno.Gsplat }, { gsplat: typeof dyno.Gsplat }>>;

const f = (v: number) => dyno.dynoConst('float', v);

/** Lifts each splat in Y by amp * sin(x * 9), a fixed wave in whatever space the modifier runs in. */
export function makeRipple(amp: dyno.DynoVal<'float'>): Mod {
  return dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
    if (!gsplat) throw new Error('no gsplat');
    const { center } = dyno.splitGsplat(gsplat).outputs;
    const { x, y, z } = dyno.split(center).outputs;
    const lifted = dyno.add(y, dyno.mul(amp, dyno.sin(dyno.mul(x, f(9)))));
    return { gsplat: dyno.combineGsplat({ gsplat, center: dyno.combine({ vectorType: 'vec3', x, y: lifted, z }) }) };
  });
}

/** Paints everything below `level` (read from the splat's current Y) a water blue. */
export function makeBand(level: dyno.DynoVal<'float'>): Mod {
  const water = dyno.dynoConst('vec3', new THREE.Vector3(0.1, 0.45, 1));
  return dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
    if (!gsplat) throw new Error('no gsplat');
    const { rgb, y } = dyno.splitGsplat(gsplat).outputs;
    const below = dyno.sub(f(1), dyno.smoothstep(dyno.sub(level, f(0.04)), dyno.add(level, f(0.04)), y));
    return { gsplat: dyno.combineGsplat({ gsplat, rgb: dyno.mix(rgb, water, below) }) };
  });
}
