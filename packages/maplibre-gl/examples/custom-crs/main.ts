// addProjection registers a planar metre CRS; image and markers sit on it
import { Map, Marker, Popup, addProjection, removeProjection } from 'maplibre-gl';
import type { CRS } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { PLAN_ROOMS, PLAN_SIZE, drawPlan } from './plan.ts';

// The plan is 100 m by 60 m. The converter maps one degree to 10 m, so the plan spans
// lng -5..5 and lat -3..3, and the tile grid is 1800 m wide, centred on the origin.
const METRES_PER_DEGREE = 10;
const HALF = 5;
let counter = 0;

const mount: Mount = (el, { preview }) => {
  // Registering the same name twice throws, so each mount gets its own CRS name.
  const name = `custom:floor-plan-${++counter}`;
  const crs: CRS = {
    name,
    projection: {
      forward: ([lng = 0, lat = 0]) => [lng * METRES_PER_DEGREE, lat * METRES_PER_DEGREE],
      inverse: ([x = 0, y = 0]) => [x / METRES_PER_DEGREE, y / METRES_PER_DEGREE],
    },
    tileMatrixSet: { origin: [-900, 900], extentAtZoom0: 1800 },
  };
  addProjection(crs);

  let map: Map;
  try {
    map = new Map({
      container: mapContainer(el, preview),
      style: {
        version: 8,
        // Register first and name the CRS in the style: switching later is not supported.
        projection: { type: name },
        sources: {
          plan: {
            type: 'image',
            url: drawPlan(),
            coordinates: [[-HALF, 3], [HALF, 3], [HALF, -3], [-HALF, -3]],
          },
        },
        layers: [
          { id: 'bg', type: 'background', paint: { 'background-color': '#1b2433' } },
          { id: 'plan', type: 'raster', source: 'plan' },
        ],
      },
      center: [0, 0],
      zoom: preview ? 3.6 : 3.9,
      interactive: !preview,
    });
  } catch (err) {
    // The Map constructor failed, so nothing else would unregister the CRS.
    removeProjection(name);
    throw err;
  }

  // Markers take lng/lat as usual: the plan pixel (px, py) is lng -5 + px/100, lat 3 - py/100.
  const toLngLat = (px: number, py: number): [number, number] => [
    -HALF + (px / PLAN_SIZE.width) * 2 * HALF,
    3 - (py / PLAN_SIZE.height) * 6,
  ];
  for (const room of PLAN_ROOMS) {
    const marker = new Marker({ color: '#e8a308' }).setLngLat(toLngLat(room.x + room.w / 2, room.y + room.h / 2));
    if (!preview) marker.setPopup(new Popup().setText(`${room.name}: ${room.w / 10} m by ${room.h / 10} m`));
    marker.addTo(map);
  }

  let frame = 0;
  const off: Array<() => void> = [];
  if (preview) {
    map.once('load', () => {
      const sway = (now: number): void => {
        map.jumpTo({ bearing: 25 * Math.sin(now / 2500), zoom: 3.6 + 0.2 * Math.sin(now / 1800) });
        frame = requestAnimationFrame(sway);
      };
      frame = requestAnimationFrame(sway);
    });
  } else {
    const info = readout(el, `${name}: move the pointer over the plan`);
    const onMove = (e: { lngLat: { lng: number; lat: number } }): void => {
      const [x = 0, y = 0] = crs.projection.forward([e.lngLat.lng, e.lngLat.lat]);
      info.textContent = `lng/lat ${e.lngLat.lng.toFixed(3)}, ${e.lngLat.lat.toFixed(3)} | plan ${x.toFixed(1)} m, ${y.toFixed(1)} m`;
    };
    map.on('mousemove', onMove);
    off.push(() => map.off('mousemove', onMove));
  }

  return () => {
    cancelAnimationFrame(frame);
    off.forEach((f) => f());
    map.remove();
    removeProjection(name);
  };
};

export default mount;
