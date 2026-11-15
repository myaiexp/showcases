// Custom layer: customThreeObjectUpdate moves existing objects on each data update
import Globe from 'globe.gl';
import { ConeGeometry, Mesh, MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Probe {
  tilt: number;
  start: number;
  speed: number;
  lat: number;
  lng: number;
}

const rad = Math.PI / 180;

/** The point `angle` degrees along an orbit tilted about the x axis. */
function along(tilt: number, angle: number): { lat: number; lng: number } {
  const a = angle * rad;
  return {
    lat: Math.asin(Math.sin(a) * Math.sin(tilt * rad)) / rad,
    lng: Math.atan2(Math.sin(a) * Math.cos(tilt * rad), Math.cos(a)) / rad,
  };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Twelve probes move for as long as you watch. Each mesh is made once; later updates only move it.' });
  const dark = await texture('dark');
  const log = stage.bar && readout(stage.bar, '');

  const probes: Probe[] = Array.from({ length: 12 }, (_, i) => ({
    tilt: 20 + (i % 4) * 28,
    start: i * 30,
    speed: (i % 2 ? -1 : 1) * (18 + (i % 3) * 6),
    lat: 0,
    lng: 0,
  }));
  const step = (t: number): void => {
    for (const p of probes) Object.assign(p, along(p.tilt, p.start + p.speed * t));
  };
  step(0);

  const geometry = new ConeGeometry(2.4, 8, 10).rotateX(Math.PI / 2);
  const material = new MeshLambertMaterial({ color: '#9be37c' });
  stage.onDispose(() => {
    geometry.dispose();
    material.dispose();
  });

  let created = 0;
  let updates = 0;
  const globe = stage.own(new Globe(stage.container)).globeImageUrl(dark);

  globe
    .customLayerData(probes)
    .customThreeObject(() => {
      created++;
      return new Mesh(geometry, material);
    })
    // Without this the layer would clear and rebuild every object on each data update.
    .customThreeObjectUpdate((obj: object, d: object) => {
      const probe = d as Probe;
      const mesh = obj as Mesh;
      const { x, y, z } = globe.getCoords(probe.lat, probe.lng, 0.1);
      mesh.position.set(x, y, z);
      mesh.lookAt(x * 2, y * 2, z * 2);
      updates++;
    });

  let clock = 0;
  let since = 0;
  stage.loop((dt) => {
    clock += dt;
    since += dt;
    if (since < 0.05) return;
    since = 0;
    step(clock);
    globe.customLayerData([...probes]);
    if (log) log.textContent = `objects created: ${created}   updates applied: ${updates}`;
  });

  globe.pointOfView({ lat: 20, lng: 0, altitude: 2.6 });

  return stage.dispose;
};

export default mount;
