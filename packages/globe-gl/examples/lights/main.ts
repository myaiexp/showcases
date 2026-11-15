// lights: replace the default ambient + directional pair with lights of your own
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cities } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';
import { AmbientLight, DirectionalLight, HemisphereLight, type Light, PointLight } from 'three';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A low sun circles the globe; the far side falls into shadow.' });
  const day = await texture('day');

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(day)
    .pointsData(cities)
    .pointColor(() => '#ffffff');

  // The default set, read back from the getter before it is replaced.
  const defaults = globe.lights();
  const sun = new DirectionalLight('#fff4e0', 3);
  const rigs: Record<string, Light[]> = {
    'a circling sun': [new AmbientLight('#203050', 0.4), sun],
    'two coloured lamps': [new AmbientLight('#111', 0.5), new PointLight('#ff4d6d', 4, 0, 0), new PointLight('#4dd2ff', 4, 0, 0)],
    'sky and ground': [new HemisphereLight('#bde0fe', '#5a3d1e', 3)],
    'the default pair': defaults,
  };
  const [lampA, lampB] = rigs['two coloured lamps']!.slice(1) as PointLight[];
  globe.lights(rigs['a circling sun']!);

  // Lights live in scene space: move them around the globe's radius.
  const r = globe.getGlobeRadius() * 4;
  stage.loop((_dt, t) => {
    sun.position.set(Math.cos(t * 0.6) * r, r * 0.3, Math.sin(t * 0.6) * r);
    lampA!.position.set(Math.cos(t) * r, r * 0.5, Math.sin(t) * r);
    lampB!.position.set(-Math.cos(t) * r, -r * 0.5, -Math.sin(t) * r);
  });

  if (stage.bar) select(stage.bar, 'lights', Object.keys(rigs), (k) => globe.lights(rigs[k]!));
  stage.onDispose(() => Object.values(rigs).flat().forEach((l) => l.dispose()));

  return stage.dispose;
};

export default mount;
