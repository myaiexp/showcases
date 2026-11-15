// Draws a benzene-like ring picture on a canvas and returns it as a PNG data URL
/** rings 1 draws one hexagon with inner bonds, 2 draws two fused hexagons. */
export function molecule(rings: 1 | 2, size = 240): string {
  const c = document.createElement('canvas');
  c.width = size * (rings === 2 ? 1.6 : 1);
  c.height = size;
  const g = c.getContext('2d');
  if (!g) return '';
  g.strokeStyle = '#e6e8ee';
  g.lineWidth = 6;
  g.lineJoin = 'round';
  const r = size * 0.28;
  const hex = (cx: number, cy: number): void => {
    g.beginPath();
    for (let k = 0; k < 6; k++) {
      const a = (Math.PI / 3) * k + Math.PI / 6;
      g[k ? 'lineTo' : 'moveTo'](cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    g.closePath();
    g.stroke();
    for (const k of [0, 2, 4]) {
      const a1 = (Math.PI / 3) * k + Math.PI / 6;
      const a2 = a1 + Math.PI / 3;
      g.beginPath();
      g.moveTo(cx + r * 0.72 * Math.cos(a1), cy + r * 0.72 * Math.sin(a1));
      g.lineTo(cx + r * 0.72 * Math.cos(a2), cy + r * 0.72 * Math.sin(a2));
      g.stroke();
    }
  };
  if (rings === 1) hex(c.width / 2, c.height / 2);
  else {
    const dx = r * Math.sqrt(3);
    hex(c.width / 2 - dx / 2, c.height / 2);
    hex(c.width / 2 + dx / 2, c.height / 2);
  }
  return c.toDataURL('image/png');
}
