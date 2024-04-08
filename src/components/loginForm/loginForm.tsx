import { useState } from 'react';
import { authorize, fetchFavorites } from '../../api/api-actions';
import { useAppDispatch } from '../../hooks/index';

function LoginForm() {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(authorize(credentials))
      .then(() => dispatch(fetchFavorites()));
  };

  return (
    <form className="login__form form" action="#" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.login}
          onChange={(evt) => setCredentials({ ...credentials, login: evt.target.value })}
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(evt) => setCredentials({ ...credentials, password: evt.target.value })}
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit" onClick={handleSubmit}>
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
