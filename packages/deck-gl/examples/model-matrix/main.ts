// modelMatrix: a 4x4 transform applied on the GPU to a METER_OFFSETS layer
import { COORDINATE_SYSTEM, Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SolidPolygonLayer } from '@deck.gl/layers';
import { Matrix4 } from '@math.gl/core';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';

/** An L-shaped plot, in metres from its coordinateOrigin. */
const PLOT = [[0, 0], [600, 0], [600, 200], [200, 200], [200, 600], [0, 600], [0, 0]] as [number, number][];
const ORIGIN: [number, number, number] = [24.94, 60.17, 0]; // Helsinki

/** Translate east, then rotate about the vertical axis, then scale (math.gl Matrix4). */
function matrix(angleDeg: number, scale: number, east: number): Matrix4 {
  return new Matrix4().translate([east, 0, 0]).rotateZ((angleDeg * Math.PI) / 180).scale(scale);
}

const mount: Mount = async (el, ctx) => {
  // City scale: the world basemap would be one flat fill here, so the stage colour stands in for land.
  const stage = await createStage(el, ctx, { background: '#1e2938' });
  // Centred ~400 m east of the origin, so the moved, rotated and scaled copy stays in frame.
  const view: MapViewState = { longitude: 24.947, latitude: 60.17, zoom: ctx.preview ? 12.7 : 13.6, pitch: 40 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  const state = { angle: 30, scale: 1, east: 0 };

  const layers = () => [
    // The plot as it is stored: no matrix.
    new SolidPolygonLayer<{ ring: [number, number][] }>({
      id: 'original',
      data: [{ ring: PLOT }],
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: ORIGIN,
      getPolygon: (d) => d.ring,
      getFillColor: [150, 160, 175, 120],
    }),
    // The same data transformed in the vertex shader: nothing is recomputed on the CPU.
    new SolidPolygonLayer<{ ring: [number, number][] }>({
      id: 'transformed',
      data: [{ ring: PLOT }],
      coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
      coordinateOrigin: ORIGIN,
      modelMatrix: matrix(state.angle, state.scale, state.east),
      getPolygon: (d) => d.ring,
      getFillColor: [255, 170, 60, 220],
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => {
    deck.setProps({ layers: layers() });
    label.textContent = `modelMatrix: rotate ${state.angle.toFixed(0)} deg, scale ${state.scale.toFixed(2)}, move ${state.east.toFixed(0)} m east`;
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.angle = (t * 40) % 360;
      state.scale = 1 + Math.sin(t) * 0.35;
      state.east = 500;
      apply();
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'rotate deg', 0, 360, 5, state.angle, (v) => ((state.angle = v), apply()));
    slider(bar, 'scale', 0.4, 2, 0.1, state.scale, (v) => ((state.scale = v), apply()));
    slider(bar, 'east m', 0, 1500, 50, state.east, (v) => ((state.east = v), apply()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
