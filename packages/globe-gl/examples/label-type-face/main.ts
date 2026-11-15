// Labels: labelTypeFace takes a Facetype-style font JSON, a code-made pixel font
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Label {
  lat: number;
  lng: number;
  text: string;
}

// 5 x 7 bitmaps, top row first. Every lit pixel becomes a square in the glyph outline.
const BITMAPS: Record<string, string> = {
  A: '01110 10001 10001 11111 10001 10001 10001',
  B: '11110 10001 10001 11110 10001 10001 11110',
  C: '01110 10001 10000 10000 10000 10001 01110',
  D: '11110 10001 10001 10001 10001 10001 11110',
  E: '11111 10000 10000 11110 10000 10000 11111',
  F: '11111 10000 10000 11110 10000 10000 10000',
  G: '01110 10001 10000 10111 10001 10001 01111',
  H: '10001 10001 10001 11111 10001 10001 10001',
  I: '01110 00100 00100 00100 00100 00100 01110',
  J: '00111 00010 00010 00010 00010 10010 01100',
  K: '10001 10010 10100 11000 10100 10010 10001',
  L: '10000 10000 10000 10000 10000 10000 11111',
  M: '10001 11011 10101 10101 10001 10001 10001',
  N: '10001 11001 10101 10011 10001 10001 10001',
  O: '01110 10001 10001 10001 10001 10001 01110',
  P: '11110 10001 10001 11110 10000 10000 10000',
  Q: '01110 10001 10001 10001 10101 10010 01101',
  R: '11110 10001 10001 11110 10100 10010 10001',
  S: '01111 10000 10000 01110 00001 00001 11110',
  T: '11111 00100 00100 00100 00100 00100 00100',
  U: '10001 10001 10001 10001 10001 10001 01110',
  V: '10001 10001 10001 10001 10001 01010 00100',
  W: '10001 10001 10001 10101 10101 11011 10001',
  X: '10001 10001 01010 00100 01010 10001 10001',
  Y: '10001 10001 01010 00100 00100 00100 00100',
  Z: '11111 00001 00010 00100 01000 10000 11111',
  '?': '01110 10001 00001 00010 00100 00000 00100',
  ' ': '00000 00000 00000 00000 00000 00000 00000',
};

/** The Facetype JSON format three's Font reads: a glyph table of `m`/`l` outline commands. */
function pixelTypeface(): object {
  const PX = 100; // font units per pixel
  const glyphs: Record<string, { ha: number; o?: string }> = {};
  for (const [ch, rows] of Object.entries(BITMAPS)) {
    const cmds: string[] = [];
    rows.split(' ').forEach((row, r) => {
      [...row].forEach((bit, c) => {
        if (bit !== '1') return;
        const x = c * PX;
        const y = (6 - r) * PX;
        // One counter-clockwise square per pixel.
        cmds.push('m', `${x} ${y}`, 'l', `${x + PX} ${y}`, 'l', `${x + PX} ${y + PX}`, 'l', `${x} ${y + PX}`, 'l', `${x} ${y}`);
      });
    });
    glyphs[ch] = cmds.length ? { ha: 6 * PX, o: cmds.join(' ') } : { ha: 4 * PX };
  }
  return {
    glyphs,
    familyName: 'Showcase Pixel',
    ascender: 700,
    descender: 0,
    underlinePosition: -100,
    underlineThickness: 100,
    boundingBox: { xMin: 0, xMax: 500, yMin: 0, yMax: 700 },
    resolution: 1000,
    original_font_information: {},
  };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['default typeface', 'pixel typeface'],
    hint: 'The right-hand globe passes labelTypeFace a font object assembled from 5 x 7 bitmaps; no font file is loaded.',
  });
  const dark = await texture('dark');
  const S = stage.preview ? 3.2 : 2;
  const names = ['London', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo'];
  // The pixel font only has capitals, so the labels read in uppercase.
  const make = (): Label[] =>
    names.map((n) => {
      const c = city(n);
      return { lat: c.lat, lng: c.lng, text: n.toUpperCase() };
    });

  const left = stage.own(new Globe(stage.panes[0]!.container), stage.panes[0])
    .globeImageUrl(dark)
    .labelsData(make())
    .labelSize(S)
    .labelDotRadius(S / 4);
  const right = stage.own(new Globe(stage.panes[1]!.container), stage.panes[1])
    .globeImageUrl(dark)
    .labelsData(make())
    .labelTypeFace(pixelTypeface())
    .labelColor(() => '#ffd166')
    .labelSize(S)
    .labelDotRadius(S / 4);

  for (const g of [left, right]) g.pointOfView({ lat: 45, lng: 20, altitude: 1.1 });
  if (stage.preview) {
    stage.loop((_dt, t) => {
      const pov = { lat: 45, lng: 20 + 8 * Math.sin(t * 0.5), altitude: 1.1 };
      left.pointOfView(pov);
      right.pointOfView(pov);
    });
  }

  return stage.dispose;
};

export default mount;
