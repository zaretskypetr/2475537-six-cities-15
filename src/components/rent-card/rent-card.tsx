import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, CardType } from '../../const';
import { isAuthorized } from '../../services/utils';
import { OfferPreview } from '../../types/offer';
import Rating from '../rating/rating';
import { useAppSelector } from '../../hooks/index';
import { useAuthorizationStatusSelector } from '../../store/reducer/user/selectors';

type RentCardProps = {
  offer: OfferPreview;
  onActiveCardChanged?: (activeCard: string | null) => void;
  onFavoriteStatusChanged?: (offerId: string, isFavorite: boolean) => void;
  cardType: CardType;
};


function RentCard({ offer, onActiveCardChanged, onFavoriteStatusChanged, cardType }: RentCardProps) {
  const authorizationStatus = useAppSelector(useAuthorizationStatusSelector);
  const navigate = useNavigate();

  const handleMouseOver = () => {
    onActiveCardChanged?.(offer.id);
  };

  const handleMouseOut = () => {
    onActiveCardChanged?.(null);
  };

  const handleFavoriteStatusChanged = (offerId: string, isFavorite: boolean) => {
    if (!isAuthorized(authorizationStatus)) {
      navigate(AppRoute.Login);
    }
    onFavoriteStatusChanged?.(offerId, isFavorite);
  };

  const className = cardType === CardType.Regular ? 'cities' : 'favorites';
  const imageWidth = cardType === CardType.Regular ? 260 : 150;
  const imageHeight = cardType === CardType.Regular ? 200 : 110;

  return (
    <article className={`${className}__card place-card`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} data-testid='card-wrapper'>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={imageWidth}
            height={imageHeight}
            alt={offer.title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={() => handleFavoriteStatusChanged(offer.id, offer.isFavorite)}
            data-testid='offer-is-favorite'
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <Rating rating={offer.rating} className="place-card" showNumberValue={false} />
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type" style={{ textTransform: 'capitalize' }}>{offer.type}</p>
      </div>
    </article>
  );
}

export default memo(RentCard);
