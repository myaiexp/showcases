// Canvas without Illustration: your own 2D canvas drawing, a Zdog balloon rendered into it
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the balloon.' });

  // ----- setup: the canvas is ours to manage ----- //
  const canvas = stage.element;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = stage.width * ratio; // crisp on high-density screens
  canvas.height = stage.height * ratio;
  canvas.style.width = `${stage.width}px`;
  canvas.style.height = `${stage.height}px`;
  const c2d = canvas.getContext('2d')!;
  const zoom = stage.zoom;
  let isSpinning = true;

  // a scene Anchor holds every item instead of an Illustration
  const scene = new Zdog.Anchor();

  // ----- model: a hot-air balloon ----- //
  const balloon = new Zdog.Anchor({ addTo: scene, translate: { y: -20 } });
  new Zdog.Shape({ addTo: balloon, stroke: 110, color: '#E62' }); // envelope
  new Zdog.Ellipse({ addTo: balloon, diameter: 100, rotate: { x: TAU / 4 }, stroke: 12, color: '#EA0' });
  new Zdog.Ellipse({ addTo: balloon, diameter: 100, stroke: 12, color: '#C25' });
  const basket = new Zdog.Box({
    addTo: balloon, width: 30, height: 22, depth: 30, translate: { y: 92 },
    stroke: 2, color: '#8a5a2b', topFace: '#5c3a1a',
  });
  for (const x of [-13, 13]) {
    for (const z of [-13, 13]) {
      new Zdog.Shape({ addTo: basket, path: [{ x, y: -11, z }, { x: x * 2, y: -44, z: z * 2 }], stroke: 1.5, color: '#3a3f4b' });
    }
  }

  // ----- render: plain canvas 2D calls around renderGraphCanvas ----- //
  const render = (t: number): void => {
    const w = stage.width;
    const h = stage.height;
    c2d.setTransform(ratio, 0, 0, ratio, 0, 0);
    // a sky and hills drawn with the ordinary canvas API
    const sky = c2d.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#2b4c7e');
    sky.addColorStop(1, '#f2a65a');
    c2d.fillStyle = sky;
    c2d.fillRect(0, 0, w, h);
    c2d.fillStyle = '#2f5d3a';
    c2d.beginPath();
    c2d.moveTo(0, h);
    for (let x = 0; x <= w; x += 10) c2d.lineTo(x, h * 0.86 + Math.sin(x / 40 + t * 0.2) * 8);
    c2d.lineTo(w, h);
    c2d.fill();

    c2d.save();
    // centre the canvas and zoom
    c2d.translate(w / 2, h / 2);
    c2d.scale(zoom, zoom);
    // round line joins and caps, as Illustration would set
    c2d.lineJoin = 'round';
    c2d.lineCap = 'round';
    scene.renderGraphCanvas(c2d);
    c2d.restore();
  };

  stage.loop((_, t) => {
    balloon.translate.y = -20 + Math.sin(t * 1.3) * 10; // bobbing
    scene.rotate.y += isSpinning ? 0.015 : 0;
    scene.updateGraph();
    render(t);
  });

  // ----- drag: a Dragger replaces Illustration's dragRotate ----- //
  let dragStartRX = 0;
  let dragStartRY = 0;
  const minSize = Math.min(stage.width, stage.height);
  new Zdog.Dragger({
    startElement: canvas,
    onDragStart: () => {
      isSpinning = false;
      dragStartRX = scene.rotate.x;
      dragStartRY = scene.rotate.y;
    },
    onDragMove: (_pointer, moveX, moveY) => {
      scene.rotate.x = dragStartRX - (moveY / minSize) * TAU;
      scene.rotate.y = dragStartRY - (moveX / minSize) * TAU;
    },
  });

  return stage.dispose;
};

export default mount;
