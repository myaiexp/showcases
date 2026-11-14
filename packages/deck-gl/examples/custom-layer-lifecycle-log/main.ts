// The layer lifecycle, logged: initializeState, shouldUpdateState, updateState
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { button, check, controlBar, readout } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { LoggingScatterplotLayer } from './logging-layer.ts';

const COLORS: [number, number, number][] = [[255, 140, 60], [90, 200, 255], [150, 240, 160]];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 20, latitude: 28, zoom: ctx.preview ? 1.1 : 1.8 };
  const state = { color: 0, present: true, onViewport: false };
  const lines: string[] = [];
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el);
  if (!ctx.preview) label.style.textAlign = 'left';
  if (ctx.preview) label.style.fontSize = '9px';

  // Consecutive "draw" lines (one per frame) are folded into "draw x N".
  const log = (line: string): void => {
    const last = lines.at(-1);
    if (line === 'draw' && last?.startsWith('draw')) {
      lines[lines.length - 1] = `draw x ${(Number(last.split('x ')[1]) || 1) + 1}`;
    } else {
      lines.push(line);
    }
    if (lines.length > (ctx.preview ? 5 : 12)) lines.shift();
    label.textContent = lines.join('\n');
  };

  const layers = () => [
    landLayer(),
    ...(state.present
      ? [
          new LoggingScatterplotLayer<City>({
            id: 'logged',
            data: CITIES as City[],
            getPosition: (d) => d.coordinates,
            getRadius: (d) => Math.sqrt(d.population) * 50_000,
            radiusMinPixels: 4,
            getFillColor: [...COLORS[state.color]!, 220],
            updateTriggers: { getFillColor: state.color },
            updateOnViewport: state.onViewport,
            onLifecycle: log,
          }),
        ]
      : []),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });
  const refresh = (): void => deck.setProps({ layers: layers() });

  let stop = (): void => {};
  let timer = 0;
  if (ctx.preview) {
    // Zoom in and out (viewport changes), recolour, and add and remove the layer in turn.
    stop = animate((t) => deck.setProps({ viewState: { ...view, zoom: 1.1 + 0.15 * Math.sin(t) } }));
    let n = 0;
    timer = window.setInterval(() => {
      n++;
      if (n % 3 === 0) state.present = !state.present;
      else if (state.present) state.color = (state.color + 1) % COLORS.length;
      refresh();
    }, 1600);
  } else {
    const bar = controlBar(el);
    button(bar, 'change fill colour', () => {
      state.color = (state.color + 1) % COLORS.length;
      refresh();
    });
    button(bar, 'remove / add layer', () => {
      state.present = !state.present;
      refresh();
    });
    check(bar, 'updateOnViewport', false, (v) => {
      state.onViewport = v;
      refresh();
    });
    log('Pan or zoom the map: draw runs, updateState does not (unless updateOnViewport)');
  }
  return () => {
    stop();
    clearInterval(timer);
    stage.release(deck);
  };
};

export default mount;
