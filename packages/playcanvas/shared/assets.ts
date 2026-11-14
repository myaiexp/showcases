// Assets chapter: in-memory image blobs, blob URL bookkeeping, textured boxes
import * as pc from 'playcanvas';
import { addShape, material } from './components.ts';

/** Tracks blob URLs so the example can revoke every one on cleanup. */
export class BlobUrls {
  private urls = new Set<string>();

  from(data: BlobPart | Blob, type = 'application/octet-stream'): string {
    const blob = data instanceof Blob ? data : new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    this.urls.add(url);
    return url;
  }
  revoke(url: string): void {
    URL.revokeObjectURL(url);
    this.urls.delete(url);
  }
  dispose(): void {
    for (const url of this.urls) URL.revokeObjectURL(url);
    this.urls.clear();
  }
}

/** The url of an asset's file, if it has one (the typings give `file` as a plain object). */
export function fileUrl(asset: pc.Asset): string | undefined {
  return (asset.file as { url?: string } | null)?.url;
}

export type Drawer = (g: CanvasRenderingContext2D, size: number) => void;

/** A coloured tile with a big label, so every generated texture is recognisable. */
export function tileDrawer(label: string, hue: number): Drawer {
  return (g, size) => {
    const grad = g.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, `hsl(${hue} 70% 62%)`);
    grad.addColorStop(1, `hsl(${(hue + 50) % 360} 70% 38%)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    g.strokeStyle = 'rgba(255,255,255,0.55)';
    g.lineWidth = size / 32;
    g.strokeRect(size / 16, size / 16, size * 0.875, size * 0.875);
    g.fillStyle = '#fff';
    g.font = `bold ${Math.round(size / 2.4)}px sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(label, size / 2, size / 2);
  };
}

/** Draws on a square canvas and encodes it as an image blob (png, jpeg or webp). */
export function canvasBlob(draw: Drawer, size = 128, type = 'image/png', quality?: number): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  draw(canvas.getContext('2d')!, size);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error(`toBlob gave nothing for ${type}`))), type, quality);
  });
}

/** A texture asset (not yet added to a registry) that loads from a blob URL. */
export function textureAsset(name: string, url: string, filename: string, tags: string[] = []): pc.Asset {
  const asset = new pc.Asset(name, 'texture', { url, filename }, { srgb: true });
  if (tags.length) asset.tags.add(tags);
  return asset;
}

/** A plain grey box that shows a texture once `setMap` gives it one. */
export function addMapBox(parent: pc.GraphNode, name: string, position: [number, number, number], size = 1.5): pc.Entity {
  return addShape(parent, 'box', material('#6b7080'), position, size, name);
}

/** Puts a texture on a box's material, or clears it back to grey. */
export function setMap(box: pc.Entity, texture: pc.Texture | null | undefined, grey = '#6b7080'): void {
  const mat = box.render!.meshInstances[0]!.material as pc.StandardMaterial;
  mat.diffuseMap = texture ?? null;
  mat.diffuse = texture ? pc.Color.WHITE.clone() : new pc.Color().fromString(grey);
  mat.update();
}
