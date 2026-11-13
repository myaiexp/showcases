// addProtocol serving raster tiles drawn on an OffscreenCanvas
import { Map, addProtocol, removeProtocol } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer, readout } from '../../shared/setup.ts';
import { palette } from '../../shared/basemap.ts';

// Each mount registers its own scheme (a counter suffix), so two copies never share a name.
let counter = 0;

type Style = 'debug' | 'pattern';

const mount: Mount = (el, { preview }) => {
  const PROTOCOL = `showcase-tiles-${++counter}`;
  let style: Style = 'debug';
  let served = 0;
  const info = preview ? null : readout(el, 'No tiles drawn yet');

  addProtocol(PROTOCOL, async (params) => {
    // params.url looks like "showcase-tiles://3/4/2"
    const [z = 0, x = 0, y = 0] = params.url.replace(`${PROTOCOL}://`, '').split('/').map(Number);
    const size = 256;
    const canvas = new OffscreenCanvas(size, size);
    const g = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
    const hue = (x * 47 + y * 83 + z * 29) % 360;
    g.fillStyle = `hsl(${hue} 45% 22%)`;
    g.fillRect(0, 0, size, size);
    if (style === 'debug') {
      g.strokeStyle = palette.accent;
      g.lineWidth = 3;
      g.strokeRect(1.5, 1.5, size - 3, size - 3);
      g.fillStyle = palette.text;
      g.font = 'bold 30px sans-serif';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(`${z}/${x}/${y}`, size / 2, size / 2);
    } else {
      // Concentric rings centred on the tile, so neighbouring tiles read as a lattice.
      g.strokeStyle = `hsl(${(hue + 40) % 360} 70% 60%)`;
      g.lineWidth = 6;
      for (let r = 16; r < size; r += 28) {
        g.beginPath();
        g.arc(size / 2, size / 2, r, 0, Math.PI * 2);
        g.stroke();
      }
    }
    served++;
    if (info) info.textContent = `${served} tiles drawn by the "${PROTOCOL}" protocol (last: ${z}/${x}/${y})`;
    // A decoded ImageBitmap is used as is, with no encode/decode round trip.
    return { data: await createImageBitmap(canvas) };
  });

  const map = new Map({
    container: mapContainer(el, preview),
    style: {
      version: 8,
      sources: {
        drawn: { type: 'raster', tiles: [`${PROTOCOL}://{z}/{x}/{y}`], tileSize: 256, maxzoom: 10 },
      },
      layers: [{ id: 'drawn', type: 'raster', source: 'drawn' }],
    },
    center: [10, 30],
    zoom: preview ? 1.8 : 2.5,
    interactive: !preview,
  });

  let frame = 0;
  if (preview) {
    const t0 = performance.now();
    const drift = (now: number): void => {
      const t = (now - t0) / 1000;
      map.jumpTo({ center: [10 + t * 3, 30 + Math.sin(t / 2) * 10], zoom: 1.8 + (Math.sin(t / 3) + 1) * 0.9 });
      frame = requestAnimationFrame(drift);
    };
    frame = requestAnimationFrame(drift);
  } else {
    const bar = controlBar(el);
    const toggle = button(bar, 'Switch to rings', () => {
      style = style === 'debug' ? 'pattern' : 'debug';
      toggle.textContent = style === 'debug' ? 'Switch to rings' : 'Switch to tile labels';
      // The handler reads `style` on each request, so reload the source to redraw its tiles.
      map.refreshTiles('drawn');
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
    removeProtocol(PROTOCOL);
  };
};

export default mount;
