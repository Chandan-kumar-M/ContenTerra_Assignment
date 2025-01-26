import React, { useState, useEffect } from 'react';
import './App.css'; // Create this file for styling

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then((response) => response.json())
      .then((data) => {
        const extractedPosts = data.data.children.map((item) => ({
          title: item.data.title,
          selfTextHTML: item.data.selftext_html || 'No description available.',
          url: item.data.url,
          score: item.data.score,
        }));
        setPosts(extractedPosts);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="app">
      <h1>ReactJS Reddit Posts</h1>
      <div className="card-container">
        {posts.map((post, index) => (
          <div className="card" key={index}>
            <h2>{post.title}</h2>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: post.selfTextHTML }}
            ></div>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              Visit Post
            </a>
            <p className="score">Score: {post.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
