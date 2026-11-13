// Route and lookup data shared by the lines examples: city coordinates and hub-and-spoke routes
import { CITIES } from './scatter-data.ts';

const BY_NAME = new Map(CITIES.map((c) => [c.name, [c.lon, c.lat] as [number, number]]));

/** [lon, lat] of a city from the shared list; throws on a name that is not in it. */
export function coordOf(name: string): [number, number] {
  const c = BY_NAME.get(name);
  if (!c) throw new Error(`unknown city ${name}`);
  return c;
}

/** Every city other than the hub, as a { name, coords: [hub, city] } line. */
export function spokes(hub: string): { name: string; coords: [number, number][] }[] {
  return CITIES.filter((c) => c.name !== hub).map((c) => ({ name: `${hub} to ${c.name}`, coords: [coordOf(hub), [c.lon, c.lat]] }));
}
