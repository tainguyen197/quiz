const api = "https://fakestoreapi.com/products";

export const getProductsList = async () => {
  const rs = await fetch(api).then((res) => res.json());

  return rs;
};

export const getQuestionList = async () => {
  const rs = await fetch(api).then((res) => res.json());

  return rs;
};
