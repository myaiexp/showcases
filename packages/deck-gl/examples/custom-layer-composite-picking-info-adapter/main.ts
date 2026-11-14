// A composite layer's getPickingInfo: rewrite the sublayer's info before the app's onHover sees it
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { screenOf } from '../../shared/guide-picking.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { CountryBubbleLayer } from './country-bubble-layer.ts';

type BubbleInfo = PickingInfo<City[]> & { groupKey?: string; viaSublayer?: string };

function describe(info: BubbleInfo): string {
  if (!info.picked || !info.object) return 'info.picked: false';
  return [
    `info.layer: ${info.layer?.id}   info.sourceLayer: ${info.sourceLayer?.id}`,
    `info.groupKey (added by getPickingInfo): ${info.groupKey}`,
    `info.object: ${info.object.length} cities: ${info.object.map((c) => c.name).join(', ')}`,
  ].join('\n');
}

const PROBES = ['India', 'China', 'United States', 'Brazil', 'Japan'].map(
  (name) => CITIES.find((c) => c.country === name) ?? city('Tokyo'),
);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 40, latitude: 25, zoom: ctx.preview ? 0.9 : 1.5 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Hover a bubble');
  if (!ctx.preview) label.style.textAlign = 'left';
  if (ctx.preview) label.style.fontSize = '9px';

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new CountryBubbleLayer<City>({
        id: 'bubbles',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getGroup: (d) => d.country,
        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 190, 70, 200],
        onHover: (info: BubbleInfo) => {
          label.textContent = describe(info);
        },
      }),
    ],
  });

  // Cards have no pointer: ask the picking engine about a few bubbles instead.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const at = screenOf(deck, PROBES[i++ % PROBES.length]!.coordinates);
      const hit = at && deck.pickObject({ x: at[0], y: at[1] });
      if (hit) label.textContent = describe(hit as BubbleInfo);
    }, 1500);
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
