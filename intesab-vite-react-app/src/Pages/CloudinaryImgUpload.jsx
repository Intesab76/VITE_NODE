import { useState } from "react";
import axios from "axios";
import { useRef } from "react";

const CloudinaryImgUpload = () => {
  const [image, setImage] = useState(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const fileResetRef = useRef();

  const handleImageUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);

      const data = await axios.post(
        "http://localhost:8000/upload-cloudinary",
        formData,
        { withCredentials: true }
      );
      alert("Image Uploaded Successfully");
      if (fileResetRef.current) {
        setImage(null); // Clear the image state
        fileResetRef.current.value = ""; // Reset the file input
      }
      if (data.data.imageUrl) {
        setIsBtnDisabled(true);
        setImage(null);
      }
      console.log("IMAGE DATA", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    // setImageUrl(data.data.imageUrl);
  };
  return (
    <>
      <form onSubmit={handleImageUpload}>
        <input
          type="file"
          className="form-control w-100"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ width: "240px", border: "1px solid black" }}
          ref={fileResetRef}
        ></input>

        <button
          type="submit"
          className="btn btn-success my-2"
          disabled={isBtnDisabled}
        >
          Upload Image
        </button>
      </form>
    </>
  );
};

export default CloudinaryImgUpload;
