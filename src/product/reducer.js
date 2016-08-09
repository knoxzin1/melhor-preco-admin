import {
  FETCH_PRODUCT_PENDING,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,

  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,

  UPDATE_PRODUCT_FORM,
  CLEAR_PRODUCT_FORM,
} from '../app/actionTypes';

const initialState = {
  isFetching: false,
  error: false,
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
      return {
        ...state,
        isFetching: false,
        error: false,
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
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

const initialFormState = [];
export function productFormReducer(state = initialFormState, action) {
  switch (action.type) {
    case UPDATE_PRODUCT_FORM:
      const {
        name,
        price,
        navigatorKey,
      } = action.payload;

      const oldState = state[navigatorKey];

      return Object.assign(state, {
        [navigatorKey]: {
          ...oldState,
          name,
          price,
        },
      });
    case CLEAR_PRODUCT_FORM:
      return initialFormState;
    case FETCH_PRODUCT_SUCCESS:
      const { product, locationProduct } = action.payload;
      const key = action.payload.navigatorKey;

      if (!product) {
        return state;
      }

      const productId = Object.keys(product)[0];

      const locationProductId = locationProduct
        ? locationProduct.location
        : null;

      return Object.assign(state, {
        [key]: {
          productId,
          locationProductId,
          name: product[productId].name,
          price: locationProduct ? locationProduct.price : '',
        },
      });
    default:
      return state;
  }
}
