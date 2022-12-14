import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ userName: user.name, loading: false });
    });
  }

  render() {
    const { userName, loading } = this.state;

    return (
      <header data-testid="header-component">
        { loading && <Loading /> }
        <h1 data-testid="header-user-name">
          { userName }
        </h1>
      </header>
    );
  }
}

export default Header;
