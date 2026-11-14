// Customising a widget's style: className, style prop and CSS variables
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select, slider } from '../../shared/controls.ts';
import { wrapLng } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import './style.css';
import { BadgeWidget } from './badge-widget.ts';

const THEMES: Record<string, Record<string, string>> = {
  default: {},
  night: { '--badge-background': '#0f2038', '--badge-color': '#9fd0ff' },
  forest: { '--badge-background': '#14532d', '--badge-color': '#d9ffe6' },
  rose: { '--badge-background': '#7a1f3d', '--badge-color': '#ffe3ec' },
};
const NAMES = Object.keys(THEMES);

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 30, zoom: ctx.preview ? 1 : 1.6 };
  const badge = new BadgeWidget({ text: 'deck.gl widget' });
  const state = { theme: 'default', radius: 8, loud: false, margin: 14 };

  // CSS variables go in the same `style` object as camelCase properties; the base class applies
  // them with setProperty. The typing only knows CSS properties, hence the cast.
  const apply = (): void => {
    const style = {
      ...THEMES[state.theme],
      '--badge-radius': `${state.radius}px`,
      '--widget-margin': `${state.margin}px`,
    } as unknown as Partial<CSSStyleDeclaration>;
    badge.setProps({ style, className: state.loud ? 'badge-loud' : '' });
  };
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [landLayer()],
    widgets: [badge],
  });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    stop = animate((t) => deck.setProps({ viewState: { ...view, longitude: wrapLng(10 + t * 5) } }));
    let i = 0;
    timer = window.setInterval(() => {
      i++;
      state.theme = NAMES[i % NAMES.length]!;
      state.loud = i % 5 === 4;
      state.radius = i % 2 ? 20 : 6;
      apply();
    }, 1200);
  } else {
    const bar = controlBar(el);
    select(bar, 'theme (instance style)', NAMES, (v) => {
      state.theme = v;
      apply();
    });
    slider(bar, '--badge-radius', 0, 24, 1, state.radius, (v) => {
      state.radius = v;
      apply();
    });
    slider(bar, '--widget-margin', 0, 40, 2, state.margin, (v) => {
      state.margin = v;
      apply();
    });
    check(bar, 'className: badge-loud', false, (v) => {
      state.loud = v;
      apply();
    });
    readout(el, "badge.setProps({ style: { '--badge-background': ... }, className })");
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
