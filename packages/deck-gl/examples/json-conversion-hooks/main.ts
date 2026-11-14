// JSONConfiguration hooks: preProcessClassProps and postProcessConvertedJson
import { Deck } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { CITY_ROWS, applyConverted } from '../../shared/json-data.ts';
import { animate, createStage } from '../../shared/stage.ts';

const VIEW = { longitude: 10, latitude: 25, zoom: 1 };

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const deck = new Deck({ device: stage.device, controller: !ctx.preview, layers: [] });
  let pre = true;
  let post = true;
  let first = true;
  let calls = 0;
  const note = ctx.preview ? null : readout(el);

  const render = (): void => {
    calls = 0;
    const converter = new JSONConverter({
      configuration: {
        classes: { ScatterplotLayer },
        log: null,
        // Called with each resolved class and its converted props, before `new Class(props)`.
        preProcessClassProps: (_Class: unknown, props: Record<string, unknown>) => {
          calls++;
          return pre ? { ...props, opacity: 0.45, radiusScale: 1.6 } : props;
        },
        // Called once with the whole converted result: here it drops layers that came out null.
        postProcessConvertedJson: (json: unknown) => {
          const out = json as { layers: unknown[] };
          return post ? { ...out, layers: out.layers.filter(Boolean) } : out;
        },
      },
    });
    // Two registered layers and one @@type nobody registered.
    const converted = converter.convert({
      initialViewState: VIEW,
      layers: [
        { '@@type': 'ScatterplotLayer', data: CITY_ROWS, getPosition: '@@=[lng, lat]', getRadius: 160000, getFillColor: [255, 140, 60], radiusMinPixels: 2 },
        { '@@type': 'HexagonLayer', data: CITY_ROWS },
        { '@@type': 'ScatterplotLayer', data: CITY_ROWS.filter((c) => c.population > 20), getPosition: '@@=[lng, lat]', getRadius: 500000, getFillColor: [90, 200, 255], radiusMinPixels: 4 },
      ],
    }) as { layers: unknown[] };
    applyConverted(deck, converted, { first, controller: !ctx.preview });
    first = false;
    if (note) note.textContent = `preProcessClassProps ran ${calls} times (layer opacity ${pre ? 0.45 : 1}); converted layers array has ${converted.layers.length} entries`;
    converter.finalize();
  };
  render();

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      pre = i % 2 === 0;
      render();
    }, 1500);
    stop = animate((t) => deck.setProps({ viewState: { ...VIEW, zoom: 0.4, longitude: ((10 + t * 6 + 180) % 360) - 180 } }));
  } else {
    const bar = controlBar(el);
    check(bar, 'preProcessClassProps (opacity, radiusScale)', pre, (v) => {
      pre = v;
      render();
    });
    check(bar, 'postProcessConvertedJson (drop nulls)', post, (v) => {
      post = v;
      render();
    });
  }

  return () => {
    window.clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
