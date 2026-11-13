// GeospatialCamera.flyToAsync between cities, with easing and a center hop
import {
  CubicEase,
  DirectionalLight,
  EasingFunction,
  GeospatialCamera,
  GeospatialClippingBehavior,
  HemisphericLight,
  Vector3,
} from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { CITIES, createGlobe, ecef, PLANET_RADIUS } from '../../shared/globe.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const { scene } = stage;
  new HemisphericLight('ambient', new Vector3(0, 0, 1), scene).intensity = 0.35;
  new DirectionalLight('sun', new Vector3(-1, -0.4, -0.3), scene).intensity = 1.1;
  createGlobe(scene);

  const camera = new GeospatialCamera('geoCam', scene, {
    planetRadius: PLANET_RADIUS,
    pickPredicate: (mesh) => mesh.name === 'globe',
  });
  // Double-click on the globe flies halfway to the clicked point (flyToPointAsync).
  if (!ctx.preview) camera.attachControl();
  camera.addBehavior(new GeospatialClippingBehavior());
  camera.center = ecef(CITIES[0].lat, CITIES[0].lon);
  camera.radius = PLANET_RADIUS * 1.5;

  const ease = new CubicEase();
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
  const settings = { duration: 2500, hop: 0.3, radius: 1200 };

  let alive = true;
  const fly = (i: number): Promise<void> => {
    const city = CITIES[i % CITIES.length]!;
    // yaw, pitch, radius and center in one animated flight; undefined would keep a value.
    return camera.flyToAsync(
      (i * Math.PI) / 3,
      Math.PI / 4,
      settings.radius * 1000,
      ecef(city.lat, city.lon),
      settings.duration,
      ease,
      settings.hop,
    );
  };

  if (!ctx.preview) {
    const panel = createPanel(el);
    CITIES.forEach((city, i) => panel.button(city.name, () => void fly(i)));
    panel.row();
    panel.slider('duration (ms)', 500, 6000, 100, settings.duration, (v) => (settings.duration = v));
    panel.slider('centerHopScale', 0, 1.5, 0.05, settings.hop, (v) => (settings.hop = v));
    panel.slider('arrival radius (km)', 100, 8000, 100, settings.radius, (v) => (settings.radius = v));
    panel.button('zoom out', () => void camera.flyToAsync(undefined, 0.01, PLANET_RADIUS * 3, undefined, settings.duration, ease));
  } else {
    // The card tours the cities on its own, one flight after another.
    void (async () => {
      for (let i = 1; alive; i++) {
        await fly(i);
        await new Promise((r) => setTimeout(r, 600));
      }
    })();
  }

  stage.run();
  return () => {
    alive = false;
    stage.dispose();
  };
};

export default mount;
