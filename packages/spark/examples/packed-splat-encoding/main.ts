// HDR colours clip in the default 0..1 range; splatEncoding.rgbMax keeps them
import * as THREE from 'three';
import { PackedSplats, SplatMesh, utils, defines } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, readout, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';
import { rng } from '../../shared/subjects.ts';

const BULBS = 12;
const PER_BULB = 90;
const MAX_INTENSITY = 6;

/** Bulb k glows with intensity 0.5 .. 6 (HDR: channels above 1) in a warm hue. */
const intensityOf = (k: number): number => 0.5 + (k / (BULBS - 1)) * (MAX_INTENSITY - 0.5);

/** Encodes the bulbs straight into a packed array, passing the encoding to utils.setPackedSplat. */
function buildArray(encoding: Partial<defines.SplatEncoding> | undefined): Uint32Array {
  const count = BULBS * PER_BULB;
  const array = new Uint32Array(utils.computeMaxSplats(count) * 4);
  const rand = rng(9);
  for (let k = 0; k < BULBS; k++) {
    const i0 = intensityOf(k);
    for (let j = 0; j < PER_BULB; j++) {
      const a = rand() * Math.PI * 2;
      const r = 0.07 * Math.sqrt(rand());
      const falloff = 1 - (r / 0.07) ** 2 * 0.6;
      const level = i0 * falloff;
      utils.setPackedSplat(
        array,
        k * PER_BULB + j,
        (k / (BULBS - 1) - 0.5) * 2.7 + Math.cos(a) * r,
        Math.sin(a) * r,
        (rand() - 0.5) * 0.02,
        0.025,
        0.025,
        0.025,
        0,
        0,
        0,
        1,
        0.8,
        level,
        level * 0.45,
        level * 0.12,
        encoding,
      );
    }
  }
  return array;
}

function makeRow(encoding: Partial<defines.SplatEncoding> | undefined, y: number): { mesh: SplatMesh; packed: PackedSplats } {
  const packed = new PackedSplats({ packedArray: buildArray(encoding), numSplats: BULBS * PER_BULB, splatEncoding: encoding });
  // SplatMesh resets packedSplats.splatEncoding from its own option, so the range has to be given here too.
  const mesh = new SplatMesh({ packedSplats: packed, splatEncoding: encoding });
  mesh.position.set(0, y, 0);
  return { mesh, packed };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.7], orbit: false, height: 380 });
  const topLabel = overlay(el);
  wrapInCard(topLabel, ctx.preview);
  const bottom = document.createElement('div');
  bottom.style.cssText = topLabel.style.cssText;
  bottom.style.top = `${(ctx.preview ? 200 : 380) - 24}px`;
  el.append(bottom);

  let rgbMax = 6;
  let exposure = 1;
  let narrow = makeRow(undefined, 0.42);
  let wide = makeRow({ rgbMin: 0, rgbMax }, -0.42);
  stage.scene.add(narrow.mesh, wide.mesh);
  let note: HTMLElement | null = null;

  const report = (): void => {
    topLabel.textContent = 'default encoding: rgbMin 0, rgbMax 1';
    bottom.textContent = `splatEncoding: { rgbMax: ${rgbMax} }  (step ${(rgbMax / 255).toFixed(3)})`;
    if (note) {
      const k = BULBS - 1;
      const a = narrow.packed.getSplat(k * PER_BULB).color.clone(); // getSplat reuses its Color
      const b = wide.packed.getSplat(k * PER_BULB).color.clone();
      note.textContent = `brightest bulb centre, intended rgb (${MAX_INTENSITY}, ${(MAX_INTENSITY * 0.45).toFixed(2)}, ${(MAX_INTENSITY * 0.12).toFixed(2)})\ndefault stores (${a.r.toFixed(2)}, ${a.g.toFixed(2)}, ${a.b.toFixed(2)}); rgbMax ${rgbMax} stores (${b.r.toFixed(2)}, ${b.g.toFixed(2)}, ${b.b.toFixed(2)})`;
    }
  };

  const setExposure = (v: number): void => {
    exposure = v;
    // recolor multiplies the decoded colours, which is where values above 1 show up on screen.
    narrow.mesh.recolor.setScalar(v);
    wide.mesh.recolor.setScalar(v);
  };

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'exposure', 0.1, 1, 0.05, exposure, setExposure);
    slider(bar, 'rgbMax', 1, 8, 1, rgbMax, (v) => {
      rgbMax = v;
      stage.scene.remove(wide.mesh);
      wide.mesh.dispose();
      wide = makeRow({ rgbMin: 0, rgbMax }, -0.42);
      stage.scene.add(wide.mesh);
      setExposure(exposure);
      report();
    });
    note = readout(el);
  }
  report();

  stage.run((t) => {
    // Cards sweep the exposure down and back up: clipped highlights go flat, HDR ones keep their warmth.
    if (ctx.preview) setExposure(0.55 + 0.45 * Math.cos(t * 0.9));
  });
  return () => stage.dispose();
};

export default mount;
