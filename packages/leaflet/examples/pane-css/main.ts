// A pane is a div: opacity and mix-blend-mode on a custom pane restyle everything inside it
import { GeoJSON, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { euCountries } from '../../shared/data.ts';

const BLENDS = ['normal', 'multiply', 'screen', 'overlay', 'difference'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The polygons live in a pane created with createPane. Its CSS applies to them as one group.' });
  const data = await euCountries();
  if (stage.disposed) return () => stage.dispose();

  const map = stage.own(new LeafletMap(stage.box));
  const pane = map.createPane('tint');
  pane.style.zIndex = '450';
  new LocalTileLayer('https://tiles.example/terrain/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const geojson = new GeoJSON(data, { pane: 'tint', style: { color: '#fff', weight: 1, fillColor: '#e8590c', fillOpacity: 1 } }).addTo(map);
  // The data includes Russia, so fit Europe by hand: getBounds() would zoom out to nearly the whole world.
  map.fitBounds([[34, -11], [66, 32]]);

  let opacity = 0.6;
  let blend = 'normal';
  const apply = (): void => {
    pane.style.opacity = String(opacity);
    pane.style.mixBlendMode = blend;
    stage.say(`pane.style.opacity = ${opacity}; pane.style.mixBlendMode = '${blend}'`);
  };
  stage.slider('opacity', 0, 1, 0.05, opacity, (v) => {
    opacity = v;
    apply();
  });
  stage.select('mix-blend-mode', BLENDS.map((b) => ({ value: b, label: b })), 'normal', (v) => {
    blend = v;
    apply();
  });
  apply();

  if (stage.preview) {
    const seq: [number, string][] = [[0.6, 'normal'], [1, 'multiply'], [0.8, 'difference'], [0.3, 'normal'], [1, 'screen']];
    let i = 0;
    stage.every(2200, () => {
      [opacity, blend] = seq[++i % seq.length]!;
      apply();
    });
  }
  return () => stage.dispose();
};

export default mount;
