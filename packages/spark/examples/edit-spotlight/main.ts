// An INFINITE_CONE SDF as a spotlight sweeping across a dimmed garden; radius sets the cone angle
import * as THREE from 'three';
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, readout } from '../../shared/controls.ts';
import { pushGarden } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [2.4, 1.7, 3], target: [0, 0.5, 0], orbit: 0.06 });
  const garden = new SplatMesh({ constructSplats: (s) => pushGarden(s, ctx.preview ? 15000 : 40000) });
  stage.scene.add(garden);

  const dim = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.MULTIPLY });
  dim.add(new SplatEditSdf({ type: SplatEditSdfType.ALL, color: new THREE.Color(0.1, 0.1, 0.16) }));
  garden.add(dim);

  const light = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.ADD_RGBA, softEdge: 0.5 });
  // The cone's apex is the SDF position and it opens along local -z. Its half angle is
  // (PI / 4) * radius, so radius 1 is a 45 degree half angle.
  const spot = new SplatEditSdf({ type: SplatEditSdfType.INFINITE_CONE, radius: 0.3, color: new THREE.Color(0.85, 0.8, 0.55), opacity: 0 });
  light.add(spot);
  garden.add(light);

  const apex = new THREE.Vector3(0, 3.2, 0);
  const aim = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const forward = new THREE.Vector3(0, 0, -1);
  const info = ctx.preview ? null : readout(el);

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'radius (angle factor)', 0.05, 0.8, 0.05, spot.radius, (v) => {
      spot.radius = v;
      info!.textContent = `half angle ${((v * 45)).toFixed(1)} degrees`;
    });
    slider(bar, 'softEdge', 0, 1.5, 0.1, light.softEdge, (v) => (light.softEdge = v));
    info!.textContent = `half angle ${(spot.radius * 45).toFixed(1)} degrees`;
  }

  stage.run((time) => {
    // The light hangs above one side and its target sweeps a Lissajous path across the ground.
    apex.set(Math.cos(time * 0.3) * 1.5, 3.2, Math.sin(time * 0.3) * 1.5);
    aim.set(Math.sin(time * 0.7) * 1.4, 0, Math.cos(time * 0.5) * 1.4);
    spot.position.copy(apex);
    dir.subVectors(aim, apex).normalize();
    spot.quaternion.setFromUnitVectors(forward, dir);
  });
  return () => stage.dispose();
};

export default mount;
