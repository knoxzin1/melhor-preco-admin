import t from 'tcomb-form-native';

const ProductModel = t.struct({
  name: t.String,
  price: t.Number,
});

const options = {
  fields: {
    name: {
      label: 'Nome',
    },
    price: {
      label: 'Preço',
    },
  },
};

export {
  ProductModel,
  options,
};
