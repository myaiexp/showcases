// MapLibreOverlay modes: switching interleaved rebuilds the overlay
import { MapLibreOverlay } from '@deck.gl/maplibre';
import { ArcLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, select } from '../../shared/controls.ts';
import { createMap, detachOverlay, mapBox, releaseMap, whenLoaded } from '../../shared/base-maps.ts';
import { city } from '../../shared/data.ts';
import { animate } from '../../shared/stage.ts';

const MODES = ['overlaid', 'interleaved'] as const;
type Mode = (typeof MODES)[number];

const HUBS = ['London', 'Cairo', 'Mumbai', 'Tokyo', 'New York', 'Lagos'].map(city);

const mount: Mount = (el, { preview }) => {
  const box = mapBox(el, preview);
  const view = { center: [20, 30] as [number, number], zoom: preview ? 1.0 : 2.3, pitch: 30, bearing: 0 };
  const map = createMap(box, view, preview);
  const info = preview ? null : readout(el);
  let overlay: MapLibreOverlay | null = null;
  let mode: Mode = 'overlaid';
  let loaded = false;
  let wasInterleaved = false;

  const attach = (): void => {
    if (overlay) detachOverlay(overlay, wasInterleaved);
    overlay = new MapLibreOverlay({
      interleaved: mode === 'interleaved',
      layers: [
        new ArcLayer({
          id: 'hub-arcs',
          data: HUBS.flatMap((a, i) => HUBS.slice(i + 1).map((b) => ({ from: a.coordinates, to: b.coordinates }))),
          getSourcePosition: (d) => d.from,
          getTargetPosition: (d) => d.to,
          getSourceColor: [255, 170, 80],
          getTargetColor: [90, 200, 255],
          getWidth: 2,
        }),
      ],
    });
    wasInterleaved = mode === 'interleaved';
    map.addControl(overlay);
    if (info) {
      // getCanvas: the map's own canvas when interleaved, Deck's separate canvas otherwise.
      const shared = overlay.getCanvas() === map.getCanvas();
      info.textContent = `${mode}: ${box.querySelectorAll('canvas').length} canvas element(s); overlay canvas is the map canvas: ${shared}`;
    }
  };

  whenLoaded(map, () => {
    loaded = true;
    attach();
  });

  let timer = 0;
  if (preview) {
    // Cards flip between the two modes; they look the same, the canvas count differs.
    timer = window.setInterval(() => {
      mode = mode === 'overlaid' ? 'interleaved' : 'overlaid';
      if (loaded) attach();
    }, 2500);
  } else {
    select(controlBar(el), 'mode', MODES, (v) => {
      mode = v;
      if (loaded) attach();
    }, mode);
  }

  const stop = preview ? animate((t) => map.jumpTo({ bearing: Math.sin(t / 3) * 30 })) : () => {};
  return () => {
    window.clearInterval(timer);
    stop();
    releaseMap(map, box, overlay);
  };
};

export default mount;
