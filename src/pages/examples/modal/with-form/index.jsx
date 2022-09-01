/** @format */
import { useState } from "react";
import { TextButton } from "ui/button";
import TextField from "ui/form/text-field";
import withLabel from "ui/form/with-label";
import withValidation from "ui/form/with-validation";
import Modal from "ui/modal";
const WithLabelInput = withLabel(TextField);
const WithValidationInput = withValidation(WithLabelInput);

const submitStyle = `  text-white px-4 py-2 rounded-full shadow-lg hover:opacity-80 transition-opacity`;
const defaultSubmit = `${submitStyle} bg-green-500`;
const disabledSubmit = `${submitStyle} bg-slate-500`;

export default function SignupModal() {
  const [isOpened, setIsOpened] = useState(false);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({ ...form, disabled: true });

  const isRequiredError = "This field is required";

  function updateDisabeld() {
    const x = !Object.keys(errors).every((k) => errors[k].length === 0);
    console.log(x);
    setErrors((prevState) => ({ ...prevState, disabled: x }));
  }
  function validateName(text) {
    const errorMessage = "Name should have 3 characters or more";
    setErrors((prevState) => ({
      ...prevState,
      name: text.length < 3 ? errorMessage : "",
    }));
    updateDisabeld();
    return errors.name;
  }

  function validateEmail(text) {
    const emailProviders = ["gmail", "hotmail", "yahoo", "outlook"];
    const errorMessage = "email is not valid";
    if (!text.includes("@") || !text.includes(".")) {
      setErrors((prevState) => ({ ...prevState, email: errorMessage }));
      return errorMessage;
    }

    // The email@provider.domain
    const splitedEmail = text.split("@");
    const email = splitedEmail[0];
    if (email.length < 3) {
      setErrors((prevState) => ({ ...prevState, email: errorMessage }));
      return errorMessage;
    }

    const [provider, domain] = splitedEmail[1].split(".");
    if (!emailProviders.some((item) => item === provider)) {
      setErrors((prevState) => ({ ...prevState, email: errorMessage }));
      return errorMessage;
    }
    if (domain.length < 2) {
      setErrors((prevState) => ({ ...prevState, email: errorMessage }));
      return errorMessage;
    }
    setErrors((prevState) => ({ ...prevState, email: "" }));
    updateDisabeld();
    return "";
  }

  function validatePassword(text) {
    const errorMessage = "Password must contain 8 characters or more";
    setErrors((prevState) => ({
      ...prevState,
      password: text.length < 8 ? errorMessage : "",
    }));
    updateDisabeld();
    return errors.password;
  }

  function handleSubmit() {
    const { email, name, password } = form;
    console.table({
      email: validateEmail(email),
      name: validateName(name),
      password: validatePassword(password),
    });
    //Some logic
    console.log(errors.disabled);
    console.log(errors);
    if (!errors.disabled) {
      setIsOpened(false);
      setForm({
        email: "",
        password: "",
        name: "",
      });
    }
  }

  const inputsData = [
    {
      name: "email",
      placeholder: "Email",
      value: form.email,
      type: "email",
      validations: [validateEmail],
    },
    {
      name: "name",
      value: form.name,
      placeholder: "Username",
      type: "text",
      validations: [validateName],
    },
    {
      name: "password",
      value: form.password,
      placeholder: "Password",
      type: "password",
      validations: [validatePassword],
    },
  ];

  return (
    <div className="w-screen h-screen flex-col gap-8 flex justify-center items-center">
      <h2 className="text-white header-one">
        You have no Account? What are you wating for?
      </h2>
      <TextButton
        className="bg-red-400 text-lg  text-white p-4 rounded-xl "
        onClick={() => setIsOpened(!isOpened)}
      >
        Signup
      </TextButton>
      <Modal
        className={"bg-gray-800"}
        close={() => setIsOpened(false)}
        noClose={false}
        isOpen={isOpened}
        title={"Please enter your data"}
      >
        {inputsData.map((data) => (
          <div className="my-4" key={data.name}>
            {data.name} :
            <WithValidationInput
              key={data.name}
              {...data}
              onChange={(value) => {
                setForm((prevState) => ({
                  ...prevState,
                  [data.name]: value,
                }));
              }}
            />
          </div>
        ))}

        <div className=" w-full flex justify-end mt-8 gap-4 border-t-2 py-3 ">
          <TextButton
            onClick={() => setIsOpened(false)}
            className="bg-red-600 text-white py-2 px-4 rounded-full shadow-lg hover:opacity-80 transition-opacity"
          >
            Cancel
          </TextButton>
          <TextButton
            disabled={errors.disabled}
            onClick={handleSubmit}
            className={
              errors.disabled ? `disabled:${disabledSubmit}` : defaultSubmit
            }
          >
            Submit
          </TextButton>
        </div>
      </Modal>
    </div>
  );
}
