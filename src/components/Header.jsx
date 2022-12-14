import React from 'react';
import { Link } from 'react-router-dom';
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
        <h1 data-testid="header-user-name">{ userName }</h1>
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
