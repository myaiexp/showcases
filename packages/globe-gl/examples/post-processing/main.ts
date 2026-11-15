// postProcessingComposer(): add a bloom pass after the built-in RenderPass
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { Vector2 } from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The night lights, rings and arcs glow; the dark ocean does not.' });
  const night = await texture('night');

  const links = cities.slice(0, 16).map((c, i) => {
    const d = cities[(i * 7 + 3) % cities.length]!;
    return { startLat: c.lat, startLng: c.lng, endLat: d.lat, endLng: d.lng };
  });
  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(night)
    .backgroundColor('#000000')
    .arcsData(links)
    .arcColor(() => ['#00f5ff', '#ff00e5'])
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashAnimateTime(2500)
    .ringsData(cities.slice(0, 10))
    .ringColor(() => '#ffb347')
    .ringMaxRadius(4);
  globe.controls().autoRotate = true;

  // The composer starts with one RenderPass; extra passes run after it.
  const bloom = new UnrealBloomPass(new Vector2(stage.width, stage.height), 1.2, 0.6, 0.3);
  globe.postProcessingComposer().addPass(bloom);
  stage.onDispose(() => bloom.dispose());

  if (stage.bar) {
    checkbox(stage.bar, 'bloom pass', true, (v) => (bloom.enabled = v));
    slider(stage.bar, 'strength', 0, 3, 0.05, bloom.strength, (v) => (bloom.strength = v));
    slider(stage.bar, 'radius', 0, 1.5, 0.05, bloom.radius, (v) => (bloom.radius = v));
    slider(stage.bar, 'threshold', 0, 1, 0.01, bloom.threshold, (v) => (bloom.threshold = v));
  }

  return stage.dispose;
};

export default mount;
