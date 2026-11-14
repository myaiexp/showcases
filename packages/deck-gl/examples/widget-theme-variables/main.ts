// Instance-level CSS variables: size, margin, radius and colours of widgets through style
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { CompassWidget, DarkTheme, ZoomWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { controlBar, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 40, zoom: ctx.preview ? 1.2 : 2.2, pitch: 30 };
  const vars = { size: 40, radius: 20, margin: 16, hue: 30 };

  // CSS variables go in `style` next to ordinary camelCase properties.
  const widgets = (preview: boolean) => {
    const style = {
      ...DarkTheme,
      '--button-size': `${vars.size}px`,
      '--button-corner-radius': `${vars.radius}px`,
      '--widget-margin': `${vars.margin}px`,
      '--button-background': `hsl(${vars.hue} 70% 22%)`,
      '--button-icon-idle': `hsl(${vars.hue} 90% 75%)`,
      '--button-icon-hover': '#fff',
    } as Partial<CSSStyleDeclaration>; // custom properties are not in CSSStyleDeclaration
    const ws = [new ZoomWidget({ id: 'zoom', placement: 'top-left', style }), new CompassWidget({ id: 'compass', placement: 'top-left', style })];
    return preview ? ws.slice(0, 2) : ws;
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
        getRadius: (d) => Math.sqrt(d.population) * 40_000,
        getFillColor: [255, 140, 60],
        radiusMinPixels: 3,
      }),
    ],
    widgets: widgets(ctx.preview),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Sweep the hue and the size so the variables visibly move.
    stop = animate((t) => {
      vars.hue = (30 + t * 40) % 360;
      vars.size = 34 + Math.sin(t) * 8;
      deck.setProps({ viewState: drift(view, t, 3), widgets: widgets(true) });
    });
  } else {
    const bar = controlBar(el);
    const apply = (): void => deck.setProps({ widgets: widgets(false) });
    slider(bar, '--button-size', 24, 64, 2, vars.size, (v) => { vars.size = v; apply(); });
    slider(bar, '--button-corner-radius', 0, 32, 2, vars.radius, (v) => { vars.radius = v; apply(); });
    slider(bar, '--widget-margin', 0, 40, 2, vars.margin, (v) => { vars.margin = v; apply(); });
    slider(bar, 'hue', 0, 360, 5, vars.hue, (v) => { vars.hue = v; apply(); });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
