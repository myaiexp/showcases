// The finished choropleth: colour, hover highlight, click to zoom, info control and legend
import { Control, DomUtil, GeoJSON, LeafletMap, type Layer, type LeafletPointerEvent, type Polygon } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { statesData } from '../../shared/data.ts';
import { ghost } from '../../shared/ghost.ts';
import { stateLayer, US_CENTER } from '../../shared/states.ts';
import './style.css';

type Props = { name: string; density: number };

function getColor(d: number): string {
  return d > 1000 ? '#800026' : d > 500 ? '#BD0026' : d > 200 ? '#E31A1C' : d > 100 ? '#FC4E2A' : d > 50 ? '#FD8D3C' : d > 20 ? '#FEB24C' : d > 10 ? '#FED976' : '#FFEDA0';
}
function style(feature: Feature) {
  return { fillColor: getColor(feature.properties?.['density']), weight: 2, opacity: 1, color: 'white', dashArray: '3', fillOpacity: 0.7 };
}

class InfoControl extends Control {
  private _div?: HTMLElement;

  override onAdd(_map: LeafletMap): HTMLElement {
    this._div = DomUtil.create('div', 'info');
    this.update();
    return this._div;
  }

  update(props?: Props): void {
    const div = this._div;
    if (!div) return;
    const title = document.createElement('h4');
    title.textContent = 'US Population Density';
    div.replaceChildren(title);
    if (!props) {
      div.append('Hover over a state');
      return;
    }
    const name = document.createElement('b');
    name.textContent = props.name;
    const sup = document.createElement('sup');
    sup.textContent = '2';
    div.append(name, document.createElement('br'), `${props.density} people / mi`, sup);
  }
}

class LegendControl extends Control {
  override onAdd(_map: LeafletMap): HTMLElement {
    const div = DomUtil.create('div', 'info legend');
    const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
    grades.forEach((from, i) => {
      const to = grades[i + 1];
      const row = document.createElement('div');
      const swatch = document.createElement('i');
      swatch.style.background = getColor(from + 1);
      row.append(swatch, to ? `${from}–${to}` : `${from}+`);
      div.append(row);
    });
    return div;
  }
}

const mount: Mount = async (el, ctx) => {
  const data = await statesData();
  const stage = createStage(el, ctx, { hint: 'Hover a state for its density, click one to zoom to it.', height: 500 });
  const map = stage.own(new LeafletMap(stage.box, { zoomControl: !stage.preview }).setView(US_CENTER, stage.preview ? 3 : 4));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { maxZoom: 19, attribution: LAND_ATTRIBUTION }).addTo(map);

  const info = new InfoControl();
  let geojson: GeoJSON;

  function highlightFeature(e: LeafletPointerEvent): void {
    const layer = e.target as Polygon;
    layer.setStyle({ weight: 5, color: '#666', dashArray: '', fillOpacity: 0.7 });
    layer.bringToFront();
    info.update((layer as unknown as { feature: Feature }).feature.properties as Props);
  }
  function resetHighlight(e: LeafletPointerEvent): void {
    geojson.resetStyle(e.target as Layer);
    info.update();
  }
  function zoomToFeature(e: LeafletPointerEvent): void {
    map.fitBounds((e.target as Polygon).getBounds());
  }
  geojson = new GeoJSON(data, {
    style,
    onEachFeature: (_feature, layer) => (layer as Polygon).on({ pointerover: highlightFeature, pointerout: resetHighlight, click: zoomToFeature }),
  }).addTo(map);
  info.addTo(map);
  stage.own(info);
  const legend = new LegendControl({ position: 'bottomright' }).addTo(map);
  stage.own(legend);
  stage.button('Back to the whole US', () => map.setView(US_CENTER, 4));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    let prev: Polygon | null = null;
    const hover = (name: string): void => {
      if (prev) g.out(prev.getElement());
      prev = stateLayer(geojson, name);
      g.over(prev.getBounds().getCenter(), prev.getElement());
    };
    stage.cycle(
      [
        { say: 'Hover Texas', run: () => hover('Texas'), hold: 1400 },
        { say: 'Hover New York', run: () => hover('New York'), hold: 1400 },
        { say: 'Click Montana to zoom', run: () => (hover('Montana'), g.click(prev!.getBounds().getCenter(), prev!.getElement())), hold: 2600 },
        { say: 'Zoom back out', run: () => (prev && g.out(prev.getElement()), g.hide(), map.setView(US_CENTER, 3)), hold: 1400 },
      ],
      200,
    );
  }
  return () => stage.dispose();
};

export default mount;
