// Point scaleBy and unscaleBy: pixels to tile coordinates and back, as the tile layers do
import { Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { animate, BLUE, createPlane, DIM, GREEN, ORANGE, orbit, YELLOW } from '../../shared/plane.ts';

const VIEW = [-20, -20, 1064, 808] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A pixel point divided by the tile size (unscaleBy) and floored is its tile; the tile multiplied by the tile size (scaleBy) is that tile\'s top-left pixel.' });
  const plane = createPlane(stage, VIEW);

  let tile = new Point(256, 256);
  let pixel = new Point(530, 300);
  const draw = (): void => {
    plane.clear();
    const d = plane.live;
    for (let x = 0; x <= 1024; x += tile.x) d.line({ x, y: 0 }, { x, y: 768 }, { stroke: DIM, width: 1 });
    for (let y = 0; y <= 768; y += tile.y) d.line({ x: 0, y }, { x: 1024, y }, { stroke: DIM, width: 1 });
    const coords = pixel.unscaleBy(tile).floor();
    const corner = coords.scaleBy(tile);
    d.rect(corner, corner.add(tile), { stroke: ORANGE, fill: ORANGE, opacity: 0.35, width: 2 });
    d.dot(pixel, { fill: YELLOW, r: 8 });
    d.dot(corner, { fill: GREEN, r: 8 });
    d.text({ x: pixel.x + 14, y: pixel.y - 10 }, `pixel ${pixel.round().toString()}`, { fill: YELLOW, size: 26 });
    d.text({ x: corner.x + 10, y: corner.y + 34 }, `tile ${coords.toString()} starts at ${corner.toString()}`, { fill: BLUE, size: 26 });
    stage.say(`${pixel.round().toString()}.unscaleBy(${tile.toString()}).floor() = ${coords.toString()}; scaleBy back = ${corner.toString()}`);
  };
  stage.select('Tile size', [{ value: '256', label: '256 × 256' }, { value: '128', label: '128 × 128' }, { value: 'wide', label: '256 × 128' }], '256', (v) => {
    tile = v === '256' ? new Point(256, 256) : v === '128' ? new Point(128, 128) : new Point(256, 128);
    draw();
  });
  stage.slider('pixel x', 0, 1023, 1, pixel.x, (v) => { pixel = new Point(v, pixel.y); draw(); });
  stage.slider('pixel y', 0, 767, 1, pixel.y, (v) => { pixel = new Point(pixel.x, v); draw(); });
  draw();

  if (stage.preview) {
    animate(stage, (t) => {
      const o = orbit(512, 384, 440, 330, t * 0.5);
      pixel = new Point(o.x, o.y);
      draw();
    });
  }
  return () => stage.dispose();
};

export default mount;
