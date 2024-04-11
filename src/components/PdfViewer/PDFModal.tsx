import React from "react";
import Modal from "react-modal";
import { DisplayPDF, IDisplayPDFProps } from "../PdfViewer/DisplayPDF";
import useWindowHeight from "@/common/hooks/useWindowHeight";
import { X } from "lucide-react";

export interface IPDFModalProps extends IDisplayPDFProps {
  title: string;
  visible: boolean;
  closeModal: () => void;
}

//PDFModal styling
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#afc1d5",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(12, 12, 17, 0.75)",
  },
};

Modal.setAppElement("#root");

export const PDFModal: React.FC<IPDFModalProps> = ({
  title,
  visible,
  closeModal,
  ...pDFModalProps
}: IPDFModalProps) => {
  const windowHeight = useWindowHeight();

  return (
    <div>
      <Modal
        id="upload-modal"
        isOpen={visible}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Upload Modal"
      >
        <div className="flex flex-row items-center my-2">
          <h1 className="flex-1">{title}</h1>
          <div className="flex gap-3 items-center justify-end">
            <button className="text-white" onClick={closeModal}>
              <X />
            </button>
          </div>
        </div>

        <div
          style={{
            height: `${windowHeight - 150}px`,
            overflow: "hidden",
          }}
        >
          <DisplayPDF {...pDFModalProps} showZoomButtons={false} />
        </div>
      </Modal>
    </div>
  );
};
