// The layer-groups tutorial's Denver markers, tile styles for base layers, and a way to press a layers-control entry
import { Marker, type LatLngTuple, type LeafletMap } from 'leaflet';
import { LAND_ATTRIBUTION, LocalTileLayer } from './local-tiles.ts';

export const DENVER: LatLngTuple = [39.73, -104.99];

/** The tutorial's four cities, each with its popup text. */
export const CITY_SPECS: readonly (readonly [string, LatLngTuple])[] = [
  ['Littleton', [39.61, -105.02]],
  ['Denver', [39.74, -104.99]],
  ['Aurora', [39.73, -104.8]],
  ['Golden', [39.77, -105.23]],
];
/** The two parks the tutorial adds later. */
export const PARK_SPECS: readonly (readonly [string, LatLngTuple])[] = [
  ['Crown Hill Park', [39.75, -105.09]],
  ['Ruby Hill Park', [39.68, -105.0]],
];

export const marker = ([name, at]: readonly [string, LatLngTuple]): Marker => new Marker(at, { title: name }).bindPopup(`This is ${name}.`);
export const cityMarkers = (): Marker[] => CITY_SPECS.map(marker);
export const parkMarkers = (): Marker[] => PARK_SPECS.map(marker);

export type BaseStyle = 'light' | 'terrain' | 'dark' | 'vintage' | 'night' | 'grid';
/** A base layer in one of the pretend server's styles. */
export const baseTiles = (style: BaseStyle, extra: ConstructorParameters<typeof LocalTileLayer>[1] = {}): LocalTileLayer =>
  new LocalTileLayer(`https://tiles.example/${style}/{z}/{x}/{y}.png`, { maxZoom: 18, attribution: LAND_ATTRIBUTION, ...extra });

/**
 * Clicks the control entry whose label contains `text`: the same click on the radio button or
 * checkbox a reader makes, so the control's own handler adds and removes the layers.
 */
export function pressEntry(map: LeafletMap, text: string): void {
  for (const label of map.getContainer().querySelectorAll('.leaflet-control-layers label')) {
    if (label.textContent?.includes(text)) label.querySelector('input')?.click();
  }
}
