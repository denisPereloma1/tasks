const getPercentages = (arr) => {
  const MAX_ARRAY_SIZE = 40000000;

  if (arr.length > MAX_ARRAY_SIZE) {
    throw new Error('Размер входного массива превышает максимально допустимый предел.');
  }

  const sum = arr.reduce((result, item) => result + parseFloat(item), 0);
  return arr.map((part) => (parseFloat(part) / sum * 100).toFixed(3))
}

// Вычислительная сложность: O(N)
// Оценка памяти: O(N)
