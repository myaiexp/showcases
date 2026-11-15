// The Quick Start Guide's map: a tile layer, a marker, a circle, a polygon, popups and a click handler
import { Circle, LeafletMap, Marker, Polygon, Popup, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the shapes for their popups, or anywhere on the map for its coordinates.' });

  // Set up the map and its view: the centre of London at zoom 13.
  const map = stage.own(new LeafletMap(stage.box).setView([51.505, -0.09], 13));

  // A tile layer from a URL template. The tiles.example server paints them in the page.
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: LAND_ATTRIBUTION,
  }).addTo(map);

  // A marker, a circle (radius in meters) and a polygon.
  const marker = new Marker([51.5, -0.09]).addTo(map);
  const circle = new Circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
  const polygon = new Polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
  ]).addTo(map);

  // Popups bound to each; openPopup() opens the marker's one straight away.
  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  circle.bindPopup('I am a circle.');
  polygon.bindPopup('I am a polygon.');

  // One popup reused for every click on the map, opened with openOn() so it closes the last one.
  const popup = new Popup();
  map.on('click', (e: LeafletPointerEvent) => {
    popup.setLatLng(e.latlng).setContent(`You clicked the map at ${e.latlng.toString()}`).openOn(map);
  });

  if (stage.preview) {
    // Cards get no pointer: a ghost pointer clicks the shapes and the map in turn.
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { run: () => g.click([51.508, -0.11], circle.getElement()) },
        { run: () => g.click([51.507, -0.063], polygon.getElement()) },
        { run: () => g.click([51.495, -0.12]) },
        { run: () => marker.openPopup() },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
