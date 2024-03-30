export * from './Timer'

export const getRandomNumberFromArray = (numbers: number[], numberDefault?: number) => {
  if (numbers.length === 0) {
    return numberDefault ?? 0
  }
  const randomIndex = Math.floor(Math.random() * numbers.length)
  return numbers[randomIndex]
}

export const Sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
