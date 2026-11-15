// Sample scenes built in code for effects to work on: no models, no network
import * as THREE from 'three';

/** A small seeded random generator, so every mount builds the same scene. */
export function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface SampleScene {
  group: THREE.Group;
  /** Moves the scene's animated parts; `t` is seconds since start. */
  update(t: number): void;
}

function lights(group: THREE.Group, intensity = 1): void {
  group.add(new THREE.HemisphereLight(0xbfd4ff, 0x20242c, 0.9 * intensity));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2 * intensity);
  sun.position.set(4, 7, 3);
  group.add(sun);
}

const std = (color: THREE.ColorRepresentation, roughness = 0.45, metalness = 0.1): THREE.MeshStandardMaterial =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness });

/**
 * A lit floor with a torus knot, spheres, boxes and a few small glowing lamps
 * (emissive above 1, so they bloom with a HalfFloat composer). The default subject.
 */
export function showroom(scene: THREE.Scene, { glow = 3 } = {}): SampleScene {
  const group = new THREE.Group();
  lights(group);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), std(0x2a2f3a, 0.9));
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);

  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.75, 0.26, 160, 24), std(0xe0457b, 0.3, 0.3));
  knot.position.set(0, 1.35, 0);
  group.add(knot);

  const balls: THREE.Mesh[] = [];
  const colors = [0x3fa7ff, 0xffc93f, 0x52d68a];
  colors.forEach((c, i) => {
    const a = (i / colors.length) * Math.PI * 2 + 0.5;
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.42, 40, 24), std(c, 0.25));
    ball.position.set(Math.cos(a) * 2.4, 0.42, Math.sin(a) * 2.4);
    group.add(ball);
    balls.push(ball);
  });

  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), std(0xd9dde6, 0.6));
    crate.position.set(Math.cos(a) * 3.8, 0.3, Math.sin(a) * 3.8);
    crate.rotation.y = a;
    group.add(crate);
  }

  const lamps: THREE.Mesh[] = [];
  const lampColors = [0xff5a36, 0x36c8ff, 0xb45cff];
  lampColors.forEach((c, i) => {
    const mat = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: c, emissiveIntensity: glow });
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.14, 20, 12), mat);
    lamp.userData.phase = (i / lampColors.length) * Math.PI * 2;
    group.add(lamp);
    lamps.push(lamp);
  });

  scene.add(group);
  return {
    group,
    update(t) {
      knot.rotation.set(t * 0.3, t * 0.5, 0);
      balls.forEach((b, i) => (b.position.y = 0.42 + Math.abs(Math.sin(t * 1.6 + i * 2)) * 0.5));
      for (const lamp of lamps) {
        const a = t * 0.6 + (lamp.userData.phase as number);
        lamp.position.set(Math.cos(a) * 1.7, 2.4 + Math.sin(a * 2) * 0.3, Math.sin(a) * 1.7);
      }
    },
  };
}

/** Glowing rings, tubes and dots over a dark floor: emissive colours far above 1, for bloom. */
export function neon(scene: THREE.Scene, { glow = 4 } = {}): SampleScene {
  const group = new THREE.Group();
  group.add(new THREE.HemisphereLight(0x8090b0, 0x101018, 0.4));
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), std(0x101218, 0.35, 0.6));
  floor.rotation.x = -Math.PI / 2;
  group.add(floor);
  const emissive = (c: number, k = glow): THREE.MeshStandardMaterial =>
    new THREE.MeshStandardMaterial({ color: 0x000000, emissive: c, emissiveIntensity: k });

  const rings: THREE.Mesh[] = [];
  [0xff3d7f, 0x3dd6ff, 0xffd23d].forEach((c, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1 - i * 0.28, 0.05, 12, 96), emissive(c));
    ring.position.y = 1.5;
    group.add(ring);
    rings.push(ring);
  });
  const pillars: THREE.Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 12), emissive(i % 2 ? 0x7d5cff : 0x2dffb0, glow * 0.6));
    p.position.set(Math.cos(a) * 3, 1.1, Math.sin(a) * 3);
    group.add(p);
    pillars.push(p);
  }
  // A plain lit ball shows what bloom leaves alone.
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 16), std(0x9aa3b5, 0.4));
  ball.position.set(0, 0.4, 0);
  group.add(ball, new THREE.PointLight(0xff7ab0, 6, 6));

  scene.add(group);
  return {
    group,
    update(t) {
      rings.forEach((r, i) => r.rotation.set(t * (0.4 + i * 0.2), t * (0.7 - i * 0.15), 0));
      pillars.forEach((p, i) => ((p.material as THREE.MeshStandardMaterial).emissiveIntensity = glow * (0.35 + 0.35 * (1 + Math.sin(t * 2 + i)))));
    },
  };
}

/**
 * Two rows of columns and spheres running away from the camera, for depth-based effects
 * (depth of field, depth, fog-like tricks). Put the camera near (0, 1.4, 6).
 */
export function corridor(scene: THREE.Scene): SampleScene {
  const group = new THREE.Group();
  lights(group);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 60), std(0x30343f, 0.85));
  floor.rotation.x = -Math.PI / 2;
  floor.position.z = -20;
  group.add(floor);
  const pal = [0xe0457b, 0x3fa7ff, 0xffc93f, 0x52d68a, 0xb45cff];
  const balls: THREE.Mesh[] = [];
  for (let i = 0; i < 12; i++) {
    const z = 3 - i * 3.2;
    for (const x of [-2.2, 2.2]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 0.5), std(0xcfd5e0, 0.7));
      col.position.set(x, 1.5, z);
      group.add(col);
    }
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 16), std(pal[i % pal.length]!, 0.3));
    ball.position.set(i % 2 ? 0.8 : -0.8, 0.45, z - 1.6);
    group.add(ball);
    balls.push(ball);
  }
  scene.add(group);
  return {
    group,
    update(t) {
      balls.forEach((b, i) => (b.position.y = 0.45 + Math.abs(Math.sin(t * 1.4 + i)) * 0.4));
    },
  };
}

/**
 * A closed room (floor, two walls) packed with boxes, a cylinder and a torus: lots of
 * creases and contact points for ambient occlusion.
 */
export function room(scene: THREE.Scene): SampleScene {
  const group = new THREE.Group();
  lights(group, 0.8);
  const wall = std(0xe8e4dc, 0.95);
  const floor = new THREE.Mesh(new THREE.BoxGeometry(8, 0.2, 8), wall);
  floor.position.y = -0.1;
  const back = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 0.2), wall);
  back.position.set(0, 2, -4);
  const side = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4, 8), wall);
  side.position.set(-4, 2, 0);
  group.add(floor, back, side);

  const rand = rng(7);
  for (let i = 0; i < 14; i++) {
    const s = 0.3 + rand() * 0.7;
    const box = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), std(0xf2f0ea, 0.9));
    box.position.set(-3.4 + rand() * 5.5, s / 2, -3.4 + rand() * 5.5);
    box.rotation.y = rand() * Math.PI;
    group.add(box);
  }
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 2.4, 32), std(0xf2f0ea, 0.9));
  pillar.position.set(1.2, 1.2, -1.5);
  const torus = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.25, 24, 64), std(0xf2a65a, 0.6));
  torus.position.set(0.2, 0.85, 0.8);
  group.add(pillar, torus);
  scene.add(group);
  return {
    group,
    update(t) {
      torus.rotation.set(t * 0.4, t * 0.6, 0);
    },
  };
}
