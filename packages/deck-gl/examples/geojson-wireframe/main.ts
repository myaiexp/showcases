// GeoJsonLayer: a solid extrusion and a wireframe as two layers
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { SHAPES, type ShapeProps } from '../../shared/core-layers-1-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10.5, latitude: 49, zoom: ctx.preview ? 3.4 : 4.6, pitch: 55, bearing: -20 };

  // The docs: wireframe and solid extrusions are exclusive within one layer, so a combined
  // look takes two layers with the same data.
  const solid = (visible: boolean): GeoJsonLayer<ShapeProps> =>
    new GeoJsonLayer<ShapeProps>({
      id: 'solid',
      data: SHAPES,
      visible,
      extruded: true,
      getElevation: (f) => f.properties.height,
      getFillColor: [60, 130, 220, 200],
    });
  const wire = (visible: boolean): GeoJsonLayer<ShapeProps> =>
    new GeoJsonLayer<ShapeProps>({
      id: 'wire',
      data: SHAPES,
      visible,
      extruded: true,
      wireframe: true,
      getElevation: (f) => f.properties.height,
      getLineColor: [255, 220, 120],
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), solid(true), wire(true)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), solid(Math.floor(t / 2) % 3 !== 1), wire(Math.floor(t / 2) % 3 !== 2)], viewState: { ...view, bearing: -20 + t * 6 } }));
  } else {
    let [s, w] = [true, true];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), solid(s), wire(w)] });
    const bar = controlBar(el);
    check(bar, 'solid layer', s, (v) => ((s = v), refresh()));
    check(bar, 'wireframe layer', w, (v) => ((w = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
