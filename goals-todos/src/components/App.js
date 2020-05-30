import React from 'react';
import { connect } from 'react-redux';
import ConnectedTodos from './Todos';
import ConnectedGoals from './Goals';
import { handleReceiveItems } from '../actions/shared';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleReceiveItems());
  }
  render() {
    const { loading } = this.props;

    return loading ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

export default connect((state) => ({
  loading: state.loading,
}))(App);
