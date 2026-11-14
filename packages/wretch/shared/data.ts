// Sample records the in-memory server hands out: posts, users and products

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  city: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
}

export const POSTS: Post[] = [
  { id: 1, userId: 1, title: 'Morning light over the lake', body: 'Mist lifts off the water before seven.' },
  { id: 2, userId: 1, title: 'A field guide to pine cones', body: 'Spruce cones hang, pine cones stand.' },
  { id: 3, userId: 2, title: 'Bread that rises overnight', body: 'Twelve hours in a cool kitchen.' },
  { id: 4, userId: 2, title: 'Fixing a squeaky bicycle', body: 'Usually the chain, sometimes the saddle.' },
  { id: 5, userId: 3, title: 'Reading maps without a phone', body: 'North is up, contour lines are hills.' },
  { id: 6, userId: 3, title: 'Winter swimming, week one', body: 'Thirty seconds felt like ten minutes.' },
];

export const USERS: User[] = [
  { id: 1, name: 'Aino Virtanen', email: 'aino@mail.example', city: 'Jyväskylä' },
  { id: 2, name: 'Ben Okafor', email: 'ben@mail.example', city: 'Lagos' },
  { id: 3, name: 'Chloé Martin', email: 'chloe@mail.example', city: 'Lyon' },
  { id: 4, name: 'Daichi Sato', email: 'daichi@mail.example', city: 'Sapporo' },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Wool socks', price: 14, tags: ['clothing', 'winter'] },
  { id: 2, name: 'Camping stove', price: 89, tags: ['outdoor', 'cooking'] },
  { id: 3, name: 'Head torch', price: 32, tags: ['outdoor', 'light'] },
  { id: 4, name: 'Rain jacket', price: 120, tags: ['clothing', 'outdoor'] },
  { id: 5, name: 'Thermos', price: 25, tags: ['cooking', 'winter'] },
];

export const findPost = (id: string | number): Post | undefined => POSTS.find((p) => p.id === Number(id));
export const findUser = (id: string | number): User | undefined => USERS.find((u) => u.id === Number(id));
