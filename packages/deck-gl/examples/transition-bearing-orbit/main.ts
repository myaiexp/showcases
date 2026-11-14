// onTransitionEnd chains LinearInterpolator(['bearing']) legs into a camera orbit
import { Deck, LinearInterpolator } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { towers, type Tower } from '../../shared/animations-towers.ts';
import { button, controlBar, readout, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const CENTER: [number, number] = [-122.4, 37.8];
const DATA = towers(CENTER, { seed: 12 });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { background: '#101a26' });
  let viewState: MapViewState = { longitude: CENTER[0], latitude: CENTER[1], zoom: ctx.preview ? 11.9 : 13, pitch: 55, bearing: 0 };
  let duration = ctx.preview ? 1500 : 1000;
  let running = true;
  const label = ctx.preview ? null : readout(el);

  const deck = new Deck({
    device: stage.device,
    initialViewState: viewState,
    controller: !ctx.preview,
    onViewStateChange: ({ viewState: vs }) => {
      if (label) label.textContent = `bearing ${Math.round(vs.bearing ?? 0)}°${running ? '' : ' (orbit stopped)'}`;
    },
    layers: [
      new ColumnLayer<Tower>({
        id: 'towers',
        data: DATA,
        diskResolution: 4,
        radius: 70,
        extruded: true,
        getPosition: (d) => d.position,
        getElevation: (d) => d.height,
        getFillColor: (d) => d.color,
      }),
    ],
  });

  // Each leg turns the bearing by 120 degrees; when it ends, the callback queues the next one.
  const rotateCamera = (): void => {
    if (!running) return;
    viewState = {
      ...viewState,
      bearing: (viewState.bearing ?? 0) + 120,
      transitionDuration: duration,
      transitionInterpolator: new LinearInterpolator(['bearing']),
      onTransitionEnd: rotateCamera,
    } as MapViewState;
    deck.setProps({ initialViewState: viewState });
  };
  rotateCamera();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'ms per 120°', 500, 6000, 250, duration, (v) => (duration = v));
    button(bar, 'Restart orbit', () => {
      running = true;
      // A drag leaves the camera at its own bearing; start the next leg from there.
      viewState = { ...viewState, bearing: 0 };
      rotateCamera();
    });
    button(bar, 'Stop', () => (running = false));
  }

  return () => {
    running = false;
    stage.release(deck);
  };
};

export default mount;
