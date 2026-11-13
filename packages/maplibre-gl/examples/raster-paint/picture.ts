// A generated picture (bars, rings, gradient) as a PNG data URL, no network
export function pictureDataUrl(size = 256): string {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('2d canvas unavailable');

  const sky = g.createLinearGradient(0, 0, 0, size);
  sky.addColorStop(0, '#2a6df4');
  sky.addColorStop(0.55, '#f4b23a');
  sky.addColorStop(1, '#2c8a4f');
  g.fillStyle = sky;
  g.fillRect(0, 0, size, size);

  // Saturated colour bars along the bottom, to make hue and saturation changes obvious.
  const bars = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#8e24aa'];
  bars.forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect((i * size) / bars.length, size * 0.78, size / bars.length, size * 0.22);
  });

  g.lineWidth = 6;
  for (let r = 20; r < 100; r += 26) {
    g.strokeStyle = r % 2 ? '#ffffff' : '#111111';
    g.beginPath();
    g.arc(size * 0.5, size * 0.38, r, 0, Math.PI * 2);
    g.stroke();
  }
  return canvas.toDataURL('image/png');
}
