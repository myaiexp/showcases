// A shader dissolve driven by animated uniforms: animate(uniforms, ...) and animate(mesh, ...) side by side
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { THREE, stageHost, threeStage } from '../../shared/three.ts';
import { hint, panel } from '../../shared/ui.ts';
import { fragmentShader, vertexShader } from './shader.ts';
import './style.css';

const TINTS = { Cyan: '#22d3ee', Amber: '#fbbf24', Pink: '#f43f9a' } as const;

const mount: Mount = (el, { preview }) => {
  const host = stageHost(el, preview, 320);
  const stage = threeStage(host, { preview, lights: false, position: [0, 0, 5.4] });

  // Three.js uniforms are { value } objects. Keeping them in our own object lets animate() take it as a subject.
  const uniforms = {
    progress: { value: 1 },
    tint: { value: new THREE.Color(TINTS.Cyan) },
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, side: THREE.DoubleSide });
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.85, 0.3, 160, 20), material);
  stage.scene.add(knot);

  const ui = panel(el);
  if (preview) ui.el.remove();

  const scope = scopeMotion(el, () => {
    // Several uniforms in one call: the number and the colour animate together.
    const dissolve = (tint?: string): void => {
      animate(uniforms, { progress: 0, ...(tint ? { tint } : {}) }, { duration: 1.6, ease: 'easeInOut' });
    };
    // Through the mesh: the same call can mix a transform with a uniform that the mesh's material owns.
    const reveal = (): void => {
      const turn = THREE.MathUtils.radToDeg(knot.rotation.y) + 180;
      animate(knot, { progress: 1, rotateY: turn }, { duration: 1.6, ease: 'easeInOut' });
    };

    if (preview) {
      const names = Object.values(TINTS);
      let i = 0;
      const tick = (): void => {
        dissolve(names[++i % names.length]);
        delay(reveal, 1.9);
        delay(tick, 4.6);
      };
      delay(tick, 1);
      return;
    }
    ui.button('Dissolve', () => dissolve());
    ui.button('Reveal', reveal);
    ui.select('edge colour', Object.keys(TINTS) as (keyof typeof TINTS)[], 'Cyan', (name) => {
      animate(uniforms, { tint: TINTS[name] }, { duration: 0.4 });
    });
    ui.slider('progress', { min: 0, max: 1, step: 0.01, value: 1 }, (v) => animate(uniforms, { progress: v }, { duration: 0.15 }));
    hint(el, 'Dissolve and Reveal animate two uniforms (and Reveal also turns the mesh) in one call. Changing the colour animates just the tint uniform.');
  });

  return () => {
    scope.cancel();
    ui.dispose();
    stage.dispose();
  };
};

export default mount;
