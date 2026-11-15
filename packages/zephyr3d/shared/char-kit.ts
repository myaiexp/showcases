// Character rendering scaffolding: hair cards on a scalp sphere, an eyeball with UVs and tangents, eyelid bands
import { Vector3 } from '@zephyr3d/base';
import { BoundingBox, Primitive } from '@zephyr3d/scene';
import { png, type Painter } from './textures.ts';

const HEAD_R = 0.5;

/** Where a card starts on the scalp (polar angle from the top, azimuth) and how it hangs. */
interface CardOptions {
  /** Vertices across a card (3 or more): the alpha falls to 0 at both edges. */
  across?: number;
  /** Samples along a card. */
  along?: number;
  /** Cards per ring and the polar angles of the rings, in radians from the top of the head. */
  perRing?: number;
  rings?: number[];
  /** How far each card runs down the scalp in radians, and its width in metres. */
  sweep?: number;
  width?: number;
  /** How far the cards stand off the scalp at their widest, as a fraction of the head radius. */
  puff?: number;
  /** Hair colour baked into the vertex colours (rgb 0..1). */
  color?: [number, number, number];
  /** Offset of every card's azimuth, so two layers do not coincide. */
  twist?: number;
  /** Keep the face (+Z) clear except for a fringe on top. */
  openFace?: boolean;
}

/**
 * Hair cards: ribbons that follow a meridian of a sphere of radius 0.5 and flare out near the
 * ends. Vertex colours carry the hair colour and the alpha (zero at the edges and the tips);
 * tangents run along the strands, as `strandDirection: 'tangent'` expects.
 */
export function hairCards(o: CardOptions = {}): Primitive {
  const {
    across = 5, along = 14, perRing = 30, rings = [0.2, 0.6, 1.0, 1.35], sweep = 1.05, width = 0.2, puff = 0.2,
    color = [0.5, 0.28, 0.12], twist = 0, openFace = true,
  } = o;
  const pos: number[] = [];
  const nor: number[] = [];
  const tan: number[] = [];
  const uv: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  const at = (alpha: number, theta: number, r: number): Vector3 =>
    new Vector3(r * Math.sin(alpha) * Math.cos(theta), r * Math.cos(alpha), r * Math.sin(alpha) * Math.sin(theta));
  for (let ring = 0; ring < rings.length; ring++) {
    for (let k = 0; k < perRing; k++) {
      const theta = ((k + (ring % 2) * 0.5) / perRing) * Math.PI * 2 + twist;
      const a0 = rings[ring]!;
      // The face looks along +Z: skip the cards that would cover it (the top rings stay as a fringe)
      if (openFace && Math.sin(theta) > 0.25 && a0 > 0.5) continue;
      const base = pos.length / 3;
      for (let j = 0; j < along; j++) {
        const s = j / (along - 1);
        const alpha = a0 + s * sweep;
        const r = HEAD_R * (1.02 + puff * Math.sin(Math.min(1, s * 1.15) * Math.PI * 0.5) ** 2 * (0.4 + 0.6 * s));
        const centre = at(alpha, theta, r);
        // Along the strand: the derivative of the meridian path
        const next = at(alpha + 0.01, theta, HEAD_R * (1.02 + puff * Math.sin(Math.min(1, (s + 0.01) * 1.15) * Math.PI * 0.5) ** 2 * (0.4 + 0.6 * (s + 0.01))));
        const along3 = new Vector3(next.x - centre.x, next.y - centre.y, next.z - centre.z).inplaceNormalize();
        const side = new Vector3(-Math.sin(theta), 0, Math.cos(theta));
        const out = Vector3.cross(along3, side).inplaceNormalize();
        const taper = 1 - 0.55 * s;
        for (let i = 0; i < across; i++) {
          const u = i / (across - 1);
          const k = (u - 0.5) * width * taper;
          pos.push(centre.x + side.x * k, centre.y + side.y * k, centre.z + side.z * k);
          nor.push(out.x, out.y, out.z);
          tan.push(along3.x, along3.y, along3.z, 1);
          uv.push(u, s);
          const edge = i === 0 || i === across - 1 ? 0 : 1;
          const tip = Math.min(1, (1 - s) / 0.35);
          const shade = 0.75 + 0.25 * (((i * 7 + k * 3) % 5) / 4);
          col.push(color[0] * shade, color[1] * shade, color[2] * shade, edge * tip);
        }
        if (j > 0) {
          for (let i = 0; i < across - 1; i++) {
            const a = base + (j - 1) * across + i;
            const b = a + across;
            idx.push(a, a + 1, b, a + 1, b + 1, b);
          }
        }
      }
    }
  }
  const prim = new Primitive();
  prim.createAndSetVertexBuffer('position_f32x3', new Float32Array(pos));
  prim.createAndSetVertexBuffer('normal_f32x3', new Float32Array(nor));
  prim.createAndSetVertexBuffer('tangent_f32x4', new Float32Array(tan));
  prim.createAndSetVertexBuffer('tex0_f32x2', new Float32Array(uv));
  prim.createAndSetVertexBuffer('diffuse_u8normx4', Uint8Array.from(col, (v) => Math.round(Math.max(0, Math.min(1, v)) * 255)));
  prim.createAndSetIndexBuffer(new Uint32Array(idx));
  prim.setBoundingVolume(new BoundingBox(new Vector3(-0.8, -0.9, -0.8), new Vector3(0.8, 0.7, 0.8)));
  return prim;
}

