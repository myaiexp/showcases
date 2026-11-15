// Evaluates autodiff expressions at chosen values, through genGradient
import { genGradient, type Num, type Var } from '@penrose/core';

/**
 * `compile` in the core's Autodiff module would do this, but the package's `compile` is the
 * trio compiler and shadows it. genGradient is exported: with the expression as the only
 * objective and weight 0, its `phi` is the expression's value.
 */
export async function evaluator(vars: Var[], exprs: Num[]): Promise<(values: number[]) => number[]> {
  const grads = await Promise.all(exprs.map((e) => genGradient(vars, [e], [])));
  const grad = new Float64Array(vars.length);
  return (values) => {
    const xs = new Float64Array(vars.map((v, i) => values[i] ?? v.val));
    return grads.map((g) => g({ inputMask: vars.map(() => true), objMask: [true], constrMask: [] }, xs, 0, grad).phi);
  };
}
