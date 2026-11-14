// DataFilterExtension: getFilterValue = zoom a city appears, filterRange [0, zoom]
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { DataFilterExtension } from '@deck.gl/extensions';
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface RankedCity extends City {
  /** The zoom at which this city appears: the biggest at 1, the smallest at about 4.5. */
  minZoom: number;
}
const RANKED: RankedCity[] = [...CITIES]
  .sort((a, b) => b.population - a.population)
  .map((c, i, all) => ({ ...c, minZoom: 1 + (i / all.length) * 3.5 }));

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 35, zoom: ctx.preview ? 1.8 : 2.4, minZoom: 0.5, maxZoom: 7 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);

  const layers = (zoom: number) => {
    const shared = {
      data: RANKED,
      getPosition: (d: RankedCity) => d.coordinates,
      // The value to filter on, and the range of values that stay visible.
      getFilterValue: (d: RankedCity) => d.minZoom,
      filterRange: [0, zoom] as [number, number],
      // Values between zoom - 0.8 and zoom are "faded": smaller and fainter until the zoom catches up.
      filterSoftRange: [0, zoom - 0.8] as [number, number],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
    };
    return [
      landLayer(),
      new ScatterplotLayer<RankedCity>({ id: 'dots', ...shared, getRadius: 4, radiusUnits: 'pixels', getFillColor: [255, 170, 70] }),
      new TextLayer<RankedCity>({ id: 'names', ...shared, getText: (d) => d.name, getSize: 12, getColor: [235, 240, 250], getPixelOffset: [0, -14], outlineWidth: 2, outlineColor: [10, 20, 30], fontSettings: { sdf: true } }),
    ];
  };
  const describe = (zoom: number): string => `zoom ${zoom.toFixed(1)}: ${RANKED.filter((c) => c.minZoom <= zoom).length} of ${RANKED.length} cities`;

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    onViewStateChange: ({ viewState }) => {
      deck.setProps({ layers: layers(viewState.zoom) });
      label.textContent = describe(viewState.zoom);
    },
    layers: layers(view.zoom),
  });
  label.textContent = describe(view.zoom);

  let timer = 0;
  if (ctx.preview) {
    let up = true;
    timer = window.setInterval(() => {
      up = !up;
      const zoom = up ? 4.2 : 1.4;
      deck.setProps({ initialViewState: { ...view, zoom, transitionDuration: 2500 } });
    }, 3200);
    // The preview camera is animated by transitions, which also call onViewStateChange.
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
