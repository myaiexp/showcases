// Base maps: MapLibre worker and CSS, offline style, map box, release
import { Map as MapLibreMap, setWorkerUrl } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './base-maps.css';
// The docs' Vite recipe (using-with-maplibre.md): a bundled, self-contained worker URL.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { CITIES } from './data.ts';
import { borders, countries } from './world.ts';

setWorkerUrl(workerUrl);

export const MAP_HEIGHT = { preview: 200, full: 460 } as const;

/** A deck layer's `beforeId` is not in LayerProps; layers declare it as an extra prop. */
export type WithBeforeId = { beforeId?: string };

export interface MapView {
  center: [number, number];
  zoom: number;
  pitch?: number;
  bearing?: number;
}

/**
 * A MapLibre style with no network: land, borders and city dots from local GeoJSON. There
 * are no glyphs, so no symbol layers. Layer ids, bottom to top: background, land, borders,
 * cities. Interleaved deck layers use these ids as `beforeId`.
 */
export function offlineStyle(): StyleSpecification {
  return {
    version: 8,
    sources: {
      land: { type: 'geojson', data: countries },
      borders: { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: borders } },
      cities: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: CITIES.map((c) => ({
            type: 'Feature',
            properties: { name: c.name },
            geometry: { type: 'Point', coordinates: c.coordinates },
          })),
        },
      },
    },
    layers: [
      { id: 'background', type: 'background', paint: { 'background-color': '#0b1622' } },
      { id: 'land', type: 'fill', source: 'land', paint: { 'fill-color': '#1e2938' } },
      {
        id: 'borders',
        type: 'line',
        source: 'borders',
        paint: { 'line-color': '#5a7090', 'line-width': 0.8 },
      },
      {
        id: 'cities',
        type: 'circle',
        source: 'cities',
        paint: { 'circle-radius': 3, 'circle-color': '#f2e3a0', 'circle-stroke-width': 1, 'circle-stroke-color': '#0b1622' },
      },
    ],
  };
}

/** A full-width box the map owns (it creates its own WebGL context in it). */
export function mapBox(el: HTMLElement, preview: boolean, height?: number): HTMLDivElement {
  const box = document.createElement('div');
  box.style.width = '100%';
  box.style.height = `${height ?? (preview ? MAP_HEIGHT.preview : MAP_HEIGHT.full)}px`;
  box.style.position = 'relative';
  box.style.borderRadius = preview ? '0' : '8px';
  box.style.overflow = 'hidden';
  box.style.flex = 'none';
  el.append(box);
  return box;
}

/** The offline map in `box`; a card's map takes no pointer input. */
export function createMap(box: HTMLElement, view: MapView, preview: boolean): MapLibreMap {
  return new MapLibreMap({
    container: box,
    style: offlineStyle(),
    center: view.center,
    zoom: view.zoom,
    pitch: view.pitch ?? 0,
    bearing: view.bearing ?? 0,
    interactive: !preview,
    attributionControl: false,
  });
}

interface Overlay {
  getCanvas(): HTMLCanvasElement | null;
  finalize(): void;
}

/**
 * Removes the overlay and then the map. map.remove() frees the map's own WebGL context; an
 * overlaid Deck made its own, which Deck.finalize() never frees, so lose it here.
 */
export function releaseMap(map: MapLibreMap, box: HTMLElement, overlay?: Overlay | null): void {
  const deckCanvas = overlay?.getCanvas() ?? null;
  overlay?.finalize();
  const gl = deckCanvas?.getContext('webgl2') ?? null;
  map.remove();
  if (gl && !gl.isContextLost()) gl.getExtension('WEBGL_lose_context')?.loseContext();
  box.remove();
}

/**
 * Finalizes an overlay (which removes its control) on a map that stays. An overlaid Deck's own WebGL context is lost on
 * purpose (Deck.finalize() never frees it); an interleaved one shares the map's: keep it.
 */
export function detachOverlay(overlay: Overlay, interleaved: boolean): void {
  const deckCanvas = interleaved ? null : overlay.getCanvas();
  overlay.finalize();
  const gl = deckCanvas?.getContext('webgl2') ?? null;
  if (gl && !gl.isContextLost()) gl.getExtension('WEBGL_lose_context')?.loseContext();
}

/** Runs `fn` once the map's style has loaded (at once if it already has). */
export function whenLoaded(map: MapLibreMap, fn: () => void): void {
  if (map.loaded()) fn();
  else map.once('load', fn);
}
