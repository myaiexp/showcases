// Vector rotate: a sunflower whose petals and seeds come from rotating a Vector
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const GOLDEN = TAU * (1 - 1 / 1.618034); // the golden angle, about 137.5 degrees

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom * 0.8, rotate: { x: -0.15 } });

  // stem and leaf stay put
  new Zdog.Shape({ addTo: illo, path: [{ y: 20 }, { y: 120 }], stroke: 8, color: '#2a8a4a' });
  new Zdog.Ellipse({ addTo: illo, width: 50, height: 22, translate: { x: 28, y: 90 }, rotate: { z: -0.5 }, stroke: 5, fill: true, color: '#35a85a' });

  let petals = 18;
  let seeds = 160;
  let head: Zdog.Group | null = null;
  const build = (): void => {
    head?.remove();
    // a Group keeps petals under the face and seeds on top, whatever the angle
    head = new Zdog.Group({ addTo: illo, translate: { y: -30 } });
    const out = new Zdog.Vector({ y: -78 }); // one vector pointing up...
    for (let i = 0; i < petals; i++) {
      // ...copied, then turned a share of a full turn per petal
      const spot = out.copy().rotate({ z: (i * TAU) / petals });
      new Zdog.Ellipse({
        addTo: head, width: Math.min(30, 420 / petals), height: 52, translate: { x: spot.x, y: spot.y },
        rotate: { z: (i * TAU) / petals }, stroke: 4, fill: true, color: i % 2 ? '#ED0' : '#EA0',
      });
    }
    new Zdog.Ellipse({ addTo: head, diameter: 104, stroke: 6, fill: true, color: '#5b2a10' });
    for (let i = 0; i < seeds; i++) {
      // seed i sits sqrt(i) out and is turned by the golden angle i times
      const spot = new Zdog.Vector({ y: -(46 * Math.sqrt((i + 0.5) / seeds)) }).rotate({ z: i * GOLDEN });
      new Zdog.Shape({ addTo: head, translate: { x: spot.x, y: spot.y, z: 2 }, stroke: 5, color: i % 3 ? '#8a4f20' : '#3a1a08' });
    }
  };
  build();
  if (stage.bar) {
    slider(stage.bar, 'petals', 6, 34, 1, petals, (v) => { petals = v; build(); });
    slider(stage.bar, 'seeds', 30, 300, 10, seeds, (v) => { seeds = v; build(); });
  }

  stage.loop((_, t) => {
    illo.rotate.y = Math.sin(t * 0.6) * 0.6;
    head!.rotate.z = t * 0.15;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
