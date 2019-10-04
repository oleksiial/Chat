import React, { useRef } from 'react';
import useSearch from '../../hooks/useSearch';

const Search = ({ onData }) => {
  const inputRef = useRef(null);
  const {
    search, data, loading, error,
  } = useSearch();

  if (data && inputRef.current.value) {
    onData(data.search);
  }

  return (
    <div className="search">
      <input
        type="text"
        ref={inputRef}
        onChange={(e) => {
          if (e.target.value) {
            search(e.target.value);
          } else {
            onData(null);
          }
        }}
      />
    </div>
  );
};

export default Search;
