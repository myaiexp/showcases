// A static legend control: one coloured square per density interval
import { Control, DomUtil, GeoJSON, LeafletMap } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { statesData } from '../../shared/data.ts';
import { US_CENTER } from '../../shared/states.ts';
import './style.css';

function getColor(d: number): string {
  return d > 1000 ? '#800026' : d > 500 ? '#BD0026' : d > 200 ? '#E31A1C' : d > 100 ? '#FC4E2A' : d > 50 ? '#FD8D3C' : d > 20 ? '#FEB24C' : d > 10 ? '#FED976' : '#FFEDA0';
}
const style = (feature: Feature) => ({ fillColor: getColor(feature.properties?.['density']), weight: 2, opacity: 1, color: 'white', dashArray: '3', fillOpacity: 0.7 });

const grades = [0, 10, 20, 50, 100, 200, 500, 1000];

class LegendControl extends Control {
  /** Called with the interval's index (or null) as the pointer enters and leaves a legend row. */
  onRow: (i: number | null) => void = () => {};

  override onAdd(_map: LeafletMap): HTMLElement {
    const div = DomUtil.create('div', 'info legend');
    // loop through our density intervals and generate a label with a colored square for each interval
    grades.forEach((from, i) => {
      const to = grades[i + 1];
      const row = document.createElement('div');
      const swatch = document.createElement('i');
      swatch.style.background = getColor(from + 1);
      row.append(swatch, to ? `${from}–${to}` : `${from}+`);
      row.addEventListener('pointerenter', () => this.onRow(i));
      row.addEventListener('pointerleave', () => this.onRow(null));
      div.append(row);
    });
    return div;
  }
}

const mount: Mount = async (el, ctx) => {
  const data = await statesData();
  const stage = createStage(el, ctx, { hint: 'The legend is a Control in the bottom-right corner. Hover a row to dim the states outside its interval.' });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }).setView(US_CENTER, stage.preview ? 3 : 4));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);
  const geojson = new GeoJSON(data, { style }).addTo(map);

  const legend = new LegendControl({ position: 'bottomright' });
  const focus = (i: number | null): void => {
    geojson.setStyle((f) => {
      const d = f.properties?.['density'] as number;
      const inside = i === null || (d > grades[i]! && (i === grades.length - 1 || d <= grades[i + 1]!));
      return { ...style(f), fillOpacity: inside ? 0.85 : 0.1, opacity: inside ? 1 : 0.3 };
    });
    stage.say(i === null ? 'Static legend: getColor(grades[i] + 1) for each interval' : `Interval ${grades[i]}${grades[i + 1] ? `–${grades[i + 1]}` : '+'} people / mi²`);
  };
  legend.onRow = focus;
  legend.addTo(map);
  stage.own(legend);
  focus(null);

  if (stage.preview) {
    let i = -1;
    stage.every(1000, () => focus(i >= grades.length - 1 ? ((i = -1), null) : ++i));
  }
  return () => stage.dispose();
};

export default mount;
