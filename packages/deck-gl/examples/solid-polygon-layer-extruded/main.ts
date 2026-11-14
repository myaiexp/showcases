// SolidPolygonLayer extruded: heights, elevationScale, second wireframe layer
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { SolidPolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { HOME, blocks, type Block } from '../../shared/core-layers-geometry.ts';
import { animate, createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: HOME[0], latitude: HOME[1], zoom: ctx.preview ? 12.3 : 12.9, pitch: 55, bearing: 30 };
  const data = blocks(6, 5, { seed: 8 });
  const state = { scale: 1, wire: true, ambient: 0.35 };

  const layers = (): SolidPolygonLayer<Block>[] => {
    const out = [
      new SolidPolygonLayer<Block>({
        id: 'solid',
        data,
        getPolygon: (d) => d.polygon,
        extruded: true,
        getElevation: (d) => d.height,
        elevationScale: state.scale,
        getFillColor: (d) => [60 + d.value * 180, 120 + d.value * 70, 240 - d.value * 120],
        material: { ambient: state.ambient, diffuse: 0.6, shininess: 32 },
      }),
    ];
    if (state.wire) {
      out.push(
        // wireframe and solid are exclusive in one layer, so the lines are a second layer.
        new SolidPolygonLayer<Block>({
          id: 'wire',
          data,
          getPolygon: (d) => d.polygon,
          extruded: true,
          wireframe: true,
          filled: false,
          getElevation: (d) => d.height,
          elevationScale: state.scale,
          // getLineColor is used for the wireframe when extruded.
          getLineColor: [255, 255, 255, 180],
        }),
      );
    }
    return out;
  };
  const update = (): void => deck.setProps({ layers: layers() });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.scale = 1 + 0.8 * Math.sin(t * 1.2);
      deck.setProps({ viewState: { ...INITIAL_VIEW_STATE, bearing: 30 + t * 10 }, layers: layers() });
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'elevationScale', 0, 4, 0.1, 1, (v) => { state.scale = v; update(); });
    slider(bar, 'material.ambient', 0, 1, 0.05, 0.35, (v) => { state.ambient = v; update(); });
    check(bar, 'wireframe layer', true, (v) => { state.wire = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
