import React, { useEffect, useState } from 'react';
import './App.css';
import Haker from './components/Haker';
import Spinner from './components/Spinner';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [start] = useState(0);
  const [end, setEnd] = useState(10);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    }
    getTopStories();
  }, [end, start]);

  const handleClick = () => {
    setLoading(true);
    console.log('Showing data for next items');
    setEnd(end + 10);
  };

  setTimeout(() => {
    window.location.reload();
  }, 30000);

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
        <Haker data={posts} handleClick={handleClick} loading={loading} />
      )}
    </div>
  );
};

export default App;
