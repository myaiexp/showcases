// TileLayer minZoom / maxZoom: where tiles exist, and what happens outside that range
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 2 : 2.5 };

  let minZoom = 2;
  let maxZoom = 4;
  const tiles = (): TileLayer<ImageBitmap> =>
    new TileLayer<ImageBitmap>({
      id: 'tiles',
      getTileData: (tile) => createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z)),
      // Below minZoom no tiles show; above maxZoom the maxZoom tiles are stretched.
      tileSize: ctx.preview ? 64 : 256,
      minZoom,
      maxZoom,
      updateTriggers: { getTileData: [minZoom, maxZoom] },
      renderSubLayers: (props) => {
        const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
        return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
      },
    });

  const info = ctx.preview ? null : readout(el, '');
  const describe = (zoom: number): void => {
    if (!info) return;
    const state = zoom < minZoom ? 'below minZoom: nothing is fetched' : zoom > maxZoom ? 'above maxZoom: level ' + maxZoom + ' tiles are stretched' : 'inside the range';
    info.textContent = `view zoom ${zoom.toFixed(1)}: ${state}`;
  };
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer(), tiles()],
    onViewStateChange: ({ viewState }) => describe(viewState.zoom),
  });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), tiles()] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    // Card: zoom in and out across the whole range.
    stop = animate((t) => deck.setProps({ viewState: { ...view, zoom: 0.5 + (1 + Math.sin(t * 0.7)) * 1.7 } }));
  } else {
    const bar = controlBar(el);
    slider(bar, 'minZoom', 0, 6, 1, minZoom, (v) => ((minZoom = v), refresh()));
    slider(bar, 'maxZoom', 1, 8, 1, maxZoom, (v) => ((maxZoom = v), refresh()));
    describe(view.zoom);
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
