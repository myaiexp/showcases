// Marker show(), hide() and remove(): hide keeps it, remove takes it off the map
import { Marker, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { badge, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const marker = new Marker({ element: badge('Rome', '#ffd166') }).setLnglat({ lng: 12.5, lat: 41.9 });
  const sibling = new Marker({ element: badge('Paris', '#4ecdc4') }).setLnglat({ lng: PLACES[2]?.lng ?? 2, lat: PLACES[2]?.lat ?? 48 });
  scene.addMarker(marker);
  scene.addMarker(sibling);
  stage.own(() => {
    marker.remove();
    sibling.remove();
  });
  const out = stage.readout();
  const say = (s: string): void => {
    if (out) out.textContent = s;
  };
  const steps: [string, () => void][] = [
    ['hide()  // still added, just not drawn', () => marker.hide()],
    ['show()', () => marker.show()],
    ['remove()  // off the map, listeners cleaned up', () => marker.remove()],
    ['scene.addMarker(marker)  // back again', () => scene.addMarker(marker)],
  ];
  say('Rome is a Marker; Paris is left alone.');
  if (stage.bar) for (const [label, fn] of steps) button(stage.bar, label.split('  ')[0] ?? label, () => (fn(), say(label)));
  else
    stage.every(1000, (i) => {
      const [label, fn] = steps[i % steps.length] ?? steps[0] ?? ['', () => undefined];
      fn();
      say(label);
    });

  return () => stage.dispose();
};

export default mount;
