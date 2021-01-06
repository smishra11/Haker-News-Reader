import React from 'react';

const Haker = ({ data, handleClick }) => {
  return (
    <div className="list-group container news_items">
      {data.map((news_item) => (
        <div
          className="list-group-item list-group-item-action flex-column align-items-start haker_item"
          key={news_item.id}
          style={{ backgroundColor: '#2e2e2e' }}
        >
          <p className="mb-0">
            <a href={news_item.url} className="news_title">
              {news_item.title}
            </a>
          </p>
          <small className="text-muted" style={{ fontSize: '11px' }}>
            {news_item.score} points by {news_item.by} | {news_item.descendants}{' '}
            comments
          </small>
        </div>
      ))}
      <div className="d-flex justify-content-center mt-3 mb-3">
        <button className="btn btn-outline-info btn-sm" onClick={handleClick}>
          Load more...
        </button>
      </div>
    </div>
  );
};

export default Haker;
