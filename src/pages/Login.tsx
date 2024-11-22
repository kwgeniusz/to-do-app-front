
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputLabel from '../components/input/InputLabel';
import Button from '../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { loginUser } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const Login = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [isLogin])

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("EL correo no es valido")
      .required("El correo es requerido"),
    password: Yup.string()
      .min(5, "Minimo 5 caracteres")
      .max(50, "Maximo 50 caracteres")
      .required("La contrasena es requerida"),
  })

  const onSubmit = (values: typeof initialValues) => {
    dispatch(loginUser(values)).then((response) => {
      if (response.type === "auth/loginUser/fulfilled") {
        navigate("/dashboard");
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Usuario o contrasena incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold loading-tight tracking tight text-gray-900 md:text-2x1">
              Inicio de Sesion
            </h1>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>

              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <InputLabel
                    error={errors.email}
                    label="Correo"
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={handleChange}
                    value={values.email}
                  />

                  <InputLabel
                    error={errors.password}
                    label="Password"
                    name="password"
                    placeholder="**********" type="password"
                    onChange={handleChange}
                    value={values.password}
                  />

                  <Button
                    value="Ingresar"
                    type="submit"
                  />

                  <p className="test-sm font-light text-gray-500 dark:text-gray-400">
                    No tienes una cuenta <Link to="/register" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
                      Crear Cuenta
                    </Link>
                  </p>
                </form>
              )}
            </Formik>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Login

