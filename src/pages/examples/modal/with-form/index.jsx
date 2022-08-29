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
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });
  const validateName = (text) => {
    return text.length < 3 ? "Name should have 3 characters or more" : "";
  };

  const validateEmail = (text) => {
    const emailProviders = ["gmail", "hotmail", "yahoo", "outlook"];
    const errorMessage = "email is not valid";
    if (!text.includes("@") || !text.includes(".")) return errorMessage;
    // The email@provider.domain
    const splitedEmail = text.split("@");
    const email = splitedEmail[0];
    if (email.length < 3) return errorMessage;

    const [provider, domain] = splitedEmail[1].split(".");
    if (!emailProviders.some((item) => item === provider)) return errorMessage;
    if (domain.length < 2) return errorMessage;
    return "";
  };

  const validatePassword = (text) => {
    return text.length < 8 ? "Password must contain 8 characters or more" : "";
  };

  function handleSubmit() {
    //Some logic
    setIsOpened(false);
    setForm({
      name: "",
      email: "",
      password: "",
    });
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
    <>
      <button
        className="bg-red-400 text-white p-4"
        onClick={() => setIsOpened(!isOpened)}
      >
        Signup
      </button>
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
    </>
  );
}
