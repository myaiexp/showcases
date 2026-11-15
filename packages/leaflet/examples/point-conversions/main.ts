// latLngToContainerPoint, latLngToLayerPoint and project for one marker while the map pans
import { LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the map: the marker keeps its layer point and projected point; only its container point changes.' });
  const pre = stage.side('Marker at 51.5, -0.09');

  const map = stage.own(new LeafletMap(stage.box).setView([51.5, -0.09], 11));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const at = new Marker([51.5, -0.09]).addTo(map);

  const render = (): void => {
    const ll = at.getLatLng();
    const container = map.latLngToContainerPoint(ll);
    const layer = map.latLngToLayerPoint(ll);
    const projected = map.project(ll);
    const centerBack = map.containerPointToLatLng(map.getSize().divideBy(2));
    if (!pre) {
      stage.say(`container ${container.round().toString()}   layer ${layer.round().toString()}   projected ${projected.round().toString()}`);
      return;
    }
    pre.textContent = [
      `latLngToContainerPoint\n  ${container.toString()}`,
      `latLngToLayerPoint\n  ${layer.toString()}`,
      `project(latlng)\n  ${projected.toString()}`,
      `getPixelOrigin()\n  ${map.getPixelOrigin().toString()}`,
      `containerPointToLatLng(size / 2)\n  ${centerBack.toString()}`,
    ].join('\n');
  };
  map.on('move', render);
  map.on('viewreset', render);
  render();

  if (stage.preview) {
    const dirs: [number, number][] = [[60, 30], [-80, 10], [20, -50], [0, 10]];
    let i = 0;
    stage.every(1800, () => map.panBy(dirs[i++ % dirs.length]!));
  }
  return () => stage.dispose();
};

export default mount;
