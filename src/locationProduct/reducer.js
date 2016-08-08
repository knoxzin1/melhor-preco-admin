import { FETCH_PRODUCT_SUCCESS } from '../app/actionTypes';

const initialState = {};

export function locationProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      const locationProduct = action.payload.locationProduct;

      if (!locationProduct) {
        return state;
      }

      return Object.assign(state, action.payload.locationProduct);
    default:
      return state;
  }
}
