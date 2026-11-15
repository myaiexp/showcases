// Helpers for the choropleth examples: find a state's layer, and the map's starting view
import type { GeoJSON, LatLngTuple, Polygon } from 'leaflet';
import type { Feature } from 'geojson';

/** The tutorial's starting view of the contiguous US. */
export const US_CENTER: LatLngTuple = [37.8, -96];

/** The layer a GeoJSON layer made for the state called `name` (a path, since states are polygons). */
export function stateLayer(geojson: GeoJSON, name: string): Polygon {
  const found = geojson.getLayers().find((l) => (l as unknown as { feature: Feature }).feature.properties?.['name'] === name);
  if (!found) throw new Error(`No state called ${name}`);
  return found as Polygon;
}
