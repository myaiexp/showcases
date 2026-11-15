// Panning inertia: how far a fast drag keeps gliding, with its deceleration, speed cap and easing
import { LeafletMap, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Flick the map and let go while moving. The orange line is the path of the centre; the options are read when you release.' });
  const log = stage.log('Events');
  const map = stage.own(
    new LeafletMap(stage.box, { center: [20, 0], zoom: 3, inertia: true, inertiaDeceleration: 3400, inertiaMaxSpeed: 1400, easeLinearity: 0.2, zoomControl: !stage.preview }),
  );
  new LocalTileLayer('https://tiles.example/terrain/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // The centre's path, from the start of a drag to the end of the glide.
  const trail = new Polyline([], { color: '#f58a3d', weight: 2 }).addTo(map);
  let released = 0;
  map.on('dragstart', () => trail.setLatLngs([map.getCenter()]));
  map.on('move', () => {
    if (map.dragging.moving() || released) trail.addLatLng(map.getCenter());
  });
  map.on('dragend', (e) => {
    released = performance.now();
    log(`dragend after ${Math.round(e.distance)} px of dragging`);
  });
  map.on('moveend', () => {
    if (released) log(`glided for ${Math.round(performance.now() - released)} ms`);
    released = 0;
  });

  stage.toggle('inertia', true, (on) => (map.options.inertia = on));
  stage.slider('inertiaDeceleration', 500, 8000, 250, 3400, (v) => (map.options.inertiaDeceleration = v));
  stage.slider('inertiaMaxSpeed', 200, 3000, 100, 1400, (v) => (map.options.inertiaMaxSpeed = v));
  stage.slider('easeLinearity', 0.05, 1, 0.05, 0.2, (v) => (map.options.easeLinearity = v));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    const reset = (): void => {
      map.setView([20, 0], 3, { animate: false });
      trail.setLatLngs([]);
    };
    stage.cycle(
      [
        { say: 'inertia: true, a quick flick keeps gliding', run: () => (reset(), (map.options.inertia = true), gesture.drag([20, -10], [-130, 20], 140)), hold: 2600 },
        { say: 'inertia: false, the map stops where it is released', run: () => (reset(), (map.options.inertia = false), gesture.drag([20, -10], [-130, 20], 140)), hold: 2400 },
        { say: 'inertiaDeceleration: 800, it glides much further', run: () => (reset(), (map.options.inertia = true), (map.options.inertiaDeceleration = 800), gesture.drag([20, -10], [-130, 20], 140)), hold: 3000 },
        { run: () => (map.options.inertiaDeceleration = 3400), hold: 100 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
