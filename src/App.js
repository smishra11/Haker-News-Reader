import React, { useEffect, useState } from 'react';
import './App.css';
import Haker from './components/Haker';

const App = () => {
  const [posts, setPosts] = useState([]);

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
        const promises = allData
          .slice(0, 10)
          .map((id) =>
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            ).then((res) => res.json())
          );
        const result = await Promise.all(promises);
        setPosts(result);
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    }
    getTopStories();
  }, []);

  return (
    <div className="container">
      <nav className="navbar navbar-light header">
        <span className="navbar-brand">
          <b>Haker News Reader</b>
        </span>
      </nav>
      <Haker data={posts} />
    </div>
  );
};

export default App;
