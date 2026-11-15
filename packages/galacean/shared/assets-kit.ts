// Generated assets for the loading examples: PNG blobs, data URLs, a cube .gltf, JSON blobs
import { type Engine, type Entity, PrimitiveMesh, type Texture2D, UnlitMaterial } from '@galacean/engine';
import { solid } from './core-kit.ts';
import { paint } from './textures.ts';

const made = new Set<string>();

/** A blob URL that is revoked by `releaseUrls()` (call it from stage.own). */
function track(url: string): string {
  made.add(url);
  return url;
}

export function releaseUrls(): void {
  for (const url of made) URL.revokeObjectURL(url);
  made.clear();
}

/** Draws a square image and returns it as a PNG blob URL. */
export function pngBlobUrl(size: number, draw: (g: CanvasRenderingContext2D, size: number) => void): Promise<string> {
  const canvas = paint(size, draw);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(track(URL.createObjectURL(blob))) : reject(new Error('toBlob failed'))), 'image/png');
  });
}

/** The same kind of image as a base64 data URL, the form the docs show. */
export function pngDataUrl(size: number, draw: (g: CanvasRenderingContext2D, size: number) => void): string {
  return paint(size, draw).toDataURL('image/png');
}

export function jsonBlobUrl(value: unknown): string {
  return track(URL.createObjectURL(new Blob([JSON.stringify(value)], { type: 'application/json' })));
}

/** A tiny numbered tile: coloured square with a digit, so loaded textures can be told apart. */
export const tile = (label: string, hue: number) => (g: CanvasRenderingContext2D, size: number): void => {
  g.fillStyle = `hsl(${hue} 55% 38%)`;
  g.fillRect(0, 0, size, size);
  g.strokeStyle = 'rgba(255,255,255,.7)';
  g.lineWidth = size / 24;
  g.strokeRect(size / 12, size / 12, size - size / 6, size - size / 6);
  g.fillStyle = '#fff';
  g.font = `bold ${size / 2}px sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(label, size / 2, size / 2 + size / 24);
};

const CUBE_FACES: [number[], number[]][] = [
  [[0, 0, 1], [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1]],
  [[0, 0, -1], [1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1]],
  [[1, 0, 0], [1, -1, 1, 1, -1, -1, 1, 1, -1, 1, 1, 1]],
  [[-1, 0, 0], [-1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1]],
  [[0, 1, 0], [-1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, -1]],
  [[0, -1, 0], [-1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1]],
];

function base64(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

/** A .gltf (JSON with an embedded base64 buffer) of one cube, as a blob URL. Load it with `type: AssetType.GLTF`. */
export function cubeGltfUrl(color: [number, number, number], half = 0.5): string {
  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  CUBE_FACES.forEach(([n, corners], f) => {
    for (let i = 0; i < 4; i++) {
      positions.push(corners[i * 3]! * half, corners[i * 3 + 1]! * half, corners[i * 3 + 2]! * half);
      normals.push(...n);
    }
    indices.push(f * 4, f * 4 + 1, f * 4 + 2, f * 4, f * 4 + 2, f * 4 + 3);
  });
  const buffer = new ArrayBuffer(positions.length * 4 * 2 + indices.length * 2);
  new Float32Array(buffer, 0, positions.length).set(positions);
  new Float32Array(buffer, positions.length * 4, normals.length).set(normals);
  new Uint16Array(buffer, positions.length * 8, indices.length).set(indices);
  const json = {
    asset: { version: '2.0' },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ name: 'generated cube', mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material: 0 }] }],
    materials: [{ pbrMetallicRoughness: { baseColorFactor: [...color, 1], metallicFactor: 0.1, roughnessFactor: 0.6 } }],
    buffers: [{ byteLength: buffer.byteLength, uri: `data:application/octet-stream;base64,${base64(new Uint8Array(buffer))}` }],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: positions.length * 4, target: 34962 },
      { buffer: 0, byteOffset: positions.length * 4, byteLength: normals.length * 4, target: 34962 },
      { buffer: 0, byteOffset: positions.length * 8, byteLength: indices.length * 2, target: 34963 },
    ],
    accessors: [
      { bufferView: 0, componentType: 5126, count: 24, type: 'VEC3', min: [-half, -half, -half], max: [half, half, half] },
      { bufferView: 1, componentType: 5126, count: 24, type: 'VEC3' },
      { bufferView: 2, componentType: 5123, count: indices.length, type: 'SCALAR' },
    ],
  };
  return track(URL.createObjectURL(new Blob([JSON.stringify(json)], { type: 'model/gltf+json' })));
}

/** A square sheet facing the camera, showing `texture` unlit. */
export function pictureFrame(parent: Entity, engine: Engine, texture: Texture2D, size = 2, position: [number, number, number] = [0, 0, 0]): Entity {
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const e = solid(parent, PrimitiveMesh.createPlane(engine, size, size), material, position, 'picture');
  e.transform.setRotation(90, 0, 0);
  return e;
}
