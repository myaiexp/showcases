// map.locate on a button, the tutorial's locationfound and locationerror handlers, and simulated results
import { Circle, LayerGroup, LeafletMap, LatLng, Marker, type ErrorEvent, type LocationEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const FIXED = new LatLng(51.5, -0.12);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Locate me asks your browser for permission and may fail on a desktop or an insecure page. The two Simulate buttons fire the same events with a fixed position (central London) or a refusal.',
  });
  const log = stage.log('Location events');
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 0], zoom: 2, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const found = new LayerGroup().addTo(map);
  const note = stage.preview ? ' (fired by hand: a card never calls locate())' : '';

  // The tutorial's handlers, with the alert replaced by the caption.
  map.on('locationfound', (e: LocationEvent) => {
    const radius = e.accuracy;
    found.clearLayers();
    new Marker(e.latlng).addTo(found).bindPopup(`You are within ${radius} meters from this point`, { autoPan: stage.preview, maxWidth: 140 }).openPopup();
    new Circle(e.latlng, { radius }).addTo(found);
    log(`locationfound: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)} ±${Math.round(radius)} m`);
    stage.say(`locationfound: within ${Math.round(radius)} m of ${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}${note}`, 'ok');
  });
  map.on('locationerror', (e: ErrorEvent) => {
    log(`locationerror (code ${e.code}): ${e.message}`);
    stage.say(`locationerror: ${e.message}${note}`, 'bad');
  });

  const simulateFound = (): void => {
    map.fire('locationfound', { latlng: FIXED, bounds: FIXED.toBounds(300), accuracy: 150, altitude: null, altitudeAccuracy: null, heading: null, speed: null, timestamp: Date.now() });
    map.flyTo(FIXED, 14, { duration: 0.6 });
  };
  const simulateError = (): void => {
    found.clearLayers();
    map.fire('locationerror', { code: 1, message: 'User denied Geolocation' });
  };

  if (!stage.preview) {
    let watching = false;
    stage.toggle('watch', false, (on) => (watching = on));
    stage.button('Locate me (map.locate)', () => {
      stage.say('Waiting for the browser…');
      map.locate({ setView: true, maxZoom: 16, watch: watching });
    });
    stage.button('stopLocate()', () => {
      map.stopLocate();
      log('stopLocate()');
    });
    stage.button('Simulate found', simulateFound);
    stage.button('Simulate refusal', simulateError);
    stage.say('Nothing has been requested yet.');
    stage.onDispose(() => map.stopLocate());
  } else {
    stage.cycle(
      [
        { say: 'A card never calls locate(): it fires locationfound by hand', run: () => (map.setView([20, 0], 2, { animate: false }), undefined), hold: 1400 },
        { run: simulateFound, hold: 3000 },
        { say: 'locationerror, fired by hand too', run: () => (map.setView([20, 0], 2, { animate: false }), simulateError()), hold: 2400 },
      ],
      1500,
    );
  }
  return () => stage.dispose();
};

export default mount;
