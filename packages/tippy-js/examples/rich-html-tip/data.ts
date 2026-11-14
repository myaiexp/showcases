// Sample products: each tip is a constant HTML string
export interface Product {
  emoji: string;
  tint: string;
  tip: string;
}

export const PRODUCTS: Product[] = [
  {
    emoji: '🎧',
    tint: '#3b4a7a',
    tip: '<div class="tip-name">Studio Headphones</div><div class="tip-price"><b>$129</b> <s>$159</s></div><div class="tip-stars">★★★★☆ <span>4.2</span></div><div class="tip-stock in">In stock</div>',
  },
  {
    emoji: '⌨️',
    tint: '#4d3b6e',
    tip: '<div class="tip-name">Slim Keyboard</div><div class="tip-price"><b>$74</b></div><div class="tip-stars">★★★★★ <span>4.8</span></div><div class="tip-stock in">In stock</div>',
  },
  {
    emoji: '🖱️',
    tint: '#6e4b3b',
    tip: '<div class="tip-name">Quiet Mouse</div><div class="tip-price"><b>$39</b></div><div class="tip-stars">★★★☆☆ <span>3.4</span></div><div class="tip-stock out">Sold out</div>',
  },
];
