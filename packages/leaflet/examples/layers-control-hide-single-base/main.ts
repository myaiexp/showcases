// hideSingleBase hides the base-layer radio buttons while the control lists only one
import { LayerGroup, LayersControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Remove the Terrain entry: with hideSingleBase on, the lone Streets radio button disappears too.' });
  const cities = new LayerGroup(cityMarkers());
  const light = baseTiles('light');
  const terrain = baseTiles('terrain');
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, layers: [light, cities], zoomControl: !stage.preview }));

  let hide = true;
  let control: LayersControl | null = null;
  stage.own({ remove: () => control?.remove() });
  let terrainListed = true;
  const report = (): void => stage.say(`hideSingleBase: ${hide}, base layers in the control: ${terrainListed ? 2 : 1}`);
  const build = (): void => {
    control?.remove();
    // hideSingleBase is read each time the entries are drawn, but a new control keeps the demo simple.
    control = new LayersControl({ Streets: light, ...(terrainListed ? { Terrain: terrain } : {}) }, { Cities: cities }, { collapsed: false, hideSingleBase: hide }).addTo(map);
    report();
  };
  const dropTerrain = (): void => {
    if (!terrainListed) return;
    terrainListed = false;
    control?.removeLayer(terrain);
    report();
  };
  const listTerrain = (): void => {
    if (terrainListed) return;
    terrainListed = true;
    control?.addBaseLayer(terrain, 'Terrain');
    report();
  };
  stage.toggle('hideSingleBase', true, (on) => ((hide = on), build()));
  stage.button('removeLayer(terrain)', dropTerrain);
  stage.button('addBaseLayer(terrain)', listTerrain);
  build();

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => ((hide = true), (terrainListed = true), build()) },
        { run: dropTerrain },
        { run: () => ((hide = false), build()) },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
