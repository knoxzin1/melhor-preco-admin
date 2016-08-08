import { connect } from 'react-redux';
import { addProduct, addProductOffline, fetchProduct } from './actions';
import { productSelector } from './selector';
import Product from './Product';

const mapStateToProps = (state, props) => {
  return {
    ...productSelector(state),
    isConnected: state.app.isConnected,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSubmit: (product) => {
      if (props.isConnected) {
        dispatch(addProduct(product));
      } else {
        dispatch(addProductOffline(product));
      }
    },
    fetchProduct: () => {
      dispatch(fetchProduct(props.barcode, props.location));
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
