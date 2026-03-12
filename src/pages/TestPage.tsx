import cat from '../assets/cat.webp'; // Relative path to the image file
import {useEffect, useRef} from "react";
import Cropper from "cropperjs";

const TestPage = () => {
    //Посилання на фото, яке буде працювати у Cropper
    const imgRef = useRef<HTMLImageElement | null>(null);
    const cropperRef = useRef<Cropper | null>(null);

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

    return (
        <div>
            <img src={cat}
                 alt="Фото для редагування кота"
                 ref={imgRef}
            />
        </div>
    )
}

export default TestPage;