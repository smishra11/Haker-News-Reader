import React, { useEffect, useState } from 'react';
import './App.css';
import Haker from './components/Haker';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [updatedData, setUpdatedData] = useState([]);
  const [updatedPromises, setUpdatedPromises] = useState([]);

  const loadingData = (allData, start, end) => {
    const promises = allData
      .slice(start, end)
      .map((id) =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        ).then((res) => res.json())
      );
    return promises;
  };

  useEffect(() => {
    async function getTopStories() {
      const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
      try {
        const response = await fetch(url);
        if (response.ok === false) {
          throw new Error('Response Error:' + response.text);
        }
        const allData = await response.json();
        console.log(allData);
        const promises = await loadingData(allData, start, end);
        console.log(promises);
        const result = await Promise.all(promises);
        setPosts(result);
        // console.log(result);
      } catch (err) {
        console.error(err);
      }
    }
    getTopStories();
  }, []);

  const handleClick = () => {
    console.log('btn clicked');
    loadingData();
  };

  return (
    <div className="container">
      <nav className="navbar navbar-light header">
        <span className="navbar-brand">
          <b>Haker News Reader</b>
        </span>
      </nav>
      {posts.length === 0 ? (
        <div className=" mt-4 d-flex justify-content-center">
          <div>
            <div className="spinner-border text-info ml-3" role="status"></div>
            <div>
              <b>Loading...</b>
            </div>
          </div>
        </div>
      ) : (
        <Haker data={posts} handleClick={handleClick} />
      )}
    </div>
  );
};

export default App;
