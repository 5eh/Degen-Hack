// components/Create/FormInput.tsx

import React, { useState } from "react";
import styles from "../../styles/BookNowByService.module.css";
import { useRouter } from "next/router";

const FormInput = ({
  setTitle,
  setPrice,
  setDescription,
  setLocation,
  setPhoto,
  setAddFeatures,
  setUpcharges,
  setCreator,
  service
}) => {
  const [category, selectCategory] = useState("English");
  const id = useRouter().query.id;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [file, setFile] = useState<File | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const fileUrl = URL.createObjectURL(fileList[0]);
      setPhoto(fileUrl); 
      setImagePreviewUrl(fileUrl);
      setFile(fileList[0]);
      console.log(fileList[0])
    } else {
      setPhoto(null);
      setImagePreviewUrl(null);
    }
  };


  return (
    <div>
      <input
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Price"
        className={styles.input}
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className={`${styles.input} ${styles.inputDescription}`}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="City, State"
        className={styles.input}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        placeholder="Included Features"
        className={styles.input}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Add premium Features"
        className={styles.input}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Banner Image"
        className={`${styles.input} ${styles.inputphoto}`}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FormInput;
