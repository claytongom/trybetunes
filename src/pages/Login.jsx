import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    userName: '',
    disabledBtn: true,
    loading: false,
  };

  checkUserName = ({ target }) => {
    const minChar = 3;
    const { value } = target;
    const disabledBtn = value.length < minChar;
    this.setState({ userName: value, disabledBtn });
  };

  handleSubmit = async () => {
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      const { userName } = this.state;
      await createUser({ name: userName });
      history.push('/search');
    });
  };

  render() {
    const { userName, disabledBtn, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="user-name">
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.checkUserName }
              name="user-name"
              value={ userName }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ disabledBtn }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
