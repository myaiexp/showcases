// Readback: a GPU proximity query over every splat, read back to the CPU
import * as THREE from 'three';
import { Readback, SplatMesh, dyno, type PackedSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, slider } from '../../shared/controls.ts';
import { pushTorusKnot } from '../../shared/subjects.ts';

/** Distances are packed into one byte as distance / RANGE, so they resolve to RANGE / 255. */
const RANGE = 2;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.3, 3], orbit: 0.15 });
  const knot = new SplatMesh({ constructSplats: (splats) => pushTorusKnot(splats, ctx.preview ? 15000 : 30000) });
  stage.scene.add(knot);

  // The probe: a wire sphere the GPU measures every splat against.
  let radius = 0.35;
  const probe = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), new THREE.MeshBasicMaterial({ color: 0x66ccff, wireframe: true }));
  const nearest = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), new THREE.MeshBasicMaterial({ color: 0xff3355 }));
  stage.scene.add(probe, nearest);
  const label = overlay(el);

  // Uniforms feed the probe position and radius into the reader program each time it runs.
  const probePos = dyno.dynoVec3(new THREE.Vector3());
  const probeRadius = dyno.dynoFloat(radius);

  // A reader maps each splat index to a vec4 of 0..1 values: one byte per channel comes back.
  const makeReader = (packed: PackedSplats) =>
    dyno.dynoBlock({ index: 'int' }, { rgba8: 'vec4' }, ({ index }) => {
      if (!index) throw new Error('no index');
      // packed.dyno is the PackedSplats as a dyno value, readable from any program.
      const { center } = dyno.splitGsplat(dyno.readPackedSplat(packed.dyno, index)).outputs;
      const d = dyno.distance(center, probePos);
      const inside = dyno.sub(dyno.dynoConst('float', 1), dyno.step(probeRadius, d));
      const scaled = dyno.clamp(dyno.div(d, dyno.dynoConst('float', RANGE)), dyno.dynoConst('float', 0), dyno.dynoConst('float', 1));
      const zero = dyno.dynoConst('float', 0);
      return { rgba8: dyno.combine({ vectorType: 'vec4', x: inside, y: scaled, z: zero, w: dyno.dynoConst('float', 1) }) };
    });

  const readback = new Readback({ renderer: stage.renderer });
  let bytes = new Uint8Array(0);
  let busy = false;
  let reader: ReturnType<typeof makeReader> | null = null;

  const query = async (): Promise<void> => {
    const packed = knot.packedSplats;
    const count = packed?.numSplats ?? 0;
    if (busy || !packed || !knot.isInitialized || !count) return;
    busy = true;
    // Programs are cached per reader object, so build it once and keep it.
    reader ??= makeReader(packed);
    bytes = readback.ensureBuffer(count, bytes);
    const out = await readback.renderReadback({ reader, count, renderer: stage.renderer, readback: bytes });
    let inside = 0;
    let best = 255;
    let bestIndex = -1;
    for (let i = 0; i < count; i++) {
      if (out[i * 4]! > 127) inside++;
      if (out[i * 4 + 1]! < best) [best, bestIndex] = [out[i * 4 + 1]!, i];
    }
    if (bestIndex >= 0) nearest.position.copy(knot.packedSplats!.getSplat(bestIndex).center);
    label.textContent = `${inside} of ${count} splats inside\nnearest: #${bestIndex}, ${((best / 255) * RANGE).toFixed(3)} away`;
    busy = false;
  };

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'probe radius', 0.1, 1, 0.05, radius, (v) => ((radius = v), (probeRadius.value = v)));
  }
  const timer = window.setInterval(() => void query(), ctx.preview ? 400 : 150);

  stage.run((time) => {
    probePos.value.set(Math.sin(time * 0.8) * 0.9, Math.sin(time * 1.3) * 0.6, Math.cos(time * 0.6) * 0.5);
    probe.position.copy(probePos.value);
    probe.scale.setScalar(radius);
  });
  return () => {
    clearInterval(timer);
    readback.dispose();
    stage.dispose();
  };
};

export default mount;
