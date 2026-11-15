// Layer tooltip methods: openTooltip, closeTooltip, toggleTooltip, isTooltipOpen
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls one method on the marker. openTooltip(latlng) opens the tooltip somewhere else.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.2, 24.9], zoom: 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([60.17, 24.94]).addTo(map).bindTooltip('A tooltip', { direction: 'right' });

  const report = (what: string): void => stage.say(`${what}: isTooltipOpen() is ${marker.isTooltipOpen()}`);
  const actions: [string, () => void][] = [
    ['openTooltip()', () => marker.openTooltip()],
    ['openTooltip(latlng)', () => marker.openTooltip([60.4, 25.4])],
    ['closeTooltip()', () => marker.closeTooltip()],
    ['toggleTooltip()', () => marker.toggleTooltip()],
  ];
  for (const [label, fn] of actions) {
    stage.button(label, () => {
      fn();
      report(label);
    });
  }
  report('Start');

  if (stage.preview) {
    stage.cycle(
      [0, 1, 2, 3, 3].map((i) => ({
        run: () => {
          const [label, fn] = actions[i]!;
          fn();
          report(label);
        },
      })),
      1600,
    );
  }
  return () => stage.dispose();
};

export default mount;
