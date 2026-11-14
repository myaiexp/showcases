// TileLayer refinementStrategy: what to show while the new zoom level's tiles load
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import type { _Tile2DHeader as Tile2DHeader } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { button, controlBar, select } from '../../shared/controls.ts';
import { delay, tileCanvas } from '../../shared/geo-layers-art.ts';
import { animate, createStage } from '../../shared/stage.ts';

type Strategy = 'best-available' | 'no-overlap' | 'never' | 'custom function';
const STRATEGIES: readonly Strategy[] = ['best-available', 'no-overlap', 'never', 'custom function'];

/** A custom strategy: every selected tile, plus the coarse level-2 tiles as a permanent backdrop. */
function keepCoarseBackdrop(tiles: Tile2DHeader[]): void {
  for (const tile of tiles) tile.isVisible = tile.isSelected || (tile.isLoaded && tile.index.z <= 2);
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 35, zoom: 2 };

  const tiles = (strategy: Strategy): TileLayer<ImageBitmap> =>
    new TileLayer<ImageBitmap>({
      id: `tiles-${strategy}`,
      // Every tile takes a while, so the gaps between levels are easy to see.
      getTileData: async (tile) => {
        await delay(700 + (tile.index.x % 3) * 300, tile.signal);
        return createImageBitmap(tileCanvas(tile.index.x, tile.index.y, tile.index.z));
      },
      tileSize: ctx.preview ? 64 : 256,
      minZoom: 0,
      maxZoom: 8,
      refinementStrategy: strategy === 'custom function' ? keepCoarseBackdrop : strategy,
      renderSubLayers: (props) => {
        const [[west = 0, south = 0], [east = 0, north = 0]] = props.tile.boundingBox;
        return new BitmapLayer({ ...props, data: undefined, image: props.data, bounds: [west, south, east, north] });
      },
    });
  let zoom = view.zoom;
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [tiles('best-available')],
    onViewStateChange: ({ viewState }) => {
      zoom = viewState.zoom;
    },
  });

  let strategy: Strategy = 'best-available';
  let stop: () => void = () => {};
  let timer = 0;
  if (ctx.preview) {
    timer = window.setInterval(() => {
      strategy = STRATEGIES[(STRATEGIES.indexOf(strategy) + 1) % STRATEGIES.length]!;
      deck.setProps({ layers: [tiles(strategy)] });
    }, 5000);
    stop = animate((t) => deck.setProps({ viewState: { ...view, zoom: 1.2 + (1 + Math.sin(t * 0.9)) * 1.4 } }));
  } else {
    const bar = controlBar(el);
    select(bar, 'refinementStrategy', STRATEGIES, (v) => ((strategy = v), deck.setProps({ layers: [tiles(strategy)] })), strategy);
    // A fly-to between levels is the moment the strategy matters.
    const zoomBy = (dz: number): void => deck.setProps({ initialViewState: { ...view, zoom: Math.min(7, Math.max(0, zoom + dz)), transitionDuration: 1200 } });
    button(bar, 'Zoom in 2', () => zoomBy(2));
    button(bar, 'Zoom out 2', () => zoomBy(-2));
  }
  return () => {
    clearInterval(timer);
    stop();
    stage.release(deck);
  };
};

export default mount;
