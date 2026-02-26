import { useEffect } from "react";
import type { ICarItem } from "../../types/ICarItem.ts";
import type { ICarForm } from "../../types/ICarForm.ts";
import { Button, Form, type FormProps, Input } from "antd";

interface Props {
  selectedCar: ICarItem | null;
  onCreate: (car: ICarForm) => void;
  onUpdate: (id: number, car: ICarForm) => void;
}

const CarForm = ({ selectedCar, onCreate, onUpdate }: Props) => {
  const [form] = Form.useForm<ICarForm>();

  // при зміні об'єкта selectedCar - оновлюємо форму, викликаючи useEffect
  useEffect(() => {
    if (selectedCar && selectedCar.id !== 0) {
      form.setFieldsValue(selectedCar);
    }
  }, [selectedCar, form]);

  const onHandlerCreate = (values: ICarForm) => {
    console.log("Create form", values);
    // викликаємо в дочірньому компоненті функцію з батьківського компонента
    onCreate(values);
    // очищаємо форму
    form.resetFields();
  };

  const onHandlerUpdate = (values: ICarForm) => {
    console.log("Update form", values);
    // якщо немає об'єкта - нічого не робимо
    if (!selectedCar) return;
    // викликаємо в дочірньому компоненті функцію з батьківського компонента
    onUpdate(selectedCar.id, values);
    // очищаємо форму
    form.resetFields();
  };

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
    <div className="shadow-md bg-gray-50 rounded-lg p-4 mb-4">
      <h2 className="text-green-600 text-center text-3xl">
        {/*умовний рендеринг для заголовку*/}
        {selectedCar && selectedCar.id !== 0
          ? "Оновлення авто"
          : "Створення авто"}
      </h2>
      <div className="mt-4">
        <Form
          form={form}
          {...formItemLayout}
          onFinish={
            // умова для виклику функцій
            selectedCar && selectedCar.id !== 0
              ? onHandlerUpdate
              : onHandlerCreate
          }
          layout={"horizontal"}
        >
          <div className="grid grid-cols-3 gap-1">
            <Form.Item<ICarForm>
              label={"Марка"}
              name={"mark"}
              rules={[{ required: true, message: "Вкажіть марку" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICarForm>
              label={"Модель"}
              name={"model"}
              rules={[{ required: true, message: "Вкажіть модель" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICarForm>
              label={"Колір"}
              name={"color"}
              rules={[{ required: true, message: "Вкажіть колір" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICarForm>
              label={"Рік"}
              name={"year"}
              rules={[{ required: true, message: "Вкажіть рік" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICarForm>
              label={"Ціна"}
              name={"price"}
              rules={[{ required: true, message: "Вкажіть ціну" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICarForm>
              label={"Опис"}
              name={"description"}
              rules={[{ required: true, message: "Вкажіть опис" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICarForm>
              label={"Фото"}
              name={"image"}
              rules={[{ required: true, message: "Вкажіть фото" }]}
              className="col-span-3"
            >
              <Input />
            </Form.Item>

            <div className="flex gap-2 col-span-3">
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
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CarForm;
