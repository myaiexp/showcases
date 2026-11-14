// A custom MapController: handleEvent ignores the wheel unless ctrl is held, and says so
import { Deck, MapController } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** Wheel events reach the base class only with ctrl held; otherwise `onBlocked` is called. */
let onBlocked: () => void = () => {};
class CtrlToZoomController extends MapController {
  override handleEvent(event: Parameters<MapController['handleEvent']>[0]): boolean {
    if (event.type === 'wheel' && !event.srcEvent.ctrlKey) {
      onBlocked();
      return false;
    }
    return super.handleEvent(event);
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const home: MapViewState = { longitude: 15, latitude: 48, zoom: ctx.preview ? 2.8 : 3.6 };
  const info = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Scroll over the map: nothing happens. Hold ctrl and scroll: it zooms. Drag still pans.');
  let blocked = 0;
  onBlocked = () => {
    blocked++;
    info.textContent = `wheel ignored ${blocked} time${blocked === 1 ? '' : 's'}: hold ctrl to zoom`;
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: home,
    // The controller class goes in `type`; the other options still apply to it.
    controller: ctx.preview ? false : { type: CtrlToZoomController, doubleClickZoom: false },
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({ id: 'cities', data: CITIES, getPosition: (d) => d.coordinates, radiusUnits: 'pixels', getRadius: 4, getFillColor: [255, 170, 70] }),
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      const ctrl = Math.floor(t / 2.5) % 2 === 1;
      info.textContent = ctrl ? 'ctrl + wheel: zooms' : 'wheel alone: ignored';
      deck.setProps({ viewState: { ...home, zoom: (home.zoom ?? 0) + (ctrl ? Math.sin(((t % 2.5) / 2.5) * Math.PI) * 0.9 : 0) } });
    });
  }
  return () => {
    stop();
    onBlocked = () => {};
    stage.release(deck);
  };
};

export default mount;
