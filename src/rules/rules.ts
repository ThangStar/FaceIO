import { object, ref, string } from "yup";

export const registerRule = object({
    username:
        string()
            .required('Tên tài khoản là trường bắt buộc'),
    email:
        string()
            .email('Email Không hợp lệ')
            .required('Email là trường bắt buộc'),
    password:
        string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .max(12, 'Mật khẩu tối đa 12 ký tự')
            .required('Mật khẩu là trường bắt buộc'),
    displayName:
        string()
            .min(6, 'Tên hiển thị phải có ít nhất 6 ký tự')
            .max(18, 'Tên hiển thị tối đa 18 ký tự')
            .required('Tên hiển thị phải là trường bắt buộc'),
    rePassword:
        string()
            .min(6, 'Nhập lại mật khẩu phải có ít nhất 6 ký tự')
            .max(12, 'Nhập lại mật khẩu tối đa 18 ký tự')
            .required()
            .oneOf([ref('password')], 'Mật khẩu không khớp'),
});

export const loginRule = object({
    username: string().required(),
    password: string().min(6).max(12).required(),
});
