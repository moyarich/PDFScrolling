import React, { useState } from 'react';
import { PDFFile } from '../PdfViewer/DisplayPDF';
import { PDFModal } from '../PdfViewer/PDFModal';

import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ExternalLink } from 'lucide-react';

const formatListWithButtons = (
  list: string[],
  onItemClick: (item: string, index: number) => void
) => {
  const lastIndex = list.length - 1;

  return list.map((item, index) => (
    <React.Fragment key={index}>
      <button
        style={{
          textDecoration: 'none',
          background: 'none',
          border: 'none',
          color: 'blue',
          cursor: 'pointer',
        }}
        onClick={() => onItemClick(item, index)}
      >
        {parseInt(item)}
      </button>
      {index !== lastIndex && <span>, </span>}
      {index === lastIndex - 1 && <span> and </span>}
    </React.Fragment>
  ));
};

export default function PDFScroll(): JSX.Element {
  const [pdfFile, setPdfFile] = useState<PDFFile>('./sample.pdf');

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pdfPagesToView, setPdfPagesToView] = useState<string[]>(['2', '3']);

  const [pdfLoaded, setPdfLoaded] = useState(false);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setPdfFile(files[0] || null);
    }
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  const onPageClick = (page: string) => {
    setCurrentPage(() => {
      return parseInt(page);
    });
    setModalVisible(true);
  };

  return (
    <div>
      <div className="mb-10">
        <label htmlFor="file">Load PDF file:</label>
        <input onChange={onFileChange} type="file" />
      </div>

      {pdfPagesToView?.length > 0 &&
        (pdfPagesToView.length === 1 ? (
          <div className="flex gap-1">
            <span>View page</span>
            {formatListWithButtons(pdfPagesToView, onPageClick)}
          </div>
        ) : pdfPagesToView.length > 1 ? (
          <div className="flex gap-1">
            <span>View the following pages</span>
            {formatListWithButtons(pdfPagesToView, onPageClick)}
          </div>
        ) : null)}
      <div className="mt-4 flex w-[350px] h-[200px]">
        <Document
          file={pdfFile}
          className="flex gap-8 w-full overflow-auto"
          loading={<div className="m-auto">Loading ...</div>}
          onSourceSuccess={() => setPdfLoaded(true)}
        >
          {pdfPagesToView?.map((page: string, index: number) => {
            return (
              <div
                className="relative cursor-pointer"
                key={index}
                onClick={() => onPageClick(page)}
              >
                <Page
                  pageNumber={parseInt(page)}
                  className="border border-gray-200 rounded-md w-[40px] cursor-pointer"
                >
                  {pdfLoaded ? (
                    <>
                      <span className="absolute right-2 bottom-2  z-[2] scale-2">
                        <ExternalLink />
                      </span>
                      <span className="absolute right-0 top-[-4px]  p-[2px] rounded-l-md bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
                        {page}
                      </span>
                    </>
                  ) : null}
                </Page>
              </div>
            );
          })}
        </Document>
      </div>

      {isModalVisible && (
        <PDFModal
          key={`modal_${currentPage}`}
          title={'PDF Viewer'}
          visible={isModalVisible}
          setVisible={closeModal}
          pdfFile={pdfFile}
          displayAllPages={true}
          showZoomButtons={true}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
