// Outline examples: selectable objects, an optional wall, pattern textures
import * as THREE from 'three';
import type { SampleScene } from './scenes.ts';

export interface OutlineScene extends SampleScene {
  knot: THREE.Mesh;
  balls: THREE.Mesh[];
  crates: THREE.Mesh[];
  /** The slab standing in front of the knot (only with `wall: true`). */
  wall: THREE.Mesh | null;
  /** Everything worth selecting. */
  all: THREE.Mesh[];
}

const std = (color: number, roughness = 0.45): THREE.MeshStandardMaterial => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.1 });

/** A lit floor with a torus knot, three balls and four crates. `wall` adds a slab hiding most of the knot. */
export function outlineScene(scene: THREE.Scene, { wall = false } = {}): OutlineScene {
  const group = new THREE.Group();
  group.add(new THREE.HemisphereLight(0xbfd4ff, 0x20242c, 1));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(4, 7, 3);
  group.add(sun);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), std(0x39404f, 0.9));
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.75, 0.26, 160, 24), std(0xe0457b, 0.3));
  knot.position.set(0, 1.35, 0);
  group.add(knot);
  const balls = [0x3fa7ff, 0xffc93f, 0x52d68a].map((c, i) => {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.45, 40, 24), std(c, 0.25));
    ball.position.set(Math.cos(a) * 2.4, 0.45, Math.sin(a) * 2.4);
    group.add(ball);
    return ball;
  });
  const crates = [0, 1, 2, 3].map((i) => {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), std(0xd9dde6, 0.6));
    crate.position.set(Math.cos(a) * 3.6, 0.35, Math.sin(a) * 3.6);
    crate.rotation.y = a;
    group.add(crate);
    return crate;
  });
  let slab: THREE.Mesh | null = null;
  if (wall) {
    slab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 0.25), std(0x8a93a6, 0.8));
    slab.position.set(0, 1.1, 1.6);
    group.add(slab);
  }
  scene.add(group);
  return {
    group,
    knot,
    balls,
    crates,
    wall: slab,
    all: [knot, ...balls, ...crates],
    update(t) {
      knot.rotation.set(t * 0.3, t * 0.5, 0);
      balls.forEach((b, i) => (b.position.y = 0.45 + Math.abs(Math.sin(t * 1.4 + i * 2)) * 0.4));
    },
  };
}

/** A pattern texture with alpha: diagonal stripes or dots, drawn on a canvas. */
export function patternTexture(kind: 'stripes' | 'dots'): THREE.CanvasTexture {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d')!;
  g.clearRect(0, 0, s, s);
  g.fillStyle = '#ffffff';
  if (kind === 'stripes') {
    g.lineWidth = 12;
    g.strokeStyle = '#ffffff';
    for (const k of [-s, 0, s]) {
      g.beginPath();
      g.moveTo(k, s);
      g.lineTo(k + s, 0);
      g.stroke();
    }
  } else {
    g.beginPath();
    g.arc(s / 2, s / 2, 12, 0, Math.PI * 2);
    g.fill();
  }
  return new THREE.CanvasTexture(c);
}
