import PropTypes from 'prop-types';

export const Filter = ({ onInput }) => {
  return (
    <label>
      Find contacts by Name
      <input type="text" name="filter" onChange={e => onInput(e)}></input>
    </label>
  );
};

Filter.propTypes = {
  onInput: PropTypes.func.isRequired
};
