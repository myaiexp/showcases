// TileLayer visibleMinZoom / visibleMaxZoom: hide tiles that were fetched anyway
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
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 2 : 3 };

  let visibleMin = 3;
  let visibleMax = 5;
  let loads = 0;
  const info = ctx.preview ? null : readout(el, 'Tiles loaded: 0');
  const tiles = (): TileLayer<ImageBitmap> =>
    new TileLayer<ImageBitmap>({
      id: 'tiles',
      getTileData: (tile) => createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z)),
      // Tiles are fetched for any level from 0 to 8 ...
      tileSize: ctx.preview ? 64 : 256,
      minZoom: 0,
      maxZoom: 8,
      // ... but are drawn only between these two zoom levels.
      visibleMinZoom: visibleMin,
      visibleMaxZoom: visibleMax,
      onTileLoad: () => {
        loads++;
        if (info) info.textContent = `Tiles loaded: ${loads} (hidden ones are loaded too)`;
      },
      renderSubLayers: (props) => {
        const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
        return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
      },
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), tiles()] });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), tiles()] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, zoom: 0.8 + (1 + Math.sin(t * 0.7)) * 1.6 } }));
  } else {
    const bar = controlBar(el);
    slider(bar, 'visibleMinZoom', 0, 8, 1, visibleMin, (v) => ((visibleMin = v), refresh()));
    slider(bar, 'visibleMaxZoom', 0, 8, 1, visibleMax, (v) => ((visibleMax = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
