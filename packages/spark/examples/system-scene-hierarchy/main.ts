// SplatMeshes nested in Groups: a splat sun, planets and moons inheriting their parents' transforms
import * as THREE from 'three';
import { SplatMesh, constructSpherePoints } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider } from '../../shared/controls.ts';

/** A dotted sphere of splats, one SplatMesh per body. */
function body(radius: number, color: THREE.ColorRepresentation, maxDepth: number): SplatMesh {
  const tint = new THREE.Color(color);
  return new SplatMesh({
    constructSplats: (splats) =>
      constructSpherePoints({
        splats,
        radius,
        maxDepth,
        pointRadius: radius * 0.09,
        // Shade by latitude so the spin is visible.
        color: (c, p) => c.copy(tint).multiplyScalar(0.55 + 0.45 * Math.abs(Math.sin(p.y * 9 / radius))),
      }),
  });
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 1.5, 2.8], orbit: 0.1 });
  const depth = ctx.preview ? 3 : 4;

  const sun = body(0.45, 0xffb347, depth);
  stage.scene.add(sun);

  // Each orbit is an empty Group; rotating it carries its children around.
  const planets = [
    { dist: 1.1, size: 0.14, color: 0x6fb7ff, speed: 0.9, moons: 1 },
    { dist: 1.8, size: 0.2, color: 0x9be37a, speed: 0.5, moons: 2 },
  ].map(({ dist, size, color, speed, moons }) => {
    const orbit = new THREE.Group();
    const planet = body(size, color, depth);
    planet.position.x = dist;
    orbit.add(planet);
    const moonOrbits = Array.from({ length: moons }, (_, i) => {
      const moonOrbit = new THREE.Group();
      moonOrbit.rotation.z = i * 0.6;
      const moon = body(size * 0.35, 0xdddddd, depth - 1);
      moon.position.x = size * 2 + i * 0.12;
      moonOrbit.add(moon);
      // A moon orbit is a child of the planet: it moves with the planet, plus its own spin.
      planet.add(moonOrbit);
      return moonOrbit;
    });
    stage.scene.add(orbit);
    return { orbit, planet, moonOrbits, speed };
  });

  let rate = 1;
  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'time scale', 0, 4, 0.1, rate, (v) => (rate = v));
  }

  stage.run((_, dt) => {
    const step = dt * rate;
    sun.rotation.y += step * 0.2;
    for (const { orbit, planet, moonOrbits, speed } of planets) {
      orbit.rotation.y += step * speed;
      planet.rotation.y += step * 2;
      moonOrbits.forEach((m, i) => (m.rotation.y += step * (2.5 + i)));
    }
  });
  return () => stage.dispose();
};

export default mount;
