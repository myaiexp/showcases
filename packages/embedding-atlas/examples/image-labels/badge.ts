// Draws a small topic badge on a canvas and returns it as a PNG data URL
import { defaultCategoryColors } from 'embedding-atlas';

const colors = defaultCategoryColors(8);

export function topicBadge(name: string, index: number): string {
  const c = document.createElement('canvas');
  c.width = 144;
  c.height = 80;
  const g = c.getContext('2d')!;
  g.fillStyle = colors[index % colors.length]!;
  g.beginPath();
  g.roundRect(4, 4, 136, 72, 18);
  g.fill();
  g.fillStyle = '#0b0d12';
  g.font = 'bold 26px system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(name.slice(0, 7), 72, 42);
  return c.toDataURL('image/png');
}
