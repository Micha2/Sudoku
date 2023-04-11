export function range(start: number = 0, end: number = 0, step: number = 1): number[] {
  let range: number[] = []
  for (let i = start; i <= end; i = i + step)
    range.push(i)
  return range
}
