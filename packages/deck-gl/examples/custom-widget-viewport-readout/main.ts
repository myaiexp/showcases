// onViewportChange: a widget that reads the camera and renders it as the user pans and zooms
import { Deck } from '@deck.gl/core';
import type { MapViewState, WidgetPlacement } from '@deck.gl/core';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import './style.css';
import { ViewportReadoutWidget } from './viewport-readout-widget.ts';

const PLACEMENTS: readonly WidgetPlacement[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 2 : 3 };
  const state = { placement: 'top-left' as WidgetPlacement, precision: 2 };
  const widget = (): ViewportReadoutWidget => new ViewportReadoutWidget({ ...state });

  const first = widget();
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer()],
    widgets: [first],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) =>
      deck.setProps({ viewState: { ...view, longitude: wrapLng(10 + t * 8), zoom: 2 + 0.6 * Math.sin(t * 0.7) } }),
    );
  } else {
    const bar = controlBar(el);
    select(bar, 'placement', PLACEMENTS, (v) => {
      state.placement = v;
      deck.setProps({ widgets: [widget()] });
    });
    slider(bar, 'precision', 0, 5, 1, state.precision, (v) => {
      state.precision = v;
      deck.setProps({ widgets: [widget()] });
    });
    readout(el, 'Pan and zoom: onViewportChange runs on every redraw, the DOM is only touched when the text changes.');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
