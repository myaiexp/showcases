// new Popup().setLnglat(e.lngLat).setHTML(...) on layer mousemove, then scene.addPopup
import { Popup, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { tour } from '../../shared/layer-demo.ts';
import { regions, type RegionProps } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  const data = regions();
  const layer = new PolygonLayer({})
    .source(data)
    .color('density', ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)'])
    .active(true);
  scene.addLayer(layer);

  let popup: Popup | undefined;
  const open = (lngLat: { lng: number; lat: number }, p: RegionProps): void => {
    // The docs build a new Popup on every move; closing the last one keeps the map clean.
    if (popup) scene.removePopup(popup);
    popup = new Popup({ offsets: [0, 0], closeButton: false })
      .setLnglat(lngLat)
      .setHTML(`<span>Country: ${p.name}</span><br><span>Density: ${p.density}</span>`);
    scene.addPopup(popup);
  };
  layer.on('mousemove', (e: { lngLat: { lng: number; lat: number }; feature: { properties: RegionProps } }) => open(e.lngLat, e.feature.properties));
  // Start with one popup open so there is something to see before the pointer arrives.
  const first = data.features.find((f) => f.properties.name === 'Germany');
  if (first) open({ lng: 10.4, lat: 51.1 }, first.properties);

  if (stage.preview) tour(stage, scene, [[2.3, 46.5], [10.4, 51.1], [-3.7, 40.3], [19.1, 52], [12.5, 42.8]], { ms: 800, clickEvery: 99 });

  return () => stage.dispose();
};

export default mount;
