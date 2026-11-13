// Spinning, draggable Zdog box with an auto-rotate toggle
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  const canvas = document.createElement('canvas');
  canvas.width = 760;
  canvas.height = 600;
  canvas.className = 'canvas';

  const toggle = document.createElement('label');
  toggle.className = 'toggle';
  const spin = document.createElement('input');
  spin.type = 'checkbox';
  spin.checked = true;
  toggle.append(spin, ' auto-rotate (drag to orbit)');
  el.append(canvas);
  if (!preview) el.append(toggle);

  const illo = new Zdog.Illustration({ element: canvas, dragRotate: true, zoom: 4 });
  illo.rotate.x = -0.5;

  new Zdog.Box({
    addTo: illo,
    width: 90,
    height: 90,
    depth: 90,
    stroke: false,
    frontFace: '#e5484d',
    rearFace: '#6c8cff',
    leftFace: '#8c6cff',
    rightFace: '#19b8c4',
    topFace: '#30a46c',
    bottomFace: '#f5a623',
  });

  let frame = 0;
  const animate = (): void => {
    if (spin.checked) illo.rotate.y += 0.03;
    illo.updateRenderGraph();
    frame = requestAnimationFrame(animate);
  };
  animate();

  return () => cancelAnimationFrame(frame);
};

export default mount;
