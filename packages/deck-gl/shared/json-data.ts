// JSON chapter helpers: city rows as plain JSON, applying converted props
import type { Deck, DeckProps } from '@deck.gl/core';
import { CITIES } from './data.ts';
import { landLayer } from './world.ts';

/** City rows as a JSON document would carry them: no tuples, just named numbers. */
export interface CityRow {
  name: string;
  lng: number;
  lat: number;
  population: number;
}

export const CITY_ROWS: CityRow[] = CITIES.map((c) => ({
  name: c.name,
  lng: c.coordinates[0],
  lat: c.coordinates[1],
  population: c.population,
}));

/**
 * Hands JSONConverter output to a Deck. The converter returns `unknown`, so the cast is the
 * boundary where untyped JSON becomes props. The world map is scenery added under the spec's
 * own layers; `initialViewState` is left out after the first call so edits keep the camera.
 */
export function applyConverted(deck: Deck, converted: unknown, opts: { first: boolean; controller: boolean }): void {
  const props = converted as DeckProps;
  // An unregistered @@type converts to null: drop those.
  const layers = Array.isArray(props.layers) ? props.layers.filter(Boolean) : [];
  const { initialViewState, ...rest } = props;
  deck.setProps({
    ...rest,
    ...(opts.first ? { initialViewState } : {}),
    controller: props.controller ?? opts.controller,
    layers: [landLayer(), ...layers],
  });
}
