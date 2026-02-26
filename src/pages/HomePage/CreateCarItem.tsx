import type { ICreateCar } from "../../types/ICreateCar.ts";
import { Button, Form, type FormProps, Input } from "antd";

interface Props {
  onCreate: (car: ICreateCar) => void;
}

const CreateCarItem = ({ onCreate }: Props) => {
  const [form] = Form.useForm<ICreateCar>();

  const onHandlerSubmit = (values: ICreateCar) => {
    console.log("Submit form", values);
    // викликаємо в дочірньому компоненті функцію з батьківського компонента
    onCreate(values);
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
      <h2 className={"text-green-500 text-center text-3xl"}>Створення авто</h2>
      <div className="mt-4">
        <Form
          form={form}
          {...formItemLayout}
          onFinish={onHandlerSubmit}
          layout={"horizontal"}
        >
          <div className="grid grid-cols-3 gap-1">
            <Form.Item<ICreateCar>
              label={"Марка"}
              name={"mark"}
              rules={[{ required: true, message: "Вкажіть марку" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICreateCar>
              label={"Модель"}
              name={"model"}
              rules={[{ required: true, message: "Вкажіть модель" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICreateCar>
              label={"Колір"}
              name={"color"}
              rules={[{ required: true, message: "Вкажіть колір" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICreateCar>
              label={"Рік"}
              name={"year"}
              rules={[{ required: true, message: "Вкажіть рік" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICreateCar>
              label={"Ціна"}
              name={"price"}
              rules={[{ required: true, message: "Вкажіть ціну" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICreateCar>
              label={"Опис"}
              name={"description"}
              rules={[{ required: true, message: "Вкажіть опис" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<ICreateCar>
              label={"Фото"}
              name={"image"}
              rules={[{ required: true, message: "Вкажіть фото" }]}
              className="col-span-3"
            >
              <Input />
            </Form.Item>

            <Form.Item label={null} className="col-span-3">
              <Button type={"primary"} htmlType={"submit"}>
                Створити авто
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCarItem;
