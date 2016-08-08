import { connect } from 'react-redux';
import { fetchLocations } from './actions';
import { locationListSelector } from './selector';
import LocationList from './LocationList';

const mapStateToProps = (state) => {
  return {
    ...locationListSelector(state),
    isConnected: state.app.isConnected,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchLocations: () => dispatch(fetchLocations()),
    handlePress: (id) => {
      props.navigator.push({
        name: 'Location',
        id: id,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationList);
