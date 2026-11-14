// Assigning mesh.edits = [...] to swap whole edit sets, instead of relying on SplatEdit scene-graph children
import * as THREE from 'three';
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, select, checkbox, overlay } from '../../shared/controls.ts';
import { pushGarden } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [2.4, 1.7, 3], target: [0, 0.5, 0], orbit: 0.1 });
  const label = overlay(el);
  const garden = new SplatMesh({ constructSplats: (s) => pushGarden(s, ctx.preview ? 15000 : 40000) });
  stage.scene.add(garden);

  // 1. A scene-graph edit: a pink sphere roaming the garden. It only counts while mesh.edits is null.
  const child = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, softEdge: 0.1 });
  const pink = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 0.5, color: new THREE.Color(1, 0.3, 0.7) });
  child.add(pink);
  garden.add(child);

  // 2. Night: dim everything, then a lantern. The edits are never added to the scene;
  //    each gets its shapes through the `sdfs` option instead.
  const dim = new SplatEdit({
    sdfs: [new SplatEditSdf({ type: SplatEditSdfType.ALL, color: new THREE.Color(0.12, 0.13, 0.22) })],
  });
  const lantern = new SplatEditSdf({ type: SplatEditSdfType.SPHERE, radius: 0.5, color: new THREE.Color(0.9, 0.55, 0.2), opacity: 0 });
  const glow = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.ADD_RGBA, softEdge: 1.4, sdfs: [lantern] });

  // 3. A pond painted on the ground, and one tree cut out with a box.
  const pondSdf = new SplatEditSdf({ type: SplatEditSdfType.CYLINDER, radius: 0.9, color: new THREE.Color(0.1, 0.35, 0.8) });
  pondSdf.scale.set(1, 0.08, 1);
  pondSdf.position.set(0.1, 0.03, 0.1);
  const pond = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, softEdge: 0.05, sdfs: [pondSdf] });
  const cutSdf = new SplatEditSdf({ type: SplatEditSdfType.BOX, color: new THREE.Color(1, 1, 1), opacity: 0 });
  cutSdf.scale.set(0.5, 0.9, 0.5);
  cutSdf.position.set(-0.9, 0.7, -0.4);
  const cut = new SplatEdit({ softEdge: 0.05, sdfs: [cutSdf] });

  const SETS: Record<string, SplatEdit[] | null> = {
    'null (scene-graph child applies)': null,
    '[] (no edits at all)': [],
    '[dim, glow] (night)': [dim, glow],
    '[pond, cut] (pond, one tree removed)': [pond, cut],
  };
  const names = Object.keys(SETS);

  let auto = true;
  let shown = '';
  const use = (name: string): void => {
    shown = name;
    garden.edits = SETS[name]!; // the next frame picks up the new set
    label.textContent = ctx.preview ? `edits = ${name.split(' ')[0]}` : `mesh.edits = ${name}`;
  };

  let picker: HTMLSelectElement | null = null;
  if (!ctx.preview) {
    const bar = controlBar(el);
    picker = select(bar, 'set', names, (v) => {
      auto = false;
      use(v);
    });
    checkbox(bar, 'cycle through the sets', true, (v) => (auto = v));
  }

  stage.run((time) => {
    if (auto) {
      const name = names[Math.floor(time / 3.5) % names.length]!;
      if (name !== shown) use(name);
      if (picker) picker.value = name;
    } else if (!shown) use(names[0]!);
    pink.position.set(Math.cos(time) * 1.3, 0.4, Math.sin(time * 0.8) * 1.3);
    lantern.position.set(Math.cos(time * 0.6) * 1.1, 0.5, Math.sin(time * 0.6) * 1.1);
  });
  return () => stage.dispose();
};

export default mount;
