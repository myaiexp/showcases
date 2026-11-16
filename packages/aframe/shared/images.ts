// Images painted in code as data: URLs: textures, skies, cubemap faces
/**
 * Examples never load image files, so every texture the docs show from a URL is painted
 * here with Canvas 2D. Each call returns a data: URL, which A-Frame and three load like any
 * image URL (no request). Called from an example's `scene()`, so the canvas belongs to the
 * example's own iframe.
 */

type Painter = (g: CanvasRenderingContext2D, w: number, h: number) => void;

const cache = new Map<string, string>();

/** Paints a w×h canvas and returns it as a PNG data: URL, cached by key. */
export function paint(key: string, w: number, h: number, painter: Painter): string {
  const hit = cache.get(key);
  if (hit) return hit;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  painter(canvas.getContext('2d')!, w, h);
  const url = canvas.toDataURL('image/png');
  cache.set(key, url);
  return url;
}

/** A seeded random in [0, 1), so painted noise is the same on every load. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

/** A two-colour checkerboard, `cells` squares a side. */
export function checker(cells = 8, a = '#e8e8e8', b = '#3a4a5c', size = 256): string {
  return paint(`checker:${cells}:${a}:${b}:${size}`, size, size, (g, w) => {
    const c = w / cells;
    for (let y = 0; y < cells; y++)
      for (let x = 0; x < cells; x++) {
        g.fillStyle = (x + y) % 2 ? b : a;
        g.fillRect(x * c, y * c, c, c);
      }
  });
}

/** Lines on a ground colour: a floor or a debug grid that shows repeat and offset. */
export function grid(lines = 8, ground = '#22313f', line = '#7fb8e0', size = 256): string {
  return paint(`grid:${lines}:${ground}:${line}:${size}`, size, size, (g, w) => {
    g.fillStyle = ground;
    g.fillRect(0, 0, w, w);
    g.strokeStyle = line;
    g.lineWidth = Math.max(1, w / 128);
    for (let i = 0; i <= lines; i++) {
      const p = (i / lines) * w;
      g.beginPath();
      g.moveTo(p, 0);
      g.lineTo(p, w);
      g.moveTo(0, p);
      g.lineTo(w, p);
      g.stroke();
    }
  });
}

/** Running-bond bricks with mortar and per-brick tint. */
export function bricks(size = 256): string {
  return paint(`bricks:${size}`, size, size, (g, w) => {
    const rnd = seeded(7);
    g.fillStyle = '#c9c2b4';
    g.fillRect(0, 0, w, w);
    const rows = 8;
    const bh = w / rows;
    const bw = w / 4;
    for (let r = 0; r < rows; r++)
      for (let c = -1; c < 5; c++) {
        const x = c * bw + (r % 2 ? bw / 2 : 0);
        const t = 0.8 + rnd() * 0.35;
        g.fillStyle = `rgb(${Math.round(160 * t)}, ${Math.round(70 * t)}, ${Math.round(52 * t)})`;
        g.fillRect(x + 2, r * bh + 2, bw - 4, bh - 4);
      }
  });
}

