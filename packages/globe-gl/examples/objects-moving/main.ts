// Objects: objectsData set again at a steady rate moves satellites along orbits
import Globe from 'globe.gl';
import { BoxGeometry, Group, Mesh, MeshLambertMaterial } from 'three';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Satellite {
  name: string;
  /** Orbit tilt, degrees; start angle on the orbit, degrees; degrees per second. */
  tilt: number;
  start: number;
  speed: number;
  alt: number;
  lat: number;
  lng: number;
}

const rad = Math.PI / 180;

/** The point `angle` degrees along an orbit tilted about the x axis. */
function along(tilt: number, angle: number): { lat: number; lng: number } {
  const a = angle * rad;
  const x = Math.cos(a);
  const y = Math.sin(a) * Math.cos(tilt * rad);
  const z = Math.sin(a) * Math.sin(tilt * rad);
  return { lat: Math.asin(z) / rad, lng: Math.atan2(y, x) / rad };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a satellite for its name. Positions are written to the data and the layer is told 20 times a second.' });
  const dark = await texture('dark');

  const sats: Satellite[] = [];
  const tilts = [25, 55, 85, 120];
  tilts.forEach((tilt, ring) => {
    for (let k = 0; k < 3; k++) {
      sats.push({
        name: `SAT-${ring * 3 + k + 1}`,
        tilt,
        start: k * 120 + ring * 30,
        speed: (ring % 2 ? -1 : 1) * (22 + ring * 4),
        alt: 0.12 + ring * 0.05,
        lat: 0,
        lng: 0,
      });
    }
  });
  let rate = 1;
  const update = (t: number): void => {
    for (const s of sats) Object.assign(s, along(s.tilt, s.start + s.speed * t));
  };
  update(0);

  const body = new BoxGeometry(5, 5, 5);
  const panel = new BoxGeometry(14, 0.6, 4);
  const bodyMat = new MeshLambertMaterial({ color: '#d8d8d8' });
  const panelMat = new MeshLambertMaterial({ color: '#4aa3ff' });
  stage.onDispose(() => {
    for (const x of [body, panel, bodyMat, panelMat]) x.dispose();
  });

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .objectsData(sats)
    .objectAltitude((d) => (d as Satellite).alt)
    .objectThreeObject(() => {
      const g = new Group();
      g.add(new Mesh(body, bodyMat), new Mesh(panel, panelMat));
      return g;
    });

  let clock = 0;
  let since = 0;
  stage.loop((dt) => {
    clock += dt * rate;
    since += dt;
    if (since < 0.05) return;
    since = 0;
    update(clock);
    // Same objects, new coordinates; a fresh array makes sure the layer digests it.
    globe.objectsData([...sats]);
  });

  globe.pointOfView({ lat: 20, lng: 0, altitude: 2.6 });
  if (stage.bar) {
    slider(stage.bar, 'Speed', 0, 3, 0.1, rate, (v) => (rate = v), (v) => `${v.toFixed(1)}x`);
  }

  return stage.dispose;
};

export default mount;
