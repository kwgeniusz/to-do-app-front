import { Formik } from "formik";
import InputLabel from "../components/input/InputLabel";
import Button from "../components/button/Button";
import * as Yup from 'yup';
import { Api } from "../services/Api";
import { Link } from "react-router-dom";

const Register = () => {

  const initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
    email: Yup.string()
      .email("EL correo no es valido")
      .required("El correo es requerido"),
    password: Yup.string()
      .min(5, "Minimo 5 caracteres")
      .max(50, "Maximo 50 caracteres")
      .required("La contrasena es requerida"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Las Contrasenas no coinciden")
      .required("La confirmacion de la contrasena es requerida"),
  })

  const onSubmit = (values: typeof initialValues) => {
    console.log(values)
    Api.post('/auth/register', values).then((response) =>{
      console.log(response)
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold loading-tight tracking tight text-gray-900 md:text-2x1">
              Registrarme
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
                    error={errors.name}
                    label="Nombre"
                    name="name"
                    placeholder="Manuel Castro"
                    onChange={handleChange}
                    value={values.name}
                  />

                  <InputLabel
                    error={errors.password}
                    label="Password"
                    name="password"
                    placeholder="**********" type="password"
                    onChange={handleChange}
                    value={values.password}
                  />

                  <InputLabel
                    error={errors.password_confirmation}
                    label="Confirmar Password"
                    name="password_confirmation"
                    placeholder="**********" type="password"
                    onChange={handleChange}
                    value={values.password_confirmation}

                  />

                  <Button
                    value="Registrame"
                    type="submit"
                  />

                  <p className="test-sm font-light text-gray-500 dark:text-gray-400">
                    Tienes una cuenta <Link to="/login" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">Iniciar Sesion</Link>
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

export default Register