// Stateless per-index randomness: hashVec3, hashFloat and pcgHash in a generator
import * as THREE from 'three';
import { SplatGenerator, SplatTransformer, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, readout, slider } from '../../shared/controls.ts';

const f = (v: number) => dyno.dynoConst('float', v);
const TAU = Math.PI * 2;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.5, 3.2], orbit: 0.2 });
  const count = ctx.preview ? 14000 : 30000;

  // `seed` and `tick` are integer uniforms: new random numbers without recompiling anything.
  const seed = dyno.dynoInt(1);
  const tick = dyno.dynoInt(0);
  const jitter = dyno.dynoFloat(0.06);
  const transform = new SplatTransformer();

  const generator = dyno.dynoBlock({ index: 'int' }, { gsplat: dyno.Gsplat }, ({ index }) => {
    if (!index) throw new Error('no index');
    // A GPU invocation knows only its index, so every random number is a hash of it.
    const key = dyno.add(index, dyno.mul(seed, dyno.dynoConst('int', 7919)));
    // hashVec3 gives three floats in 0..1; this one makes a point inside a ball.
    const dir = dyno.normalize(dyno.sub(dyno.mul(dyno.hashVec3(key), f(2)), f(1)));
    const radius = dyno.pow(dyno.hashFloat(dyno.add(key, dyno.dynoConst('int', 1))), f(1 / 3));
    const home = dyno.mul(dir, dyno.mul(radius, f(1)));
    // Hash the index together with the tick: the same splat gets a fresh offset every tick.
    const shake = dyno.sub(dyno.hashVec3(dyno.add(key, dyno.mul(tick, dyno.dynoConst('int', 104729)))), f(0.5));
    const center = dyno.add(home, dyno.mul(shake, dyno.mul(jitter, f(2))));
    // Explicit PCG: seed a state from a different key (hashVec3 above runs on the same
    // generator, so reusing `key` would correlate hue with position), then walk it
    // with pcgNext and read with pcgHash.
    const state = dyno.pcgMix(dyno.add(key, dyno.dynoConst('int', 99991)));
    const hueBits = dyno.pcgHash(dyno.pcgNext(state));
    const hue = dyno.div(dyno.float(hueBits), f(4294967295));
    const sizeBits = dyno.pcgHash(dyno.pcgNext(dyno.pcgNext(state)));
    const size = dyno.add(f(0.012), dyno.mul(dyno.div(dyno.float(sizeBits), f(4294967295)), f(0.02)));
    const phase = dyno.dynoConst('vec3', new THREE.Vector3(0, 0.33, 0.67));
    const rgb = dyno.add(dyno.mul(dyno.cos(dyno.mul(dyno.add(hue, phase), f(TAU))), f(0.4)), f(0.6));
    const { x: r, y: g, z: b } = dyno.split(rgb).outputs;
    const gsplat = dyno.combineGsplat({
      flags: dyno.dynoConst('uint', 1),
      index,
      center,
      scales: dyno.combine({ vectorType: 'vec3', x: size, y: size, z: size }),
      quaternion: dyno.dynoConst('vec4', new THREE.Vector4(0, 0, 0, 1)),
      rgba: dyno.combine({ vectorType: 'vec4', r, g, b, a: f(0.85) }),
    });
    return { gsplat: transform.applyGsplat(gsplat) };
  });

  let ticksPerSecond = ctx.preview ? 8 : 6;
  let lastTick = 0;
  const cloud = new SplatGenerator({
    numSplats: count,
    generator,
    update: ({ object, time }) => {
      if (time - lastTick > 1 / Math.max(ticksPerSecond, 0.01) && ticksPerSecond > 0) {
        lastTick = time;
        tick.value += 1;
      }
      transform.update(object);
      object.updateVersion();
    },
  });
  stage.scene.add(cloud);

  if (!ctx.preview) {
    const info = readout(el, `${count} splats, no stored positions: each is a hash of its index`);
    const bar = controlBar(el);
    slider(bar, 'jitter', 0, 0.2, 0.01, jitter.value, (v) => (jitter.value = v));
    slider(bar, 'ticks per second', 0, 30, 1, ticksPerSecond, (v) => (ticksPerSecond = v));
    button(bar, 'New seed', () => {
      seed.value = 1 + Math.floor(Math.random() * 1000);
      info.textContent = `seed ${seed.value}: a different cloud, same compiled program`;
    });
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
