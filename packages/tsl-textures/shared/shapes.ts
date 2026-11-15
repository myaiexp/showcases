// The model a texture is shown on: a spinning mesh plus a shape picker
import * as THREE from 'three/webgpu';
import { heading, select } from './panel.ts';
import type { Stage } from './stage.ts';

export type Shape = 'sphere' | 'cube' | 'torus knot' | 'cylinder' | 'plane';
export const SHAPES: readonly Shape[] = ['sphere', 'cube', 'torus knot', 'cylinder', 'plane'];

/**
 * Geometry about 2 units across, centred on the origin. `dense` subdivides enough for
 * shape textures, which move vertices ("they require a sufficiently dense net of
 * vertices", the docs' home page). Cards use fewer segments either way.
 */
export function geometry(shape: Shape, preview: boolean, dense = false): THREE.BufferGeometry {
  const n = dense ? (preview ? 64 : 160) : preview ? 32 : 96;
  switch (shape) {
    case 'sphere':
      return new THREE.SphereGeometry(1.1, n * 2, n);
    case 'cube':
      return new THREE.BoxGeometry(1.5, 1.5, 1.5, dense ? n / 2 : 1, dense ? n / 2 : 1, dense ? n / 2 : 1);
    case 'torus knot':
      return new THREE.TorusKnotGeometry(0.7, 0.26, n * 3, Math.max(16, n / 2));
    case 'cylinder':
      return new THREE.CylinderGeometry(0.8, 0.8, 1.9, n * 2, dense ? n : 1);
    case 'plane':
      return new THREE.PlaneGeometry(2.2, 2.2, dense ? n : 1, dense ? n : 1);
  }
}

export interface ModelOptions {
  shape?: Shape;
  /** Turns per minute around y; 0 holds still. */
  spin?: number;
  /** Subdivide for shape textures. */
  dense?: boolean;
  /** Adds the shape picker to the panel (full view). On unless false. */
  picker?: boolean;
  /**
   * Adds a `tangent` attribute to every geometry. Defaults to on when the material has a
   * normalNode: the library's normal functions (concrete, roughClay, waterDrops,
   * runnyEggs.normal, the shape textures' .normal) read `tangentLocal`, the raw attribute,
   * and three's built-in geometries have none, so without it the normals come out NaN.
   */
  tangents?: boolean;
}

/**
 * Adds a mesh wearing `material` to the scene; swaps its geometry from the picker.
 * Call it after assigning the material's nodes, since a normalNode turns on `tangents`.
 */
export function model(stage: Stage, material: THREE.Material, opts: ModelOptions = {}): THREE.Mesh {
  let shape = opts.shape ?? 'sphere';
  const tangents = opts.tangents ?? (material as THREE.NodeMaterial).normalNode != null;
  const build = (preview: boolean): THREE.BufferGeometry => {
    const geo = geometry(shape, preview, opts.dense);
    if (tangents) geo.computeTangents();
    return geo;
  };
  const mesh = new THREE.Mesh(build(stage.preview), material);
  stage.scene.add(mesh);
  stage.own(material);
  stage.onDispose(() => mesh.geometry.dispose());
  const spin = ((opts.spin ?? 2) * Math.PI * 2) / 60;
  stage.frame((_t, dt) => {
    mesh.rotation.y += spin * dt;
  });
  if (stage.panel && opts.picker !== false) {
    heading(stage.panel, 'Model');
    select(stage.panel, 'shape', SHAPES, shape, (next) => {
      shape = next;
      mesh.geometry.dispose();
      mesh.geometry = build(false);
    });
  }
  return mesh;
}
