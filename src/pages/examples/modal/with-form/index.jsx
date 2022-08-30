/** @format */
import { useState } from "react";
import { TextButton } from "ui/button";
import TextField from "ui/form/text-field";
import withLabel from "ui/form/with-label";
import withValidation from "ui/form/with-validation";
import Modal from "ui/modal";
const WithLabelInput = withLabel(TextField);
const WithValidationInput = withValidation(WithLabelInput);

export default function SignupModal() {
  const [isOpened, setIsOpened] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const isRequiredError = "This field is required";

  const validateName = (text) => {
    if (text.length < 3) {
      const errorMessage = "Name should have 3 characters or more";
      setErrors((prevState) => ({ ...prevState, name: errorMessage }));
      return errorMessage;
    }
    return "";
  };

  const validateEmail = (text) => {
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
    Object.keys(errors).forEach((key) => (errors[key] = ""));
    return "";
  };

  const validatePassword = (text) => {
    if (text.length < 8) {
      const errorMessage = "Password must contain 8 characters or more";
      setErrors((prevState) => ({ ...prevState, password: errorMessage }));
      return errorMessage;
    }
    return "";
  };

  function handleSubmit() {
    const { email, name, password } = form;
    validateEmail(email);
    validateName(name);
    validatePassword(password);
    //Some logic
    let formIsValid = false;
    Object.keys(errors).forEach((key) => {
      if (form[key].length === 0) {
        errors[key] = "This field is required";
        return;
      }
      formIsValid = errors[key].length === 0;
    });
    console.log(formIsValid, errors);
    if (formIsValid) {
      setIsOpened(false);
      setForm({
        name: "",
        email: "",
        password: "",
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
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:opacity-80 transition-opacity"
          >
            Submit
          </TextButton>
        </div>
      </Modal>
    </div>
  );
}
