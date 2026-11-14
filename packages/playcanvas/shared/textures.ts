// Textures drawn on a 2D canvas, so examples need no image downloads
import * as pc from 'playcanvas';

export interface CanvasTextureOptions {
  size?: number;
  /** Texture name, shown in the debug tools. */
  name?: string;
  /** Mark colour data as sRGB (the default); data textures such as normal maps pass false. */
  srgb?: boolean;
  mipmaps?: boolean;
  addressU?: number;
  addressV?: number;
}

/** Draws on a square canvas with `draw` and uploads it as a pc.Texture. */
export function canvasTexture(
  device: pc.GraphicsDevice,
  draw: (g: CanvasRenderingContext2D, size: number) => void,
  { size = 256, name = 'canvas-texture', srgb = true, mipmaps = true, addressU, addressV }: CanvasTextureOptions = {},
): pc.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  draw(canvas.getContext('2d')!, size);
  const texture = new pc.Texture(device, {
    name,
    width: size,
    height: size,
    format: srgb ? pc.PIXELFORMAT_SRGBA8 : pc.PIXELFORMAT_RGBA8,
    mipmaps,
    minFilter: mipmaps ? pc.FILTER_LINEAR_MIPMAP_LINEAR : pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: addressU ?? pc.ADDRESS_REPEAT,
    addressV: addressV ?? pc.ADDRESS_REPEAT,
  });
  texture.setSource(canvas);
  return texture;
}

/** A two-colour checkerboard, `cells` squares along each side. */
export function checkerTexture(device: pc.GraphicsDevice, a = '#d8dce4', b = '#5a6070', cells = 8, size = 256): pc.Texture {
  return canvasTexture(
    device,
    (g, s) => {
      const c = s / cells;
      for (let y = 0; y < cells; y++) {
        for (let x = 0; x < cells; x++) {
          g.fillStyle = (x + y) % 2 ? b : a;
          g.fillRect(x * c, y * c, c, c);
        }
      }
    },
    { size, name: 'checker' },
  );
}

/** A soft round dot on transparent black, for particles and sprites. */
export function dotTexture(device: pc.GraphicsDevice, size = 64): pc.Texture {
  return canvasTexture(
    device,
    (g, s) => {
      const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, s, s);
    },
    { size, name: 'dot', addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE },
  );
}
