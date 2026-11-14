// World GeoJSON with an `echartsStyle` property written onto a few features
import type { FeatureCollection } from 'geojson';
import { COUNTRIES } from '../../shared/world.ts';

/** The features that get a style in the data, with the style object each one carries. */
export function styledWorld(): FeatureCollection {
  // Copy so the shared GeoJSON used by other examples stays untouched.
  const copy = JSON.parse(JSON.stringify(COUNTRIES)) as FeatureCollection;
  const styles: Record<string, object> = {
    // A fill colour; the map series data below overrides it for Greenland.
    Greenland: { itemStyle: { areaColor: '#000000' }, label: { show: true, formatter: 'Greenland: styled by the GeoJSON' } },
    // Disputed or partly recognised territories: the dashed border is part of what the data says.
    'W. Sahara': { itemStyle: { borderType: 'dashed', borderColor: '#ff7a59', borderWidth: 2 } },
    Kosovo: { itemStyle: { borderType: 'dashed', borderColor: '#ff7a59', borderWidth: 2 } },
    'N. Cyprus': { itemStyle: { borderType: 'dashed', borderColor: '#ff7a59', borderWidth: 2 } },
    Somaliland: { itemStyle: { borderType: 'dashed', borderColor: '#ff7a59', borderWidth: 2 } },
    Iceland: { itemStyle: { areaColor: '#2f8f6a' }, selected: true, label: { show: true, formatter: 'Selected by default:\n{b}' } },
    Finland: { itemStyle: { borderType: 'dotted', borderColor: '#5aa3d6', borderWidth: 2 } },
    Australia: {
      itemStyle: { areaColor: '#9a6b2f' },
      tooltip: { formatter: (p: { name: string }) => `Tooltip function from the GeoJSON: ${p.name}` },
    },
  };
  for (const f of copy.features) {
    const style = styles[String(f.properties?.['name'])];
    if (style) f.properties = { ...f.properties, echartsStyle: style };
  }
  return copy;
}
