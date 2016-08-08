import { connect } from 'react-redux';
import { openScanner, closeScanner } from './actions';
import { locationEntitiesSelector, locationSelector } from './selector';
import Location from './Location';

const mapStateToProps = (state, props) => {
  return {
    location: locationEntitiesSelector(props.id)(state),
    scannerOpen: locationSelector(state).scannerOpen,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    productDetails: (e) => {
      props.navigator.push({
        name: 'Product',
        barcode: e.nativeEvent.text,
        location: props.id,
      });
    },
    productDetailsScanner: (e) => {

      dispatch(closeScanner());

      props.navigator.push({
        name: 'Product',
        barcode: e.data,
        location: props.id,
      });
    },
    handleIconClicked: () => {
      if (props.navigator.getCurrentRoutes().length > 1) {
        props.navigator.pop();
      }
    },
    openScanner: () => {
      dispatch(openScanner());
    },
    closeScanner: () => {
      dispatch(closeScanner());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
