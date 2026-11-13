// A small GSAP plugin that tweens a number shown in an element's text
interface CounterVars {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

// The instance GSAP creates for each target: init() fills it, render() reads it back.
interface CounterState extends CounterVars {
  target: HTMLElement;
  from: number;
  _props: string[];
}

/**
 * A plugin is an object with a unique `name` (the vars key it claims), an `init` that runs
 * once per target when the tween first renders, and a `render` that runs on every update
 * with the eased ratio (0..1) and the instance as `data`.
 */
export const counterPlugin = {
  name: 'counterTo',
  init(this: CounterState, target: HTMLElement, value: CounterVars): void {
    this.target = target;
    this.from = parseFloat(target.textContent ?? '') || 0;
    this.to = value.to;
    this.prefix = value.prefix ?? '';
    this.suffix = value.suffix ?? '';
    this.decimals = value.decimals ?? 0;
    this._props.push('counterTo'); // lets killTweensOf(target, 'counterTo') find this tween
  },
  render(ratio: number, data: CounterState): void {
    const n = data.from + (data.to - data.from) * ratio;
    data.target.textContent = `${data.prefix}${n.toFixed(data.decimals)}${data.suffix}`;
  },
};
