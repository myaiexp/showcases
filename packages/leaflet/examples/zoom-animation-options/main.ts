// Animation options: zoomAnimation, fadeAnimation, markerZoomAnimation and zoomAnimationThreshold
import { LeafletMap, Marker, type MapOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const CENTER: [number, number] = [48.857, 2.352];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Zoom with the buttons. zoomAnimation, fadeAnimation and markerZoomAnimation are read when the map is made, so a toggle builds a new map.',
  });
  let zoomAnimation = true;
  let fadeAnimation = true;
  let markerZoomAnimation = true;
  let threshold = 4;
  let map!: LeafletMap;

  const build = (): void => {
    map?.remove();
    const options: Partial<MapOptions> = {
      center: CENTER,
      zoom: 5,
      zoomAnimation,
      fadeAnimation,
      markerZoomAnimation,
      zoomAnimationThreshold: threshold,
      zoomControl: false,
    };
    map = new LeafletMap(stage.box, options);
    new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
    for (const at of [CENTER, [47.2, 3.5], [50.1, 0.9], [49.2, 4.9]] as [number, number][]) new Marker(at).addTo(map);
    stage.say(`zoomAnimation: ${zoomAnimation}, fadeAnimation: ${fadeAnimation}, markerZoomAnimation: ${markerZoomAnimation}`);
  };
  build();
  stage.own({ remove: () => map.remove() });

  const zoom = (by: number): void => {
    stage.say(`map.setZoom(${map.getZoom() + by}), threshold ${map.options.zoomAnimationThreshold}`);
    map.setZoom(map.getZoom() + by);
  };
  stage.toggle('zoomAnimation', zoomAnimation, (on) => ((zoomAnimation = on), build()));
  stage.toggle('fadeAnimation', fadeAnimation, (on) => ((fadeAnimation = on), build()));
  stage.toggle('markerZoomAnimation', markerZoomAnimation, (on) => ((markerZoomAnimation = on), build()));
  // The threshold is read at each zoom, so it needs no new map.
  stage.slider('zoomAnimationThreshold', 0, 8, 1, threshold, (v) => {
    threshold = v;
    map.options.zoomAnimationThreshold = v;
  });
  stage.button('Zoom in 1', () => zoom(1));
  stage.button('Zoom out 1', () => zoom(-1));
  stage.button('Zoom in 5', () => zoom(5));
  stage.button('Zoom out 5', () => zoom(-5));

  if (stage.preview) {
    const variant = (z: boolean, m: boolean, label: string) => ({
      say: label,
      run: () => {
        zoomAnimation = z;
        markerZoomAnimation = m;
        build();
        map.setZoom(7);
      },
      hold: 1800,
    });
    stage.cycle([
      variant(true, true, 'Defaults: tiles and markers animate'),
      { run: () => map.setZoom(5), hold: 1500 },
      variant(true, false, 'markerZoomAnimation: false, markers vanish while zooming'),
      variant(false, true, 'zoomAnimation: false, the zoom jumps'),
    ]);
  }
  return () => stage.dispose();
};

export default mount;
