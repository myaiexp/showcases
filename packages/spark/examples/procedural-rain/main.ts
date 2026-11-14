// generators.snowBox with DEFAULT_RAIN: elongated drops that stop at a ground plane
import * as THREE from 'three';
import { SplatMesh, constructGrid, generators } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, readout } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.2, 5], target: [0, 0.3, 0], orbit: 0.1 });
  const status = ctx.preview ? null : readout(el);
  let density = ctx.preview ? 12 : 20;
  let stretch = 10;

  const ground = new SplatMesh({
    constructSplats: (splats) =>
      constructGrid({
        splats,
        extents: new THREE.Box3(new THREE.Vector3(-2, -1, -2), new THREE.Vector3(2, -1, 2)),
        stepSize: 0.25,
        pointRadius: 0.03,
        color: new THREE.Color(0.25, 0.4, 0.3),
      }),
  });
  stage.scene.add(ground);

  const aniso = (): THREE.Vector3 => new THREE.Vector3(1, stretch, 1);
  let rain: ReturnType<typeof generators.snowBox> | null = null;
  const rebuild = (): void => {
    if (rain) stage.scene.remove(rain.snow);
    rain = generators.snowBox({
      ...generators.DEFAULT_RAIN,
      box: new THREE.Box3(new THREE.Vector3(-2, -1, -2), new THREE.Vector3(2, 3, 2)),
      // minY clamps drop positions at the ground, so they pile up in a splashing layer.
      minY: -0.95,
      density,
      anisoScale: aniso(), // snowBox normalises it: only the ratio of y to x/z matters
      minScale: 0.02,
      color2: new THREE.Color(0.45, 0.6, 1),
      maxScale: 0.05,
    });
    stage.scene.add(rain.snow);
    if (status) status.textContent = `${rain.snow.numSplats} drops`;
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'density', 2, 40, 2, density, (v) => ((density = v), rebuild()));
    slider(bar, 'fallVelocity', 0.5, 6, 0.5, generators.DEFAULT_RAIN.fallVelocity, (v) => rain && (rain.fallVelocity.value = v));
    slider(bar, 'anisoScale y', 1, 20, 1, stretch, (v) => {
      stretch = v;
      // Same normalisation as the constructor, applied to the live uniform.
      rain?.anisoScale.value.copy(aniso().normalize());
    });
    slider(bar, 'maxScale', 0.01, 0.1, 0.005, 0.05, (v) => rain && (rain.maxScale.value = v));
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
