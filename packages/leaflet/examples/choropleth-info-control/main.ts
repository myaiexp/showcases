// A custom Control subclass that shows the hovered state's name and density
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

// In Leaflet 2 a control is a class: onAdd returns the element, update changes its text.
class InfoControl extends Control {
  private _div?: HTMLElement;

  override onAdd(_map: LeafletMap): HTMLElement {
    this._div = DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  }

  // method that we will use to update the control based on feature properties passed
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

const mount: Mount = async (el, ctx) => {
  const data = await statesData();
  const stage = createStage(el, ctx, { hint: 'Hover a state: the control in the top right shows its properties.' });
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
  geojson = new GeoJSON(data, {
    style,
    onEachFeature: (_feature, layer) => (layer as Polygon).on({ pointerover: highlightFeature, pointerout: resetHighlight }),
  }).addTo(map);
  info.addTo(map);
  stage.own(info);
  stage.say('pointerover calls info.update(feature.properties); pointerout calls info.update()');

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const names = ['Texas', 'New York', 'Montana', 'Ohio'];
    let prev: Polygon | null = null;
    let i = 0;
    stage.every(1400, () => {
      if (prev) g.out(prev.getElement());
      const layer = stateLayer(geojson, names[i++ % names.length]!);
      g.over(layer.getBounds().getCenter(), layer.getElement());
      prev = layer;
    });
  }
  return () => stage.dispose();
};

export default mount;
