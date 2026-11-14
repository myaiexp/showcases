// A SplatGenerator building a moving torus from index and time alone
import * as THREE from 'three';
import { SplatGenerator, SplatTransformer, dyno } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';

const f = (v: number) => dyno.dynoConst('float', v);
const TAU = Math.PI * 2;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.1, 2.8], orbit: 0.25 });
  const cols = ctx.preview ? 160 : 240;
  const rows = ctx.preview ? 100 : 140;

  // Uniforms: the program is compiled once, these values change under it every frame.
  const time = dyno.dynoFloat(0);
  const wobble = dyno.dynoFloat(0.12);
  // Applies the generator object's own position / rotation / scale to the splats.
  const transform = new SplatTransformer();

  const generator = dyno.dynoBlock({ index: 'int' }, { gsplat: dyno.Gsplat }, ({ index }) => {
    if (!index) throw new Error('no index');
    // Turn the flat splat index into a (u, v) position on a grid, both in 0..2pi.
    const u = dyno.mul(dyno.div(dyno.float(dyno.imod(index, dyno.dynoConst('int', cols))), f(cols)), f(TAU));
    const v = dyno.mul(dyno.div(dyno.float(dyno.div(index, dyno.dynoConst('int', cols))), f(rows)), f(TAU));
    const swell = dyno.mul(wobble, dyno.sin(dyno.add(dyno.mul(u, f(5)), dyno.mul(time, f(2)))));
    const tube = dyno.add(f(0.3), swell);
    const ring = dyno.add(f(0.75), dyno.mul(tube, dyno.cos(v)));
    const center = dyno.combine({
      vectorType: 'vec3',
      x: dyno.mul(ring, dyno.cos(u)),
      y: dyno.mul(tube, dyno.sin(v)),
      z: dyno.mul(ring, dyno.sin(u)),
    });
    // A cosine palette: three phase-shifted waves of the hue make a smooth rainbow.
    const hue = dyno.add(dyno.div(u, f(TAU)), dyno.mul(time, f(0.08)));
    const phase = dyno.dynoConst('vec3', new THREE.Vector3(0, 0.33, 0.67));
    const wave = dyno.cos(dyno.mul(dyno.add(hue, phase), f(TAU)));
    const rgb = dyno.add(dyno.mul(wave, f(0.5)), f(0.5));
    const { x: r, y: g, z: b } = dyno.split(rgb).outputs;
    const gsplat = dyno.combineGsplat({
      flags: dyno.dynoConst('uint', 1), // GSPLAT_FLAG_ACTIVE: without it the splat is skipped
      index,
      center,
      scales: dyno.dynoConst('vec3', new THREE.Vector3(0.008, 0.008, 0.008)),
      quaternion: dyno.dynoConst('vec4', new THREE.Vector4(0, 0, 0, 1)),
      rgba: dyno.combine({ vectorType: 'vec4', r, g, b, a: f(0.9) }),
    });
    return { gsplat: transform.applyGsplat(gsplat) };
  });

  const torus = new SplatGenerator({
    numSplats: cols * rows,
    generator,
    // Runs every frame before generation: feed the uniforms, then ask for a regenerate.
    update: ({ object, time: seconds }) => {
      time.value = seconds;
      transform.update(object);
      object.updateVersion();
    },
  });
  stage.scene.add(torus);

  if (!ctx.preview) {
    const info = readout(el, `${cols * rows} splats, no PackedSplats: every one is computed from its index on the GPU`);
    const bar = controlBar(el);
    slider(bar, 'rows drawn', 10, rows, 5, rows, (v) => {
      torus.numSplats = cols * v;
      // numSplats changed, so the renderer must redo its splat layout.
      torus.updateMappingVersion();
      info.textContent = `${torus.numSplats} splats of ${cols * rows}`;
    });
    slider(bar, 'wobble', 0, 0.25, 0.01, wobble.value, (v) => (wobble.value = v));
  }

  stage.run((t) => {
    torus.rotation.x = Math.sin(t * 0.3) * 0.3;
  });
  return () => stage.dispose();
};

export default mount;
