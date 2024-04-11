import React from 'react';
import Modal from 'react-modal';
import { DisplayPDF, IDisplayPDFProps } from '../PdfViewer/DisplayPDF';
import useWindowHeight from '@/common/hooks/useWindowHeight';

export interface IPDFModalProps extends IDisplayPDFProps {
  title: string;
  visible: boolean;
  setVisible: () => void;
}

//PDFModal styling
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#2a2b47',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(12, 12, 17, 0.75)',
  },
};

Modal.setAppElement('#root');

export const PDFModal: React.FC<IPDFModalProps> = ({
  title,
  visible,
  setVisible,
  ...pDFModalProps
}: IPDFModalProps) => {
  const windowHeight = useWindowHeight();

  return (
    <div>
      {/* Modal prop drilled and rendered in sidebar  */}
      <Modal
        id="upload-modal"
        isOpen={visible}
        onRequestClose={setVisible}
        style={customStyles}
        contentLabel="Upload Modal"
      >
        <h1>{title}</h1>
        <div className="modal-centent text-center mt-[20px]"></div>

        <div
          style={{
            height: `${windowHeight - 150}px`,
            overflow: 'hidden',
          }}
        >
          <DisplayPDF {...pDFModalProps} showZoomButtons={false} />
        </div>
      </Modal>
    </div>
  );
};
