// filterSubLayer: switch a composite's sublayers on zoom without re-rendering
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { ZoomSwitchLayer } from './zoom-switch-layer.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const SWITCH = 3;
  let renders = 0;
  let zoom = ctx.preview ? 2 : 2.5;
  const view: MapViewState = { longitude: 15, latitude: 38, zoom };
  const label = ctx.preview ? null : readout(el, 'Zoom the map across zoom 3');

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ZoomSwitchLayer<City>({
        id: 'lod',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getText: (d) => d.name,
        switchZoom: SWITCH,
        onRenderLayers: () => {
          renders++;
        },
      }),
    ],
    onViewStateChange: ({ viewState }) => {
      zoom = (viewState as MapViewState).zoom;
    },
    onAfterRender: () => {
      if (label) label.textContent = `zoom ${zoom.toFixed(2)}: ${zoom >= SWITCH ? 'detail dots and labels' : 'overview bubbles'}   renderLayers calls: ${renders}`;
    },
  });

  const stop = ctx.preview
    ? animate((t) => deck.setProps({ viewState: { ...view, zoom: 3.2 + Math.sin(t * 0.9) * 1.4 } }))
    : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
