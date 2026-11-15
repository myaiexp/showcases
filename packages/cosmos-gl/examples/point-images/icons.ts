// Four small icons drawn on a canvas, returned as the ImageData cosmos.gl wants
export const ICON_NAMES = ['Star', 'Heart', 'Ring', 'Smiley'] as const;

export function drawIcons(size = 64): ImageData[] {
  return ICON_NAMES.map((name) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const c = canvas.getContext('2d');
    if (!c) throw new Error('2d canvas unavailable');
    const m = size / 2;
    c.fillStyle = '#ffffff';
    c.strokeStyle = '#ffffff';
    c.lineWidth = size / 8;
    c.beginPath();
    if (name === 'Star') {
      for (let k = 0; k < 10; k++) {
        const a = (k / 10) * Math.PI * 2 - Math.PI / 2;
        const r = k % 2 ? m * 0.42 : m * 0.9;
        c.lineTo(m + Math.cos(a) * r, m + Math.sin(a) * r);
      }
      c.closePath();
      c.fillStyle = '#ffd84d';
      c.fill();
    } else if (name === 'Heart') {
      c.moveTo(m, size * 0.85);
      c.bezierCurveTo(size * 0.05, size * 0.55, size * 0.1, size * 0.1, m, size * 0.35);
      c.bezierCurveTo(size * 0.9, size * 0.1, size * 0.95, size * 0.55, m, size * 0.85);
      c.fillStyle = '#ff5c7a';
      c.fill();
    } else if (name === 'Ring') {
      c.arc(m, m, m * 0.62, 0, Math.PI * 2);
      c.strokeStyle = '#4dd2ff';
      c.stroke();
    } else {
      c.arc(m, m, m * 0.88, 0, Math.PI * 2);
      c.fillStyle = '#7ee08a';
      c.fill();
      c.fillStyle = '#103018';
      c.beginPath();
      c.arc(size * 0.36, size * 0.4, size * 0.07, 0, Math.PI * 2);
      c.arc(size * 0.64, size * 0.4, size * 0.07, 0, Math.PI * 2);
      c.fill();
      c.beginPath();
      c.arc(m, size * 0.55, size * 0.22, 0.2, Math.PI - 0.2);
      c.strokeStyle = '#103018';
      c.lineWidth = size / 14;
      c.stroke();
    }
    return c.getImageData(0, 0, size, size);
  });
}
