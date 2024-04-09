import { useState } from 'react';
import { NewReview } from '../../types/offer';
import EditableRating from '../editabeRating/editableRating';

type ReviewFormProps = {
  offerId: string;
  onReviewAdded: (newReview: NewReview) => void;
};

function ReviewForm({ offerId, onReviewAdded }: ReviewFormProps) {
  const emptyReview = { text: '', rating: 0 };

  const [review, setReview] = useState(emptyReview);

  const handleSubmit = (evt: React.MouseEvent) => {
    evt.preventDefault();
    onReviewAdded({
      comment: review.text,
      rating: review.rating,
      offerId,
    });
    setReview(emptyReview);
  };

  const handleRatingChanged = (newRating: number) => {
    setReview({ ...review, rating: newRating });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <EditableRating value={review.rating} onRatingChanged={handleRatingChanged} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.text}
        onChange={(evt) => setReview({ ...review, text: evt.target.value })}
        data-testid='review-comment'
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.text.length < 50}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
