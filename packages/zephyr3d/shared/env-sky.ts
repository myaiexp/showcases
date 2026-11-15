// A painted dusk sky as a function of direction, for the skybox and panorama examples
import { CubeFace, float2half, Vector3, Vector4 } from '@zephyr3d/base';
import type { Texture2D, TextureCube } from '@zephyr3d/device';
import { Mesh, PBRMetallicRoughnessMaterial, SphereShape, type Scene } from '@zephyr3d/scene';

const SUN = new Vector3(0.5, 0.18, -0.85).inplaceNormalize();

/** Linear RGB of the sky towards unit direction (x, y, z); the sun disk goes well above 1. */
export function skyColor(x: number, y: number, z: number): [number, number, number] {
  const up = Math.max(0, y);
  const down = Math.max(0, -y);
  let r = 0.9 - 0.65 * Math.pow(up, 0.45);
  let g = 0.55 - 0.2 * Math.pow(up, 0.45);
  let b = 0.4 + 0.45 * Math.pow(up, 0.4);
  if (y < 0) {
    const f = Math.exp(-down * 4);
    r = 0.12 * f + 0.05;
    g = 0.1 * f + 0.045;
    b = 0.09 * f + 0.05;
  }
  const d = x * SUN.x + y * SUN.y + z * SUN.z;
  const glow = Math.pow(Math.max(0, d), 24) * 1.2;
  const disk = d > 0.9993 ? 30 : 0;
  r += glow * 1.0 + disk;
  g += glow * 0.55 + disk;
  b += glow * 0.25 + disk * 0.8;
  return [r, g, b];
}

function faceDirection(face: CubeFace, u: number, v: number): [number, number, number] {
  // u runs right and v runs down across each face image, -1..1
  switch (face) {
    case CubeFace.PX:
      return [1, -v, -u];
    case CubeFace.NX:
      return [-1, -v, u];
    case CubeFace.PY:
      return [u, 1, v];
    case CubeFace.NY:
      return [u, -1, -v];
    case CubeFace.PZ:
      return [u, -v, 1];
    default:
      return [-u, -v, -1];
  }
}

/** Paints all six faces of an rgba8unorm cube map (colours clipped to 0..1). */
export function paintCube(cube: TextureCube, size: number): void {
  for (let face = 0; face < 6; face++) {
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const [dx, dy, dz] = faceDirection(face as CubeFace, ((x + 0.5) / size) * 2 - 1, ((y + 0.5) / size) * 2 - 1);
        const len = Math.hypot(dx, dy, dz);
        const c = skyColor(dx / len, dy / len, dz / len);
        const i = (y * size + x) * 4;
        data[i] = Math.min(1, c[0]) * 255;
        data[i + 1] = Math.min(1, c[1]) * 255;
        data[i + 2] = Math.min(1, c[2]) * 255;
        data[i + 3] = 255;
      }
    }
    cube.update(data, 0, 0, size, size, face as CubeFace);
  }
}

/** Fills an rgba16f equirectangular texture (width = 2 * height) with the sky, HDR values kept. */
export function paintPanorama(tex: Texture2D, width: number, height: number): void {
  const data = new Uint16Array(width * height * 4);
  for (let y = 0; y < height; y++) {
    const lat = Math.PI / 2 - ((y + 0.5) / height) * Math.PI;
    for (let x = 0; x < width; x++) {
      const lon = ((x + 0.5) / width) * Math.PI * 2 - Math.PI;
      const c = skyColor(Math.cos(lat) * Math.sin(lon), Math.sin(lat), -Math.cos(lat) * Math.cos(lon));
      const i = (y * width + x) * 4;
      data[i] = float2half(c[0]);
      data[i + 1] = float2half(c[1]);
      data[i + 2] = float2half(c[2]);
      data[i + 3] = float2half(1);
    }
  }
  tex.update(data, 0, 0, width, height);
}

/** Three PBR spheres (mirror, satin, rough) that show the sky's reflections. */
export function mirrorBalls(scene: Scene): Mesh[] {
  const shape = new SphereShape({ radius: 0.8 });
  return [0.04, 0.35, 0.8].map((roughness, i) => {
    const m = new PBRMetallicRoughnessMaterial();
    m.albedoColor = new Vector4(0.9, 0.85, 0.8, 1);
    m.metallic = 1;
    m.roughness = roughness;
    const ball = new Mesh(scene, shape, m);
    ball.position.setXYZ((i - 1) * 2, 0, 1);
    return ball;
  });
}
