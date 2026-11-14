// A simulated room: a packed LA8 depth map and a camera image
export const W = 96;
export const H = 72;
/** Raw depth units to metres, as the session would report (millimetres). */
export const RAW_TO_METERS = 0.001;

const CAM_HEIGHT = 1.4;
const TAN_X = 0.62;
const TAN_Y = TAN_X * (H / W);

export interface Room {
  /** RGBA8 with the low byte of the raw depth in R and the high byte in A (the LA8 layout). */
  depth: Uint8Array;
  color: Uint8Array;
  /** Distance along the view axis in metres at u, v in 0..1 (v from the top); null off the map. */
  distance(u: number, v: number): number | null;
}

interface Hit {
  t: number;
  rgb: [number, number, number];
}

/** Casts the pixel's ray (dx, dy, -1 from the camera) against the floor, wall, box and sphere. */
function trace(dx: number, dy: number): Hit {
  let best: Hit = { t: 7, rgb: [40, 44, 56] };
  const consider = (t: number, rgb: [number, number, number]): void => {
    if (t > 0.05 && t < best.t) best = { t, rgb };
  };
  if (dy < 0) {
    const t = CAM_HEIGHT / -dy;
    const x = dx * t;
    const check = (Math.floor(x * 2) + Math.floor(t * 2)) & 1;
    consider(t, check ? [120, 126, 140] : [84, 90, 104]);
  }
  consider(4.8, [150, 142, 128]);
  // A box with its front face at 1.7 m, x from 0.2 to 1.0 and up to 1.0 m high.
  {
    const t = 1.7;
    const x = dx * t;
    const y = dy * t + CAM_HEIGHT;
    if (x > 0.2 && x < 1.0 && y > 0 && y < 1.0) consider(t, [232, 121, 74]);
  }
  // A sphere of radius 0.5 centred 2.6 m ahead, 0.8 m up, 0.7 m to the left.
  {
    const c = [-0.7, 0.8 - CAM_HEIGHT, -2.6];
    const d = [dx, dy, -1];
    const oc = [-c[0]!, -c[1]!, -c[2]!];
    const a = d[0]! ** 2 + d[1]! ** 2 + d[2]! ** 2;
    const b = 2 * (oc[0]! * d[0]! + oc[1]! * d[1]! + oc[2]! * d[2]!);
    const k = oc[0]! ** 2 + oc[1]! ** 2 + oc[2]! ** 2 - 0.25;
    const disc = b * b - 4 * a * k;
    if (disc > 0) consider((-b - Math.sqrt(disc)) / (2 * a), [74, 179, 232]);
  }
  return best;
}

export function buildRoom(): Room {
  const depth = new Uint8Array(W * H * 4);
  const color = new Uint8Array(W * H * 4);
  const metres = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const hit = trace(((x + 0.5) / W - 0.5) * 2 * TAN_X, -((y + 0.5) / H - 0.5) * 2 * TAN_Y);
      metres[i] = hit.t;
      const raw = Math.round(hit.t / RAW_TO_METERS);
      depth.set([raw & 255, 0, 0, raw >> 8], i * 4);
      const shade = 1 - Math.min(0.5, hit.t / 14);
      color.set([hit.rgb[0] * shade, hit.rgb[1] * shade, hit.rgb[2] * shade, 255], i * 4);
    }
  }
  return {
    depth,
    color,
    distance(u, v) {
      if (u < 0 || u >= 1 || v < 0 || v >= 1) return null;
      return metres[Math.floor(v * H) * W + Math.floor(u * W)] ?? null;
    },
  };
}
