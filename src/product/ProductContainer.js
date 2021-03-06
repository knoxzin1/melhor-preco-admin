import { connect } from 'react-redux';
import {
  addProduct,
  fetchProduct,
  updateProductForm,
} from './actions';
import { productSelector } from './selector';
import Product from './Product';

const mapStateToProps = (state, props) => {
  return {
    ...productSelector(state),
    formValue: state.productForm[props.navigatorKey],
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleFormChange: (value) => {
      dispatch(updateProductForm(value, props.navigatorKey));
    },
    handleSubmit: (product) => {
      dispatch(addProduct(product));
    },
    fetchProduct: () => {
      dispatch(fetchProduct(props.barcode, props.location, props.navigatorKey));
    },
    handleProductUpdated: () => {
      props.navigator.push({
        name: 'Location',
        id: props.location,
      });
    },
    handleIconClicked: () => {
      if (props.navigator.getCurrentRoutes().length > 1) {
        props.navigator.pop();
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
