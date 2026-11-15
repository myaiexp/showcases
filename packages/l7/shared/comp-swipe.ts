// Two colourings of the world's countries, for Swipe to compare
import { type ILayer, PolygonLayer } from '@antv/l7';
import { countries } from './world.ts';

/** A country fill layer coloured by the country's number with the given ramp. */
export function countryFill(name: string, colors: string[]): ILayer {
  return new PolygonLayer({ name }).source(countries).shape('fill').color('id', colors).style({ opacity: 1 });
}

export const WARM = ['#7a1f1f', '#b3472c', '#e27d3a', '#f4b860', '#fbe3a1'];
export const COOL = ['#0b3d5c', '#1c6e8c', '#3aa6a8', '#7fd1b9', '#d4f2e1'];
