// A 48px canvas thumbnail per row: topic color, shape, row number
import { defaultCategoryColors } from 'embedding-atlas';

const colors = defaultCategoryColors(8);
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 48;

export function thumbnail(topic: number, row: number): string {
  const g = canvas.getContext('2d')!;
  g.clearRect(0, 0, 48, 48);
  g.fillStyle = colors[topic % colors.length]!;
  g.beginPath();
  // Each topic gets a polygon with topic + 3 sides.
  const sides = topic + 3;
  for (let k = 0; k < sides; k++) {
    const a = (k / sides) * Math.PI * 2 - Math.PI / 2;
    g.lineTo(24 + Math.cos(a) * 22, 24 + Math.sin(a) * 22);
  }
  g.fill();
  g.fillStyle = '#0b0d12';
  g.font = 'bold 13px system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(String(row), 24, 26);
  return canvas.toDataURL('image/png');
}
