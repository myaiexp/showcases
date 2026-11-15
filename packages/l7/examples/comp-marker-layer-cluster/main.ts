// MarkerLayer cluster with clusterOption radius, minZoom and maxZoom
import { Marker, MarkerLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { badge, EUROPE_CENTER, europeZoom, spots } from '../../shared/comp-demo.ts';
import { slider } from '../../shared/controls.ts';
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

  const data = spots(ctx.preview ? 50 : 120);
  let layer: MarkerLayer | undefined;
  const build = (radius: number, maxZoom: number): void => {
    if (layer) {
      layer.clear();
      scene.removeMarkerLayer(layer);
    }
    // cluster merges markers that fall within radius px; above maxZoom they are never merged.
    layer = new MarkerLayer({ cluster: true, clusterOption: { radius, minZoom: 0, maxZoom } });
    for (const d of data) layer.addMarker(new Marker({ element: badge('', '#ffd166'), extData: d }).setLnglat({ lng: d.lng, lat: d.lat }));
    scene.addMarkerLayer(layer);
    const out = stage.readout();
    if (out) out.textContent = `cluster: true, clusterOption: { radius: ${radius}, minZoom: 0, maxZoom: ${maxZoom} }\nZoom the map: groups split as you zoom in, or stay merged past maxZoom.`;
  };
  stage.own(() => layer?.clear());
  const state = { radius: 80, maxZoom: 20 };
  build(state.radius, state.maxZoom);
  if (stage.bar) {
    slider(stage.bar, 'radius', [20, 200, 10], 80, (v) => ((state.radius = v), build(state.radius, state.maxZoom)));
    slider(stage.bar, 'maxZoom', [3, 20, 1], 20, (v) => ((state.maxZoom = v), build(state.radius, state.maxZoom)));
  } else {
    // Cards: zoom in and out in steps (not per frame: every step re-clusters).
    stage.every(1500, (i) => scene.setZoom(2.4 + (i % 3) * 0.7));
  }

  return () => stage.dispose();
};

export default mount;
