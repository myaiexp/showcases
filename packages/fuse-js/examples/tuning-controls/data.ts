// Sample dataset of popular JS packages searched by the example
export interface Pkg {
  name: string;
  description: string;
}

export const PACKAGES: readonly Pkg[] = [
  { name: 'React', description: 'A JavaScript library for building user interfaces' },
  { name: 'Vue.js', description: 'The progressive JavaScript framework for building UIs' },
  { name: 'Svelte', description: 'Cybernetically enhanced web apps, compile-time framework' },
  { name: 'Angular', description: 'A platform for building mobile and desktop web applications' },
  { name: 'Lodash', description: 'A modern JavaScript utility library delivering modularity' },
  { name: 'Axios', description: 'Promise based HTTP client for the browser and Node.js' },
  { name: 'Express', description: 'Fast, unopinionated, minimalist web framework for Node.js' },
  { name: 'Next.js', description: 'The React framework for production with server rendering' },
  { name: 'Three.js', description: 'JavaScript 3D library for creating WebGL experiences' },
  { name: 'D3.js', description: 'Data-driven documents for dynamic data visualization' },
  { name: 'Tailwind CSS', description: 'A utility-first CSS framework for rapid UI development' },
  { name: 'TypeScript', description: 'Typed superset of JavaScript that compiles to plain JS' },
  { name: 'Vite', description: 'Next generation frontend tooling, blazing fast dev server' },
  { name: 'Webpack', description: 'A static module bundler for modern JavaScript applications' },
  { name: 'Jest', description: 'Delightful JavaScript testing framework with a focus on simplicity' },
  { name: 'Prisma', description: 'Next-generation Node.js and TypeScript ORM for databases' },
  { name: 'Zustand', description: 'Small, fast, and scalable state management for React' },
  { name: 'Zod', description: 'TypeScript-first schema validation with static type inference' },
  { name: 'Motion', description: 'A tiny, performant animation library built on Web Animations API' },
  { name: 'Dexie.js', description: 'A minimalistic IndexedDB wrapper for browser storage' },
];
