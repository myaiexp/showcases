// Draws the four-panel house texture (front, right, back, left) on a canvas
export const PANEL = 128;

/** A 4:1 strip like the docs' cubehouse image: front, right, back, left side by side. */
export function drawHouseAtlas(ctx: CanvasRenderingContext2D): void {
  const names = ['front', 'right', 'back', 'left'];
  for (let i = 0; i < 4; i++) {
    const name = names[i]!;
    const x = i * PANEL;
    ctx.fillStyle = i % 2 === 0 ? '#e8d9b5' : '#dccb9f';
    ctx.fillRect(x, 0, PANEL, PANEL);
    ctx.strokeStyle = 'rgba(0,0,0,0.35)';
    ctx.strokeRect(x + 0.5, 0.5, PANEL - 1, PANEL - 1);
    ctx.fillStyle = '#6b4a2b';
    if (name === 'front') {
      ctx.fillRect(x + 20, 52, 38, 76); // door
      ctx.fillStyle = '#8fc4e8';
      ctx.fillRect(x + 76, 40, 32, 32); // window
    } else if (name !== 'back') {
      ctx.fillStyle = '#8fc4e8';
      ctx.fillRect(x + 48, 40, 32, 32);
    }
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.font = '12px sans-serif';
    ctx.fillText(name, x + 6, 14);
  }
}
