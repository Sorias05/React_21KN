import cat from '../assets/cat.webp'; // Relative path to the image file
import {useEffect, useRef, useState} from "react";
import Cropper from "cropperjs";

const TestPage = () => {
    //Посилання на фото, яке буде працювати у Cropper
    const imgRef = useRef<HTMLImageElement | null>(null);
    const cropperRef = useRef<Cropper | null>(null);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        // const Cropper = window.Cropper;
        if (imgRef.current) {
            cropperRef.current = new Cropper(imgRef.current, {
                aspectRatio: 1,
                viewMode: 1
            });
        }

        return () => {
            cropperRef.current?.destroy();
        };
    },[]);

    const handleCrop = () => {
        if (cropperRef.current) {
            const canvas = cropperRef.current.getCroppedCanvas();
            const base64 = canvas.toDataURL();
            setImage(base64);
        }
    };

    return (
        <div>
            <img src={cat}
                 alt="Фото для редагування кота"
                 ref={imgRef}
            />
            <button
                onClick={handleCrop}
                className="bg-blue-500 text-white px-4 py-2 my-5 rounded"
            >
                Обрізати фото
            </button>
            {image && <img src={image} alt="Обрізане фото" />}
        </div>
    )
}

export default TestPage;