// generators.snowBox with DEFAULT_SNOW parameters, live density, fall velocity and wander sliders
import * as THREE from 'three';
import { SplatMesh, constructGrid, generators } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, readout } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.6, 7], target: [0, 0.3, 0], orbit: 0.12 });
  const status = ctx.preview ? null : readout(el);
  let density = ctx.preview ? 80 : 160;
  let fallVelocity = 0.25;
  let wanderScale = generators.DEFAULT_SNOW.wanderScale;

  // A floor of grid points, so the flakes have something to land above.
  const floor = new SplatMesh({
    constructSplats: (splats) =>
      constructGrid({
        splats,
        extents: new THREE.Box3(new THREE.Vector3(-2, -1, -2), new THREE.Vector3(2, -1, 2)),
        stepSize: 0.25,
        pointRadius: 0.03,
        color: new THREE.Color(0.3, 0.35, 0.5),
      }),
  });
  stage.scene.add(floor);

  let snow: ReturnType<typeof generators.snowBox> | null = null;
  const rebuild = (): void => {
    if (snow) stage.scene.remove(snow.snow);
    // DEFAULT_SNOW is a ready-made parameter set; spread it and override what you want.
    snow = generators.snowBox({
      ...generators.DEFAULT_SNOW,
      box: new THREE.Box3(new THREE.Vector3(-2, -1, -2), new THREE.Vector3(2, 2.5, 2)),
      minY: -0.95, // flakes stop at the floor and linger there
      density,
      fallVelocity,
      wanderScale,
      minScale: 0.01,
      maxScale: 0.025,
    });
    stage.scene.add(snow.snow);
    if (status) status.textContent = `${snow.snow.numSplats} flakes`;
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    // density sets the splat count, so it rebuilds the generator.
    slider(bar, 'density', 20, 600, 20, density, (v) => ((density = v), rebuild()));
    // The rest are dyno uniforms on the returned object: no rebuild.
    slider(bar, 'fallVelocity', 0, 1, 0.05, fallVelocity, (v) => ((fallVelocity = v), snow && (snow.fallVelocity.value = v)));
    slider(bar, 'wanderScale', 0, 0.4, 0.02, wanderScale, (v) => ((wanderScale = v), snow && (snow.wanderScale.value = v)));
  }

  stage.run();
  return () => stage.dispose();
};

export default mount;
