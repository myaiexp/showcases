// CPUAggregator used directly: a longitude histogram of weights
import { Attribute, Deck } from '@deck.gl/core';
import { CPUAggregator } from '@deck.gl/aggregation-layers';
import type { AggregationOperation } from '@deck.gl/aggregation-layers';
import { ColumnLayer } from '@deck.gl/layers';
import type { Mount } from '@/types.ts';
import { check, controlBar, readout, select, slider } from '../../shared/controls.ts';
import { europeView, spots } from '../../shared/aggregation-data.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { landLayer } from '../../shared/world.ts';

interface Column {
  position: [number, number];
  value: number;
  count: number;
}

const OPS: readonly AggregationOperation[] = ['SUM', 'MEAN', 'MIN', 'MAX', 'COUNT'];
const LAT = 44; // the histogram's columns stand along this parallel

/** Custom reducer for CPUAggregator's customOperations: the median value of a bin. */
function median(pointIndices: number[], getValue: (index: number) => number): number {
  const values = pointIndices.map(getValue).sort((a, b) => a - b);
  return values[values.length >> 1]!;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const points = spots(ctx.preview ? 900 : 4000);
  const view = europeView(ctx.preview, { pitch: 55, bearing: -20, latitude: 45 });
  const info = ctx.preview ? null : readout(el);

  // The input: one single-value attribute per field. noAlloc: the data is set by hand.
  const longitude = new Attribute(stage.device, { id: 'longitude', size: 1, noAlloc: true });
  longitude.setData({ value: Float32Array.from(points, (p) => p.position[0]) });
  const weight = new Attribute(stage.device, { id: 'weight', size: 1, noAlloc: true });
  weight.setData({ value: Float32Array.from(points, (p) => p.weight) });

  // Dimension 1: a bin id is a single integer, the index of a longitude interval.
  const aggregator = new CPUAggregator({
    dimensions: 1,
    getBin: {
      sources: ['longitude'],
      getValue: (data: { longitude: number }, _index: number, options: { binSize: number }) => [Math.floor(data.longitude / options.binSize)],
    },
    getValue: [{ sources: ['weight'], getValue: (data: { weight: number }) => data.weight }],
  });

  /** Runs the aggregation and reads each bin back as a column to draw. */
  const aggregate = (binSize: number, operation: AggregationOperation, useMedian: boolean): Column[] => {
    aggregator.setProps({
      pointCount: points.length,
      attributes: { longitude, weight },
      operations: [operation],
      customOperations: [useMedian ? median : null],
      binOptions: { binSize },
    });
    aggregator.update();
    const [min, max] = aggregator.getResultDomain(0);
    if (info) info.textContent = `${aggregator.binCount} bins, result domain [${min}, ${max}]`;
    const columns: Column[] = [];
    for (let i = 0; i < aggregator.binCount; i++) {
      const bin = aggregator.getBin(i)!;
      columns.push({ position: [(bin.id[0]! + 0.5) * binSize, LAT], value: bin.value[0]!, count: bin.count });
    }
    return columns;
  };

  const layer = (binSize: number, operation: AggregationOperation, useMedian: boolean): ColumnLayer<Column> =>
    new ColumnLayer<Column>({
      id: 'histogram',
      data: aggregate(binSize, operation, useMedian),
      getPosition: (d) => d.position,
      getElevation: (d) => d.value,
      getFillColor: (d) => [90 + d.count * 0.5, 180 - d.value * 0.4, 255, 230],
      radius: binSize * 40000, // metres: narrower than the bin, so neighbours do not touch
      diskResolution: 4,
      angle: 45,
      elevationScale: (operation === 'COUNT' ? 900 : 120) * (ctx.preview ? 3 : 1),
      extruded: true,
    });

  const deck = new Deck({ device: stage.device, initialViewState: view, controller: !ctx.preview, layers: [landLayer(), layer(1, 'SUM', false)] });

  let stop: () => void = () => {};
  if (ctx.preview) {
    let last = 0;
    stop = animate((t) => {
      const size = Math.round((0.6 + (1 + Math.sin(t * 0.8)) * 0.7) * 10) / 10;
      if (size === last) return;
      last = size;
      deck.setProps({ layers: [landLayer(), layer(size, 'SUM', false)] });
    });
  } else {
    let [size, op, med] = [1, 'SUM', false] as [number, AggregationOperation, boolean];
    const refresh = (): void => deck.setProps({ layers: [landLayer(), layer(size, op, med)] });
    const bar = controlBar(el);
    slider(bar, 'binSize (deg)', 0.25, 3, 0.25, size, (v) => ((size = v), refresh()));
    select(bar, 'operations[0]', OPS, (v) => ((op = v), refresh()), op);
    check(bar, 'customOperations: median', med, (v) => ((med = v), refresh()));
  }
  return () => {
    stop();
    stage.release(deck);
    aggregator.destroy();
    longitude.delete();
    weight.delete();
  };
};

export default mount;
