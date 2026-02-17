import {
  Button,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IAddCar } from "../types/IAddCar";
// import type {RcFile} from "antd/es/upload";
// import type {UploadFile} from "antd/lib";

const AddCar = () => {
  //Ми створили форму
  const [form] = Form.useForm<IAddCar>();

  const navigate = useNavigate();

  const [myFileUpload, setMyFileUpload] = useState<File | null>(null);

  //Коли будемо нажимати кнопку реєстрація
  const onSubmitHandler = (values: IAddCar) => {
    if (myFileUpload == null) {
      alert("Оберіть фото!");
      return;
    }

    //LocalStorage - це спеціальна память - у веб браузері, де можна
    //зберігати інформацію користувача. Туди має доступ поточна сторінка
    //де ви працюєте - Ваш домен - http://localhost:5173

    //localStorage.name = `${values.lastName} ${values.firstName} ${values.middleName}`;
    //Давайте перетвори дані у формат JSON
    // JSON - це звичайний рядок, який виглядає, як обєкт JavaScript
    //
    // const base64 = (values.image as Array<UploadFile>)[0].thumbUrl;
    // console.log("base64 image", base64);

    //Як перетворити File у Base64
    const fileReader = new FileReader();
    fileReader.readAsDataURL(myFileUpload);
    fileReader.onload = () => {
      const base64 = fileReader.result as string;
      console.log("base64 image file", base64);
      const json = JSON.stringify({ ...values, image: base64 });
      console.log("JSON DATA", json);
      const cars = JSON.parse(localStorage.getItem("cars") || "[]");
      const lastCarId = cars.length > 0 ? cars[cars.length - 1].id : 0;
      const newCar = JSON.parse(json);
      newCar.year = new Date(newCar.year).toISOString().slice(0, 4);
      localStorage.setItem(
        "cars",
        JSON.stringify([...cars, { ...newCar, id: lastCarId + 1 }]),
      );
      navigate("/");
    };
    //myFileUpload
    // const json = JSON.stringify(values);
    // console.log("JSON DATA", json);
    //console.log("Submit Result", values);
  };

  //Коли ми обрали файл із зображенням
  const normFile = (e: any) => {
    console.log("Upload event:", e); //Який файл ми обрали
    if (Array.isArray(e)) {
      //Ми перевіряємо чи це 1 файл чи декілька
      return e;
    }
    const n = e?.fileList.length; //Якщо декілька файлів отримуємо їх кількість
    if (n < 1) {
      setMyFileUpload(null);
      return e?.fileList; // Якщо кількість менша 1, то вертаємо пустий список
    }
    setMyFileUpload(e?.fileList[n - 1].originFileObj);
    //console.log("select file", e?.fileList[n-1]); // обраний файл у даний момент
    return [e?.fileList[n - 1]]; // Вертаємо останій обраний файл
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Додати нове авто
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form form={form} onFinish={onSubmitHandler} layout={"vertical"}>
            <Form.Item<IAddCar>
              label={"Марка"}
              name={"mark"}
              rules={[{ required: true, message: "Вкажіть марку" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<IAddCar>
              label={"Модель"}
              name={"model"}
              rules={[{ required: true, message: "Вкажіть модель" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<IAddCar>
              label={"Рік"}
              name={"year"}
              rules={[{ required: true, message: "Вкажіть рік" }]}
            >
              <DatePicker picker="year" format="YYYY" />
            </Form.Item>

            <Form.Item<IAddCar>
              label={"Колір"}
              name={"color"}
              rules={[{ required: true, message: "Вкажіть колір" }]}
              getValueFromEvent={(color) => {
                return "#" + color.toHex();
              }}
            >
              <ColorPicker />
            </Form.Item>

            <Form.Item<IAddCar>
              label={"Ціна"}
              name={"price"}
              rules={[{ required: true, message: "Вкажіть ціну" }]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item label="Оберіть фото">
              <Form.Item<IAddCar>
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  name="files"
                  multiple={false}
                  listType="picture"
                  accept={"image/*"}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    {myFileUpload ? (
                      <img
                        src={URL.createObjectURL(myFileUpload)}
                        width={200}
                      />
                    ) : (
                      <UserOutlined />
                    )}
                  </p>
                  <p className="ant-upload-text">
                    Натисніть або перетягніть фото
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>

            <div className={"pt-4 flex justify-center"}>
              <Form.Item label={null}>
                <Button type={"primary"} htmlType={"submit"}>
                  Зберегти
                </Button>
              </Form.Item>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AddCar;
