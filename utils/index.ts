export function getBudget(int: number): string {
  if (!int) return ' - '
  return int.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
}