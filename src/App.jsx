import React, { useState, useEffect } from "react";
import styles from "./styles/app.module.css";
import NavBar from "./components/NavBar";
import axios from "../utils/http-common";
import GalleryList from "./components/GalleryList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import image from './assets/bg.jpeg'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function App() {
  const [galleryList, setGalleryList] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectImage,setSelectImage] = useState({})

  const getImageList = async () => {
    try {
      const res = await axios.get("/v2/list");
      if (res.status === 200) {
        console.log(res.data)
        setGalleryList([...res.data]);
      }
    } catch (err) {
      console.log("error", err);
      toast.error(
        "An error occured while fetching gallery images please refresh",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  const fetchSelectedImageInfo = async () => {
    try {
      const res = await axios.get(`/id/{image_id}/info`);
      console.log(res);
    } catch (error) {
      if (error.message) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.response) {
        toast.error("Sorry no details available for this image", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const toggleModal = () => {
    setIsOpen((modal)=> !modal)
  };

  const openModal=(item)=>{
    setSelectImage({...item});
    toggleModal()
  }

  useEffect(() => {
    getImageList();
  }, []);

  return (
    <div className={styles.main}>
      <NavBar />
      <div className={styles.gallary_section}>
        <GalleryList galleries={galleryList} openModal={openModal}/>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Gallery Image Details"
      >
      <div className={styles.modal}>
        <div className={styles.modal_left}>
            <img src={selectImage?.download_url || image} alt="select_image" />
        </div>
        <div className={styles.modal_right}>
          <div className={styles.modal_top}>
            <h2>Image Gallery App </h2>
            <span>
              Details on the choosen image below
              This image has the following properties
            </span>
            </div>
            <div className={styles.detail_wrapper}>
                <div className={styles.detail_item}>
                    <b>Author</b>
                    <span>{selectImage?.author}</span>
                </div>
                <div className={styles.detail_item}>
                    <b>Height</b>
                    <span>{selectImage?.height}</span>
                </div>
                <div className={styles.detail_item}>
                    <b>Width</b>
                    <span>{selectImage?.width}</span>
                </div>
            </div>
            <div className={styles.detail_wrapper}>
                <div className={styles.detail_item}>
                    <b>Link to image</b>
                    <a 
                    href={selectImage?.url}
                    style={{textAlign:'center'
                    }}>{selectImage?.url?.substring(0,30)+'...'}</a>
                </div>
            </div>

            <button onClick={()=> toggleModal()}>Close Details</button>
        </div>
      </div>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default App;
