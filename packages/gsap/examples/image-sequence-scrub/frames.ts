// Draws the animation frames onto an offscreen canvas and returns them as image data URLs
export function makeFrames(count: number, w: number, h: number): string[] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d') as CanvasRenderingContext2D;
  const urls: string[] = [];
  for (let f = 0; f < count; f++) {
    const t = f / (count - 1);
    g.fillStyle = `hsl(${220 + t * 140} 45% 14%)`;
    g.fillRect(0, 0, w, h);
    // a ring that grows, a square that turns once and a dot orbiting it
    g.strokeStyle = `hsl(${40 + t * 200} 90% 60%)`;
    g.lineWidth = 6;
    g.beginPath();
    g.arc(w / 2, h / 2, 10 + t * (h * 0.42), 0, Math.PI * 2);
    g.stroke();
    g.save();
    g.translate(w / 2, h / 2);
    g.rotate(t * Math.PI * 2);
    g.fillStyle = `hsl(${160 + t * 120} 80% 60%)`;
    const s = h * 0.18;
    g.fillRect(-s / 2, -s / 2, s, s);
    g.restore();
    g.fillStyle = '#fff';
    g.beginPath();
    g.arc(w / 2 + Math.cos(t * 6 * Math.PI) * h * 0.3, h / 2 + Math.sin(t * 6 * Math.PI) * h * 0.3, 7, 0, Math.PI * 2);
    g.fill();
    g.font = '600 14px ui-monospace, monospace';
    g.fillText(`frame ${f + 1}/${count}`, 10, h - 12);
    urls.push(c.toDataURL('image/png'));
  }
  return urls;
}
