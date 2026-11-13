// Two hand-written flow graph blocks: a sine-wave data block and an every-Nth execution block
import {
  FlowGraphBlock,
  FlowGraphExecutionBlock,
  RichTypeNumber,
  type FlowGraphContext,
  type FlowGraphDataConnection,
  type FlowGraphSignalConnection,
} from '@babylonjs/core';

/** A data block: outputs amplitude · sin(2π · frequency · time). Recomputed when read. */
export class SineWaveBlock extends FlowGraphBlock {
  readonly time: FlowGraphDataConnection<number>;
  readonly amplitude: FlowGraphDataConnection<number>;
  readonly frequency: FlowGraphDataConnection<number>;
  readonly value: FlowGraphDataConnection<number>;

  constructor() {
    super();
    this.time = this.registerDataInput('time', RichTypeNumber);
    this.amplitude = this.registerDataInput('amplitude', RichTypeNumber, 1);
    this.frequency = this.registerDataInput('frequency', RichTypeNumber, 0.5);
    this.value = this.registerDataOutput('value', RichTypeNumber);
  }

  // Called when another block asks for an output; cached once per execution id.
  override _updateOutputs(context: FlowGraphContext): void {
    const t = this.time.getValue(context);
    this.value.setValue(this.amplitude.getValue(context) * Math.sin(2 * Math.PI * this.frequency.getValue(context) * t), context);
  }

  override getClassName(): string {
    return 'SineWaveBlock';
  }
}

/** An execution block: passes every Nth `in` signal to `out`, the rest to `skipped`. */
export class EveryNthBlock extends FlowGraphExecutionBlock {
  readonly n: FlowGraphDataConnection<number>;
  readonly out: FlowGraphSignalConnection;
  readonly skipped: FlowGraphSignalConnection;

  constructor() {
    super();
    this.n = this.registerDataInput('n', RichTypeNumber, 30);
    this.out = this._registerSignalOutput('out');
    this.skipped = this._registerSignalOutput('skipped');
  }

  // Blocks hold no state of their own: the running count lives in the execution context,
  // so the same block serves any number of contexts.
  _execute(context: FlowGraphContext): void {
    const count = context._getExecutionVariable(this, 'count', 0) + 1;
    const n = Math.max(1, Math.round(this.n.getValue(context)));
    context._setExecutionVariable(this, 'count', count % n);
    if (count % n === 0) this.out._activateSignal(context);
    else this.skipped._activateSignal(context);
  }

  override getClassName(): string {
    return 'EveryNthBlock';
  }
}
