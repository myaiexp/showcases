// Deck _pickable: false switches picking off for the whole deck
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 30, zoom: ctx.preview ? 0.6 : 1.5 };
  const label = ctx.preview ? overlay(stage.box, '_pickable: true', 'bottom') : readout(el, 'Hover a city.');
  let layerPickable = true;

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({ id: 'cities', data: CITIES, pickable: layerPickable, autoHighlight: true, highlightColor: [255, 255, 255, 220], getPosition: (d) => d.coordinates, getRadius: (d) => Math.sqrt(d.population) * 90_000, radiusMinPixels: 5, getFillColor: [255, 170, 70, 200] }),
  ];
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    _pickable: true,
    onHover: (info) => {
      label.textContent = info.object ? `${(info.object as City).name}: picked` : 'nothing picked';
    },
    layers: layers(),
  });

  let timer = 0;
  if (ctx.preview) {
    let on = true;
    timer = window.setInterval(() => {
      on = !on;
      deck.setProps({ _pickable: on });
      label.textContent = `_pickable: ${on}`;
    }, 2000);
  } else {
    const bar = controlBar(el);
    check(bar, 'Deck _pickable', true, (v) => deck.setProps({ _pickable: v }));
    check(bar, "layer's pickable", true, (v) => {
      layerPickable = v;
      deck.setProps({ layers: layers() });
    });
  }
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
