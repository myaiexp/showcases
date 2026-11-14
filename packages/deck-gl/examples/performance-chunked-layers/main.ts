// Appending chunks: concat into one data array versus one layer per chunk with a stable id
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, readout, select } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const CHUNK = 2000;
const CHUNKS = Array.from({ length: 8 }, (_, i) => pointCloud(CHUNK, { seed: 70 + i, spread: 2.8 }));
type Mode = 'one layer, data.concat(chunk)' | 'one layer per chunk';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3 : 4 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  let mode: Mode = ctx.preview ? 'one layer per chunk' : 'one layer, data.concat(chunk)';
  let loaded = 0;
  let merged: SamplePoint[] = [];
  let calls = 0;
  let last = 0;

  const accessor = (d: SamplePoint): [number, number] => {
    calls++;
    return d.position;
  };
  const layers = () => [
    landLayer(),
    ...(mode === 'one layer per chunk'
      ? CHUNKS.slice(0, loaded).map(
          (chunk, i) =>
            // A stable, unique id per chunk: earlier chunks see no prop change at all.
            new ScatterplotLayer<SamplePoint>({ id: `points-${i}`, data: chunk, getPosition: accessor, getRadius: 4, radiusUnits: 'pixels', getFillColor: [255, 170, 70, 170] }),
        )
      : [new ScatterplotLayer<SamplePoint>({ id: 'points', data: merged, getPosition: accessor, getRadius: 4, radiusUnits: 'pixels', getFillColor: [255, 170, 70, 170] })]),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const report = (): void => {
    label.textContent = `${loaded * CHUNK} points loaded. Last chunk made getPosition run ${last} times (${mode})`;
  };
  const addChunk = (): void => {
    if (loaded >= CHUNKS.length) return;
    calls = 0;
    merged = merged.concat(CHUNKS[loaded]!);
    loaded++;
    deck.setProps({ layers: layers() });
    window.setTimeout(() => {
      last = calls;
      report();
    }, 250);
  };
  const reset = (): void => {
    loaded = 0;
    merged = [];
    last = 0;
    deck.setProps({ layers: layers() });
    report();
  };

  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => (loaded >= CHUNKS.length ? reset() : addChunk()), 1100);
  } else {
    const bar = controlBar(el);
    select(bar, 'append with', ['one layer, data.concat(chunk)', 'one layer per chunk'] as Mode[], (v) => {
      mode = v;
      reset();
    }, mode);
    button(bar, `Add a ${CHUNK}-point chunk`, addChunk);
    button(bar, 'Reset', reset);
  }
  report();
  return () => {
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
