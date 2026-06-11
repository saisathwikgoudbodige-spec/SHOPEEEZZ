export function applyPriceMovement(stock) {
  const movement = Number((Math.random() * 4 - 2).toFixed(2));
  const nextPrice = Math.max(1, Number((stock.price + movement).toFixed(2)));
  stock.change = Number((nextPrice - stock.price).toFixed(2));
  stock.changePercent = Number(((stock.change / stock.price) * 100).toFixed(2));
  stock.price = nextPrice;
  stock.history.push({ price: nextPrice });
  return stock;
}
