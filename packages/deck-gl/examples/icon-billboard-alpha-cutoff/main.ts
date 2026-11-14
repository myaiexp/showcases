// IconLayer: billboard false lays icons flat; alphaCutoff 0 picks the box
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, slider } from '../../shared/controls.ts';
import { drawAtlas, ICON_NAMES } from '../../shared/core-layers-1-art.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const EUROPE = CITIES.filter((c) => c.coordinates[0] > -15 && c.coordinates[0] < 45 && c.coordinates[1] > 30);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 14, latitude: 46, zoom: ctx.preview ? 2.6 : 3.6, pitch: 60, bearing: 20 };
  const { atlas, mapping } = drawAtlas();
  const info = ctx.preview ? null : readout(el, 'Hover an icon, or just beside it while alphaCutoff is 0');

  const icons = (billboard: boolean, alphaCutoff: number): IconLayer<City> =>
    new IconLayer<City>({
      id: 'icons',
      data: EUROPE,
      iconAtlas: atlas,
      iconMapping: mapping,
      getIcon: (d) => ICON_NAMES[d.name.length % ICON_NAMES.length]!,
      getPosition: (d) => d.coordinates,
      sizeUnits: 'meters',
      getSize: 260_000,
      sizeMinPixels: 14,
      billboard,
      // Tilted billboards would sink into the ground layer; skip the depth test (luma.gl parameter).
      parameters: { depthCompare: 'always' },
      alphaCutoff,
      pickable: !ctx.preview,
      autoHighlight: true,
      highlightColor: [255, 255, 255, 120],
    });

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    onHover: (p) => {
      if (info) info.textContent = p.object ? `hovering ${(p.object as City).name}` : 'nothing under the cursor';
    },
    layers: [landLayer(), icons(true, 0.05)],
  });

  let stop: () => void = () => {};
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ layers: [landLayer(), icons(Math.floor(t / 2.5) % 2 === 0, 0.05)], viewState: { ...view, bearing: 20 + t * 8 } }));
  } else {
    let [bb, cut] = [true, 0.05];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), icons(bb, cut)] });
    const bar = controlBar(el);
    check(bar, 'billboard', bb, (v) => ((bb = v), refresh()));
    slider(bar, 'alphaCutoff', 0, 0.9, 0.05, cut, (v) => ((cut = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
