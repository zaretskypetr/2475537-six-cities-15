import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { useUserSelector } from '../../store/reducer/user/selectors';
import { useFavoritesSelector } from '../../store/reducer/data/selectors';
import { AppRoute } from '../../const';
import { signOut } from '../../api/api-actions';
import { useAppDispatch } from '../../hooks/index';

function Logged() {
  const user = useAppSelector(useUserSelector);
  const favorites = useAppSelector(useFavoritesSelector);
  const dispatch = useAppDispatch();

  const handleLogout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(signOut());
  };

  return (
    <>
      <li className="header__nav-item user">
        <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">{user?.email}</span>
          <span className="header__favorite-count">{favorites.length}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" onClick={handleLogout} data-testid='sign-out-button'>
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </>
  );
}

export default Logged;
