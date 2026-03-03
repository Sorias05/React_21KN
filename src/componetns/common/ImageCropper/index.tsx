import { useRef } from "react";
import { Modal } from "antd";
import Cropper from "react-cropper";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  image: string;
  onCrop: (base64: string) => void;
}

const ImageCropper = ({ isOpen, setIsOpen, image, onCrop }: Props) => {
  // useRef - це хук, що створює посилання на DOM-елемент
  // в нашому випадку використовується для отримання доступу до об'єкта Cropper з його налаштуваннями
  const cropperRef = useRef<any>(null);

  const handleCrop = () => {
    // перевіряємо, чи існує об'єкт Cropper
    if (cropperRef.current) {
      // отримуємо доступ до об'єкта Cropper
      const cropper = cropperRef.current?.cropper;
      // викликаємо метод getCroppedCanvas() для отримання обрізаного зображення
      const base64 = cropper.getCroppedCanvas().toDataURL();
      // викликаємо функцію надану батьківським компонентом
      onCrop(base64);
      setIsOpen(false);
    }
  };

  return (
    // Modal - компонент Ant Design для відображення модального вікна
    <Modal
      // налаштовуємо модальне вікно
      title="Обрізати фото"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={handleCrop}
      okText="Застосувати"
      cancelText="Скасувати"
    >
      {/* впевнюємося, що зображення існує та має більше ніж один символ */}
      {image && image.length && (
        // Cropper - компонент для обрізки зображення
        <Cropper
          // налаштовуємо об'єкт Cropper
          src={image}
          style={{ height: 400, width: "100%" }}
          aspectRatio={1}
          viewMode={1}
          // додаємо ref для доступу до об'єкта Cropper
          ref={cropperRef}
        />
      )}
    </Modal>
  );
};

export default ImageCropper;
