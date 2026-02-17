import type {RcFile} from "antd/es/upload";
import type {UploadFile} from "antd/lib";

export interface IRegisterForm {
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    image: RcFile | null | Array<UploadFile>;
    phone: string;
    password: string;
    confirmPassword: string;
}