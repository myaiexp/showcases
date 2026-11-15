// Fundamentals helpers: a user template laid over the dark house template
import type { Template } from 'plotly.js';

/**
 * A template made by an example (Plotly.makeTemplate or by hand) with the dark house
 * template under it: the example's keys win, the house axes, fonts and paper fill the rest.
 */
export function overDark(house: Template, own: Partial<Template>): Template {
  return {
    ...own,
    data: { ...(house.data ?? {}), ...(own.data ?? {}) },
    layout: { ...(house.layout ?? {}), ...(own.layout ?? {}) },
  } as Template;
}
