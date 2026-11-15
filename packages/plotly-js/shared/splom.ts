// Axis defaults for scatterplot matrices: one xaxisN / yaxisN entry per dimension
/** Layout keys xaxis, xaxis2 ... and yaxis, yaxis2 ... each carrying the same small-tick style. */
export function splomAxes(n: number, tickSize = 10): Record<string, unknown> {
  const axis = (): Record<string, unknown> => ({ showline: false, zeroline: false, ticklen: 2, tickfont: { size: tickSize }, title: { font: { size: tickSize + 2 } } });
  const out: Record<string, unknown> = {};
  for (let i = 1; i <= n; i++) {
    out[i === 1 ? 'xaxis' : `xaxis${i}`] = axis();
    out[i === 1 ? 'yaxis' : `yaxis${i}`] = axis();
  }
  return out;
}
