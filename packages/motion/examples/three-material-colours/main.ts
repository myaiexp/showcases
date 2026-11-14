// A 3D mug that fades between paint colours and finishes: animate() on a mesh and on its material
import { animate, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { THREE, stageHost, threeStage } from '../../shared/three.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const COLOURS = { Coral: '#f4694c', Sky: '#4fa3ff', Mint: '#3ed9a0', Gold: '#f1b72c', Violet: '#8b6cf0', Ink: '#2a2d38' } as const;
// roughness: how blurry highlights are, metalness: plastic (0) to metal (1), opacity: 1 solid to 0 invisible.
const FINISHES = {
  Matte: { roughness: 0.95, metalness: 0, opacity: 1 },
  Glossy: { roughness: 0.12, metalness: 0.05, opacity: 1 },
  Metal: { roughness: 0.3, metalness: 0.95, opacity: 1 },
  Glass: { roughness: 0.05, metalness: 0, opacity: 0.35 },
} as const;
type Finish = keyof typeof FINISHES;

const mount: Mount = (el, { preview }) => {
  const host = stageHost(el, preview, 320);
  const stage = threeStage(host, { preview, position: [0, 1.1, 3.9] });
  stage.target.set(0, 0.1, 0);
  stage.scene.add(new THREE.HemisphereLight(0xbfd8ff, 0x403020, 1.2));

  const material = new THREE.MeshStandardMaterial({ color: COLOURS.Coral, transparent: true, ...FINISHES.Glossy });
  const turntable = new THREE.Group();
  turntable.rotation.x = 0.28;
  // The mesh the colour animates through; the handle shares its material, so it changes too.
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.68, 1.5, 48, 1, true), material);
  material.side = THREE.DoubleSide;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.04, 48), material);
  base.position.y = -0.74;
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.09, 14, 32, Math.PI * 1.1), material);
  handle.position.set(0.74, 0, 0);
  handle.rotation.z = -Math.PI * 0.55;
  turntable.add(mug, base, handle);
  stage.scene.add(turntable);

  let ui: ReturnType<typeof panel> | undefined;
  const scope = scopeMotion(el, () => {
    // A slow turntable, as a looping tween on the group.
    animate(turntable, { rotateY: [0, 360] }, { duration: preview ? 9 : 14, ease: 'linear', repeat: Infinity });

    // Via the mesh: Motion looks on the object first, then on its material, so `color` finds material.color.
    const paint = (name: keyof typeof COLOURS): void => {
      animate(mug, { color: COLOURS[name] }, { duration: 0.5 });
    };
    // Directly on the material: three numbers on a spring that settles with a little life.
    const finish = (name: Finish): void => {
      animate(material, FINISHES[name], { type: 'spring', visualDuration: 0.5, bounce: 0.2 });
    };

    if (preview) {
      const names = Object.keys(COLOURS) as (keyof typeof COLOURS)[];
      const finishes = Object.keys(FINISHES) as Finish[];
      let i = 0;
      const tick = (): void => {
        i++;
        paint(names[i % names.length]!);
        if (i % 2 === 0) finish(finishes[(i / 2) % finishes.length]!);
        delay(tick, 1.4);
      };
      delay(tick, 1);
      return;
    }

    const swatches = document.createElement('div');
    swatches.className = 'swatches';
    for (const [name, hex] of Object.entries(COLOURS)) {
      const b = document.createElement('button');
      b.className = 'swatch';
      b.title = name;
      b.setAttribute('aria-label', name);
      b.style.background = hex;
      b.addEventListener('click', () => paint(name as keyof typeof COLOURS));
      swatches.append(b);
    }
    host.after(swatches);
    ui = panel(el);
    for (const name of Object.keys(FINISHES) as Finish[]) ui.button(name, () => finish(name));
    hint(el, 'Pick a colour, then a finish. Colour is a 0.5s tween via the mesh; roughness, metalness and opacity spring on the material.');
  });

  return () => {
    scope.cancel();
    ui?.dispose();
    stage.dispose();
  };
};

export default mount;
