// MarkerLayer: addMarker, getMarkers, removeMarker and clear, plus scene.addMarkerLayer
import { Marker, MarkerLayer, Scene } from '@antv/l7';
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

  // A marker needs its lng/lat before it goes into the layer.
  const make = (i: number): Marker => {
    const p = PLACES[i % PLACES.length];
    return new Marker({ element: badge(p?.name ?? '', p?.kind === 'port' ? '#4ecdc4' : '#ffd166') }).setLnglat({ lng: p?.lng ?? 0, lat: p?.lat ?? 0 });
  };
  const layer = new MarkerLayer();
  scene.addMarkerLayer(layer);
  stage.own(() => layer.clear());
  let next = 0;
  const added: Marker[] = [];
  const out = stage.readout();
  const say = (call: string): void => {
    if (out) out.textContent = `${call}\ngetMarkers().length: ${layer.getMarkers().length}`;
  };
  const steps: [string, () => void][] = [
    ['addMarker(marker)', () => {
      const m = make(next++);
      added.push(m);
      layer.addMarker(m);
    }],
    ['addMarker(marker)', () => {
      const m = make(next++);
      added.push(m);
      layer.addMarker(m);
    }],
    ['addMarker(marker)', () => {
      const m = make(next++);
      added.push(m);
      layer.addMarker(m);
    }],
    ['removeMarker(first)', () => {
      const m = added.shift();
      if (m) layer.removeMarker(m);
    }],
    ['clear()', () => {
      layer.clear();
      added.length = 0;
    }],
  ];
  say('new MarkerLayer(); scene.addMarkerLayer(layer)');
  if (stage.bar) {
    button(stage.bar, 'addMarker()', () => (steps[0]?.[1](), say('addMarker(marker)')));
    button(stage.bar, 'removeMarker()', () => (steps[3]?.[1](), say('removeMarker(first)')));
    button(stage.bar, 'clear()', () => (steps[4]?.[1](), say('clear()')));
  } else
    stage.every(900, (i) => {
      const [label, fn] = steps[i % steps.length] ?? steps[0] ?? ['', () => undefined];
      fn();
      say(label);
    });

  return () => stage.dispose();
};

export default mount;
