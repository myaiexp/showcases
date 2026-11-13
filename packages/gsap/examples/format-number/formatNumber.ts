// The official formatNumber() and getFormatter() helpers, copied from the docs (typed only)
import { gsap } from 'gsap';

// Source: docs/v3/HelperFunctions/helpers/formatNumber
// adds commas and forces 2 decimal places (or however many you pass).
export function formatNumber(value: number, decimals?: number): string {
  const s = (+value).toLocaleString('en-US').split('.');
  return decimals ? s[0] + '.' + ((s[1] || '') + '00000000').substr(0, decimals) : (s[0] as string);
}

// Source: the "getFormatter" section of the same page. Snaps to an increment, adds commas and
// optionally pads the decimals.
export function getFormatter(increment: number, pad?: boolean): (value: number) => string {
  const snap = gsap.utils.snap(increment);
  const exp = /\B(?=(\d{3})+(?!\d))/g;
  const snapWithCommas = (value: number): string => (snap(+value) + '').replace(exp, ',');
  const whole = increment % 1 === 0;
  const decimals = whole ? 0 : ((increment + '').split('.')[1] || '0').length;
  return !pad || whole
    ? snapWithCommas
    : (value: number) => {
        const s = snapWithCommas(value);
        let i = s.indexOf('.');
        ~i || (i = s.length);
        return s.substr(0, i) + '.' + (s.substr(i + 1, s.length - i - 1) + '00000000').substr(0, decimals);
      };
}
