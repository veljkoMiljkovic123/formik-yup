import { Form, useFormik } from "formik";
import React from "react";
import { FileParser } from "../utilis/FileParser";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loggedUserAction } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
function FormComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  //validacija image
  //type
  const VALID_TYPE = ["image/png", "image.jpeg"];
  //size
  const KB = 1024;
  const MB = KB * 1024;

  const formik = useFormik({
    //1. initialValues
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      image: "",
      birthday: "",
    },
    // validacija yup
    validationSchema: Yup.object({
      firstName: Yup.string().required("Filed is required"),
      lastName: Yup.string().required("Field is required"),
      email: Yup.string().email("Invalid Email").required("Field is required"),
      password: Yup.string().min(4).required("Field is required"),
      gender: Yup.string().required("Filed is required"),
      birthday: Yup.string().required("Filed is required"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileSize", "Wrong file size", (value) => value.size < MB * 2)
        .test("fileType", "Wrong file type", (value) =>
          VALID_TYPE.includes(value.type)
        ),
    }),
    //onSubmit
    onSubmit: (values) => {
      FileParser(values.image)
        .then((res) => {
          dispatch(loggedUserAction({ ...values, image: res }));
          navigate('/')
        })
        .catch((err) => {
          console.log(err);
        });
      formik.resetForm();
    },
  });

  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-slate-300 p-5 rounded-lg my-5 flex flex-col gap-2 w-full md:w-[500px] h-[80%] md:mx-auto"
    >
      {/* firstName */}
      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-[14px] text-gray-600">
          FirstName
          <span className="text-[12px] ml-2 text-red-500">
            {showError("firstName")}
          </span>
        </label>
        <input
          type="text"
          placeholder="Insert firstname"
          name="firstName"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          className="px-4 py-2 rounded-lg"
        />
      </div>
      {/* lastName */}
      <div className="flex flex-col gap-1">
        <label htmlFor="lastName">
          LastName
          <span className="text-[12px] ml-2 text-red-500">
            {showError("lastName")}
          </span>
        </label>
        <input
          type="text"
          placeholder="Insert lastname"
          name="lastName"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          className="px-4 py-2 rounded-lg"
        />
      </div>
      {/* email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email">
          Email
          <span className="text-[12px] ml-2 text-red-500">
            {showError("email")}
          </span>
        </label>
        <input
          type="email"
          placeholder="Insert email"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="px-4 py-2 rounded-lg"
        />
      </div>
      {/* password */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password">
          Pasword
          <span className="text-[12px] ml-2 text-red-500">
            {showError("password")}
          </span>
        </label>
        <input
          type="password"
          placeholder="Insert password"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="px-4 py-2 rounded-lg"
        />
      </div>
      {/* gender */}
      <div className="flex flex-col gap-1">
        <label htmlFor="gender">
          Gender
          <span className="text-[12px] ml-2 text-red-500">
            {showError("gender")}
          </span>
        </label>
        <select
          name="gender"
          value={formik.values.gender}
          id="gender"
          onChange={formik.handleChange}
          className="px-4 py-2 rounded-lg"
        >
          <option value="" defaultChecked>
            Gender
          </option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      {/* image */}
      <div className="flex flex-col gap-1">
        <label htmlFor="image">
          Image
          <span className="text-[12px] ml-2 text-red-500">
            {showError("image")}
          </span>
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => {
            formik.setFieldValue(e.target.name, e.target.files[0]);
          }}
          className="px-4 py-2 rounded-lg"
        />
      </div>
      {/* birthday */}
      <div className="flex flex-col gap-1">
        <label htmlFor="birthday">
          Birthday
          <span className="text-[12px] ml-2 text-red-500">
            {showError("birthday")}
          </span>
        </label>
        <input
          type="date"
          name="birthday"
          id="birthday"
          value={formik.values.birthday}
          onChange={formik.handleChange}
          className="px-4 py-2 rounded-lg"
        />
      </div>

      <button
        className="mt-2 px-2 py-1 rounded-lg bg-blue-400 text-white"
        type="submit"
      >
        Register me
      </button>
      <p>Ucitaj ponovo stranicu nakon sto pritisnes dugme pa potom idite na profile stranicu</p>
    </form>
  );
}

export default FormComponent;
