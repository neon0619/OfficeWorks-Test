import React, { useState } from "react";
import "./enquireModal.scss";
import axiosInstance from "../../services/axiosInstance";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (name: string, email: string) => void;
  productTitle: string;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  onEnquire,
  productTitle,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [apiRequestMade, setApiRequestMade] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleEnquireClick = () => {
    axiosInstance
      .post("/enquiry/submit", {
        name,
        email,
        message: `Enquiry for ${productTitle}`,
      })
      .then((response) => {
        setApiMessage(response.data.message);
        setApiRequestMade(true);
        onEnquire(name, email);
      })
      .catch((error) => {
        console.error(error);
        setApiMessage("An error occurred.");
        setApiRequestMade(true);
      });
  };

  const closeModalWithMessage = () => {
    setApiMessage("");
    onClose();
  };

  return (
    <div className="enquire-modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{productTitle}</h2>
          <button onClick={closeModalWithMessage}>x</button>
        </div>
        <div className="modal-content">
          <div className="enquiry-form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {apiRequestMade && (
            <div className="api-message-wrapper">
              <p className="api-message">{apiMessage}</p>
            </div>
          )}
          <div className="modal-button-wrapper">
            {apiRequestMade ? (
              <button onClick={closeModalWithMessage}>Close</button>
            ) : (
              <button onClick={handleEnquireClick}>Submit</button>
            )}
            <button onClick={closeModalWithMessage}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
