// TileLayer zRange: tall 2.5D content needs tiles beyond the 2D viewport at high pitch
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { PolygonLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout } from '../../shared/controls.ts';
import { seeded } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Tower {
  polygon: [number, number][];
  height: number;
}

/** A few seeded square towers inside a tile, between 50 and 400 km tall (so they show at zoom 4). */
function towers(x: number, y: number, z: number, { west, south, east, north }: { west: number; south: number; east: number; north: number }): Tower[] {
  const rand = seeded((x * 7919 + y * 104729 + z * 1299709) >>> 0);
  const out: Tower[] = [];
  const [w, h] = [(east - west) * 0.14, (north - south) * 0.14];
  for (let i = 0; i < 4; i++) {
    const cx = west + (0.15 + rand() * 0.7) * (east - west);
    const cy = south + (0.15 + rand() * 0.7) * (north - south);
    out.push({ polygon: [[cx - w, cy - h], [cx + w, cy - h], [cx + w, cy + h], [cx - w, cy + h]], height: 50_000 + rand() * 350_000 });
  }
  return out;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 3.2 : 4.2, pitch: 70, bearing: 0 };
  const info = ctx.preview ? null : readout(el, '');

  const tiles = (useZRange: boolean): TileLayer<Tower[]> =>
    new TileLayer<Tower[]>({
      id: 'towers',
      getTileData: ({ index, bbox }) => ('west' in bbox ? towers(index.x, index.y, index.z, bbox) : []),
      tileSize: 256,
      minZoom: 2,
      maxZoom: 4,
      // [minZ, maxZ] in metres of the content: without it the layer assumes flat tiles.
      zRange: useZRange ? [0, 400_000] : undefined,
      onViewportLoad: (loaded) => {
        if (info) info.textContent = `${loaded.length} tiles loaded for this view`;
      },
      renderSubLayers: (props) =>
        new PolygonLayer<Tower>({
          ...props,
          data: props.data,
          getPolygon: (d) => d.polygon,
          getElevation: (d) => d.height,
          getFillColor: [255, 190, 70, 230],
          extruded: true,
          material: { ambient: 0.6, diffuse: 0.7 },
        }),
    });
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), tiles(true)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, bearing: t * 8, longitude: 10 + Math.sin(t * 0.3) * 6 } }));
  } else {
    check(controlBar(el), 'zRange [0, 400000]', true, (v) => deck.setProps({ layers: [landLayer(), tiles(v)] }));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
