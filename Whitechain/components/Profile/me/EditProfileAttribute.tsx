// components/Profile/me/EditProfileAttribute.tsx

import React, { useEffect, useState } from "react";
import styles from "../../../styles/Profile.module.css";
import ProfilePopup from "../../ModalPopup/ProfilePopup";

interface FieldConfigType {
  [key: string]: {
    type: "text" | "file" | "number" | "textarea";
    value: string | number;
  };
}

export const EditProfileButton = ({ title, onSave, fieldConfig }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <button className={styles.option} onClick={handleOpenModal}>
        {title}
      </button>
      {isModalVisible && (
        <EditProfileModal
          title={title}
          onSave={onSave}
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          fieldConfig={fieldConfig}
        />
      )}
    </>
  );
};

export const EditProfileModal = ({
  title,
  onSave,
  setIsModalVisible,
  isModalVisible,
  fieldConfig,
}: {
  title: string;
  onSave: Function;
  setIsModalVisible: (isVisible: boolean) => void;
  isModalVisible: boolean;
  fieldConfig: FieldConfigType;
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFormData = {};
    for (const key in fieldConfig) {
      initialFormData[key] = fieldConfig[key].value;
    }
    setFormData(initialFormData);
  }, [fieldConfig]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
    setIsModalVisible(false);
  };

  const renderFormFields = () => {
    switch (title) {
      case "CONTACT INFORMATION":
        return renderContactInformationLayout(
          fieldConfig,
          formData,
          handleInputChange
        );
      case "PROFILE PHOTO":
        return renderProfilePhotoLayout(
          fieldConfig,
          formData,
          handleInputChange
        );
      default:
        return renderDefaultLayout(fieldConfig, formData, handleInputChange);
    }
  };

  const renderContactInformationLayout = (
    fieldConfig: FieldConfigType,
    formData,
    handleInputChange
  ) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {fieldConfig.email && (
          <input
            type="text"
            placeholder="Email"
            value={formData["email"]}
            onChange={(e) => handleInputChange("email", e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        )}
        {fieldConfig.phone && (
          <input
            type="text"
            placeholder="Phone"
            value={formData["phone"]}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        )}
      </div>
    );
  };

  const renderProfilePhotoLayout = (
    fieldConfig: FieldConfigType,
    formData,
    handleInputChange
  ) => {
    return (
      <div style={{ textAlign: "center" }}>
        {fieldConfig.profilePicture && (
          <input
            type="file"
            onChange={(e) =>
              handleInputChange("profilePicture", e.target.files[0])
            }
            style={{ display: "block", margin: "0 auto" }}
          />
        )}
      </div>
    );
  };

  const renderDefaultLayout = (
    fieldConfig: FieldConfigType,
    formData,
    handleInputChange
  ) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {Object.entries(fieldConfig).map(([key, config]) => (
          <input
            key={key}
            type={config.type === "textarea" ? "text" : config.type}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            onChange={(e) => handleInputChange(key, e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
          />
        ))}
      </div>
    );
  };

  return (
    <ProfilePopup
      isModalVisible={isModalVisible}
      onBackdropClick={() => setIsModalVisible(false)}
    >
      <form onSubmit={handleSubmit} className="center">
        {renderFormFields()}
        <button className="functionbutton" type="submit">
          Save
        </button>
      </form>
    </ProfilePopup>
  );
};
