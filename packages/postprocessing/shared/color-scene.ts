// A colourful showroom: the shared scene plus a painted panorama wall
import * as THREE from 'three';
import { showroom, type SampleScene } from './scenes.ts';

export interface ColorSubject extends SampleScene {
  /** The painted wall's canvas texture; hand it to `stage.own()`. */
  panorama: THREE.CanvasTexture;
}

/** A canvas painting: dusk sky, hue strips, a grey ramp and a row of earth tones. */
function paint(): HTMLCanvasElement {
  const w = 2048;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext('2d')!;
  const sky = g.createLinearGradient(0, 0, 0, h * 0.38);
  sky.addColorStop(0, '#1a2250');
  sky.addColorStop(1, '#f08a5d');
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  const hues = (y0: number, y1: number, sat: number, light: number): void => {
    const grad = g.createLinearGradient(0, 0, w, 0);
    for (let i = 0; i <= 12; i++) grad.addColorStop(i / 12, `hsl(${i * 30} ${sat}% ${light}%)`);
    g.fillStyle = grad;
    g.fillRect(0, y0 * h, w, (y1 - y0) * h);
  };
  hues(0.38, 0.62, 90, 52);
  hues(0.62, 0.76, 40, 75);
  const ramp = g.createLinearGradient(0, 0, w, 0);
  ramp.addColorStop(0, '#000');
  ramp.addColorStop(0.5, '#fff');
  ramp.addColorStop(1, '#000');
  g.fillStyle = ramp;
  g.fillRect(0, 0.76 * h, w, 0.12 * h);
  const earth = ['#f1d3b8', '#d9a67f', '#a8734f', '#6e4a33', '#4c6b3a', '#8aa05a', '#3b5d7a', '#9bb7cf'];
  earth.forEach((c, i) => {
    g.fillStyle = c;
    g.fillRect((i / earth.length) * w, 0.88 * h, w / earth.length, 0.12 * h);
  });
  return canvas;
}

/** The showroom inside a cylinder wall painted with colour bands. */
export function colorShowroom(scene: THREE.Scene): ColorSubject {
  const subject = showroom(scene);
  const panorama = new THREE.CanvasTexture(paint());
  panorama.colorSpace = THREE.SRGBColorSpace;
  panorama.wrapS = THREE.RepeatWrapping;
  const wall = new THREE.Mesh(
    new THREE.CylinderGeometry(14, 14, 6, 96, 1, true),
    new THREE.MeshBasicMaterial({ map: panorama, side: THREE.BackSide, toneMapped: false }),
  );
  wall.position.y = 3;
  subject.group.add(wall);
  return { ...subject, panorama };
}
