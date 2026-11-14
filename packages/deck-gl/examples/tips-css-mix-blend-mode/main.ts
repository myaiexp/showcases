// CSS mix-blend-mode on the canvas: overlay colours multiply with the "map" painted behind it
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';

const MODES = ['normal', 'multiply', 'screen', 'difference'] as const;
type Blend = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  // A light, paper-like backdrop with dark grid lines and a label, standing in for a base map.
  const stage = await createStage(el, ctx, { background: '#efe9d8' });
  const backdrop = document.createElement('div');
  Object.assign(backdrop.style, {
    position: 'absolute',
    inset: '0',
    backgroundImage: 'linear-gradient(#2a2a2a 1px, transparent 1px), linear-gradient(90deg, #2a2a2a 1px, transparent 1px)',
    backgroundSize: '48px 48px',
    opacity: '0.55',
    font: '700 22px monospace',
    color: '#1a1a1a',
    padding: '14px',
  });
  backdrop.textContent = 'LEGEND: dark base map text';
  stage.box.insertBefore(backdrop, stage.canvas);
  // isolation keeps the blend inside the stage and off any peer elements.
  stage.box.style.isolation = 'isolate';

  const view: MapViewState = { longitude: 15, latitude: 30, zoom: ctx.preview ? 0.6 : 1.5 };
  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: [
      new ScatterplotLayer<City>({
        id: 'blobs',
        data: CITIES,
        getPosition: (d) => d.coordinates,
        getRadius: (d) => Math.sqrt(d.population) * 130_000,
        radiusMinPixels: 6,
        getFillColor: [230, 70, 90, 200],
      }),
    ],
  });
  const setBlend = (v: Blend): void => {
    stage.canvas.style.mixBlendMode = v;
  };

  const stops: (() => void)[] = [];
  if (ctx.preview) {
    setBlend('multiply');
    let i = 0;
    const timer = window.setInterval(() => setBlend(MODES[++i % 2 === 0 ? 0 : 1]!), 1600);
    stops.push(() => clearInterval(timer), animate((t) => deck.setProps({ viewState: { ...view, longitude: 15 + Math.sin(t * 0.4) * 20 } })));
  } else {
    setBlend('multiply');
    select(controlBar(el), 'canvas mix-blend-mode', [...MODES], setBlend, 'multiply');
  }
  return () => {
    for (const stop of stops) stop();
    stage.release(deck);
  };
};

export default mount;
