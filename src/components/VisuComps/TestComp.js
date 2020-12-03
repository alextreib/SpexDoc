import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="https://firebasestorage.googleapis.com/v0/b/spexdoc.appspot.com/o/kaufvertrag-privat-an-privat_be_2.pdf?alt=media&token=c07eb531-ab53-4a75-b164-60d67e4832cf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}