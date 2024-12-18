import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(true);


  const fetchQuote = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      console.log('Data fetched:', data);
      setQuote({ text: data.content, author: data.author });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box" className="quote-box">
      {loading ? (
        <div className="loading">Loading..</div> 
      ) : (
        <>
          <div id="text" className="quote-text">
            <i className="fa fa-quote-center"></i> {quote.text}
          </div>
          <div id="author" className="quote-author">- {quote.author}</div>
        </>
      )}
      <div className="quote-buttons">
        <button
          id="new-quote"
          className="btn btn-primary"
          onClick={fetchQuote}
        >
          New Quote
        </button>
      </div>
    </div>
  );
};

export default App;
