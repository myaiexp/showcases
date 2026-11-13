// Bars with smoothly growing scale, drawn at the stepped uint8 log scale
import * as THREE from 'three';
import { PackedSplats, SplatMesh, utils } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, overlay, readout, slider } from '../../shared/controls.ts';
import { wrapInCard } from '../../shared/labels.ts';

const N = 64;
const S_MIN = 0.03;
// Docs: scales are quantized from ln(scale) over e^-12 .. e^9 into 254 steps.
const LN_STEP = 21 / 254;

interface Row {
  requested: number[];
  decoded: number[];
  bytes: number[];
}

/** Writes N bars into `packed` and reads back what the packed bytes decode to. */
function fillRow(packed: PackedSplats, range: number): Row {
  const row: Row = { requested: [], decoded: [], bytes: [] };
  const centre = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const color = new THREE.Color();
  for (let i = 0; i < N; i++) {
    const requested = S_MIN * range ** (i / (N - 1));
    centre.set((i / (N - 1) - 0.5) * 2.6, 0, 0);
    color.setHSL(0.6 - 0.6 * (i / (N - 1)), 0.75, 0.55);
    packed.setSplat(i, centre, new THREE.Vector3(0.016, requested, 0.016), quat, 0.95, color);
    // Byte 12 of the splat is the x scale, byte 13 the y scale: the one we varied.
    row.bytes.push((packed.packedArray![i * 4 + 3]! >>> 8) & 0xff);
    row.decoded.push(utils.unpackSplat(packed.packedArray!, i).scales.y);
    row.requested.push(requested);
  }
  packed.needsUpdate = true;
  return row;
}

function drawChart(canvas: HTMLCanvasElement, row: Row, mark: number): void {
  const g = canvas.getContext('2d')!;
  const { width: w, height: h } = canvas;
  g.clearRect(0, 0, w, h);
  const lo = Math.log(row.requested[0]! * 0.9);
  const hi = Math.log(row.requested[N - 1]! * 1.1);
  const px = (i: number): number => 8 + (i / (N - 1)) * (w - 16);
  const py = (v: number): number => h - 8 - ((Math.log(v) - lo) / (hi - lo)) * (h - 16);
  const line = (values: number[], color: string, step: boolean): void => {
    g.beginPath();
    values.forEach((v, i) => {
      if (i === 0) g.moveTo(px(i), py(v));
      else {
        if (step) g.lineTo(px(i), py(values[i - 1]!));
        g.lineTo(px(i), py(v));
      }
    });
    g.strokeStyle = color;
    g.lineWidth = 2;
    g.stroke();
  };
  line(row.requested, '#777', false);
  line(row.decoded, '#6fd08c', true);
  g.fillStyle = '#e8ecf2';
  g.fillRect(px(mark) - 1, 4, 2, h - 8);
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 2.2], orbit: false, height: 340 });
  const packed = new PackedSplats();
  let range = 4;
  let row = fillRow(packed, range);
  const mesh = new SplatMesh({ packedSplats: packed });
  stage.scene.add(mesh);
  const label = overlay(el);
  wrapInCard(label, ctx.preview);

  let mark = Math.floor(N / 2);
  let chart: HTMLCanvasElement | null = null;
  let note: HTMLElement | null = null;
  const show = (): void => {
    const err = ((row.decoded[mark]! / row.requested[mark]! - 1) * 100).toFixed(1);
    const text = `splat ${mark}: requested ${row.requested[mark]!.toFixed(5)} -> byte ${row.bytes[mark]} -> decoded ${row.decoded[mark]!.toFixed(5)} (${err}%)`;
    label.textContent = text;
    if (note) note.textContent = `${text}\nOne byte step multiplies the scale by e^(21/254) = ${Math.exp(LN_STEP).toFixed(3)} (+${((Math.exp(LN_STEP) - 1) * 100).toFixed(1)}%). Grey: requested. Green: decoded.`;
    if (chart) drawChart(chart, row, mark);
  };

  if (!ctx.preview) {
    chart = document.createElement('canvas');
    chart.width = 900;
    chart.height = 150;
    chart.style.cssText = 'width:100%;height:150px;display:block;margin-top:8px';
    el.append(chart);
    const bar = controlBar(el);
    slider(bar, 'range (x)', 1.2, 10, 0.2, range, (v) => ((range = v), (row = fillRow(packed, v)), show()));
    slider(bar, 'inspect splat', 0, N - 1, 1, mark, (v) => ((mark = v), show()));
    note = readout(el);
  }
  show();

  stage.run((t) => {
    // Cards walk the inspected splat along the row.
    if (ctx.preview) {
      const next = Math.floor((t * 6) % N);
      if (next !== mark) ((mark = next), show());
    }
  });
  return () => stage.dispose();
};

export default mount;
