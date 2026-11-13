// A live log of map events and their key fields; repeats fold into a count
import { Map } from 'maplibre-gl';
import type { MapEventType } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer } from '../../shared/setup.ts';
import { cities, worldStyle } from '../../shared/basemap.ts';

const EVENTS = [
  'load', 'idle', 'movestart', 'move', 'moveend', 'zoomstart', 'zoom', 'zoomend',
  'rotatestart', 'rotate', 'rotateend', 'pitchstart', 'pitch', 'pitchend',
  'dragstart', 'dragend', 'click', 'dblclick', 'contextmenu', 'wheel',
  'data', 'sourcedata', 'styledata',
] as const satisfies readonly (keyof MapEventType)[];

type AnyEvent = { type: string; lngLat?: { lng: number; lat: number }; point?: { x: number; y: number }; sourceId?: string; isSourceLoaded?: boolean; dataType?: string };

/** The few fields worth showing for an event. */
function detail(map: Map, e: AnyEvent): string {
  if (e.lngLat && e.point) {
    return `lngLat ${e.lngLat.lng.toFixed(2)}, ${e.lngLat.lat.toFixed(2)}  point ${Math.round(e.point.x)}, ${Math.round(e.point.y)}`;
  }
  if (e.type.includes('data')) {
    return `${e.dataType ?? ''} ${e.sourceId ?? ''}${e.isSourceLoaded === undefined ? '' : ` loaded=${e.isSourceLoaded}`}`.trim();
  }
  if (e.type.startsWith('zoom')) return `zoom ${map.getZoom().toFixed(2)}`;
  if (e.type.startsWith('rotate')) return `bearing ${map.getBearing().toFixed(1)}`;
  if (e.type.startsWith('pitch')) return `pitch ${map.getPitch().toFixed(1)}`;
  if (e.type.startsWith('move') || e.type.startsWith('drag')) {
    const c = map.getCenter();
    return `center ${c.lng.toFixed(2)}, ${c.lat.toFixed(2)}`;
  }
  return '';
}

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 40],
    zoom: preview ? 1 : 1.6,
    interactive: !preview,
  });

  const maxLines = preview ? 7 : 40;
  const log = document.createElement('div');
  log.style.fontFamily = 'var(--font-mono, monospace)';
  log.style.fontSize = preview ? '10px' : '12px';
  log.style.lineHeight = '1.35';
  log.style.overflow = 'hidden';
  log.style.whiteSpace = 'nowrap';
  if (preview) {
    Object.assign(log.style, { position: 'absolute', left: '0', right: '0', bottom: '0', padding: '4px 6px', background: '#0a1320d9', color: '#fafafa', pointerEvents: 'none' });
    map.getContainer().append(log);
  } else {
    Object.assign(log.style, { marginTop: '12px', height: '190px', overflowY: 'auto', color: 'var(--fg-2)', textAlign: 'left' });
    el.append(log);
  }

  let lastType = '';
  let repeats = 1;
  let lastLine: HTMLDivElement | undefined;
  const push = (type: string, text: string): void => {
    if (lastLine && type === lastType) {
      repeats++;
      lastLine.textContent = `${type} x${repeats}  ${text}`;
      return;
    }
    lastType = type;
    repeats = 1;
    lastLine = document.createElement('div');
    lastLine.textContent = `${type}  ${text}`;
    log.append(lastLine);
    while (log.childElementCount > maxLines) log.firstElementChild?.remove();
    log.scrollTop = log.scrollHeight;
  };

  // One listener per event name; each logs the event type plus the fields that event carries.
  for (const name of EVENTS) {
    map.on(name, (e) => push(name, detail(map, e as unknown as AnyEvent)));
  }

  let timer = 0;
  if (preview) {
    // Drive the camera through different kinds of movement so every row type appears.
    const stops = [cities.tokyo, cities.london, cities.saoPaulo, cities.cairo];
    let i = 0;
    map.once('load', () => {
      timer = window.setInterval(() => {
        const to = stops[i % stops.length] as [number, number];
        map.easeTo({
          center: to,
          zoom: 1 + (i % 3),
          bearing: (i % 2) * 40,
          pitch: (i % 2) * 30,
          duration: 1800,
        });
        i++;
      }, 2600);
    });
  } else {
    const bar = controlBar(el);
    button(bar, 'Fly to Tokyo', () => map.flyTo({ center: cities.tokyo, zoom: 4 }));
    button(bar, 'Rotate + tilt', () => map.easeTo({ bearing: 60, pitch: 45, duration: 1500 }));
    button(bar, 'Clear log', () => {
      log.replaceChildren();
      lastLine = undefined;
      lastType = '';
    });
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
