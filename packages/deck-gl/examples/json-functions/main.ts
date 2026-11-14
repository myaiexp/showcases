// The @@function key: JSON calls a function registered in the configuration
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { CITY_ROWS, applyConverted, type CityRow } from '../../shared/json-data.ts';
import { animate, createStage } from '../../shared/stage.ts';

const VIEW = { longitude: 10, latitude: 25, zoom: 1 };

type Rgb = [number, number, number];

// Named functions the JSON may call. Each receives the object's other fields, converted.
const functions = {
  // Returns an accessor: the converter calls this once, deck.gl calls the result per row.
  radiusByPopulation: ({ scale }: { scale: number }) => (d: CityRow) => Math.sqrt(d.population) * scale,
  // Interpolates two colours by population.
  populationRamp: ({ from, to }: { from: Rgb; to: Rgb }) => (d: CityRow) => {
    const t = Math.min(d.population / 37, 1);
    return from.map((v, i) => Math.round(v + (to[i]! - v) * t));
  },
  // Returns a plain value, resolved straight into the prop.
  clamp: ({ value, min, max }: { value: number; min: number; max: number }) => Math.min(Math.max(value, min), max),
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const converter = new JSONConverter({ configuration: { classes: { ScatterplotLayer }, functions } });
  const deck = new Deck({ device: stage.device, controller: !ctx.preview, layers: [] });
  let scale = 70000;
  let opacity = 1.4;
  let first = true;
  const note = ctx.preview ? null : readout(el);

  const render = (): void => {
    const spec = {
      initialViewState: VIEW,
      layers: [
        {
          '@@type': 'ScatterplotLayer',
          data: CITY_ROWS,
          getPosition: '@@=[lng, lat]',
          getRadius: { '@@function': 'radiusByPopulation', scale },
          getFillColor: { '@@function': 'populationRamp', from: [90, 200, 255], to: [255, 90, 120] },
          opacity: { '@@function': 'clamp', value: opacity, min: 0.2, max: 1 },
          radiusMinPixels: 3,
          updateTriggers: { getRadius: scale },
        },
      ],
    };
    applyConverted(deck, converter.convert(spec), { first, controller: !ctx.preview });
    first = false;
    if (note) note.textContent = `opacity: clamp({value: ${opacity}, min: 0.2, max: 1}) = ${Math.min(Math.max(opacity, 0.2), 1)}`;
  };
  render();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      scale = 70000 + Math.sin(t) * 40000;
      render();
      deck.setProps({ viewState: { ...VIEW, zoom: 0.4, longitude: ((10 + t * 6 + 180) % 360) - 180 } });
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'scale', 20000, 120000, 10000, scale, (v) => {
      scale = v;
      render();
    });
    slider(bar, 'opacity value', 0, 1.6, 0.1, opacity, (v) => {
      opacity = v;
      render();
    });
  }

  return () => {
    stop();
    converter.finalize();
    stage.release(deck);
  };
};

export default mount;
