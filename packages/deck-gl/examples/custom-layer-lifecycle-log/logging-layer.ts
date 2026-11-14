// LoggingScatterplotLayer: every lifecycle method logs, then runs its parent's
import type { DefaultProps, LayerContext, UpdateParameters } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import type { ScatterplotLayerProps } from '@deck.gl/layers';

export type LifecycleProps = {
  /** When true, a viewport change counts as a reason to update (like a screen-space layer). */
  updateOnViewport: boolean;
  onLifecycle: (line: string) => void;
};

export class LoggingScatterplotLayer<DataT = unknown> extends ScatterplotLayer<DataT, LifecycleProps> {
  static override layerName = 'LoggingScatterplotLayer';
  static override defaultProps = {
    updateOnViewport: false,
    onLifecycle: { type: 'function', value: () => {} },
  } as DefaultProps<ScatterplotLayerProps & LifecycleProps>;

  override initializeState(): void {
    this.props.onLifecycle('initializeState (once, when the id is new)');
    super.initializeState();
  }

  override shouldUpdateState(params: UpdateParameters<this>): boolean {
    const { changeFlags, props } = params;
    const should = props.updateOnViewport ? changeFlags.somethingChanged : super.shouldUpdateState(params);
    const flags = (['dataChanged', 'propsChanged', 'viewportChanged'] as const).filter((k) => changeFlags[k]);
    props.onLifecycle(`shouldUpdateState -> ${should}  (${flags.join(', ') || 'no flags'})`);
    return should;
  }

  override updateState(params: UpdateParameters<this>): void {
    params.props.onLifecycle('updateState');
    super.updateState(params);
  }

  override draw(params: Parameters<ScatterplotLayer['draw']>[0]): void {
    this.props.onLifecycle('draw');
    super.draw(params);
  }

  override finalizeState(context: LayerContext): void {
    this.props.onLifecycle('finalizeState (the id left the list)');
    super.finalizeState(context);
  }
}
