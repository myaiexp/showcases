// Paints an equirectangular panorama (sky, sun, hills, grid) as a data URL
export function panorama(width = 2048): string {
  const height = width / 2;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d')!;

  const sky = g.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#0b1d4a');
  sky.addColorStop(0.45, '#4d8fd1');
  sky.addColorStop(0.5, '#f2c38b');
  sky.addColorStop(0.52, '#3b5d3a');
  sky.addColorStop(1, '#1d2b1a');
  g.fillStyle = sky;
  g.fillRect(0, 0, width, height);

  // A sun low in the west, and hill silhouettes that wrap seamlessly around 360°.
  const sun = g.createRadialGradient(width * 0.75, height * 0.42, 0, width * 0.75, height * 0.42, height * 0.12);
  sun.addColorStop(0, 'rgba(255,250,220,1)');
  sun.addColorStop(1, 'rgba(255,220,150,0)');
  g.fillStyle = sun;
  g.fillRect(0, 0, width, height);
  g.fillStyle = '#26402a';
  g.beginPath();
  g.moveTo(0, height);
  for (let x = 0; x <= width; x += 8) {
    const a = (x / width) * Math.PI * 2;
    g.lineTo(x, height * 0.5 - (Math.sin(a * 3) * 0.04 + Math.sin(a * 7 + 1) * 0.02 + 0.03) * height);
  }
  g.lineTo(width, height);
  g.fill();

  // Meridians every 30° and the horizon, labelled, so the projection is easy to read.
  g.strokeStyle = 'rgba(255,255,255,0.35)';
  g.fillStyle = 'rgba(255,255,255,0.8)';
  g.font = `${Math.round(height / 30)}px sans-serif`;
  for (let i = 0; i < 12; i++) {
    const x = (i / 12) * width;
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, height);
    g.stroke();
    g.fillText(`${i * 30}°`, x + 6, height * 0.47);
  }
  g.beginPath();
  g.moveTo(0, height / 2);
  g.lineTo(width, height / 2);
  g.stroke();
  return canvas.toDataURL('image/jpeg', 0.9);
}
