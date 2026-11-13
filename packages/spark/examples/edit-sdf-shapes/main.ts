// Every SplatEditSdfType as a colour region painted over the garden by one SET_RGB edit
import * as THREE from 'three';
import { SplatEdit, SplatEditRgbaBlendMode, SplatEditSdf, SplatEditSdfType, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, select, checkbox, overlay } from '../../shared/controls.ts';
import { pushGarden } from '../../shared/subjects.ts';

const T = SplatEditSdfType;
const Z = new THREE.Vector3(0, 0, 1);
const Y = new THREE.Vector3(0, 1, 0);

interface Shape {
  type: SplatEditSdfType;
  /** Becomes the sizes of box, ellipsoid, cylinder (y) and capsule (y): an SDF reads its Object3D scale. */
  scale: [number, number, number];
  /** Sphere/cylinder/capsule radius, box corner rounding, or the cone angle factor. */
  radius: number;
  quaternion: THREE.Quaternion;
  /** Where the shape sits at time t. */
  place: (t: number, out: THREE.Vector3) => void;
  note: string;
}

const orbit = (t: number, out: THREE.Vector3, r = 0.9, y = 0.5): THREE.Vector3 =>
  out.set(Math.cos(t * 0.8) * r, y, Math.sin(t * 0.8) * r);

const SHAPES: Shape[] = [
  { type: T.SPHERE, scale: [1, 1, 1], radius: 0.6, quaternion: new THREE.Quaternion(), place: orbit, note: 'radius' },
  { type: T.BOX, scale: [0.5, 0.35, 0.5], radius: 0.1, quaternion: new THREE.Quaternion().setFromAxisAngle(Y, 0.6), place: orbit, note: 'scale = half sizes, radius rounds corners' },
  { type: T.ELLIPSOID, scale: [0.8, 0.35, 0.5], radius: 0, quaternion: new THREE.Quaternion().setFromAxisAngle(Y, 0.4), place: orbit, note: 'scale = radii' },
  { type: T.CYLINDER, scale: [1, 0.7, 1], radius: 0.4, quaternion: new THREE.Quaternion(), place: orbit, note: 'radius, scale.y = half height' },
  { type: T.CAPSULE, scale: [1, 1.4, 1], radius: 0.3, quaternion: new THREE.Quaternion().setFromAxisAngle(Z, 0.7), place: orbit, note: 'radius, scale.y = length' },
  {
    type: T.PLANE,
    scale: [1, 1, 1],
    radius: 0,
    // The plane's inside is local -z: turn +z to world up and everything below the plane is selected.
    quaternion: new THREE.Quaternion().setFromUnitVectors(Z, Y),
    place: (t, out) => out.set(0, 0.6 + 0.5 * Math.sin(t * 0.8), 0),
    note: 'position and rotation only',
  },
  {
    type: T.INFINITE_CONE,
    scale: [1, 1, 1],
    radius: 0.5,
    // The cone opens along local -z: aim that down.
    quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, -1, 0)),
    place: (t, out) => out.set(Math.sin(t * 0.8) * 0.7, 1.9, 0),
    note: 'apex at position, radius = angle factor',
  },
  { type: T.ALL, scale: [1, 1, 1], radius: 0, quaternion: new THREE.Quaternion(), place: (_t, out) => out.set(0, 0, 0), note: 'everything' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [2.4, 1.7, 3], target: [0, 0.5, 0], orbit: 0.12 });
  const label = overlay(el);

  const garden = new SplatMesh({ constructSplats: (s) => pushGarden(s, ctx.preview ? 15000 : 40000) });
  stage.scene.add(garden);

  // SET_RGB paints every splat inside the shape; softEdge feathers the boundary.
  const edit = new SplatEdit({ rgbaBlendMode: SplatEditRgbaBlendMode.SET_RGB, softEdge: 0.06 });
  const sdf = new SplatEditSdf({ color: new THREE.Color(1, 0.45, 0.1) });
  edit.add(sdf);
  garden.add(edit);

  let auto = true;
  let shown = -1;
  const apply = (i: number): void => {
    shown = i;
    const s = SHAPES[i]!;
    sdf.type = s.type;
    sdf.radius = s.radius;
    sdf.scale.set(...s.scale);
    sdf.quaternion.copy(s.quaternion);
    label.textContent = ctx.preview ? s.type.toUpperCase() : `${s.type.toUpperCase()}: ${s.note}`;
  };

  let picker: HTMLSelectElement | null = null;
  if (!ctx.preview) {
    const bar = controlBar(el);
    picker = select(bar, 'type', SHAPES.map((s) => s.type), (v) => {
      auto = false;
      apply(SHAPES.findIndex((s) => s.type === v));
    });
    checkbox(bar, 'cycle through all', auto, (v) => (auto = v));
  }

  stage.run((time) => {
    if (auto) {
      const i = Math.floor(time / 3) % SHAPES.length;
      if (i !== shown) apply(i);
      if (picker) picker.value = SHAPES[i]!.type;
    } else if (shown < 0) apply(0);
    SHAPES[shown]!.place(time, sdf.position);
  });
  return () => stage.dispose();
};

export default mount;
