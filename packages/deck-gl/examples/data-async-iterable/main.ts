// data as an async iterable: batches stream in; dataTransform slides a window
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, check, controlBar, readout } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

/** Appends each batch to what has loaded so far and keeps the newest 300 points. */
function keepLatest<T>(batch: unknown, previous?: T): T {
  // The prop's type is generic over the data, so the array types are asserted here.
  return [...((previous as SamplePoint[] | undefined) ?? []), ...(batch as SamplePoint[])].slice(-300) as unknown as T;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let stopped = false;
  let run = 0;
  let windowed = true;

  /** Yields a batch of 60 points every 300 ms; the layer receives each batch as it arrives. */
  async function* stream(seed: number): AsyncGenerator<SamplePoint[]> {
    for (let batch = 0; batch < 40 && !stopped; batch++) {
      await new Promise((r) => setTimeout(r, 300));
      yield pointCloud(60, { seed: seed * 100 + batch, spread: 1.6 });
    }
  }

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: `stream-${run}-${windowed}`,
      data: stream(run),
      // Without dataTransform each batch is appended. This one keeps the latest 300 points.
      ...(windowed ? { dataTransform: keepLatest } : {}),
      getPosition: (d) => d.position,
      getFillColor: [255, 190, 90, 210],
      getRadius: 5,
      radiusUnits: 'pixels',
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const describe = (): string => (windowed ? 'dataTransform: sliding window of the newest 300 points' : 'default: every batch is appended');
  label.textContent = describe();
  const restart = (): void => {
    run += 1;
    deck.setProps({ layers: layers() });
    label.textContent = describe();
  };

  let timer = 0;
  if (ctx.preview) timer = window.setInterval(restart, 13000);
  else {
    const bar = controlBar(el);
    check(bar, 'dataTransform window of 300', true, (v) => {
      windowed = v;
      restart();
    });
    button(bar, 'Restart the stream', restart);
  }

  return () => {
    stopped = true;
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
