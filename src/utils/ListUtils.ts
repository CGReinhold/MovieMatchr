export const shuffle = (list: any[]) => {
  const array = [...list];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const takeRandom = (list: any[], size: number) => {
  return shuffle(list).slice(0, size);
};
