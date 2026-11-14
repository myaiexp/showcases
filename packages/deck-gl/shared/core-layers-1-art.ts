// Canvas-drawn images for the core layers chapter: a map-like bitmap and icon sheets

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  if (!g) throw new Error('2D canvas unavailable');
  return [c, g];
}

/**
 * A 512x384 picture with a transparent corner patch, a grid, a lopsided "F" and a corner
 * marker, so a viewer can see how it is stretched, flipped, tinted or made see-through.
 */
export function drawPicture(): HTMLCanvasElement {
  const [c, g] = canvas(512, 384);
  const sky = g.createLinearGradient(0, 0, 512, 384);
  sky.addColorStop(0, '#2b6cb0');
  sky.addColorStop(0.5, '#38a169');
  sky.addColorStop(1, '#d69e2e');
  g.fillStyle = sky;
  g.fillRect(0, 0, 512, 384);
  g.strokeStyle = 'rgba(255,255,255,0.35)';
  g.lineWidth = 1;
  for (let x = 0; x <= 512; x += 32) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, 384);
    g.stroke();
  }
  for (let y = 0; y <= 384; y += 32) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(512, y);
    g.stroke();
  }
  g.fillStyle = '#e53e3e';
  g.font = 'bold 280px sans-serif';
  g.textBaseline = 'middle';
  g.fillText('F', 150, 200);
  g.fillStyle = '#fff';
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(90, 0);
  g.lineTo(0, 90);
  g.fill();
  g.clearRect(380, 270, 132, 114); // transparent patch, bottom right
  return c;
}

/** A 16x16 two-colour checkerboard, to see `textureParameters` filtering up close. */
export function drawChecker(): HTMLCanvasElement {
  const [c, g] = canvas(16, 16);
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      g.fillStyle = (x + y) % 2 ? '#f6e05e' : '#2c5282';
      g.fillRect(x, y, 1, 1);
    }
  }
  return c;
}

export type IconName = 'pin' | 'star' | 'ring' | 'arrow';
export const ICON_NAMES: readonly IconName[] = ['pin', 'star', 'ring', 'arrow'];

function shape(g: CanvasRenderingContext2D, name: IconName, x: number, y: number, s: number, fill: string): void {
  const cx = x + s / 2;
  g.fillStyle = fill;
  g.strokeStyle = fill;
  g.beginPath();
  if (name === 'pin') {
    g.arc(cx, y + s * 0.36, s * 0.3, Math.PI * 0.8, Math.PI * 0.2);
    g.lineTo(cx, y + s * 0.96);
    g.closePath();
    g.fill();
  } else if (name === 'star') {
    for (let i = 0; i < 10; i++) {
      const r = (i % 2 ? 0.22 : 0.48) * s;
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      g.lineTo(cx + Math.cos(a) * r, y + s / 2 + Math.sin(a) * r);
    }
    g.closePath();
    g.fill();
  } else if (name === 'ring') {
    g.lineWidth = s * 0.16;
    g.arc(cx, y + s / 2, s * 0.34, 0, Math.PI * 2);
    g.stroke();
  } else {
    g.moveTo(cx, y + s * 0.06);
    g.lineTo(x + s * 0.88, y + s * 0.9);
    g.lineTo(cx, y + s * 0.68);
    g.lineTo(x + s * 0.12, y + s * 0.9);
    g.closePath();
    g.fill();
  }
}

const COLOURS: Record<IconName, string> = { pin: '#e53e3e', star: '#ecc94b', ring: '#38b2ac', arrow: '#9f7aea' };

export interface IconDef {
  x: number;
  y: number;
  width: number;
  height: number;
  anchorY?: number;
  mask?: boolean;
}

/** One 64px-per-icon sheet as a data URL, coloured or all white (a mask), and its mapping. */
export function drawAtlas(masked = false): { atlas: string; mapping: Record<IconName, IconDef> } {
  const [sheet, g] = canvas(256, 64);
  const mapping = {} as Record<IconName, IconDef>;
  ICON_NAMES.forEach((name, i) => {
    shape(g, name, i * 64, 0, 64, masked ? '#ffffff' : COLOURS[name]);
    mapping[name] = { x: i * 64, y: 0, width: 64, height: 64, anchorY: name === 'pin' ? 62 : 32, mask: masked };
  });
  return { atlas: sheet.toDataURL('image/png'), mapping };
}

/** One icon as a data URL, for IconLayer's auto-packing (`getIcon` returns `{url, ...}`). */
export function iconDataUrl(name: IconName, colour = COLOURS[name]): string {
  const [c, g] = canvas(64, 64);
  shape(g, name, 0, 0, 64, colour);
  return c.toDataURL('image/png');
}

