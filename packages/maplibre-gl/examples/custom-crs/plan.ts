// Draws a floor plan onto a canvas and returns it as a data URL
export const PLAN_ROOMS: Array<{ name: string; x: number; y: number; w: number; h: number }> = [
  { name: 'Lobby', x: 20, y: 20, w: 300, h: 200 },
  { name: 'Office', x: 320, y: 20, w: 330, h: 200 },
  { name: 'Lab', x: 650, y: 20, w: 330, h: 330 },
  { name: 'Store', x: 20, y: 220, w: 300, h: 360 },
  { name: 'Hall', x: 320, y: 220, w: 660, h: 130 },
  { name: 'Workshop', x: 320, y: 350, w: 660, h: 230 },
];

export const PLAN_SIZE = { width: 1000, height: 600 };

export function drawPlan(): string {
  const canvas = document.createElement('canvas');
  canvas.width = PLAN_SIZE.width;
  canvas.height = PLAN_SIZE.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.fillStyle = '#f4efe4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#d9d2c0';
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  ctx.strokeStyle = '#2b3a52';
  ctx.lineWidth = 6;
  ctx.fillStyle = '#2b3a52';
  ctx.font = '28px sans-serif';
  for (const r of PLAN_ROOMS) {
    ctx.strokeRect(r.x, r.y, r.w, r.h);
    ctx.fillText(r.name, r.x + 16, r.y + 40);
  }
  return canvas.toDataURL('image/png');
}
