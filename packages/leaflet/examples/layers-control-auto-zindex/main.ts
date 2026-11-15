// autoZIndex gives the control's tile layers rising zIndex values, so toggling keeps their stacking order
import { LayersControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, DENVER, pressEntry } from '../../shared/group-demo.ts';
import type { LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two translucent tile overlays. Switch one off and on: with autoZIndex the stacking order stays, without it the layer put back goes on top.' });
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 9, zoomControl: !stage.preview }));

  let control: LayersControl | null = null;
  let layers: LocalTileLayer[] = [];
  stage.own({ remove: () => control?.remove() });
  stage.own({ remove: () => layers.forEach((l) => l.remove()) });

  const build = (auto: boolean): void => {
    control?.remove();
    layers.forEach((l) => l.remove());
    // Fresh layers each time: setZIndex from the last control would otherwise stay in their options.
    const base = baseTiles('light');
    const grid = baseTiles('grid', { opacity: 0.7 });
    const night = baseTiles('night', { opacity: 0.7 });
    layers = [base, grid, night];
    base.addTo(map);
    grid.addTo(map);
    night.addTo(map);
    control = new LayersControl({ Streets: base }, { 'Grid tiles': grid, 'Night tiles': night }, { collapsed: false, autoZIndex: auto }).addTo(map);
    const z = (l: LocalTileLayer): string => String(l.options.zIndex);
    stage.say(`autoZIndex: ${auto}. zIndex: Streets ${z(base)}, Grid ${z(grid)}, Night ${z(night)}`);
  };
  stage.toggle('autoZIndex', true, build);
  stage.button('Toggle Grid tiles off and on', () => {
    pressEntry(map, 'Grid tiles');
    pressEntry(map, 'Grid tiles');
  });
  build(true);

  if (stage.preview) {
    let auto = true;
    stage.cycle(
      [
        { run: () => build(auto) },
        { say: 'Grid tiles off', run: () => pressEntry(map, 'Grid tiles'), hold: 1300 },
        { say: 'Grid tiles on again', run: () => pressEntry(map, 'Grid tiles'), hold: 1800 },
        { run: () => (auto = !auto), hold: 100 },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
