// visible keeps a hidden layer's state, so showing it again costs nothing
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar } from '../../shared/controls.ts';
import { CITIES, city, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';

const HUB = city('Dubai');

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 40, latitude: 25, zoom: ctx.preview ? 0.6 : 1.2 };
  const show = { dots: true, arcs: true };

  // Both layers stay in the list for good; `visible` turns them on and off. Conditional
  // rendering would destroy and rebuild the layer state on every toggle.
  const layers = () => [
    landLayer(),
    new ArcLayer<City>({
      id: 'arcs',
      data: CITIES,
      getSourcePosition: () => HUB.coordinates,
      getTargetPosition: (d) => d.coordinates,
      getSourceColor: [255, 190, 90],
      getTargetColor: [90, 190, 255],
      getWidth: 1.5,
      visible: show.arcs,
    }),
    new ScatterplotLayer<City>({
      id: 'dots',
      data: CITIES,
      getPosition: (d) => d.coordinates,
      getRadius: 5,
      radiusUnits: 'pixels',
      getFillColor: [255, 255, 255],
      visible: show.dots,
    }),
  ];

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const apply = (): void => deck.setProps({ layers: layers() });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    let n = 0;
    timer = window.setInterval(() => {
      n += 1;
      show.dots = n % 4 !== 3;
      show.arcs = n % 4 !== 1;
      apply();
    }, 1000);
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(40 + t * 5) } }));
  } else {
    const bar = controlBar(el);
    check(bar, 'arcs visible', true, (v) => {
      show.arcs = v;
      apply();
    });
    check(bar, 'dots visible', true, (v) => {
      show.dots = v;
      apply();
    });
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
