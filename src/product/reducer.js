import {
  FETCH_PRODUCT_PENDING,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,

  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from '../app/actionTypes';

const initialState = {
  isFetching: false,
  isLoaded: false,
  error: false,
  product: null,
  productId: null,
  locationProduct: null,
  locationProductId: null,
  isCreating: false,
  created: false,
};

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_PENDING:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case FETCH_PRODUCT_SUCCESS:
      const { product, locationProduct } = action.payload;

      if (!product) {
        return {
          isFetching: false,
          isLoaded: true,
          error: false,
          product: null,
          productId: null,
          locationProduct: null,
          locationProductId: null,
          isCreating: false,
          created: false,
        };
      }

      const productId = Object.keys(product)[0];

      const locationProductId = locationProduct
        ? locationProduct.location
        : null;

      return {
        isFetching: false,
        isLoaded: true,
        error: false,
        product: product[productId],
        productId,
        locationProduct,
        locationProductId,
        isCreating: false,
        created: false,
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        isFetching: false,
        isLoaded: true,
        error: action.payload,
        product: null,
        productId: null,
        locationProduct: null,
        locationProductId: null,
        isCreating: false,
        created: false,
      };
    case ADD_PRODUCT_PENDING:
      return {
        ...state,
        isCreating: true,
        created: false,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isCreating: false,
        created: true,
      };
    case ADD_PRODUCT_FAILURE:
      return {
        ...state,
        isCreating: false,
        created: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function productsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      const product = action.payload.product;

      if (!product) {
        return state;
      }

      return Object.assign(state, product);
    default:
      return state;
  }
}
