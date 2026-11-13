// Draws the test pattern: a checker with an up arrow, so every transform is easy to read
export function drawPattern(size = 256): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas is not available');

  const cells = 8;
  const cell = size / cells;
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#e8e2d0' : '#3b5a7a';
      ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }

  // An arrow pointing up (canvas top is the texture's top), with a dot at the lower left
  // corner, which is the texture's (0, 0) and the default centre of rotation.
  ctx.fillStyle = '#e0453a';
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.12);
  ctx.lineTo(size * 0.78, size * 0.48);
  ctx.lineTo(size * 0.6, size * 0.48);
  ctx.lineTo(size * 0.6, size * 0.86);
  ctx.lineTo(size * 0.4, size * 0.86);
  ctx.lineTo(size * 0.4, size * 0.48);
  ctx.lineTo(size * 0.22, size * 0.48);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#111';
  ctx.stroke();

  ctx.fillStyle = '#2fbf71';
  ctx.beginPath();
  ctx.arc(size * 0.07, size * 0.93, size * 0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 8;
  ctx.strokeStyle = '#111';
  ctx.strokeRect(0, 0, size, size);
  return canvas;
}
