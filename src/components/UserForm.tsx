import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("Имя обязательно для заполнения"),
  lastName: yup.string().required("Фамилия обязательна для заполнения"),
  email: yup.string().email("Неверный формат email").required("Email обязателен для заполнения"),
});

const skillsOptions = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
];

const UserForm = ({ onSubmit, defaultValues }) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Имя</label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                className="border border-slate-400 outline-none p-2 rounded-md w-full"
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>} {/* Выводим сообщение об ошибке */}
            </div>
          )}
        />
      </div>
      <div>
        <label className="block">Фамилия</label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="text"
                className="border border-slate-400 outline-none p-2 rounded-md w-full"
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label className="block">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                type="email"
                className="border border-slate-400 outline-none p-2 rounded-md w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          )}
        />
      </div>
      <div>
        <label className="block">Навыки</label>
        <div className="space-y-2">
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <>
                {skillsOptions.map((skill) => (
                  <div key={skill}>
                    <input
                      type="checkbox"
                      id={skill}
                      value={skill}
                      checked={
                        field.value ? field.value.includes(skill) : false
                      }
                      onChange={(e) => {
                        const newSkills = e.target.checked
                          ? [...(field.value || []), e.target.value]
                          : (field.value || []).filter(
                              (skillItem) => skillItem !== e.target.value
                            );
                        field.onChange(newSkills);
                      }}
                    />
                    <label htmlFor={skill}>{skill}</label>
                  </div>
                ))}
              </>
            )}
          />
          {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default UserForm;
