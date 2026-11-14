// TileLayer with its default renderSubLayers: GeoJSON per tile, styled by GeoJsonLayer props
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import type { TileLayerPickingInfo } from '@deck.gl/geo-layers';
import type { GeoJsonLayerProps } from '@deck.gl/layers';
import type { Feature, Geometry } from 'geojson';
import type { Mount } from '@/types.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { tilePoints, zoomHue, type TilePointProps } from '../../shared/geo-layers-art.ts';
import { landLayer } from '../../shared/world.ts';

type TileFeature = Feature<Geometry, Partial<TilePointProps>>;
// The GeoJsonLayer props the default sub-layers read, typed for the TileLayer's extra props.
type Style = Pick<GeoJsonLayerProps<Partial<TilePointProps>>, 'filled' | 'getFillColor' | 'getLineColor' | 'lineWidthMinPixels' | 'pointType' | 'getPointRadius' | 'pointRadiusUnits'>;

function hsl([h, s, l]: [number, number, number]): [number, number, number] {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number): number => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l / 100 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [f(0), f(8), f(4)];
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 45, zoom: ctx.preview ? 1.8 : 3 };

  const tiles = new TileLayer<TileFeature[], Style>({
    id: 'tiles',
    // The tile as GeoJSON: its outline, then seeded points that get denser at higher zoom.
    getTileData: ({ index, bbox }) => {
      const box = 'west' in bbox ? bbox : { west: 0, south: 0, east: 1, north: 1 };
      const outline: TileFeature = {
        type: 'Feature',
        properties: {},
        geometry: { type: 'Polygon', coordinates: [[[box.west, box.south], [box.east, box.south], [box.east, box.north], [box.west, box.north], [box.west, box.south]]] },
      };
      return [outline, ...tilePoints(index.x, index.y, index.z, box)];
    },
    tileSize: ctx.preview ? 128 : 256,
    minZoom: 0,
    maxZoom: 7,
    // No renderSubLayers: every tile becomes a GeoJsonLayer, and these are its props.
    filled: true,
    getFillColor: (f: TileFeature) => (f.geometry.type === 'Point' ? hsl([zoomHue(f.properties.z ?? 0), 90, 62]) : [255, 255, 255, 8]),
    getLineColor: [255, 255, 255, 120],
    lineWidthMinPixels: 1,
    pointType: 'circle',
    getPointRadius: 4,
    pointRadiusUnits: 'pixels',
    pickable: !ctx.preview,
  });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), tiles],
    getTooltip: (info: PickingInfo<TileFeature>) => {
      const { tile, object } = info as TileLayerPickingInfo<TileFeature[], PickingInfo<TileFeature>>;
      return tile && object?.properties.n !== undefined ? `point ${object.properties.n} of tile ${tile.index.z}/${tile.index.x}/${tile.index.y}` : null;
    },
  });

  const stop = ctx.preview ? animate((t) => deck.setProps({ viewState: { ...view, zoom: 2 + (1 + Math.sin(t * 0.5)) * 1.2 } })) : () => {};
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
