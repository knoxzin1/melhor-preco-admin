import {
  productReducer,
  productsReducer,
  productFormReducer,
} from './reducer';

import {
  addProduct,
  addProductOffline,
  fetchProduct,
  updateProductForm,
  clearProductForm,
} from './actions';

import Product from './Product';
import ProductContainer from './ProductContainer';

export {
  addProduct,
  addProductOffline,
  fetchProduct,
  updateProductForm,
  clearProductForm,

  productReducer,
  productsReducer,
  productFormReducer,

  Product,
  ProductContainer,
};
