// Component and Source demos: European places, dots, an event log, badges
import { type ILayer, type IMarker, type IPopup, PointLayer, type Scene } from '@antv/l7';
import { gauss, rng } from './data.ts';
import type { Stage } from './stage.ts';

export interface Place {
  name: string;
  lng: number;
  lat: number;
  /** Population, millions. */
  pop: number;
  /** 'capital' or 'port': a category field for popups and filters. */
  kind: 'capital' | 'port';
}

/** Fourteen European places with a name, a population and a kind. */
export const PLACES: Place[] = [
  { name: 'Lisbon', lng: -9.14, lat: 38.72, pop: 3, kind: 'port' },
  { name: 'Madrid', lng: -3.7, lat: 40.42, pop: 6.7, kind: 'capital' },
  { name: 'Paris', lng: 2.35, lat: 48.86, pop: 11, kind: 'capital' },
  { name: 'London', lng: -0.13, lat: 51.51, pop: 9.5, kind: 'capital' },
  { name: 'Hamburg', lng: 9.99, lat: 53.55, pop: 1.9, kind: 'port' },
  { name: 'Berlin', lng: 13.4, lat: 52.52, pop: 3.8, kind: 'capital' },
  { name: 'Rome', lng: 12.5, lat: 41.9, pop: 4.3, kind: 'capital' },
  { name: 'Vienna', lng: 16.37, lat: 48.21, pop: 2, kind: 'capital' },
  { name: 'Warsaw', lng: 21.01, lat: 52.23, pop: 1.8, kind: 'capital' },
  { name: 'Oslo', lng: 10.75, lat: 59.91, pop: 1, kind: 'capital' },
  { name: 'Helsinki', lng: 24.94, lat: 60.17, pop: 1.3, kind: 'capital' },
  { name: 'Athens', lng: 23.73, lat: 37.98, pop: 3.1, kind: 'capital' },
  { name: 'Marseille', lng: 5.37, lat: 43.3, pop: 1.8, kind: 'port' },
  { name: 'Gdansk', lng: 18.65, lat: 54.35, pop: 0.5, kind: 'port' },
];

/** Where to centre the map, [lng, lat], so PLACES fit a ~260x200 card at the zoom below. */
export const EUROPE_CENTER: [number, number] = [11, 49];
export const europeZoom = (preview: boolean): number => (preview ? 2.5 : 3.4);

/** A coloured dot layer over rows with lng/lat, named so LayerSwitch and LayerPopup can find it. */
export function dots<T extends { lng: number; lat: number }>(data: T[], opts: { name?: string; color?: string; size?: number } = {}): ILayer {
  const { name, color = '#ffd166', size = 9 } = opts;
  return new PointLayer(name ? { name } : {})
    .source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(size)
    .color(color)
    .style({ opacity: 0.9, stroke: '#0b131c', strokeWidth: 1 });
}

/** Appends lines to the stage's readout (full view only), keeping the newest `keep`. No-op in cards. */
export function eventLog(stage: Stage, keep = 6, heading = ''): (line: string) => void {
  const out = stage.readout();
  const lines: string[] = [];
  if (out) out.textContent = heading;
  return (line) => {
    if (!out) return;
    lines.push(line);
    while (lines.length > keep) lines.shift();
    out.textContent = (heading ? `${heading}\n` : '') + lines.join('\n');
  };
}

/** A small DOM badge for Marker elements and popups. */
export function badge(text: string, color = '#ff6b6b'): HTMLDivElement {
  const d = document.createElement('div');
  d.textContent = text;
  d.style.cssText = `padding:2px 7px;border-radius:10px;background:${color};color:#101820;font:600 11px/1.3 system-ui,sans-serif;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.5);cursor:pointer`;
  return d;
}

/** A data: URL SVG logo with a word on a coloured bar, in the 89:16 box the Logo control gives it. */
export function logoImage(letter: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="178" height="32"><rect width="178" height="32" rx="6" fill="${color}"/><text x="89" y="23" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="22" fill="#101820">${letter}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

type Control = Parameters<Scene['addControl']>[0];

/** scene.addControl(control), with its removal registered on the stage; returns the control. */
export function addControl<C extends Control>(stage: Stage, scene: Scene, control: C): C {
  scene.addControl(control);
  stage.own(() => scene.removeControl(control));
  return control;
}

/** scene.addPopup(popup), closed again on dispose. */
export function addPopup<P extends IPopup>(stage: Stage, scene: Scene, popup: P): P {
  scene.addPopup(popup);
  stage.own(() => popup.remove());
  return popup;
}

/** scene.addMarker(marker), removed again on dispose. */
export function addMarker<M extends IMarker>(stage: Stage, scene: Scene, marker: M): M {
  scene.addMarker(marker);
  stage.own(() => marker.remove());
  return marker;
}

export interface Spot {
  lng: number;
  lat: number;
  /** 1..100 */
  value: number;
  name: string;
}

/** n spots scattered around PLACES (spread in degrees), each with a value: stands in for a point list. */
export function spots(n: number, seed = 4, spread = 1.6): Spot[] {
  const r = rng(seed);
  return Array.from({ length: n }, (_, i) => {
    const c = PLACES[Math.floor(r() * PLACES.length)] ?? PLACES[0]!;
    return { lng: c.lng + gauss(r) * spread, lat: c.lat + gauss(r) * spread * 0.7, value: Math.round(1 + 99 * r()), name: `spot ${i + 1}` };
  });
}

/**
 * Cards: a ghost pointer visits the [lng, lat] stops. Each visit is three ticks (arrive, nudge by a
 * pixel so L7 sees a second mousemove over the element, then optionally click), never two at once.
 */
export function hoverTour(stage: Stage, scene: Scene, stops: readonly [number, number][], opts: { ms?: number; click?: boolean } = {}): void {
  const { ms = 450, click = false } = opts;
  const ghost = stage.ghost(scene);
  let at: { x: number; y: number } | undefined;
  stage.every(ms, (i) => {
    const visit = Math.floor((i - 1) / 3);
    const phase = (i - 1) % 3;
    if (phase === 0) {
      const p = stops[visit % stops.length];
      if (!p) return;
      at = scene.lngLatToContainer(p);
      ghost.move(at.x, at.y);
    } else if (phase === 1 && at) ghost.move(at.x + 1, at.y);
    else if (click) ghost.click();
  });
}
