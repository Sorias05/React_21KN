import { useEffect, useRef } from "react";
import { Modal } from "antd";
import Cropper from "cropperjs";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  image: string;
  onCrop: (image: string) => void;
}

const ImageCropper = ({ isOpen, setIsOpen, image, onCrop }: Props) => {
  // useRef - react хук, що створює посилання на об'єкт DOM
  // в нашому випадку робимо посилання на Cropper
  const cropperRef = useRef<Cropper | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // при завантаженні компонента очищаємо старий Cropper
    return () => {
      cropperRef.current?.destroy();
    };
  }, []);

  // initCropper - функція ініціалізації Cropper
  const initCropper = () => {
    // перевіряємо чи існує вказівник на Cropper
    if (!imgRef.current) return;

    // видаляємо старий Cropper
    cropperRef.current?.destroy();

    // створюємо новий Cropper
    cropperRef.current = new Cropper(imgRef.current, {
      aspectRatio: 1,
      viewMode: 1,
    });
  };

  const handleCrop = () => {
    // перевіряємо чи існує вказівник на Cropper
    if (cropperRef.current) {
      // дістаємо canvas Cropper через посилання
      const canvas = cropperRef.current.getCroppedCanvas();
      // отримуємо обрізане фото
      const base64 = canvas.toDataURL();
      // викликаємо callback функцію, передаємо обрізане зображення
      onCrop(base64);
      // закриваємо модальне вікно
      setIsOpen(false);
    }
  };

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
      {image && (
        <img
          src={image}
          alt="Image to crop"
          ref={imgRef}
          // викликаємо initCropper при завантаженні зображення
          onLoad={initCropper}
          className="w-full h-full object-cover"
        />
      )}
    </Modal>
  );
};

export default ImageCropper;
