// onLoad, forEachSplat and setSplat: read every splat, rewrite its colour
import * as THREE from 'three';
import { SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, controlBar, overlay } from '../../shared/controls.ts';
import { pushBlobShell } from '../../shared/scenes.ts';

type Recolor = (center: THREE.Vector3, color: THREE.Color) => void;

const RECOLORS: Record<string, Recolor> = {
  'by height': (c, out) => out.setHSL(0.6 - 0.6 * THREE.MathUtils.clamp((c.y + 0.9) / 1.8, 0, 1), 0.8, 0.55),
  'by angle': (c, out) => out.setHSL((Math.atan2(c.z, c.x) / (Math.PI * 2) + 1) % 1, 0.8, 0.55),
  'grey by depth': (c, out) => out.setScalar(0.25 + 0.6 * ((c.z + 0.9) / 1.8)),
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.4, 2.7], orbit: 0.25 });
  const label = overlay(el, 'loading…');

  const ball = new SplatMesh({
    constructSplats: (splats) => pushBlobShell(splats, { count: ctx.preview ? 5000 : 12000, scale: 0.045, seed: 3 }),
    // onLoad fires once the splats exist, so reading them is safe from here on.
    onLoad: (mesh) => {
      let sumY = 0;
      let top = -Infinity;
      mesh.forEachSplat((_i, center) => {
        sumY += center.y;
        top = Math.max(top, center.y);
      });
      label.textContent = `${mesh.numSplats} splats, mean y ${(sumY / mesh.numSplats).toFixed(3)}, highest ${top.toFixed(2)}`;
    },
  });
  stage.scene.add(ball);

  /** Visit every splat and write a new colour back into the PackedSplats. */
  const recolor = (rule: Recolor): void => {
    const packed = ball.packedSplats;
    if (!ball.isInitialized || !packed) return;
    const color = new THREE.Color();
    // The vectors passed to the callback are reused and are decoded copies:
    // changing them does nothing, so write back through setSplat.
    ball.forEachSplat((i, center, scales, quaternion, opacity) => {
      rule(center, color);
      packed.setSplat(i, center, scales, quaternion, opacity, color);
    });
    packed.needsUpdate = true; // re-upload the edited data...
    ball.updateVersion(); // ...and regenerate the mesh from it
  };

  const names = Object.keys(RECOLORS);
  let timer = 0;
  if (ctx.preview) {
    let n = 0;
    timer = window.setInterval(() => recolor(RECOLORS[names[n++ % names.length]!]!), 1500);
  } else {
    const bar = controlBar(el);
    for (const name of names) button(bar, `Recolor ${name}`, () => recolor(RECOLORS[name]!));
  }

  stage.run((_, dt) => (ball.rotation.y += dt * 0.1));
  return () => {
    clearInterval(timer);
    stage.dispose();
  };
};

export default mount;
