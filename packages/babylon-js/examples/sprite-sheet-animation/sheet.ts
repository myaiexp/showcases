// Draws an 8-frame spinning-star sprite sheet into a canvas and returns it as a data URL
export const CELL = 64;
export const FRAMES = 8;

export function drawSpriteSheet(): string {
  const canvas = document.createElement('canvas');
  canvas.width = CELL * FRAMES;
  canvas.height = CELL;
  const g = canvas.getContext('2d')!;
  for (let frame = 0; frame < FRAMES; frame++) {
    g.save();
    g.translate(frame * CELL + CELL / 2, CELL / 2);
    // Each cell turns the star a little further; the star has 5 points, so 72 degrees loops it.
    g.rotate(((Math.PI * 2) / 5) * (frame / FRAMES));
    g.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 28 : 12;
      const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
      g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    g.closePath();
    g.fillStyle = `hsl(${40 + frame * 6}, 95%, 60%)`;
    g.fill();
    g.lineWidth = 3;
    g.strokeStyle = '#7a3b00';
    g.stroke();
    g.restore();
  }
  return canvas.toDataURL('image/png');
}