/** A tileable texture of vertical streaks, for HairMaterial's specularShiftTexture (its R channel). */
export function streakShift(w = 64, h = 64): Promise<ArrayBuffer> {
  const paint: Painter = (px, width, height) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const v = 128 + 90 * Math.sin(x * 2.3) * Math.sin(x * 0.7 + 1.1) + 25 * Math.sin(y * 0.4 + x);
        const o = (y * width + x) * 4;
        px[o] = px[o + 1] = px[o + 2] = Math.max(0, Math.min(255, v));
        px[o + 3] = 255;
      }
    }
  };
  return png(w, h, paint);
}

/**
 * An eyeball of radius `r`, +Z towards the viewer. The front is mapped planarly so the pupil
 * centre sits at UV (0.5, 0.5); normals and tangents are included, as EyeMaterial needs.
 */
export function eyeball(r = 0.5, seg = 48, rings = 32): Primitive {
  const pos: number[] = [];
  const nor: number[] = [];
  const tan: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let j = 0; j <= rings; j++) {
    // Polar angle from +Z, so the pole of the grid is the pupil
    const phi = (j / rings) * Math.PI;
    for (let i = 0; i <= seg; i++) {
      const theta = (i / seg) * Math.PI * 2;
      const n = new Vector3(Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi));
      pos.push(n.x * r, n.y * r, n.z * r);
      nor.push(n.x, n.y, n.z);
      // The tangent follows +X on the front, projected onto the surface
      const t = new Vector3(1 - n.x * n.x, -n.x * n.y, -n.x * n.z).inplaceNormalize();
      tan.push(t.x, t.y, t.z, 1);
      uv.push(0.5 + 0.5 * n.x, 0.5 - 0.5 * n.y);
    }
  }
  for (let j = 0; j < rings; j++) {
    for (let i = 0; i < seg; i++) {
      const a = j * (seg + 1) + i;
      const b = a + seg + 1;
      idx.push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  const prim = new Primitive();
  prim.createAndSetVertexBuffer('position_f32x3', new Float32Array(pos));
  prim.createAndSetVertexBuffer('normal_f32x3', new Float32Array(nor));
  prim.createAndSetVertexBuffer('tangent_f32x4', new Float32Array(tan));
  prim.createAndSetVertexBuffer('tex0_f32x2', new Float32Array(uv));
  prim.createAndSetIndexBuffer(new Uint32Array(idx));
  prim.setBoundingVolume(new BoundingBox(new Vector3(-r, -r, -r), new Vector3(r, r, r)));
  return prim;
}

/** A band of a sphere around the X axis, between two angles measured from +Z (an eyelid shell). */
export function lidBand(r: number, from: number, to: number, seg = 28, rows = 8): Primitive {
  const pos: number[] = [];
  const nor: number[] = [];
  const idx: number[] = [];
  for (let j = 0; j <= rows; j++) {
    const a = from + (to - from) * (j / rows);
    for (let i = 0; i <= seg; i++) {
      // Spans the front 120 degrees around +Z in x
      const h = (i / seg - 0.5) * (Math.PI * 0.75);
      const n = new Vector3(Math.sin(h) * Math.cos(a), Math.sin(a), Math.cos(h) * Math.cos(a));
      pos.push(n.x * r, n.y * r, n.z * r);
      nor.push(n.x, n.y, n.z);
    }
  }
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < seg; i++) {
      const a = j * (seg + 1) + i;
      const b = a + seg + 1;
      idx.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }
  const prim = new Primitive();
  prim.createAndSetVertexBuffer('position_f32x3', new Float32Array(pos));
  prim.createAndSetVertexBuffer('normal_f32x3', new Float32Array(nor));
  prim.createAndSetIndexBuffer(new Uint32Array(idx));
  prim.setBoundingVolume(new BoundingBox(new Vector3(-r, -r, -r), new Vector3(r, r, r)));
  return prim;
}

/** An iris texture: dark pupil in the middle, radial fibres, a darker rim; sized so the iris fills the image. */
export function irisTexture(base: [number, number, number], w = 256): Promise<ArrayBuffer> {
  const paint: Painter = (px, width, height) => {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = (x + 0.5) / width - 0.5;
        const dy = (y + 0.5) / height - 0.5;
        const d = Math.hypot(dx, dy) * 2;
        const ang = Math.atan2(dy, dx);
        const fibre = 0.78 + 0.22 * Math.sin(ang * 36) * Math.sin(ang * 11 + d * 6);
        const ring = 1 - 0.55 * Math.max(0, (d - 0.82) / 0.18);
        const pupil = d < 0.3 ? 0.04 : 1;
        const collar = 1 + 0.5 * Math.exp(-(((d - 0.38) / 0.06) ** 2));
        const k = fibre * ring * pupil * collar;
        const o = (y * width + x) * 4;
        px[o] = Math.min(255, base[0] * k);
        px[o + 1] = Math.min(255, base[1] * k);
        px[o + 2] = Math.min(255, base[2] * k);
        px[o + 3] = 255;
      }
    }
  };
  return png(w, w, paint);
}
