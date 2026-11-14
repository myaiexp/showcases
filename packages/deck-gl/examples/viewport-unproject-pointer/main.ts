// viewport.unproject(): pixels back to longitude and latitude, on the ground or at a chosen height
import { Deck, WebMercatorViewport } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

type Pt = [number, number, number];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3.4 : 4.2, pitch: 50, bearing: 15 };
  let targetZ = 0;
  let hit: Pt | null = null;
  const info = ctx.preview ? null : readout(el, 'Move the pointer over the map.');

  // A crosshair in the DOM at the pointer; the dot is drawn by deck at the unprojected position.
  const cross = document.createElement('div');
  cross.style.cssText = 'position:absolute;left:0;top:0;width:14px;height:14px;margin:-7px 0 0 -7px;border:2px solid #fff;border-radius:50%;pointer-events:none;display:none;';
  stage.box.append(cross);

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<Pt>({
      id: 'hit',
      data: hit ? [hit] : [],
      getPosition: (d) => d,
      getRadius: 10,
      radiusUnits: 'pixels',
      getFillColor: [255, 90, 90],
      parameters: { depthCompare: 'always' },
    }),
  ];
  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: layers() });

  const probe = (x: number, y: number): void => {
    const viewport = deck.getViewports()[0];
    if (!(viewport instanceof WebMercatorViewport)) return;
    cross.style.display = '';
    cross.style.transform = `translate(${x}px, ${y}px)`;
    // Without a z in the pixels, targetZ is the elevation of the plane that is hit.
    const [lng, lat, z] = viewport.unproject([x, y], { targetZ }) as Pt;
    hit = [lng, lat, z];
    deck.setProps({ layers: layers() });
    if (info) info.textContent = `[${x.toFixed(0)}, ${y.toFixed(0)}] px  ->  lng ${lng.toFixed(3)}  lat ${lat.toFixed(3)}  z ${z}`;
  };

  let stop = (): void => {};
  let move: ((e: PointerEvent) => void) | null = null;
  if (ctx.preview) {
    stop = animate((t) => {
      const w = stage.box.clientWidth;
      const h = stage.box.clientHeight;
      probe(w / 2 + Math.cos(t * 1.1) * w * 0.3, h / 2 + Math.sin(t * 1.1) * h * 0.25);
    });
  } else {
    move = (e: PointerEvent): void => {
      const r = stage.box.getBoundingClientRect();
      probe(e.clientX - r.left, e.clientY - r.top);
    };
    stage.box.addEventListener('pointermove', move);
    slider(controlBar(el), 'targetZ (m)', 0, 20000, 500, 0, (v) => { targetZ = v; });
  }
  return () => {
    stop();
    if (move) stage.box.removeEventListener('pointermove', move);
    cross.remove();
    stage.release(deck);
  };
};

export default mount;
