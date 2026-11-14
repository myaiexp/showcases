// GeoJsonLayer: line caps, joints, miter limit and billboard
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { SHAPES, type ShapeProps } from '../../shared/core-layers-1-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Style {
  lineCapRounded: boolean;
  lineJointRounded: boolean;
  lineMiterLimit: number;
  lineBillboard: boolean;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 49.5, zoom: ctx.preview ? 3.4 : 4.6, pitch: 55 };

  const shapes = (s: Style): GeoJsonLayer<ShapeProps> =>
    new GeoJsonLayer<ShapeProps>({
      id: 'lines',
      data: SHAPES,
      filled: false,
      stroked: true,
      pointRadiusMinPixels: 0,
      getLineColor: [255, 200, 90],
      getLineWidth: 70_000, // metres
      lineWidthUnits: 'meters',
      ...s,
    });

  const style: Style = { lineCapRounded: false, lineJointRounded: false, lineMiterLimit: 4, lineBillboard: false };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), shapes(style)] });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), shapes(style)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => {
      style.lineCapRounded = style.lineJointRounded = Math.floor(t / 2) % 2 === 1;
      style.lineBillboard = Math.floor(t / 4) % 2 === 1;
      refresh();
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'lineCapRounded', false, (v) => ((style.lineCapRounded = v), refresh()));
    check(bar, 'lineJointRounded', false, (v) => ((style.lineJointRounded = v), refresh()));
    slider(bar, 'lineMiterLimit', 1, 10, 0.5, 4, (v) => ((style.lineMiterLimit = v), refresh()));
    check(bar, 'lineBillboard', false, (v) => ((style.lineBillboard = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
