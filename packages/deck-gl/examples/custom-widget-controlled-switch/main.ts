// Controlled and uncontrolled widget state: one switch is app-driven, one is not
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import './style.css';
import { SwitchWidget } from './switch-widget.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const state = { big: true, land: true, locked: false };
  const label = ctx.preview ? null : readout(el, 'Click the switches');
  const say = (text: string): void => {
    if (label) label.textContent = text;
  };

  const layers = () => [
    ...(state.land ? [landLayer()] : []),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * (state.big ? 60_000 : 25_000),
      updateTriggers: { getRadius: state.big },
      getFillColor: [255, 140, 60, 220],
      radiusMinPixels: 3,
    }),
  ];
  // Uncontrolled: the widget owns its value (initialOn), we only listen. It shows or hides the land.
  const free = new SwitchWidget({
    id: 'free',
    label: 'land (uncontrolled)',
    placement: 'top-left',
    initialOn: true,
    onChange: (on) => {
      say(`uncontrolled switch: onChange(${on}); it already flipped itself`);
      state.land = on;
      deck.setProps({ layers: layers() });
    },
  });
  // Controlled: `on` comes from app state, so the app can refuse a change.
  const widgets = () => [
    free,
    new SwitchWidget({
      id: 'driven',
      label: 'big dots (controlled)',
      placement: 'top-left',
      style: { marginTop: '0' },
      on: state.big,
      onChange: (on) => {
        say(state.locked ? `controlled switch: onChange(${on}) refused: locked` : `controlled switch: onChange(${on}) accepted`);
        if (state.locked) return;
        state.big = on;
        deck.setProps({ layers: layers(), widgets: widgets() });
      },
    }),
  ];
  const deck: Deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    widgets: widgets(),
  });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(15 + t * 5) } }));
    let n = 0;
    timer = window.setInterval(() => {
      // Click one switch per tick, alternating between them.
      stage.box.querySelectorAll<HTMLButtonElement>('.deck-widget-switch button')[n++ % 2]?.click();
    }, 1200);
  } else {
    check(controlBar(el), 'lock the controlled switch', false, (v) => {
      state.locked = v;
    });
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
