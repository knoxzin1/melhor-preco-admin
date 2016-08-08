import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import App from './App';

const mapStateToProps = (state) => {
  return {
    isStarting: state.app.isStarting,
    isRehydrated: state.app.isRehydrated,
    isConnected: state.app.isConnected,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
