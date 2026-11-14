// TextLayer background: padded, rounded, bordered label boxes behind the text
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, slider } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 15, latitude: 42, zoom: ctx.preview ? 1.8 : 2.6 };
  const data = CITIES.filter((c) => c.population >= 11);
  const state = { background: true, padX: 8, padY: 4, radius: 6, border: 1.5 };

  const layers = (): [ReturnType<typeof landLayer>, TextLayer<City>] => [
    landLayer(),
    new TextLayer<City>({
      id: 'tags',
      data,
      getText: (d) => d.name,
      getPosition: (d) => d.coordinates,
      getSize: 14,
      getColor: [20, 28, 40],
      characterSet: 'auto',
      // The box behind each label, sized from the text plus the padding.
      background: state.background,
      backgroundPadding: [state.padX, state.padY],
      backgroundBorderRadius: state.radius,
      // Colour by size of city; the border takes its own colour and width in pixels.
      getBackgroundColor: (d) => (d.population > 20 ? [255, 190, 100] : [140, 210, 255]),
      getBorderColor: [255, 255, 255],
      getBorderWidth: state.border,
    }),
  ];
  const update = (): void => deck.setProps({ layers: layers() });
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    stop = animate((t) => {
      state.padX = 4 + 8 * (0.5 + 0.5 * Math.sin(t * 1.3));
      state.radius = 10 * (0.5 + 0.5 * Math.sin(t * 0.9));
      update();
    });
  } else {
    const bar = controlBar(el);
    check(bar, 'background', true, (v) => { state.background = v; update(); });
    slider(bar, 'padding x', 0, 20, 1, 8, (v) => { state.padX = v; update(); });
    slider(bar, 'padding y', 0, 20, 1, 4, (v) => { state.padY = v; update(); });
    slider(bar, 'borderRadius', 0, 16, 1, 6, (v) => { state.radius = v; update(); });
    slider(bar, 'borderWidth', 0, 5, 0.5, 1.5, (v) => { state.border = v; update(); });
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
