type RatingProps = {
  rating: number;
  className: string;
  showNumberValue: boolean;
};

function Rating({ rating, className, showNumberValue }: RatingProps) {
  const roundedRating = Math.floor(rating);

  return (
    <div className={`${className}__rating rating`} data-testid='rating-wrapper'>
      <div className={`${className}__stars rating__stars`}>
        <span style={{ width: `${roundedRating * 20}%` }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {showNumberValue && <span className={`${className}__rating-value rating__value`} data-testid='rating-value'>{rating}</span>}
    </div>
  );
}

export default Rating;
