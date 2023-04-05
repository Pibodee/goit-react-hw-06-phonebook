import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();

  const onFilter = ({ target: { value } }) => {
    dispatch(setFilter(value))
  }

  return (
    <label>
      Find contacts by Name
      <input type="text" name="filter" onChange={onFilter}></input>
    </label>
  );
};


