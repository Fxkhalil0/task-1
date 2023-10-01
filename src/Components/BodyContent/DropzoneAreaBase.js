import React, { useState, useEffect } from "react";
import { DropzoneArea } from 'material-ui-dropzone';
import style from './BodyContent.module.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


function DropzoneAreaBase() {
    const [imageSelected, setImageSelected] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [formId] = useState(uuidv4());
    const [formData, setFormData] = useState()

    useEffect(() => {
        axios.get("http://127.0.0.1:4010/api/205.9881726678027/programs/repellat/application-form").then((res) => {
            console.log(res.data.data.attributes.personalInformation)
            setFormData(res.data.data.attributes.personalInformation)
        })
    }, [])

    const handleImageChange = (files) => {
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                const base64String = event.target.result;
                setBase64Image(base64String);
                setSelectedImage(file);
                setImageSelected(true);
            };

            reader.readAsDataURL(file);
        } else {
            setSelectedImage(null);
            setBase64Image(null);
            setImageSelected(false);
        }
    };

    const handleDeleteAndReupload = () => {
        setSelectedImage(null);
        setBase64Image(null);
        setImageSelected(false);
    };

    const handleSubmit = async () => {
        if (base64Image) {
            const payload = {
                data: {
                    id: formId,
                    attributes: {
                        coverImage: base64Image,
                        personalInformation: formData,
                    },
                    type: "applicationForm",
                },
            };

            try {
                const response = await axios.put(
                    'http://127.0.0.1:4010/api/28.459138171084163/programs/pariatur/application-form',
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 204) {
                    console.log("Image uploaded successfully.");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    return (
        <div className={style["upload__image__section"]}>
            <div className={style["box__header"]}>
                <p>Upload Image Cover</p>
            </div>
            {imageSelected ? (
                <div className={style["image__preview"]}>
                    <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
                </div>
            ) : (
                <div className={style["drag__drop"]}>
                    <DropzoneArea
                        // acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={handleImageChange}
                    />
                    <button type='submit' className={style["submit__btn"]} onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            )}
            {imageSelected && (
                <div className={style["box__footer"]} onClick={handleDeleteAndReupload}>
                    <p><i className="fa-solid fa-xmark"></i> Delete & re-upload</p>
                </div>
            )}

        </div>
    );
}

export default DropzoneAreaBase;
