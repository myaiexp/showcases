// Generated textures for the Texture examples: a labelled grid, a logo with alpha, a channel chart
import * as THREE from 'three';

/** A square grid with a red arrow and an "F", so rotation, offset and mirroring are easy to read. */
export function gridTexture(): THREE.CanvasTexture {
  const s = 512;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, s, s);
  grad.addColorStop(0, '#2d6cdf');
  grad.addColorStop(1, '#e0457b');
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  g.strokeStyle = 'rgba(255,255,255,0.8)';
  g.lineWidth = 3;
  for (let i = 0; i <= 8; i++) {
    g.beginPath();
    g.moveTo((i * s) / 8, 0);
    g.lineTo((i * s) / 8, s);
    g.moveTo(0, (i * s) / 8);
    g.lineTo(s, (i * s) / 8);
    g.stroke();
  }
  g.fillStyle = '#fff';
  g.font = 'bold 260px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('F', s / 2, s / 2 + 10);
  g.fillStyle = '#ffd23d';
  g.beginPath();
  g.moveTo(s * 0.5, 14);
  g.lineTo(s * 0.62, 90);
  g.lineTo(s * 0.38, 90);
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** A round badge with a ring and a star on a fully transparent background. */
export function logoTexture(): THREE.CanvasTexture {
  const s = 512;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d')!;
  g.clearRect(0, 0, s, s);
  g.fillStyle = '#ffd23d';
  g.beginPath();
  g.arc(s / 2, s / 2, 230, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#1b2236';
  g.beginPath();
  g.arc(s / 2, s / 2, 190, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#ffd23d';
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 70 : 150;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    g.lineTo(s / 2 + Math.cos(a) * r, s / 2 + Math.sin(a) * r);
  }
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** A DataTexture whose channels differ: R runs left to right, G bottom to top, B is a checker, A a radial fade. */
export function channelTexture(): THREE.DataTexture {
  const n = 256;
  const data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const i = (y * n + x) * 4;
      const d = Math.hypot(x - n / 2, y - n / 2) / (n / 2);
      data[i] = (x / (n - 1)) * 255;
      data[i + 1] = (y / (n - 1)) * 255;
      data[i + 2] = ((x >> 5) + (y >> 5)) % 2 ? 255 : 30;
      data[i + 3] = Math.max(0, 1 - d) * 255;
    }
  }
  const tex = new THREE.DataTexture(data, n, n, THREE.RGBAFormat);
  tex.needsUpdate = true;
  return tex;
}
