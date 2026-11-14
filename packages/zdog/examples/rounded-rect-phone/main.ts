// Rounded phone: RoundedRect for the body, screen and app icons, with a cornerRadius slider
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const ICONS = ['#E62', '#EA0', '#C25', '#a35ac9', '#ED0', '#5ad', '#6c6', '#FDB', '#E62'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the phone.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.3,
    rotate: { y: -0.5 },
    dragRotate: true,
  });
  const phone = new Zdog.Anchor({ addTo: illo });

  const body = new Zdog.RoundedRect({
    addTo: phone, width: 76, height: 150, cornerRadius: 14, stroke: 8, fill: true, color: '#EA0',
  });
  const back = body.copy({ translate: { z: -6 }, color: '#b87b00' });
  const screen = new Zdog.RoundedRect({
    addTo: phone, width: 66, height: 132, cornerRadius: 10, stroke: 2, fill: true,
    color: '#1b1b34', translate: { z: 5 },
  });
  const notch = new Zdog.RoundedRect({
    addTo: phone, width: 22, height: 6, cornerRadius: 3, stroke: 1, fill: true,
    color: '#000', translate: { y: -58, z: 7 },
  });
  // a 3 x 3 grid of app icons
  const icons = ICONS.map((color, i) =>
    new Zdog.RoundedRect({
      addTo: phone, width: 16, height: 16, cornerRadius: 5, stroke: 2, fill: true, color,
      translate: { x: ((i % 3) - 1) * 21, y: -26 + Math.floor(i / 3) * 21, z: 7 },
    }));
  // dock
  const dock = new Zdog.RoundedRect({
    addTo: phone, width: 58, height: 18, cornerRadius: 8, stroke: 2, fill: true, color: '#3a3a66',
    translate: { y: 52, z: 7 },
  });

  const setRadius = (r: number): void => {
    body.cornerRadius = r;
    back.cornerRadius = r;
    screen.cornerRadius = Math.max(0, r - 4);
    for (const ic of icons) ic.cornerRadius = r * 0.35;
    dock.cornerRadius = r * 0.55;
    notch.cornerRadius = Math.min(3, r);
    for (const s of [body, back, screen, notch, dock, ...icons]) s.updatePath();
  };
  setRadius(14);

  if (stage.bar) slider(stage.bar, 'cornerRadius', 0, 38, 1, 14, setRadius);

  stage.loop((_dt, t) => {
    if (stage.preview) {
      setRadius(2 + (Math.sin(t * 1.1) * 0.5 + 0.5) * 34);
      illo.rotate.y = -0.5 + Math.sin(t * 0.8) * 0.6;
    }
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
