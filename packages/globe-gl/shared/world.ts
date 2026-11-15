// Offline geography: Natural Earth countries and land, with area and centroid
import { geoArea, geoCentroid } from 'd3-geo';
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import countries110 from 'world-atlas/countries-110m.json';
import land110 from 'world-atlas/land-110m.json';

// Cards must not touch the network, so every example's geography comes from here: Natural
// Earth (public domain) through world-atlas, the same 1:110m shapes for every example.

type CountryTopo = Topology<{ countries: GeometryCollection<{ name: string }> }>;
type LandTopo = Topology<{ land: GeometryCollection }>;

export interface CountryProps {
  name: string;
  /** A stable number per country (its index), handy for colour mapping. */
  index: number;
  /** Land area in thousands of km², computed from the shape. */
  area: number;
  /** Centroid as [lat, lng]. */
  center: [number, number];
}

export type Country = Feature<Polygon | MultiPolygon, CountryProps>;

const EARTH_KM2 = 4 * Math.PI * 6371 ** 2;
const topo = countries110 as unknown as CountryTopo;
const all = feature(topo, topo.objects.countries) as FeatureCollection<Polygon | MultiPolygon, { name: string }>;

/** Every Natural Earth 1:110m country, with `name`, `index`, `area` and `center`. */
export const countries: Country[] = all.features
  .filter((f) => f.geometry && (f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon'))
  .map((f, index) => {
    const [lng, lat] = geoCentroid(f);
    return {
      type: 'Feature',
      geometry: f.geometry,
      properties: {
        name: f.properties.name,
        index,
        area: Math.round((geoArea(f) / (4 * Math.PI)) * EARTH_KM2) / 1000,
        center: [lat, lng],
      },
    };
  });

/** Looks a country up by its Natural Earth name. */
export function country(name: string): Country {
  const c = countries.find((f) => f.properties.name === name);
  if (!c) throw new Error(`No country named ${name}`);
  return c;
}

const landTopo = land110 as unknown as LandTopo;
/** All land as one GeoJSON collection, for drawing textures. */
export const land = feature(landTopo, landTopo.objects.land) as FeatureCollection;
