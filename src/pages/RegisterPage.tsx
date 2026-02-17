import {Button, Form, Input, Upload} from "antd";
import type {IRegisterForm} from "../types/IRegisterForm.ts";
import {UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
// import type {RcFile} from "antd/es/upload";
// import type {UploadFile} from "antd/lib";

const RegisterPage = () =>
{
    //Ми створили форму
    const [form] = Form.useForm<IRegisterForm>();

    const navigate = useNavigate();

    const [myFileUpload, setMyFileUpload] =
             useState<File|null>(null);

    //Коли будемо нажимати кнопку реєстрація
    const onSubmitHandler = (values: IRegisterForm) => {
        if(myFileUpload == null) {
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
             const json = JSON.stringify({...values, image: base64});
             console.log("JSON DATA", json);
             localStorage.setItem("user", json);
             navigate("/profile");
         }
        //myFileUpload
        // const json = JSON.stringify(values);
        // console.log("JSON DATA", json);
        //console.log("Submit Result", values);
    }

    //Коли ми обрали файл із зображенням
    const normFile = (e: any) => {
        console.log('Upload event:', e); //Який файл ми обрали
        if (Array.isArray(e)) { //Ми перевіряємо чи це 1 файл чи декілька
            return e;
        }
        const n = e?.fileList.length; //Якщо декілька файлів отримуємо їх кількість
        if(n<1) {
            setMyFileUpload(null);
            return e?.fileList; // Якщо кількість менша 1, то вертаємо пустий список
        }
        setMyFileUpload(e?.fileList[n-1].originFileObj);
        //console.log("select file", e?.fileList[n-1]); // обраний файл у даний момент
        return [e?.fileList[n-1]]; // Вертаємо останій обраний файл
    };


    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Реєстрація
                    </h2>
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form form = {form}
                          onFinish={onSubmitHandler}
                          layout={"vertical"}
                    >
                        <Form.Item<IRegisterForm>
                            label={"Прізвище"}
                            name={"lastName"}
                            rules={[{required: true, message: "Вкажіть прізвище"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Ім'я"}
                            name={"firstName"}
                            rules={[{required: true, message: "Вкажіть ім'я"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Побатькові"}
                            name={"middleName"}
                            rules={[{required: true, message: "Вкажіть побатькові"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Електронна пошта"}
                            name={"email"}
                            rules={[{required: true, message: "Вкажіть пошта"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Телефон"}
                            name={"phone"}
                            rules={[{required: true, message: "Вкажіть телефон"}]}
                        >
                            <Input/>
                        </Form.Item>



                        <Form.Item<IRegisterForm>
                            label={"Пароль"}
                            name={"password"}
                            rules={[{required: true, message: "Вкажіть пароль"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<IRegisterForm>
                            label={"Підтвердження паролю"}
                            name={"confirmPassword"}
                            rules={[{required: true, message: "Вкажіть підтвердження паролю"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item label="Оберіть фото">
                            <Form.Item<IRegisterForm> name="image" valuePropName="fileList"
                                                      getValueFromEvent={normFile}
                                                      noStyle>
                                <Upload.Dragger name="files" multiple={false}
                                                listType="picture"
                                                accept={"image/*"}
                                                beforeUpload={() => {return false;}}
                                >
                                    <p className="ant-upload-drag-icon">
                                        { myFileUpload ?
                                            <img src={URL.createObjectURL(myFileUpload)}
                                                width={200}/>
                                            :
                                            <UserOutlined />
                                        }
                                    </p>
                                    <p className="ant-upload-text">Натисніть або перетягніть фото</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>

                        <div className={"pt-4 flex justify-center"}>
                            <Form.Item label = {null}>
                                <Button type={"primary"} htmlType={"submit"}>
                                    Реєструватися
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;