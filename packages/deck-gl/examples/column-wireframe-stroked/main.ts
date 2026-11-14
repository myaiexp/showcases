// ColumnLayer: extruded, wireframe, flatShading, filled and stroked outlines
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { columnPoints } from '../../shared/core-layers-1-data.ts';
import type { SamplePoint } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Mode {
  extruded: boolean;
  wireframe: boolean;
  flatShading: boolean;
  filled: boolean;
  stroked: boolean;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const data = columnPoints(ctx.preview ? 30 : 70, [2.35, 48.86], 0.1, 8);
  const view: MapViewState = { longitude: 2.35, latitude: 48.86, zoom: ctx.preview ? 7.8 : 8.8, pitch: 50 };

  const columns = (m: Mode): ColumnLayer<SamplePoint> =>
    new ColumnLayer<SamplePoint>({
      id: 'columns',
      data,
      diskResolution: 8,
      radius: 1400,
      getPosition: (d) => d.position,
      getFillColor: [255, 170, 70],
      getLineColor: [90, 220, 255], // outline and wireframe colour
      getLineWidth: 200, // metres, only with extruded: false and stroked: true
      lineWidthUnits: 'meters',
      getElevation: (d) => (1 - d.value) * 7000,
      ...m,
    });

  const mode: Mode = { extruded: true, wireframe: false, flatShading: false, filled: true, stroked: false };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), columns(mode)] });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), columns(mode)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    const steps: Partial<Mode>[] = [{}, { wireframe: true, filled: false }, { extruded: false, stroked: true }, { flatShading: true }];
    stop = animate((t) => {
      Object.assign(mode, { extruded: true, wireframe: false, flatShading: false, filled: true, stroked: false }, steps[Math.floor(t / 2) % 4]);
      refresh();
    });
  } else {
    const bar = controlBar(el);
    for (const key of Object.keys(mode) as (keyof Mode)[]) check(bar, key, mode[key], (v) => ((mode[key] = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
