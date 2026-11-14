// The @@# prefix: constants and enumerations named in a JSON spec
import { COORDINATE_SYSTEM, Deck, MapController } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { JSONConverter } from '@deck.gl/json';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { CITY_ROWS, applyConverted } from '../../shared/json-data.ts';
import { animate, createStage } from '../../shared/stage.ts';

const VIEW = { longitude: 10, latitude: 25, zoom: 1 };

const configuration = {
  classes: { ScatterplotLayer },
  // "@@#NAME" looks here first: any value, including a class or a colour array.
  constants: { MapController, WARM: [255, 140, 60, 230], COOL: [90, 200, 255, 230] },
  // "@@#GROUP.NAME" looks up a group of values, like deck.gl's own enums.
  enumerations: { COORDINATE_SYSTEM, UNITS: { METERS: 'meters', PIXELS: 'pixels' } },
};

const PALETTES = ['WARM', 'COOL'] as const;
const UNITS = ['METERS', 'PIXELS'] as const;
type Palette = (typeof PALETTES)[number];
type Unit = (typeof UNITS)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const converter = new JSONConverter({ configuration });
  const deck = new Deck({ device: stage.device, controller: !ctx.preview, layers: [] });
  let palette: Palette = 'WARM';
  let unit: Unit = 'METERS';
  let first = true;
  const note = ctx.preview ? null : readout(el);

  const render = (): void => {
    const spec = {
      initialViewState: VIEW,
      // Constant: resolves to the MapController class itself (a card has no pointer).
      ...(ctx.preview ? {} : { controller: '@@#MapController' }),
      layers: [
        {
          '@@type': 'ScatterplotLayer',
          data: CITY_ROWS,
          getPosition: '@@=[lng, lat]',
          // Enumeration: COORDINATE_SYSTEM.LNGLAT is a number in @deck.gl/core.
          coordinateSystem: '@@#COORDINATE_SYSTEM.LNGLAT',
          radiusUnits: `@@#UNITS.${unit}`,
          getRadius: unit === 'METERS' ? '@@=population * 50000' : '@@=population / 3',
          getFillColor: `@@#${palette}`,
          radiusMinPixels: 2,
        },
      ],
    };
    applyConverted(deck, converter.convert(spec), { first, controller: !ctx.preview });
    first = false;
    if (note) note.textContent = `getFillColor: "@@#${palette}"   radiusUnits: "@@#UNITS.${unit}"   coordinateSystem: "@@#COORDINATE_SYSTEM.LNGLAT" (= ${COORDINATE_SYSTEM.LNGLAT})`;
  };
  render();

  let timer = 0;
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      palette = PALETTES[i % 2]!;
      unit = UNITS[Math.floor(i / 2) % 2]!;
      render();
    }, 1400);
    stop = animate((t) => deck.setProps({ viewState: { ...VIEW, zoom: 0.4, longitude: ((10 + t * 6 + 180) % 360) - 180 } }));
  } else {
    const bar = controlBar(el);
    select(bar, 'constant', PALETTES, (v) => {
      palette = v;
      render();
    }, palette);
    select(bar, 'enumeration', UNITS, (v) => {
      unit = v;
      render();
    }, unit);
  }

  return () => {
    window.clearInterval(timer);
    stop();
    converter.finalize();
    stage.release(deck);
  };
};

export default mount;
