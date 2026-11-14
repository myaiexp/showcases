// deck.pickObjects: every object whose pixels fall inside a screen rectangle
import { Deck } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { controlBar, readout, slider } from '../../shared/controls.ts';
import { pointCloud, type SamplePoint } from '../../shared/data.ts';
import { overlay } from '../../shared/guide-overlay.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

const DATA = pointCloud(300, { seed: 22, spread: 2.6 });

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 8, latitude: 47, zoom: ctx.preview ? 3.2 : 4.2 };
  const label = ctx.preview ? overlay(stage.box, '', 'bottom') : readout(el, 'Click to select the points in a box around the pointer');
  let width = 160;
  let height = 110;
  let picked = new Set<number>();

  const box = document.createElement('div');
  box.style.cssText = 'position:absolute;pointer-events:none;border:2px solid #7dd3fc;background:#7dd3fc22;display:none';
  stage.box.append(box);

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<SamplePoint>({
      id: 'points',
      data: DATA,
      getPosition: (d) => d.position,
      getFillColor: (_d, { index }) => (picked.has(index) ? [255, 190, 70] : [90, 150, 230, 190]),
      updateTriggers: { getFillColor: [picked.size, [...picked].slice(0, 6).join()] },
      getRadius: 4,
      radiusUnits: 'pixels',
      pickable: true,
    }),
  ];

  const run = (cx: number, cy: number): void => {
    const x = cx - width / 2;
    const y = cy - height / 2;
    Object.assign(box.style, { display: 'block', left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px` });
    // x, y is the top-left corner of the rectangle; one info per object inside it.
    const infos = deck.pickObjects({ x, y, width, height, layerIds: ['points'] });
    picked = new Set(infos.map((i) => i.index));
    label.textContent = `${picked.size} of ${DATA.length} points inside ${width} x ${height}px`;
    deck.setProps({ layers: layers() });
  };

  const deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    onClick: ({ x, y }) => run(x, y),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    width = 90;
    height = 70;
    let last = -1;
    stop = animate((t) => {
      const step = Math.floor(t / 0.7);
      if (step === last) return;
      last = step;
      const w = stage.box.clientWidth;
      const h = stage.box.clientHeight;
      run(w / 2 + Math.cos(step * 0.8) * w * 0.28, h / 2 + Math.sin(step * 0.8) * h * 0.22);
    });
  } else {
    const bar = controlBar(el);
    slider(bar, 'width', 40, 320, 10, width, (v) => (width = v));
    slider(bar, 'height', 40, 240, 10, height, (v) => (height = v));
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
