import React from 'react';

const Haker = ({ data }) => {
  if (data.length === 0) {
    <div class="spinner-border text-info" role="status">
      <span class="sr-only">Loading...</span>
    </div>;
  }
  return (
    <div className="list-group mt-3">
      {data.map((news_item) => (
        <div
          className="list-group-item list-group-item-action flex-column align-items-start haker_item"
          key={news_item.id}
        >
          <a href={news_item.url}>
            <p className="m-0">{news_item.title}</p>
          </a>
          <small className="text-muted">
            {news_item.score} points by {news_item.by} | {news_item.descendants}{' '}
            comments
          </small>
        </div>
      ))}
    </div>
  );
};

export default Haker;
