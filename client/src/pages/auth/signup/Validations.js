import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Lütfen Geçerli Bir E-mail Giriniz")
    .required("Lütfen Bu Alanı Doldurunuz"),
  password: yup
    .string()
    .min(5, "Parolanız Minimum 5 Karakter İçermeli")
    .required("Lütfen Bu Alanı Doldurunuz"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Parolalar Uyuşmuyor")
    .required("Lütfen Bu Alanı Doldurunuz"),
});

export default validations;