/** Soft value noise in grey: clouds, a roughness map or a height map. */
export function noise(seed = 1, size = 256, scale = 8): string {
  return paint(`noise:${seed}:${size}:${scale}`, size, size, (g, w) => {
    const rnd = seeded(seed);
    const n = scale + 1;
    const lattice = Array.from({ length: n * n }, () => rnd());
    const at = (x: number, y: number): number => lattice[(y % n) * n + (x % n)]!;
    const img = g.createImageData(w, w);
    for (let y = 0; y < w; y++)
      for (let x = 0; x < w; x++) {
        const fx = (x / w) * scale;
        const fy = (y / w) * scale;
        const ix = Math.floor(fx);
        const iy = Math.floor(fy);
        const sx = fx - ix;
        const sy = fy - iy;
        const top = at(ix, iy) * (1 - sx) + at(ix + 1, iy) * sx;
        const bottom = at(ix, iy + 1) * (1 - sx) + at(ix + 1, iy + 1) * sx;
        const v = Math.round(255 * (top * (1 - sy) + bottom * sy));
        const i = (y * w + x) * 4;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
    g.putImageData(img, 0, 0);
  });
}

/** A tangent-space normal map of round bumps (flat is rgb 128, 128, 255). */
export function bumps(cells = 6, size = 256): string {
  return paint(`bumps:${cells}:${size}`, size, size, (g, w) => {
    const img = g.createImageData(w, w);
    const c = w / cells;
    for (let y = 0; y < w; y++)
      for (let x = 0; x < w; x++) {
        const dx = ((x % c) / c) * 2 - 1;
        const dy = ((y % c) / c) * 2 - 1;
        const r2 = dx * dx + dy * dy;
        const [nx, ny] = r2 < 0.7 ? [dx * 0.8, -dy * 0.8] : [0, 0];
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
        const i = (y * w + x) * 4;
        img.data[i] = Math.round((nx * 0.5 + 0.5) * 255);
        img.data[i + 1] = Math.round((ny * 0.5 + 0.5) * 255);
        img.data[i + 2] = Math.round((nz * 0.5 + 0.5) * 255);
        img.data[i + 3] = 255;
      }
    g.putImageData(img, 0, 0);
  });
}

export interface PanoramaOptions {
  top?: string;
  horizon?: string;
  ground?: string;
  sun?: string | null;
  hills?: string | null;
  seed?: number;
}

/** A 2:1 equirectangular sky: gradient, sun, a ridge of hills and the ground. */
export function panorama(opts: PanoramaOptions = {}, width = 1024): string {
  const { top = '#1b3f73', horizon = '#f0b58a', ground = '#2e3b2a', sun = '#fff3c4', hills = '#3d5a45', seed = 3 } = opts;
  return paint(`pano:${JSON.stringify(opts)}:${width}`, width, width / 2, (g, w, h) => {
    const sky = g.createLinearGradient(0, 0, 0, h / 2);
    sky.addColorStop(0, top);
    sky.addColorStop(1, horizon);
    g.fillStyle = sky;
    g.fillRect(0, 0, w, h / 2);
    if (sun) {
      const sx = w * 0.3;
      const sy = h * 0.36;
      const glow = g.createRadialGradient(sx, sy, 0, sx, sy, h * 0.12);
      glow.addColorStop(0, sun);
      glow.addColorStop(0.25, sun);
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = glow;
      g.fillRect(0, 0, w, h / 2);
    }
    g.fillStyle = ground;
    g.fillRect(0, h / 2, w, h / 2);
    if (hills) {
      const rnd = seeded(seed);
      const phases = [rnd() * 6, rnd() * 6, rnd() * 6];
      g.fillStyle = hills;
      g.beginPath();
      g.moveTo(0, h / 2);
      for (let x = 0; x <= w; x += 4) {
        const t = (x / w) * Math.PI * 2;
        const y = h / 2 - h * (0.03 + 0.025 * Math.sin(t * 3 + phases[0]!) + 0.015 * Math.sin(t * 7 + phases[1]!) + 0.008 * Math.sin(t * 17 + phases[2]!));
        g.lineTo(x, y);
      }
      g.lineTo(w, h / 2);
      g.fill();
    }
  });
}

/** A labelled square with a border: cubemap faces, posters, thumbnails. */
export function label(text: string, bg = '#3a6ea5', fg = '#ffffff', size = 256): string {
  return paint(`label:${text}:${bg}:${fg}:${size}`, size, size, (g, w) => {
    g.fillStyle = bg;
    g.fillRect(0, 0, w, w);
    g.strokeStyle = fg;
    g.lineWidth = w / 32;
    g.strokeRect(w / 16, w / 16, w - w / 8, w - w / 8);
    g.fillStyle = fg;
    g.font = `bold ${Math.round(w / 5)}px system-ui, sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(text, w / 2, w / 2);
  });
}

/** Six faces for a cubemap, in a-cubemap's order: +x, -x, +y, -y, +z, -z. */
export function cubeFaces(size = 256): string[] {
  const faces: [string, string][] = [
    ['+X', '#a0453c'],
    ['-X', '#7a3a8c'],
    ['+Y', '#3c7fa0'],
    ['-Y', '#4f7a3c'],
    ['+Z', '#b08a2e'],
    ['-Z', '#2e6db0'],
  ];
  return faces.map(([t, c]) => label(t, c, '#ffffff', size));
}

/** A radial dot that fades to transparent: sprites, glows, alpha maps. */
export function glow(color = '#ffffff', size = 128): string {
  return paint(`glow:${color}:${size}`, size, size, (g, w) => {
    const grad = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    grad.addColorStop(0, color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, w);
  });
}
