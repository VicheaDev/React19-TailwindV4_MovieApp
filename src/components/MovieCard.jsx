import PropTypes from 'prop-types';
import noMovie from "../assets/no-movie.png";
import star from "../assets/star.svg";

const MovieCard = ({
  movie: { title, poster_path, release_date, vote_average, original_language },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : noMovie
        }
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src={star} alt="rating" />
            <p>{vote_average}</p>
          </div>
          <span>•</span>
          <p className="lang text-white">{original_language}</p>
          <span>•</span>
          <p className="year text-white">
            {release_date ? release_date.slice(0, 4) : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

// ✅ Add PropTypes validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string, // Can be null
    release_date: PropTypes.string, // Can be null
    vote_average: PropTypes.number.isRequired,
    original_language: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
