// GeoJsonLayer: filled and stroked polygons, lines and circle points
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, select, slider } from '../../shared/controls.ts';
import { SHAPES, type ShapeProps } from '../../shared/core-layers-1-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Style {
  filled: boolean;
  stroked: boolean;
  lineWidthUnits: 'meters' | 'pixels';
  lineWidth: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10.5, latitude: 50, zoom: ctx.preview ? 3.2 : 4.4 };

  const shapes = (s: Style): GeoJsonLayer<ShapeProps> =>
    new GeoJsonLayer<ShapeProps>({
      id: 'shapes',
      data: SHAPES,
      filled: s.filled,
      stroked: s.stroked,
      getFillColor: (f) => [60 + (f.properties.height / 900_000) * 195, 140, 220, 160],
      getLineColor: [255, 214, 120],
      getLineWidth: s.lineWidth,
      lineWidthUnits: s.lineWidthUnits,
      lineWidthMinPixels: 1,
      // Point and MultiPoint features are circles, sized in metres like the lines.
      getPointRadius: 60_000,
      pointRadiusMinPixels: 4,
    });

  const style: Style = { filled: true, stroked: true, lineWidthUnits: 'pixels', lineWidth: 3 };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), shapes(style)] });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), shapes(style)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => {
      style.filled = Math.floor(t / 2) % 2 === 0;
      style.lineWidth = 2 + (1 + Math.sin(t * 2)) * 2;
      refresh();
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'filled', true, (v) => ((style.filled = v), refresh()));
    check(bar, 'stroked', true, (v) => ((style.stroked = v), refresh()));
    select(bar, 'lineWidthUnits', ['pixels', 'meters'] as const, (v) => ((style.lineWidthUnits = v), (style.lineWidth = v === 'pixels' ? 3 : 15_000), refresh()), 'pixels');
    slider(bar, 'getLineWidth (x)', 0.5, 4, 0.5, 1, (v) => ((style.lineWidth = (style.lineWidthUnits === 'pixels' ? 3 : 15_000) * v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
