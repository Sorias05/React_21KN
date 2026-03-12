import {useRef} from "react";
import {Modal} from "antd";
import {Cropper} from "react-cropper";

interface Props {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    image: string,
    onCrop: (image: string) => void,
}

const ImageCropper = ({ isOpen, setIsOpen, image, onCrop }: Props) => {
    // useRef - react хук, що створює посилання на об'єкт DOM
    // в нашому випадку робимо посилання на Cropper
    const cropperRef = useRef<any>(null);

    const handleCrop = () => {
        // перевіряємо чи існує вказівник на Cropper
        if (cropperRef.current) {
            // дістаємо Cropper через посилання
            const cropper = cropperRef.current.cropper;
            // отримуємо обрізане фото
            const base64 = cropper.getCropperCanvas().toDataURL();
            // викликаємо callback функцію, передаємо обрізане зображення
            onCrop(base64);
            // закриваємо модальне вікно
            setIsOpen(false);
        }
    }

    return (
        // Modal - компонент модального вікна з Ant Design
        <Modal
            title={"Обрізати фото"}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={handleCrop}
            okText={"Застосувати"}
            cancelText={"Скасувати"}
        >
            {/*перевіряємо наявність image перед рендером Cropper*/}
            {image && image.length &&
                <Cropper
                    // передаємо зображення для обрізання
                    src={image}
                    style={{ height: 400, width: "100%" }}
                    // співвідношення сторін, 0 - вільне, 1 - квадрат
                    aspectRatio={0}
                    // режим виду, 1 - забороняє виходити за межі зображення
                    viewMode={1}
                    // описуємо компоненту посилання
                    ref={cropperRef}
                />
            }
        </Modal>
    )
}

export default ImageCropper;