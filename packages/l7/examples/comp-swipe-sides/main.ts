// Swipe addLayer, removeLayer, removeLayers: which side a layer clips to
import { Scene, Swipe } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, dots, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { COOL, countryFill, WARM } from '../../shared/comp-swipe.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);

  const warm = countryFill('warm', WARM);
  const cool = countryFill('cool', COOL);
  const places = dots(PLACES, { name: 'places', size: 12 });
  scene.addLayer(warm);
  scene.addLayer(cool);
  scene.addLayer(places);

  // Start with no layers: nothing is clipped, so everything shows on both sides.
  const swipe = addControl(stage, scene, new Swipe({ ratio: 0.5, layers: [], rightLayers: [] }));
  const out = stage.readout();
  const say = (s: string): void => {
    if (out) out.textContent = s;
  };
  const steps: [string, () => void][] = [
    ['addLayer(warm)  // left by default', () => swipe.addLayer(warm)],
    ['addLayer(cool, true)  // right', () => swipe.addLayer(cool, true)],
    ['addLayer(places)  // left too', () => swipe.addLayer(places)],
    ['removeLayer(places)  // back on both sides', () => swipe.removeLayer(places)],
    ['removeLayers()  // nothing clipped', () => swipe.removeLayers()],
  ];
  say('Layers not added to the Swipe are drawn on both sides.');
  if (stage.bar) for (const [label, fn] of steps) button(stage.bar, label.split('  ')[0] ?? label, () => (fn(), say(label)));
  else
    stage.every(1300, (i) => {
      const [label, fn] = steps[i % steps.length] ?? steps[0] ?? ['', () => undefined];
      fn();
      say(label);
    });

  return () => stage.dispose();
};

export default mount;
