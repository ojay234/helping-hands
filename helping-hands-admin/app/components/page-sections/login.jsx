"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@api/apiSlice";
import { setUser } from "@store/slice/userSlice";
import * as Yup from "yup";
import CustomInput from "@components/common/custom-input";
import { Field, Form, Formik } from "formik";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styled from "styled-components";
import CustomButton from "@components/common/custom-button";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { error, isError, isLoading, isSuccess }] = useLoginMutation();
  const [hidePassword, setHidePassword] = useState(true);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleLogin = async (values) => {
    const { email, password } = values;
    const loginData = {
      email,
      password,
      user_type: "admin",
      device_name: "android",
    };
    try {
      const response = await login(loginData);

      if (response.data && response.data.data.token) {
        localStorage.setItem("auth_token", response?.data?.data?.token);
        localStorage.setItem("id", response.data?.data?.id);
        dispatch(setUser(response?.data?.data));
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <h1>Welcome Back</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isValid }) => (
          <Form>
            <div className="max-w-[500px] mx-auto flex flex-col gap-4">
              <CustomInput
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
              />
              <CustomInput
                label="Password"
                placeholder="Password"
                name="password"
                reverse
                icon={hidePassword ? FiEyeOff : FiEye}
                type={hidePassword ? "password" : "text"}
                iconClicked={() => setHidePassword(!hidePassword)}
              />
              <div className="my-3">
                <div className="flex gap-1">
                  <Field type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember">Remember</label>
                </div>
              </div>
              {isError && (
                <p className="my-2 text-red-500">{error?.data?.message}</p>
              )}
              <CustomButton
                primary
                type="submit"
                disabled={isLoading || !isValid}
                btnLoading={isLoading}
              >
                Sign In
              </CustomButton>
            </div>
          </Form>
        )}
      </Formik>
    </LoginContainer>
  );
}

const LoginContainer = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  h1 {
    text-align: center;
    font-weight: 700;
    font-size: 22px;
    margin: 20px 0;
  }
`;

export default Login;
