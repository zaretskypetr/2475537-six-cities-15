import { Link } from 'react-router-dom';
import { signOut } from '../../api/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import Logged from './logged';
import NotLogged from './notLogged';
import { Namespace } from '../../store/const';

function AppHeader() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  const handleLogout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(signOut());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? <Logged onLogout={handleLogout} /> : <NotLogged />}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
