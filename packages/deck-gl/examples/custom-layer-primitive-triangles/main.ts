// A layer from scratch: instanced luma.gl Model, own GLSL on project32 and picking
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select, slider } from '../../shared/controls.ts';
import { routes, seeded, type City } from '../../shared/data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';
import { TriangleLayer } from './triangle-layer.ts';

interface Ship {
  from: City;
  to: City;
  /** 0..1 along the route, advanced by time. */
  phase: number;
  heading: number;
  speed: number;
}

const rand = seeded(5);
const SHIPS: Ship[] = routes(['Singapore', 'London'], 3)
  .filter(() => rand() < 0.45)
  .map((r) => ({ from: r.from, to: r.to, phase: rand(), heading: 0, speed: 0.01 + rand() * 0.02 }));

/** Position at t and the compass bearing of the line from -> to (flat approximation). */
function place(s: Ship, t: number): { position: [number, number]; heading: number } {
  const k = (s.phase + t * s.speed) % 1;
  const [x0, y0] = s.from.coordinates;
  const [x1, y1] = s.to.coordinates;
  return { position: [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k], heading: (Math.atan2(x1 - x0, y1 - y0) * 180) / Math.PI };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 30, latitude: 25, zoom: ctx.preview ? 0.9 : 1.5 };
  const state = { units: 'pixels' as 'pixels' | 'meters', scale: 1 };
  const label = ctx.preview ? null : readout(el, 'Hover a triangle');
  let t = 0;

  const layers = () => {
    const at = SHIPS.map((s) => place(s, t));
    return [
      landLayer(),
      new TriangleLayer<Ship>({
        id: 'ships',
        data: SHIPS,
        getPosition: (_d, { index }) => at[index]!.position,
        getAngle: (_d, { index }) => at[index]!.heading,
        getSize: state.units === 'pixels' ? 9 : 120_000,
        getColor: (d) => [90 + Math.round(d.speed * 5000), 200, 255, 230],
        sizeScale: state.scale,
        sizeUnits: state.units,
        sizeMinPixels: 4,
        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 200, 80, 255],
        updateTriggers: { getPosition: t, getAngle: t },
        onHover: (info: PickingInfo<Ship>) => {
          if (label) label.textContent = info.object ? `${info.object.from.name} to ${info.object.to.name} (instance ${info.index})` : 'Hover a triangle';
        },
      }),
    ];
  };
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const stop = animate((s) => {
    t = s;
    deck.setProps({ layers: layers() });
  });
  if (!ctx.preview) {
    const bar = controlBar(el);
    select(bar, 'sizeUnits', ['pixels', 'meters'] as const, (v) => {
      state.units = v;
    });
    slider(bar, 'sizeScale', 0.5, 3, 0.25, state.scale, (v) => {
      state.scale = v;
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
