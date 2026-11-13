// A CanvasSource fed by an animated canvas (a radar sweep) over a quad
import { Map } from 'maplibre-gl';
import type { CanvasSource } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { button, controlBar, mapContainer } from '../../shared/setup.ts';
import { worldStyle, seeded } from '../../shared/basemap.ts';

const SIZE = 300;

const mount: Mount = (el, { preview }) => {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const g = canvas.getContext('2d') as CanvasRenderingContext2D;
  const rand = seeded(5);
  const blips = Array.from({ length: 14 }, () => {
    const a = rand() * Math.PI * 2;
    const r = 30 + rand() * 105;
    return { x: SIZE / 2 + Math.cos(a) * r, y: SIZE / 2 + Math.sin(a) * r, a };
  });

  let angle = 0;
  let frame = 0;
  // The canvas is redrawn on every animation frame; the map re-reads it while animate is true.
  const draw = (): void => {
    angle = (angle + 0.035) % (Math.PI * 2);
    g.clearRect(0, 0, SIZE, SIZE);
    g.fillStyle = 'rgba(8, 40, 24, 0.75)';
    g.beginPath();
    g.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 2, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = 'rgba(34, 197, 94, 0.6)';
    g.lineWidth = 1.5;
    for (let r = 37; r < SIZE / 2; r += 37.5) {
      g.beginPath();
      g.arc(SIZE / 2, SIZE / 2, r, 0, Math.PI * 2);
      g.stroke();
    }
    // The sweep: a fading wedge trailing behind the leading edge.
    for (let i = 0; i < 40; i++) {
      g.fillStyle = `rgba(34, 197, 94, ${0.5 * (1 - i / 40)})`;
      g.beginPath();
      g.moveTo(SIZE / 2, SIZE / 2);
      g.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 2, angle - (i + 1) * 0.03, angle - i * 0.03);
      g.fill();
    }
    for (const b of blips) {
      const behind = (angle - b.a + Math.PI * 4) % (Math.PI * 2);
      const glow = Math.max(0, 1 - behind / 3);
      g.fillStyle = `rgba(232, 163, 8, ${glow})`;
      g.beginPath();
      g.arc(b.x, b.y, 4, 0, Math.PI * 2);
      g.fill();
    }
    frame = requestAnimationFrame(draw);
  };
  frame = requestAnimationFrame(draw);

  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [10, 48],
    zoom: preview ? 2.2 : 3.2,
    interactive: !preview,
  });

  let source: CanvasSource | undefined;
  map.on('load', () => {
    map.addSource('radar', {
      type: 'canvas',
      canvas, // an HTMLCanvasElement, or the id of one in the document
      animate: true,
      coordinates: [
        [-6, 58],
        [26, 58],
        [26, 38],
        [-6, 38],
      ],
    });
    map.addLayer({ id: 'radar', type: 'raster', source: 'radar', paint: { 'raster-fade-duration': 0 } });
    source = map.getSource<CanvasSource>('radar') as CanvasSource;
  });

  if (!preview) {
    const bar = controlBar(el);
    const toggle = button(bar, 'Pause map updates', () => {
      // pause() freezes the map on a static copy of the canvas; the canvas itself keeps drawing.
      const paused = toggle.dataset.paused === '1';
      if (paused) source?.play();
      else source?.pause();
      toggle.dataset.paused = paused ? '0' : '1';
      toggle.textContent = paused ? 'Pause map updates' : 'Play map updates';
    });
  }

  return () => {
    cancelAnimationFrame(frame);
    map.remove();
  };
};

export default mount;
