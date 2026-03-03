import { useEffect, useState } from "react";
import type {ICarForm} from "../../types/ICarForm.ts";
import {Button, Form, type FormProps, Input, Upload} from "antd";
import ImageCropper from "../../componetns/common/ImageCropper/index.tsx";
import type { ICarItem } from "../../types/ICarItem.ts";

interface Props {
  selectedCar: ICarItem | null;
  onCreate: (car: ICarForm) => void;
  onUpdate: (id: number, car: ICarForm) => void;
}

const CarForm = ({ selectedCar, onCreate, onUpdate }: Props) => {
    // стан для збереження зображення перед обрізанням
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    // стан для відображення модального вікна
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<ICarForm>();

    // при зміні об'єкта selectedCar - оновлюємо форму, викликаючи useEffect
    useEffect(() => {
    if (selectedCar && selectedCar.id !== 0) {
        form.setFieldsValue(selectedCar);
    }
    }, [selectedCar, form]);

    const onHandlerCreate = (values: ICarForm) => {
        console.log("Submit form", values);
        // викликаємо callback функцію з дочірнього компонента
        onCreate(values);
        // очищаємо форму
        form.resetFields();
    }

    const onHandlerUpdate = (values: ICarForm) => {
        console.log("Update form", values);
        // якщо немає об'єкта - нічого не робимо
        if (!selectedCar) return;
        // викликаємо в дочірньому компоненті функцію з батьківського компонента
        onUpdate(selectedCar.id, values);
        // очищаємо форму
        form.resetFields();
    };


    const handleImageUpload = (info: any) => {
        // отримуємо об'єкт файлу
        const file = info.fileList[0]?.originFileObj;
        // якщо файл не існує, то виходимо
        if (!file) return;

        // викликаємо FileReader
        const reader = new FileReader();
        // перетворюємо зображення у Base64
        reader.readAsDataURL(file);
        // після завершення перетворення записуємо його в previewImage та відкриваємо модальне вікно
        reader.onload = () => {
            setPreviewImage(reader.result as string);
            setIsModalOpen(true);
        };
    }

    const formItemLayout: FormProps = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    return (
        <>
            <h2 className={"text-green-500 text-center text-3xl "}>
                {/*умовний рендеринг для заголовку*/}
                {selectedCar && selectedCar.id !== 0
                ? "Оновлення авто"
                : "Створення авто"}
            </h2>
            <div className="mt-4">
                <Form form={form}
                      {...formItemLayout}
                      onFinish={
                        // умова для виклику функцій
                        selectedCar && selectedCar.id !== 0
                            ? onHandlerUpdate
                            : onHandlerCreate
                        }
                      layout={"horizontal"}
                >
                    <div className="grid grid-cols-3 gap-2">
                        <Form.Item<ICarForm>
                            label={"Марка"}
                            name={"mark"}
                            rules={[{required: true, message: "Вкажіть марку"}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item<ICarForm>
                            label={"Модель"}
                            name={"model"}
                            rules={[{required: true, message: "Вкажіть модель"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<ICarForm>
                            label={"Колір"}
                            name={"color"}
                            rules={[{required: true, message: "Вкажіть колір"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<ICarForm>
                            label={"Рік"}
                            name={"year"}
                            rules={[{required: true, message: "Вкажіть рік"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<ICarForm>
                            label={"Ціна"}
                            name={"price"}
                            rules={[{required: true, message: "Вкажіть ціну"}]}
                        >
                            <Input/>
                        </Form.Item>


                            <Form.Item<ICarForm>
                                label={"Опис"}
                                name={"description"}
                                rules={[{required: true, message: "Вкажіть опис"}]}
                            >
                                <Input/>
                            </Form.Item>

                        <Form.Item label="Фото">
                            <Upload
                                listType="picture"
                                maxCount={1}
                                multiple={false}
                                accept="image/*"
                                beforeUpload={() => false}
                                onChange={handleImageUpload}
                            >
                                <Button>Оберіть фото</Button>
                            </Upload>
                        </Form.Item>

                        {/*додаємо невидиме поле для збереження обрізаного зображення*/}
                        <Form.Item
                            name="image"
                            rules={[{ required: true, message: "Обріжте фото" }]}
                            hidden
                        >
                            <Input />
                        </Form.Item>                            

                        <div className={"flex justify-center"}>
                            <Form.Item label={null}>
                            {/*умовний рендеринг для кнопки*/}
                            {selectedCar && selectedCar.id !== 0 ? (
                                <Button type="primary" htmlType="submit">
                                    Оновити авто
                                </Button>
                            ) : (
                                <Button type="primary" htmlType="submit">
                                    Створити авто
                                </Button>
                            )}
                            </Form.Item>
                        </div>

                        {/*показуємо обрізане зображення, якщо воно є*/}
                        {form.getFieldValue("image") && (
                          <div className="mt-4 flex justify-center">
                            <img
                              src={form.getFieldValue("image")}
                              alt="Preview"
                              className="w-40 h-40 object-cover rounded-lg border"
                            />
                          </div>
                        )}
                    </div>

                </Form>
                {/*модальне вікно для обрізки зображення*/}
                <ImageCropper 
                    isOpen={isModalOpen} 
                    setIsOpen={setIsModalOpen} 
                    image={previewImage || ""} 
                    // передаємо функцію збереження обрізаного зображення у форму дочірньому компоненту
                    onCrop={(base64: string) => form.setFieldsValue({image: base64})} 
                />
            </div>
        </>
)
}

export default CarForm;