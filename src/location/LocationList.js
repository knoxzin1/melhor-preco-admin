import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  ToolbarAndroid,
} from 'react-native';

import LocationItem from './LocationItem';
import { Loading, NoConnection } from '../components';

export default class LocationList extends Component {

  state = {
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
  };

  componentDidMount() {
    // Build rehydrated offline list
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.locations)
    });

    if (this.props.isConnected) {
      this.props.fetchLocations();
    }
  }

  componentWillReceiveProps(props) {
    if (!this.props.isConnected && props.isConnected && this.props.isEmpty) {
      this.props.fetchLocations();
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.locations),
    });
  }

  renderRow = (rowData) => {
    return (
      <LocationItem
        id={rowData.id}
        name={rowData.name}
        handlePress={this.props.handlePress} />);
  }

  render() {
    if (this.props.isFetching) {
      return (<Loading />);
    }

    if (!this.props.isFetching && this.props.isEmpty && !this.props.isConnected) {
      return (<NoConnection onPress={this.props.fetchLocations} />);
    }

    return (
      <View style={styles.base}>
        <ToolbarAndroid title="Melhor preço" style={styles.header} titleColor="white" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  header: {
    backgroundColor: '#009688',
    height: 56,
    flex: 0,
  },
});
