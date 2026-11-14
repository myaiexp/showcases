// Picking a composite layer: info.layer is the GeoJsonLayer, info.sourceLayer the sublayer drawn
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Feature, Geometry } from 'geojson';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { city } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { screenOf } from '../../shared/guide-picking.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND, countries, type CountryProps } from '../../shared/world.ts';

type Country = Feature<Geometry, CountryProps>;
const PROBES = ['Paris', 'Cairo', 'Lima', 'Delhi', 'Sydney', 'Moscow'].map(city);

function describe(info: PickingInfo<Country>): string {
  if (!info.picked) return 'nothing picked';
  return [
    `object: ${info.object?.properties.name}`,
    `layer: ${info.layer?.id}`,
    `sourceLayer: ${info.sourceLayer?.id}`,
    `index: ${info.index}`,
  ].join('\n');
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 25, zoom: ctx.preview ? 0.8 : 1.4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Hover a country');
  if (!ctx.preview) label.style.textAlign = 'left';

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      new GeoJsonLayer<Country['properties']>({
        id: 'countries', // the composite layer
        data: countries,
        filled: true,
        stroked: true,
        getFillColor: LAND,
        getLineColor: [120, 140, 170],
        lineWidthMinPixels: 0.5,
        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 190, 70, 160],
      }),
    ],
    onHover: (info: PickingInfo<Country>) => {
      label.textContent = describe(info);
    },
  });

  // Cards ask the picking engine about a few places instead of waiting for a pointer.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const at = screenOf(deck, PROBES[i++ % PROBES.length]!.coordinates);
      const hit = at && deck.pickObject({ x: at[0], y: at[1] });
      if (hit) label.textContent = describe(hit as PickingInfo<Country>);
    }, 1400);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
