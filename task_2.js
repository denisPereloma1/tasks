const getBondsData = () => {
  const cache = {}

  return async ({date, isins}) => {
    const data = [];
    const absentIsins = isins.filter((isin) => {
      if(cache[date] && cache[date][isin]) {
        data.push({isin, data: cache[date][isin]})
      }
      return cache[date] && !cache[date][isin]
    })

    if (cache[date] && absentIsins.length === 0) {
      return data
    }

    const result = await http.post({
      url: `/bonds/${date}`,
      body: absentIsins
    });

    cache[date] = result.reduce((result, {isin, data}) => {
      return {...result, [isin]: data}
    }, cache[date] ? {...cache[date]} : {});

    return [...data, ...result];
  }
};

// Вычислительная сложность: O(N)
// Оценка памяти: O(N)