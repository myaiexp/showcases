// A 3D logo turned and faded by scroll: one progress motion value, derived values bound with threeEffect
import { motionValue, scopeMotion, scroll, transformValue } from 'motion';
import { threeEffect } from 'motion/three';
import type { Mount } from '@/types.ts';
import { autoScroll } from '../../shared/autoscroll.ts';
import { THREE, threeStage } from '../../shared/three.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="wrap${preview ? '' : ' full'}">
      <div class="logo"></div>
      <div class="scroller">
        <section><h3>Sketch</h3><p>Start with a rough shape.</p></section>
        <section><h3>Build</h3><p>Turn it into something real.</p></section>
        <section><h3>Ship</h3><p>Put it in front of people.</p></section>
      </div>
    </div>`;
  const logo = el.querySelector<HTMLElement>('.logo')!;
  const scroller = el.querySelector<HTMLElement>('.scroller')!;
  const stage = threeStage(logo, { preview, position: [0, 0, preview ? 5.6 : 4.2] });

  const material = new THREE.MeshStandardMaterial({ color: '#7c8cff', roughness: 0.3, metalness: 0.4, flatShading: true, transparent: true });
  const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 0), material);
  stage.scene.add(mesh);

  const cancels: (() => void)[] = [];
  const scope = scopeMotion(el, () => {
    // One number, 0 to 1, from how far the panel is scrolled. Everything else is derived from it.
    const progress = motionValue(0);
    // transformValue() reruns whenever progress changes, and threeEffect() writes the result
    // into the mesh once per frame, ahead of the render. Rotation is in degrees.
    cancels.push(
      threeEffect(mesh, {
        rotateY: transformValue(() => progress.get() * 360),
        rotateX: transformValue(() => progress.get() * 90),
        scale: transformValue(() => 0.6 + progress.get() * 0.6),
      }),
      threeEffect(material, { opacity: transformValue(() => 0.15 + progress.get() * 0.85) }),
    );
    scroll((v) => progress.set(v), { container: scroller });
    if (preview) autoScroll(scroller, { duration: 5 });
  });
  if (!preview) hint(el, 'Scroll the right-hand panel. The logo spins a full turn, grows and fades up in step, all from one scroll progress value.');

  return () => {
    scope.cancel();
    for (const c of cancels) c();
    stage.dispose();
  };
};

export default mount;
