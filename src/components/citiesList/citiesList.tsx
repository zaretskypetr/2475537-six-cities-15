import { City } from '../../types/location';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/reducer/application/reducer';
import { useCurrentCitySelector } from '../../store/reducer/application/selectors';

type CitiesListProps = {
  cities: City[];
};

function CitiesList({ cities }: CitiesListProps) {
  const activeCity = useAppSelector(useCurrentCitySelector);
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city.code} data-testid='city-wrapper'>
              <a className={`locations__item-link tabs__item ${city.code === activeCity?.code ? 'tabs__item--active' : ''}`} href="#"
                onClick={() => dispatch(changeCity(city))}
                data-testid={city.title}
              >
                <span>{city.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
