import { FormField } from "./FormField";
import { FieldValues, useForm } from "react-hook-form";

type GenericFormProps = {
  fields: FormField[];
  title: string;
  submitButtonValue?: string;
  onSubmit: (data: FieldValues) => Promise<void>;
};

const GenericForm = ({
  fields,
  title,
  submitButtonValue = "Confirm",
  onSubmit,
}: GenericFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const createFormField = ({
    className = "",
    type,
    name,
    options,
    selectValues,
    selectOnChangeEvent,
    ...props
  }: FormField) => {
    switch (type) {
      case "textearea":
        return (
          <textarea
            className={`form-control ${className}`}
            rows={2}
            {...register(name, options)}
            placeholder={props.placeholder}
          />
        );
      case "select":
        return (
          <select
            className={`form-control ${className}`}
            {...register(name, options)}
            onChange={selectOnChangeEvent}
          >
            {selectValues?.map((option, index) => (
              <option key={`${name}-option-${index}`} value={option.at(0)}>
                {option.at(1)}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            className={`form-control ${className}`}
            type={type}
            {...register(name, options)}
            {...props}
          />
        );
    }
  };

  const handleFormSubmit = async (data: FieldValues) => {
    await onSubmit(data)
      .then(() => {
        reset();
      })
      .catch((error) => {
        // debug mode only
        alert(error);
      });
  };

  return (
    <section className="text-black">
      <div className="card px-2" style={{ paddingBottom: "10px" }}>
        <header className="card-body">
          <h4 className="card-title m-0">{title}</h4>
          <hr />
        </header>
        <main className="card mb-1">
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="row g-3 px-3 pt-3"
          >
            {fields.map((field, index) => {
              return field?.hidden ? (
                <></>
              ) : (
                <div
                  key={`${field.name}-${index}`}
                  className="col-auto col-lg-12"
                >
                  <label className="form-label" htmlFor={field.name}>
                    {field.label}
                  </label>
                  {createFormField(field)}
                  {errors[field.name] && (
                    <p className="alert alert-danger mt-2" role="alert">
                      {errors[field.name]?.message?.toString()}
                    </p>
                  )}
                </div>
              );
            })}
            <div className="col-auto col-12 mt-3 d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary mb-3"
                disabled={isSubmitting}
              >
                {submitButtonValue}
              </button>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
};

export default GenericForm;
