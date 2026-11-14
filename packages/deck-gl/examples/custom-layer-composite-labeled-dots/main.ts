// A composite layer: LabeledDotLayer renders a ScatterplotLayer and a TextLayer from one set of props
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { LabeledDotLayer } from './labeled-dot-layer.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const settings = { scale: 1, labels: true };

  const layers = (): LabeledDotLayer<City>[] => [
    new LabeledDotLayer<City>({
      id: 'cities', // sublayers become 'cities-dots' and 'cities-labels'
      data: CITIES,
      getPosition: (d) => d.coordinates,
      dotRadiusScale: settings.scale,
      getDotRadius: (d) => Math.sqrt(d.population) * 40_000,
      getDotColor: [255, 140, 60, 220],
      showLabels: settings.labels,
      getText: (d) => d.name,
      getTextSize: 12,
    }),
  ];

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), ...layers()],
  });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), ...layers()] });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 6) } }));
  } else {
    const bar = controlBar(el);
    slider(bar, 'dotRadiusScale', 0.2, 3, 0.1, settings.scale, (v) => {
      settings.scale = v;
      refresh();
    });
    check(bar, 'showLabels', settings.labels, (v) => {
      settings.labels = v;
      refresh();
    });
    readout(el, 'LabeledDotLayer is one layer in the list; deck.gl lists its two sublayers after it.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
