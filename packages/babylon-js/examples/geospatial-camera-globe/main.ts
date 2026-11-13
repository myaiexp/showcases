// GeospatialCamera orbiting a globe: center, yaw, pitch, radius, limits and clipping
import {
  DirectionalLight,
  GeospatialCamera,
  GeospatialClippingBehavior,
  HemisphericLight,
  Vector2,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createGlobe, ecef, PLANET_RADIUS } from '../../shared/globe.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const deg = (r: number): string => `${((r * 180) / Math.PI).toFixed(1)}°`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const { scene } = stage;
  new HemisphericLight('ambient', new Vector3(0, 0, 1), scene).intensity = 0.35;
  new DirectionalLight('sun', new Vector3(-1, -0.4, -0.3), scene).intensity = 1.1;
  createGlobe(scene);

  // The camera orbits a planet centred at the world origin; only the globe is pickable.
  const camera = new GeospatialCamera('geoCam', scene, {
    planetRadius: PLANET_RADIUS,
    pickPredicate: (mesh) => mesh.name === 'globe',
  });
  // Mouse, wheel and keyboard inputs come attached; previews take no input.
  if (!ctx.preview) camera.attachControl();

  // Start over Europe, a few thousand kilometres up, tilted towards the horizon.
  camera.center = ecef(50, 15);
  camera.radius = PLANET_RADIUS * 0.9;
  camera.pitch = Math.PI / 5;

  // Limits: don't go under 50 km or past 5 planet radii, and look straight down when far.
  camera.limits.radiusMin = 50000;
  camera.limits.radiusMax = PLANET_RADIUS * 5;
  camera.limits.pitchDisabledRadiusScale = new Vector2(2, 4);
  // Near and far planes follow the altitude, for depth precision at every zoom.
  camera.addBehavior(new GeospatialClippingBehavior());
  // A little drift after a drag.
  camera.movement.panInertia = 0.85;

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('pitch', 0, 1.5, 0.01, camera.pitch, (v) => (camera.pitch = v));
    panel.slider('yaw', -Math.PI, Math.PI, 0.01, camera.yaw, (v) => (camera.yaw = v));
    panel.slider('radius (Mm)', 0.1, 30, 0.1, camera.radius / 1e6, (v) => (camera.radius = v * 1e6));
    panel.row();
    panel.slider('movement.zoomSpeed', 0.5, 8, 0.5, camera.movement.zoomSpeed, (v) => (camera.movement.zoomSpeed = v));
    panel.slider('movement.panInertia', 0, 0.95, 0.05, camera.movement.panInertia, (v) => (camera.movement.panInertia = v));
    panel.check('zoomToCursor', camera.movement.zoomToCursor, (on) => (camera.movement.zoomToCursor = on));
    panel.row();
    const readout = panel.readout();
    stage.run(() => {
      const c = camera.center;
      const r = c.length();
      readout.textContent = `center ${deg(Math.asin(c.z / r))} lat, ${deg(Math.atan2(c.y, c.x))} lon · yaw ${deg(camera.yaw)} · pitch ${deg(camera.pitch)} · radius ${(camera.radius / 1000).toFixed(0)} km · near ${camera.minZ.toFixed(0)} m`;
    });
  } else {
    // The card spins slowly: walking the center east around the globe.
    let lon = 15;
    stage.run(() => {
      lon += 0.15;
      camera.center = ecef(40, lon);
    });
  }

  return () => stage.dispose();
};

export default mount;
