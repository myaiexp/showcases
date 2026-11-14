// Dragger: spin a desk globe on its stand with a bare Dragger, the stand stays put
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the globe: the ring and base stay still, and the highlight shows the drag.' });

  // the Illustration has no dragRotate: it only draws
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom, rotate: { x: -0.3 } });

  // static stand: a meridian ring and a base
  new Zdog.Ellipse({ addTo: illo, diameter: 170, stroke: 5, color: '#EA0' });
  new Zdog.Cylinder({
    addTo: illo, diameter: 90, length: 14, translate: { y: 92 }, rotate: { x: TAU / 4 },
    stroke: false, color: '#EA0', frontFace: '#FDB', backface: '#C25',
  });

  // the globe: what the Dragger turns
  const globe = new Zdog.Anchor({ addTo: illo });
  new Zdog.Shape({ addTo: globe, stroke: 130, color: '#2b6cb0' });
  const equator = new Zdog.Ellipse({
    addTo: globe, diameter: 130, rotate: { x: TAU / 4 }, stroke: 3, color: '#EA0',
  });
  // land patches sit on the sphere at latitude / longitude
  const land: [number, number][] = [[40, 20], [10, 60], [-20, 10], [-50, 80], [60, 150], [0, 200], [-30, 260], [35, 300]];
  for (const [lat, lon] of land) {
    const la = (lat * TAU) / 360;
    const lo = (lon * TAU) / 360;
    new Zdog.Shape({
      addTo: globe,
      translate: { x: 58 * Math.cos(la) * Math.sin(lo), y: -58 * Math.sin(la), z: 58 * Math.cos(la) * Math.cos(lo) },
      stroke: 24, color: '#5cb85c',
    });
  }
  const pin = new Zdog.Shape({ addTo: globe, translate: { y: -66 }, stroke: 12, color: '#C25' });

  // ----- drag: viewRotation is separate from the Illustration's own rotate ----- //
  const viewRotation = new Zdog.Vector({ y: -0.6 });
  let dragStartRX = 0;
  let dragStartRY = 0;
  let dragging = false;
  const highlight = (on: boolean): void => {
    equator.color = on ? '#fff' : '#EA0';
    pin.color = on ? '#ED0' : '#C25';
  };
  new Zdog.Dragger({
    startElement: stage.element,
    onDragStart: () => {
      dragging = true;
      highlight(true);
      dragStartRX = viewRotation.x;
      dragStartRY = viewRotation.y;
    },
    onDragMove: (_pointer, moveX, moveY) => {
      viewRotation.x = dragStartRX - (moveY / stage.width) * TAU;
      viewRotation.y = dragStartRY - (moveX / stage.width) * TAU;
    },
    onDragEnd: () => {
      dragging = false;
      highlight(false);
    },
  });

  // a card has no pointer: it spins the globe and flashes the highlight itself
  if (stage.preview) stage.every(1600, () => highlight(equator.color === '#EA0'));

  stage.loop((dt) => {
    if (stage.preview && !dragging) viewRotation.y += dt * 0.9;
    globe.rotate.set(viewRotation);
    illo.updateRenderGraph();
  });

  return stage.dispose;
};

export default mount;
