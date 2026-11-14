// An attribute with an update function: filled when invalidated, for all rows or just a range
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay, wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { TintScatterplotLayer } from './tint-scatterplot-layer.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const state = { hue: 0, firstTen: false };
  let updates = 0;
  let last = 'none yet';
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  const show = (): void => {
    label.textContent = `instanceTint update calls: ${updates}   last fill: rows ${last}`;
  };

  const layers = (): [ReturnType<typeof landLayer>, TintScatterplotLayer<City>] => [
    landLayer(),
    new TintScatterplotLayer<City>({
      id: 'tinted',
      data: CITIES as City[],
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 50_000,
      radiusMinPixels: 5,
      getBaseHue: (d) => ((d.coordinates[0] + 180) / 360) * 300,
      tintHue: state.hue,
      tintRows: state.firstTen ? [0, 10] : null,
      onTintUpdate: (start, end) => {
        updates++;
        last = `${start} to ${end}`;
        show();
      },
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const refresh = (): void => deck.setProps({ layers: layers() });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      deck.setProps({ viewState: { ...view, longitude: wrapLng(20 + t * 5) } });
      const hue = Math.floor(t / 1.5) * 70;
      if (hue !== state.hue) {
        state.hue = hue;
        refresh();
      }
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'tintHue', 0, 360, 10, 0, (v) => {
      state.hue = v;
      refresh();
    });
    check(bar, 'invalidate only rows 0 to 10', false, (v) => {
      state.firstTen = v;
    });
    show();
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
