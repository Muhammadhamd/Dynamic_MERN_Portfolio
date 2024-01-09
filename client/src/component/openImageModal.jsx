import css from "../css/imagemodal.css"
const ImageModal = ({ imageUrl, onClose }) => {
    return (
      <div className="image-modal">
        
        <div className="modal-background" onClick={onClose}></div>
        <button className="close-button" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        <div className="modal-content">
          <img src={imageUrl} alt="Image" />
          
        </div>
      </div>
    );
  };
  export default ImageModal