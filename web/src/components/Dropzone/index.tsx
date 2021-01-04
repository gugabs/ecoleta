import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import "./style.css";

import { FiUpload } from "react-icons/fi";

interface Props {
    onImageUpload: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onImageUpload }) => {

    const [selectedImageUrl, setSelectedImageUrl] = useState("");

    const onDrop = useCallback(acceptedFiles => {

        const image = acceptedFiles[0];

        const imageUrl = URL.createObjectURL(image);

        setSelectedImageUrl(imageUrl);
        onImageUpload(image);

    }, [onImageUpload]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: "image/*"
    });

    return (

        <div className="dropzone" { ...getRootProps() }>
            <input { ...getInputProps() } accept="image/*" />
            {
                isDragActive
                ?
                    <p>Solte a imagem...</p>
                :
                    selectedImageUrl
                    ?
                        <img src={ selectedImageUrl } alt="Point Thumbnail" />
                    :
                        <p>
                            <FiUpload />
                            Arraste uma imagem da entidade aqui ou clique para selecioná-la.
                        </p>
            }
        </div>

    );
}

export default Dropzone;