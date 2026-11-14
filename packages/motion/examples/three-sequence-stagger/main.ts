// A page intro in one sequence: a DOM heading, staggered 3D blocks and a light, all in one animate([...])
import { animate, delay, scopeMotion, stagger } from 'motion';
import type { Mount } from '@/types.ts';
import { THREE, stageHost, threeStage } from '../../shared/three.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

type From = 'first' | 'center' | 'last';

const mount: Mount = (el, { preview }) => {
  const host = stageHost(el, preview, 320);
  host.style.position = 'relative';
  const stage = threeStage(host, { preview, position: [0, 1.2, 6.2] });
  stage.target.set(0, -0.2, 0);

  const title = document.createElement('h2');
  title.className = 'title';
  title.textContent = 'Hello, Motion';
  host.append(title);

  const glow = new THREE.PointLight(0xffd9a0, 0, 20);
  glow.position.set(0, 3, 3);
  stage.scene.add(glow);
  // Five blocks, one hue each, hidden to begin with (scale ~0).
  const blocks: THREE.Mesh[] = [];
  const geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);
  for (let i = 0; i < 5; i++) {
    const m = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(0.58 + i * 0.07, 0.75, 0.58), roughness: 0.35 }));
    m.position.set((i - 2) * 1.1, -0.6, 0);
    m.scale.setScalar(0.001);
    stage.scene.add(m);
    blocks.push(m);
  }

  let from: From = 'first';
  const cleanups: (() => void)[] = [];
  let playing: { stop(): void } | undefined;

  const scope = scopeMotion(el, () => {
    const play = (): void => {
      playing?.stop();
      // One sequence over three kinds of subject: a DOM element, an array of meshes and a light.
      // The blocks start 0.2s before the heading ends ('-0.2') and the light joins them ('<').
      playing = animate([
        ['.title', { opacity: [0, 1], y: [14, 0] }, { duration: 0.5 }],
        [blocks, { y: [-1.4, -0.6], rotateY: [-120, 0], scale: [0.001, 1] }, { type: 'spring', visualDuration: 0.7, bounce: 0.3, delay: stagger(0.12, { from }), at: '-0.2' }],
        [glow, { intensity: [0, 28] }, { duration: 0.9, at: '<' }],
      ]);
    };

    if (preview) {
      const tick = (): void => {
        play();
        delay(tick, 4.2);
      };
      tick();
      return;
    }
    play();
    const ui = panel(el);
    cleanups.push(() => ui.dispose());
    ui.button('Replay', play);
    ui.select('stagger from', ['first', 'center', 'last'] as const, from, (v) => {
      from = v;
      play();
    });
    hint(el, 'The heading, the five blocks and the light are one animate([...]) call. Change where the stagger starts and watch the blocks reorder.');
  });

  return () => {
    scope.cancel();
    for (const c of cleanups) c();
    stage.dispose();
  };
};

export default mount;
