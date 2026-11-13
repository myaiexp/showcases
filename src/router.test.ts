// Hash route parsing and formatting
import { describe, expect, it } from 'vitest';
import { type Route, formatRoute, parseRoute } from './router.ts';

describe('router', () => {
  it.each<[string, Route]>([
    ['', { view: 'home' }],
    ['#/', { view: 'home' }],
    ['#/anime-js', { view: 'package', pkg: 'anime-js' }],
    ['#/anime-js/', { view: 'package', pkg: 'anime-js' }],
    ['#/anime-js/stagger-grid', { view: 'example', pkg: 'anime-js', example: 'stagger-grid' }],
  ])('parses %j', (hash, route) => {
    expect(parseRoute(hash)).toEqual(route);
  });

  it.each(['#/Bad Slug', '#/a/b/c', '#/../etc', '#/-x'])('falls back to home for %j', (hash) => {
    expect(parseRoute(hash)).toEqual({ view: 'home' });
  });

  it.each<Route>([
    { view: 'home' },
    { view: 'package', pkg: 'zdog' },
    { view: 'example', pkg: 'zdog', example: 'spin-and-drag' },
  ])('round-trips %j', (route) => {
    expect(parseRoute(formatRoute(route))).toEqual(route);
  });
});
