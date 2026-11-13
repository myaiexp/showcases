// Hash routes: #/ home, #/<pkg> package gallery, #/<pkg>/<example> example view

export type Route =
  | { view: 'home' }
  | { view: 'package'; pkg: string }
  | { view: 'example'; pkg: string; example: string };

const SLUG = /^[a-z0-9][a-z0-9-]*$/;

export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [pkg, example] = parts;
  if (parts.length === 1 && pkg && SLUG.test(pkg)) return { view: 'package', pkg };
  if (parts.length === 2 && pkg && example && SLUG.test(pkg) && SLUG.test(example)) {
    return { view: 'example', pkg, example };
  }
  return { view: 'home' };
}

export function formatRoute(route: Route): string {
  switch (route.view) {
    case 'home':
      return '#/';
    case 'package':
      return `#/${route.pkg}`;
    case 'example':
      return `#/${route.pkg}/${route.example}`;
  }
}

export function onRouteChange(handler: (route: Route) => void): void {
  const fire = (): void => handler(parseRoute(location.hash));
  window.addEventListener('hashchange', fire);
  fire();
}
