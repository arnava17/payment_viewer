import React from 'react';
import './SearchBar.scss';

function SearchBar (props) {

  const clear = () => {
    props.onChange('');
  };

  const handleChange= (e) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="search-wrapper">
        <input type="text" value={props.value}
               name="focus"
               className="search-box"
               placeholder="Search"
               onChange={handleChange}
        />
      { props.value &&
      <button className="fa fa-close" type="reset" onClick={clear}/>
      }
    </div>
  )
}

export default SearchBar