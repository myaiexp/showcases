// GeoJsonLayer: pointType circle, icon, text and icon+text
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import type { Feature, Geometry } from 'geojson';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drawAtlas } from '../../shared/core-layers-1-art.ts';
import { SHAPES, type ShapeProps } from '../../shared/core-layers-1-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const TYPES = ['circle', 'icon', 'text', 'icon+text'] as const;
type PointType = (typeof TYPES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10.5, latitude: 50.5, zoom: ctx.preview ? 3.4 : 4.8 };
  const { atlas, mapping } = drawAtlas();

  const points = (pointType: PointType): GeoJsonLayer<ShapeProps> =>
    new GeoJsonLayer<ShapeProps>({
      id: 'points',
      data: SHAPES,
      pointType,
      // Polygons stay as context; `filled` is also what draws the circle points.
      filled: true,
      stroked: true,
      getLineColor: [255, 255, 255, 90],
      lineWidthMinPixels: 1,
      // circle
      getFillColor: [255, 170, 70, 200],
      getPointRadius: 50_000,
      pointRadiusMinPixels: 6,
      // icon: the atlas and mapping are the IconLayer's, getIcon reads each feature's icon name
      iconAtlas: atlas,
      iconMapping: mapping,
      getIcon: (f: Feature<Geometry, ShapeProps>) => f.properties.icon,
      getIconSize: 36,
      // text
      getText: (f: Feature<Geometry, ShapeProps>) => f.properties.name,
      getTextSize: 14,
      getTextColor: [255, 255, 255],
      getTextPixelOffset: pointType === 'icon+text' ? [0, 30] : [0, 0],
      textBackground: true,
      getTextBackgroundColor: [20, 30, 45, 220],
      textBackgroundPadding: [4, 2],
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), points('circle')] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), points(TYPES[Math.floor(t / 2) % 4]!)] }));
  } else {
    select(controlBar(el), 'pointType', TYPES, (v) => deck.setProps({ layers: [landLayer(), points(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
