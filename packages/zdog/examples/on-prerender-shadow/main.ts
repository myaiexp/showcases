// onPrerender: a ground grid and soft shadow drawn before the bouncing ball
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';

const TILT = 0.5; // camera tilt, radians
const GROUND = 80; // y of the floor

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let showGrid = true;
  let showShadow = true;
  // ball position, read by onPrerender so the shadow can follow it
  let ballX = 0;
  let lift = 0;

  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    rotate: { x: -TILT },
    // runs before the model is drawn, with the canvas already centred and zoomed
    onPrerender(context) {
      const c = context as CanvasRenderingContext2D;
      const sin = Math.sin(TILT);
      const cos = Math.cos(TILT);
      // a pale floor, so a dark shadow reads against the dark page
      // (a point on the floor (x, GROUND, z) lands at screen y = GROUND cos + z sin)
      c.fillStyle = '#c9c3e6';
      c.fillRect(-144, GROUND * cos - 144 * sin, 288, 288 * sin);
      if (showGrid) {
        c.strokeStyle = '#a49dc9';
        c.lineWidth = 1.5;
        c.beginPath();
        for (let i = -4; i <= 4; i++) {
          c.moveTo(i * 36, GROUND * cos - 144 * sin);
          c.lineTo(i * 36, GROUND * cos + 144 * sin);
          c.moveTo(-144, GROUND * cos + i * 36 * sin);
          c.lineTo(144, GROUND * cos + i * 36 * sin);
        }
        c.stroke();
      }
      if (showShadow) {
        // the shadow shrinks and fades as the ball rises
        const k = 1 - Math.min(1, lift / 150);
        c.fillStyle = `rgba(0,0,0,${0.15 + 0.5 * k})`;
        c.beginPath();
        c.ellipse(ballX, GROUND * cos, 40 * (0.55 + 0.45 * k), 40 * (0.55 + 0.45 * k) * sin, 0, 0, Math.PI * 2);
        c.fill();
      }
    },
  });

  const ball = new Zdog.Shape({ addTo: illo, stroke: 70, color: '#E62' });
  new Zdog.Shape({ addTo: ball, translate: { x: -12, y: -14, z: 28 }, stroke: 12, color: '#FDB' });

  if (stage.bar) {
    checkbox(stage.bar, 'grid', true, (v) => (showGrid = v));
    checkbox(stage.bar, 'shadow', true, (v) => (showShadow = v));
  }

  stage.loop((_, t) => {
    ballX = Math.sin(t * 0.9) * 70;
    lift = Math.abs(Math.sin(t * 2.6)) * 120;
    ball.translate.x = ballX;
    ball.translate.y = GROUND - 35 - lift;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
