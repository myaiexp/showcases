// TextLayer fontFamily and fontWeight: the font atlas is drawn with canvas fonts
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { TextLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const FAMILIES = ['sans-serif', 'serif', 'monospace', 'cursive'] as const;
const WEIGHTS = ['normal', 'bold', '300', '900'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const INITIAL_VIEW_STATE: MapViewState = { longitude: 15, latitude: 45, zoom: ctx.preview ? 1.6 : 2.2 };
  const data = CITIES.filter((c) => c.population >= 9);
  const state = { family: 'sans-serif' as string, weight: 'normal' as string };

  const layers = (): [ReturnType<typeof landLayer>, TextLayer<City>] => [
    landLayer(),
    new TextLayer<City>({
      // A new id per font: each family and weight gets its own font atlas.
      id: `names-${state.family}-${state.weight}`,
      data,
      getText: (d) => d.name,
      getPosition: (d) => d.coordinates,
      getSize: 17,
      getColor: [235, 240, 250],
      // CSS font-family and font-weight. A system family: web fonts must be loaded beforehand.
      fontFamily: state.family,
      fontWeight: state.weight,
      characterSet: 'auto',
    }),
  ];
  const deck = new Deck({
    device: stage.device,
    initialViewState: INITIAL_VIEW_STATE,
    controller: !ctx.preview,
    layers: layers(),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    const combos: [string, string][] = [['sans-serif', 'normal'], ['serif', 'bold'], ['monospace', 'normal']];
    stop = animate((t) => {
      const [family, weight] = combos[Math.floor(t / 2.5) % combos.length]!;
      if (family !== state.family || weight !== state.weight) {
        state.family = family;
        state.weight = weight;
        deck.setProps({ layers: layers() });
      }
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'fontFamily', FAMILIES, (v) => { state.family = v; deck.setProps({ layers: layers() }); }, 'sans-serif');
    select(bar, 'fontWeight', WEIGHTS, (v) => { state.weight = v; deck.setProps({ layers: layers() }); }, 'normal');
  }

  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
