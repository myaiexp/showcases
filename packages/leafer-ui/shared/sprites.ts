// A painted 20-frame sprite sheet for the Robot examples, one row per direction
//
// The docs use `/image/arrows.png` (500 x 400, frames of 100 x 100: up 0-4, right 5-9, down 10-14,
// left 15-19). Frame 0 of each row is the still arrow; frames 1-4 slide chevrons along the arrow.
let url: string | undefined;

export function arrowSheet(): string {
  if (url) return url;
  const c = document.createElement('canvas');
  c.width = 500;
  c.height = 400;
  const g = c.getContext('2d')!;
  const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2]; // up, right, down, left
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      g.save();
      g.translate(col * 100 + 50, row * 100 + 50);
      g.fillStyle = '#32cd79';
      g.beginPath();
      g.roundRect(-44, -44, 88, 88, 18);
      g.fill();
      g.rotate(angles[row]!);
      g.fillStyle = '#fff';
      if (col === 0) {
        // The still arrow: one big head.
        g.beginPath();
        g.moveTo(0, -30);
        g.lineTo(26, 6);
        g.lineTo(9, 6);
        g.lineTo(9, 30);
        g.lineTo(-9, 30);
        g.lineTo(-9, 6);
        g.lineTo(-26, 6);
        g.closePath();
        g.fill();
      } else {
        // The moving arrow: three chevrons that slide forward with the frame number.
        for (let k = 0; k < 3; k++) {
          const y = 30 - ((k * 20 + col * 5) % 60);
          g.globalAlpha = 0.35 + 0.65 * (1 - (y + 30) / 60);
          g.beginPath();
          g.moveTo(-22, y + 12);
          g.lineTo(0, y - 8);
          g.lineTo(22, y + 12);
          g.lineTo(22, y + 22);
          g.lineTo(0, y + 2);
          g.lineTo(-22, y + 22);
          g.closePath();
          g.fill();
        }
      }
      g.restore();
    }
  }
  url = c.toDataURL('image/png');
  return url;
}
