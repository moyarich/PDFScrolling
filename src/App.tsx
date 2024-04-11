import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PDFScroll from './components/PDFScroll';

function App(): JSX.Element {
  return (
    <div className="p-3">
      <Routes>
        {/* Add your routes here */}
        <Route path="/" element={<PDFScroll />} />
      </Routes>
    </div>
  );
}

export default App;
