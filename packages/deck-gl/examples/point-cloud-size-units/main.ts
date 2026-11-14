// PointCloudLayer sizeUnits and pointSize on a map: pixels stay put, meters scale with zoom
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PointCloudLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select, slider } from '../../shared/controls.ts';
import { HOME, lngPerLat } from '../../shared/core-layers-geometry.ts';
import type { LngLat } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Units = 'pixels' | 'meters' | 'common';
interface Sample {
  position: [number, number, number];
  normal: [number, number, number];
}

/** A hill of points on a grid; the normals lean away from the summit. */
function hill(n: number): Sample[] {
  const out: Sample[] = [];
  const step = 0.0016;
  for (let i = -n; i <= n; i++) {
    for (let j = -n; j <= n; j++) {
      const u = (i / n) * 2;
      const v = (j / n) * 2;
      const z = 900 * Math.exp(-(u * u + v * v) * 0.6);
      const slope: [number, number, number] = [u * z * 0.002, v * z * 0.002, 1];
      const len = Math.hypot(...slope);
      const pos: LngLat = [HOME[0] + i * step * lngPerLat(HOME[1]), HOME[1] + j * step];
      out.push({ position: [pos[0], pos[1], z], normal: [slope[0] / len, slope[1] / len, slope[2] / len] });
    }
  }
  return out;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: 12.6, pitch: 55, bearing: 20 };
  const data = hill(ctx.preview ? 22 : 30);
  const state = { sizeUnits: 'meters' as Units, pointSize: 60, antialiasing: false };

  const build = (): PointCloudLayer<Sample> =>
    new PointCloudLayer<Sample>({
      id: 'hill',
      data,
      getPosition: (d) => d.position,
      getNormal: (d) => d.normal,
      getColor: (d) => [80 + d.position[2] * 0.15, 160 + d.position[2] * 0.08, 255 - d.position[2] * 0.15],
      sizeUnits: state.sizeUnits,
      pointSize: state.pointSize,
      antialiasing: state.antialiasing,
    });
  const update = (): void => deck.setProps({ layers: [build()] });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: [build()],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: 20 + t * 12, zoom: 12.6 + Math.sin(t * 0.8) * 0.5 } });
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'sizeUnits', ['meters', 'pixels', 'common'] as const, (v) => {
      state.sizeUnits = v;
      // The same number means very different sizes in each unit.
      state.pointSize = v === 'pixels' ? 6 : v === 'meters' ? 60 : 0.0005;
      update();
    }, 'meters');
    slider(bar, 'pointSize (x1 pixel / meter)', 1, 150, 1, 60, (v) => { state.pointSize = state.sizeUnits === 'common' ? v / 100000 : v; update(); });
    check(bar, 'antialiasing', false, (v) => { state.antialiasing = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
