// The four built-in themes (light, dark, glass variants) applied via widget style
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CompassWidget, DarkGlassTheme, DarkTheme, LightGlassTheme, LightTheme, ScreenshotWidget, ZoomWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const THEMES = { LightTheme, DarkTheme, LightGlassTheme, DarkGlassTheme };
type ThemeName = keyof typeof THEMES;
const NAMES = Object.keys(THEMES) as ThemeName[];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 48, zoom: ctx.preview ? 3 : 4, pitch: 30 };

  // Each widget takes the theme as its inline style: a bag of CSS variables.
  const widgets = (name: ThemeName) => {
    const style = THEMES[name] as Partial<CSSStyleDeclaration>; // custom properties are not in CSSStyleDeclaration
    return [
      new ZoomWidget({ id: 'zoom', placement: 'top-left', style }),
      new CompassWidget({ id: 'compass', placement: 'top-left', style }),
      new ScreenshotWidget({ id: 'screenshot', placement: 'top-left', style, onCapture: () => {} }),
    ];
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      landLayer(),
      new ScatterplotLayer<City>({
        id: 'cities',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 12_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: widgets('DarkGlassTheme'),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Step through the four themes on a timer.
    let i = 0;
    const id = window.setInterval(() => deck.setProps({ widgets: widgets(NAMES[++i % NAMES.length]!) }), 2000);
    const drifting = animate((t) => deck.setProps({ viewState: drift(view, t, 3) }));
    stop = () => {
      window.clearInterval(id);
      drifting();
    };
  } else {
    const bar = controlBar(el);
    select(bar, 'theme', NAMES, (v) => deck.setProps({ widgets: widgets(v) }), 'DarkGlassTheme');
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
