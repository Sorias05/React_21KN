import type {ICarForm} from "../../types/ICarForm.ts";
import {Button, Form, type FormProps, Input, Upload} from "antd";
import type {ICarItem} from "../../types/ICarItem.ts";
import {useEffect, useState} from "react";
import ImageCropper from "../../componetns/common/ImageCropper/index.tsx";

interface Props {
    onCreate: (car: ICarForm) => void;
    editCar?: ICarItem; // відповідає за зміну авто
    onEdit: (car: ICarItem) => void; // якщо відбувається зміна авто
}

const CarForm = ({ onCreate, editCar, onEdit }: Props) => {
    const [form] = Form.useForm<ICarForm>();
    // стан для збереження зображення перед обрізанням
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    // стан для відображення модального вікна
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
            if(editCar)
            {
                if(editCar.id!=0) {
                    form.setFieldsValue({
                        mark: editCar.mark,
                        model: editCar.model,
                        color: editCar.color,
                        year: editCar.year,
                        price: editCar.price,
                        description: editCar.description,
                        image: editCar.image,
                    });
                }
            }
        },
        [editCar]);


    console.log("editCar", editCar);

    const handleSelectFile = (file: File) => {
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

    const onHandlerSubmit = (values: ICarForm) => {
        console.log("Submit form", values);
        if(editCar) {
            if(editCar.id!=0)
                onEdit({...editCar, ...values});
            else
                // викликаємо callback функцію з дочірнього компонента
                onCreate(values);
        }
        // очищаэмо форму
        form.resetFields();
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
            {/*Умовний рендеринг заголовку*/}
            <h2 className={"text-green-500 text-center text-3xl "}>{editCar && editCar.id != 0 ? "Редагування авто" : "Створення авто"}</h2>
            <div className="mt-4">
                <Form form={form}
                      {...formItemLayout}
                      onFinish={onHandlerSubmit}
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

                        <Form.Item<ICarForm>
                            label={"Фото"}
                            name={"image"}
                            rules={[{required: true, message: "Вкажіть фото"}]}
                        >
                            <Upload
                                maxCount={1}
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    handleSelectFile(file);
                                    return false;
                                }}
                            >
                                <Button>Оберіть фото</Button>
                            </Upload>
                        </Form.Item>

                        <div className={"flex justify-center"}>
                            <Form.Item label = {null}>
                                <Button type={"primary"} htmlType={"submit"}>
                                    {/*умовний рендеринг для кнопки*/}
                                    {editCar && editCar.id != 0 ? "Оновити авто" : "Створити авто"}
                                </Button>
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
                    onCrop={(base64: string) => {
                        form.setFieldsValue({ image: base64 });
                        setPreviewImage(null);
                    }}
                />
            </div>
        </>
)
}

export default CarForm;