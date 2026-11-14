// PolygonLayer with [x, y, z] vertices: tilted panels, getElevation added on top
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { HOME, PALETTE, lngPerLat, type Rgb } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Vertex = [number, number, number];
interface Panel {
  color: Rgb;
  ring: Vertex[];
}

/** Square panels whose far edge sits higher than the near edge; the heights are metres. */
function panels(): Panel[] {
  const out: Panel[] = [];
  for (let i = 0; i < 5; i++) {
    const cx = HOME[0] + (i - 2) * 0.017 * lngPerLat(HOME[1]);
    const w = 0.006 * lngPerLat(HOME[1]);
    const lift = 100 + i * 140;
    const ring: Vertex[] = [
      [cx - w, HOME[1] - 0.006, 0],
      [cx + w, HOME[1] - 0.006, 0],
      [cx + w, HOME[1] + 0.006, lift],
      [cx - w, HOME[1] + 0.006, lift],
      [cx - w, HOME[1] - 0.006, 0],
    ];
    out.push({ color: PALETTE[i]!, ring });
  }
  return out;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 12.3 : 12.9, pitch: 60, bearing: -30 };
  const data = panels();
  const state = { extruded: false, elevation: 150 };

  const build = (): PolygonLayer<Panel> =>
    new PolygonLayer<Panel>({
      id: 'panels',
      data,
      // Three numbers per vertex: the third is the altitude of that corner.
      getPolygon: (d) => d.ring,
      getFillColor: (d) => [...d.color, 220],
      getLineColor: [255, 255, 255],
      getLineWidth: 2,
      lineWidthUnits: 'pixels',
      extruded: state.extruded,
      // With extruded: true this is added to each vertex's own altitude.
      getElevation: state.elevation,
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
      state.extruded = Math.floor(t / 3) % 2 === 1;
      deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: -30 + t * 14 }, layers: [build()] });
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'extruded', false, (v) => { state.extruded = v; update(); });
    slider(bar, 'getElevation (m)', 0, 600, 10, 150, (v) => { state.elevation = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
