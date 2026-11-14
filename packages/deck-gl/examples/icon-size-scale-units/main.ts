// IconLayer: sizeScale, sizeUnits, sizeBasis, sizeMinPixels and sizeMaxPixels
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { drawAtlas } from '../../shared/core-layers-1-art.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Units = 'pixels' | 'meters' | 'common';
// getSize is 10..47 (population + 10); this base makes each unit land near 30 px at zoom 2.
const BASE: Record<Units, number> = { pixels: 1, meters: 40_000, common: 5 };

interface Sizing {
  sizeUnits: Units;
  sizeScale: number;
  sizeBasis: 'height' | 'width';
  sizeMinPixels: number;
  sizeMaxPixels: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 15, latitude: 30, zoom: ctx.preview ? 0.6 : 2 };
  const { atlas, mapping } = drawAtlas();
  const s: Sizing = { sizeUnits: 'pixels', sizeScale: 1, sizeBasis: 'height', sizeMinPixels: 0, sizeMaxPixels: 200 };

  const icons = (cfg: Sizing): IconLayer<City> =>
    new IconLayer<City>({
      id: 'icons',
      data: CITIES,
      iconAtlas: atlas,
      iconMapping: mapping,
      getIcon: () => 'pin',
      getPosition: (d) => d.coordinates,
      getSize: (d) => d.population + 10,
      ...cfg,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), icons(s)] });
  const refresh = (): void => deck.setProps({ layers: [landLayer(), icons(s)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => {
      s.sizeScale = 0.5 + (1 + Math.sin(t)) * 0.5;
      refresh();
    });
  } else {
    let k = 1;
    const apply = (): void => ((s.sizeScale = k * BASE[s.sizeUnits]), refresh());
    const bar = controlBar(el);
    select(bar, 'sizeUnits', ['pixels', 'meters', 'common'] as const, (v) => ((s.sizeUnits = v), apply()), 'pixels');
    slider(bar, 'sizeScale x', 0.2, 3, 0.1, k, (v) => ((k = v), apply()));
    select(bar, 'sizeBasis', ['height', 'width'] as const, (v) => ((s.sizeBasis = v), refresh()), 'height');
    slider(bar, 'sizeMinPixels', 0, 40, 1, 0, (v) => ((s.sizeMinPixels = v), refresh()));
    slider(bar, 'sizeMaxPixels', 10, 100, 1, 200, (v) => ((s.sizeMaxPixels = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
