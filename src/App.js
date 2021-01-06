import React, { useEffect, useState } from 'react';
import './App.css';
import Haker from './components/Haker';
import Spinner from './components/Spinner';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);

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
        const promises = await loadingData(allData, start, end);
        const result = await Promise.all(promises);
        setPosts(result);
      } catch (err) {
        console.error(err);
      }
    }
    getTopStories();
  }, [end]);

  const handleClick = () => {
    console.log('Showing data for next items');
    setEnd(end + 10);
  };

  return (
    <div>
      <nav className="navbar navbar-light header">
        <span
          className="navbar-brand"
          style={{ marginLeft: '10rem', color: 'whitesmoke' }}
        >
          <b># Haker News Reader</b>
        </span>
      </nav>
      {posts.length === 0 ? (
        <Spinner />
      ) : (
        <Haker data={posts} handleClick={handleClick} />
      )}
    </div>
  );
};

export default App;
