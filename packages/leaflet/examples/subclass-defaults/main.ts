// A CircleMarker subclass chain: defaults are merged down the chain and stay live
import { CircleMarker, LeafletMap, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Ring and Pulse only declare what differs. Press the button: the default colour changes for every instance that did not pass its own.' });
  const pre = stage.side('options.* of each circle');
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 40], zoom: stage.preview ? 2 : 3, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // Classes live inside mount so changing their defaults never outlasts the example.
  class Ring extends CircleMarker {
    static override defaultOptions: typeof CircleMarker.defaultOptions = { radius: 14, color: '#f58a3d', weight: 3, fillOpacity: 0.15 };
  }
  class Pulse extends Ring {
    static override defaultOptions: typeof CircleMarker.defaultOptions = { radius: 24, fillOpacity: 0.55 };
  }

  const step = stage.preview ? 20 : 24;
  const at = (i: number): LatLngExpression => [20, 40 + (i - 2) * step];
  const items: { label: string; layer: CircleMarker }[] = [
    { label: 'CircleMarker', layer: new CircleMarker(at(0)) },
    { label: 'Ring', layer: new Ring(at(1)) },
    { label: 'Pulse', layer: new Pulse(at(2)) },
    { label: 'Pulse {radius: 32}', layer: new Pulse(at(3), { radius: 32 }) },
    { label: 'Ring {color}', layer: new Ring(at(4), { color: '#60a5fa' }) },
  ];
  for (const { label, layer } of items) layer.addTo(map).bindTooltip(label, { permanent: !stage.preview, direction: 'bottom', offset: [0, 4] });

  const show = (): void => {
    const lines = items.map(({ label, layer }) => {
      const o = layer.options;
      return `${label}\n  radius ${o.radius}, color ${o.color}, fillOpacity ${o.fillOpacity}\n  own keys: ${Object.keys(o).join(', ') || 'none'}`;
    });
    if (pre) pre.textContent = lines.join('\n');
  };
  const recolor = (color: string): void => {
    Ring.defaultOptions.color = color;
    for (const { layer } of items) layer.redraw();
    stage.say(`Ring.defaultOptions.color = ${color}: Ring and Pulse change, CircleMarker and the Ring with its own colour do not`);
    show();
  };
  show();
  stage.say('Pulse inherits color and weight from Ring, and sets its own radius and fillOpacity');
  stage.button('Ring.defaultOptions.color = green', () => recolor('#4ade80'));
  stage.button('Ring.defaultOptions.color = orange', () => recolor('#f58a3d'));

  if (stage.preview) {
    stage.cycle([{ run: () => recolor('#4ade80') }, { run: () => recolor('#e879f9') }, { run: () => recolor('#f58a3d') }], 2400);
  }
  return () => stage.dispose();
};

export default mount;
