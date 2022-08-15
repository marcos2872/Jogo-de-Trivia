import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken, saveNameGravatar } from '../redux/actions';
import {
  container,
  inputContainer,
  buttonContainer,
  formContainer,
} from './login.module.scss';

const emailValidation = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const num = 3;

function Login(props) {
  const { disptachFetchToken, redirect, saveName } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [btn, setBtn] = useState({ name: false, email: false });
  const [settings, setSettings] = useState(false);

  return (
    <main className={ container }>

      {settings && <Redirect to="/settings" />}
      {redirect && <Redirect to="/game" />}
      <form className={ formContainer }>
        <div className={ inputContainer }>
          <input
            type="text"
            placeholder="Digite seu nome"
            data-testid="input-player-name"
            value={ name }
            onChange={ ({ target }) => {
              setName(target.value);
              setBtn({ ...btn, name: target.value.length >= num });
            } }
          />
          <input
            type="text"
            placeholder="Digite seu E-mail"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ ({ target }) => {
              setEmail(target.value);
              setBtn({ ...btn, email: emailValidation.test(target.value) });
            } }
          />
        </div>

        <div className={ buttonContainer }>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(btn.name && btn.email) }
            onClick={ () => {
              disptachFetchToken();
              saveName({ name, email });
            } }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => {
              setSettings(true);
            } }
          >
            Settings
          </button>
        </div>
      </form>
    </main>
  );
}

Login.propTypes = {
  disptachFetchToken: PropTypes.func,
  redirect: PropTypes.bool,
  saveName: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ token }) => ({
  redirect: token.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  disptachFetchToken: () => dispatch(fetchToken()),
  saveName: (data) => dispatch(saveNameGravatar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
