import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../store";
import { createTask } from "../store/taskSlice";
import InputLabel from "../components/input/InputLabel";
import Button from "../components/button/Button";

const TaskForm = () => {
  const dispatch = useAppDispatch();

  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    description: Yup.string(),
  });

  const onSubmit = (values: typeof initialValues) => {
    dispatch(createTask(values));
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <InputLabel name="title" label="Título" value={values.title} onChange={handleChange} />
          <InputLabel name="description" label="Descripción" value={values.description} onChange={handleChange} />
          <Button value="Guardar" type="submit" />
        </form>
      )}
    </Formik>
  );
};

export default TaskForm;
