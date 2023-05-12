"use client";

import { useState, useEffect } from "react";

import MapCard from "./MapCard";

const MapCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((map) => (
        <MapCard
          key={map._id}
          map={map}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allMaps, setAllMaps] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchMaps = async () => {
    const response = await fetch("/api/map");
    const data = await response.json();

    setAllMaps(data);
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  const filterMaps = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allMaps.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tags) ||
        regex.test(item.title)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterMaps(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterMaps(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <MapCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <MapCardList data={allMaps} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;