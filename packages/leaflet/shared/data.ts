// The tutorials' data files and images, bundled so nothing is fetched
import type { Feature, FeatureCollection } from 'geojson';

/**
 * The tutorials' data files are scripts (`const statesData = {…};`), not modules. They are
 * bundled as text and each `const` is read as JSON; `campus` uses a few unquoted keys, which
 * get quoted first.
 */
function consts(src: string): Map<string, unknown> {
  const out = new Map<string, unknown>();
  const parts = src.split(/^const (\w+) = /m).slice(1);
  for (let i = 0; i + 1 < parts.length; i += 2) {
    const body = (parts[i + 1] ?? '').trim().replace(/;$/, '').replace(/([{,]\s*)([A-Za-z_]\w*)\s*:/g, '$1"$2":');
    out.set(parts[i] ?? '', JSON.parse(body));
  }
  return out;
}

const once = <T>(load: () => Promise<T>): (() => Promise<T>) => {
  let p: Promise<T> | null = null;
  return () => (p ??= load());
};

/** US states with `properties.density` (people per square mile): the choropleth tutorial's data. */
export const statesData = once(async () => {
  const m = await import('../docs/repo/docs/examples/choropleth/us-states.js?raw');
  return consts(m.default).get('statesData') as FeatureCollection;
});

/** The EU countries the map-panes tutorial draws (Natural Earth admin-0 properties). */
export const euCountries = once(async () => {
  const m = await import('../docs/repo/docs/examples/map-panes/eu-countries.js?raw');
  return consts(m.default).get('euCountries') as FeatureCollection;
});

export interface DenverSample {
  /** Free bus route lines (LineString, with `properties.underConstruction` on one). */
  freeBus: FeatureCollection;
  /** Two light-rail stops (Point). */
  lightRailStop: FeatureCollection;
  /** Bicycle rental points (Point). */
  bicycleRental: FeatureCollection;
  /** The Auraria West Campus (MultiPolygon, with its own `properties.style`). */
  campus: Feature;
  /** Coors Field (Point). */
  coorsField: Feature;
}

/** The GeoJSON tutorial's Denver sample features. */
export const denverSample = once(async () => {
  const m = await import('../docs/repo/docs/examples/geojson/sample-geojson.js?raw');
  return Object.fromEntries(consts(m.default)) as unknown as DenverSample;
});

/** The tutorials' images, as data URLs inlined in the bundle (no request, even same-origin). */
export const images = {
  leafGreen: () => import('../docs/repo/docs/examples/custom-icons/leaf-green.png?inline').then((m) => m.default),
  leafOrange: () => import('../docs/repo/docs/examples/custom-icons/leaf-orange.png?inline').then((m) => m.default),
  leafRed: () => import('../docs/repo/docs/examples/custom-icons/leaf-red.png?inline').then((m) => m.default),
  leafShadow: () => import('../docs/repo/docs/examples/custom-icons/leaf-shadow.png?inline').then((m) => m.default),
  baseballMarker: () => import('../docs/repo/docs/examples/geojson/baseball-marker.png?inline').then((m) => m.default),
  /** A 1922 map of Newark, NJ: the overlays tutorial's ImageOverlay. */
  newark1922: () => import('../docs/repo/docs/examples/overlays/newark_nj_1922.jpg?inline').then((m) => m.default),
  /** The Ur-Quan Masters star map (2315×2315 px): the CRS.Simple tutorial's image. */
  uqmMap: () => import('../docs/repo/docs/examples/crs-simple/uqm_map_full.png?inline').then((m) => m.default),
};
