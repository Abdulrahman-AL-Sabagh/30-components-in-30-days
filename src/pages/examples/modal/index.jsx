/** @format */
import { useState } from "react";
import { PrimaryButton, TextButton } from "ui/button";
import TextField from "ui/form/text-field";
export default function Modal({
  handleClick = () => {
    console.log("hi");
  },
  children,
  title = "",
  isHidden = false,
}) {
  const [hidden, setHidden] = useState(isHidden);

  return (
    <>
      <div className="relative w-screen h-screen flex justify-center  ">
        <div
          className={` bg-white shadow-gray-700 shadow-2xl rounded-xl   absolute w-96 h-fit transition-all    ${
            hidden ? "-translate-y-[200%] " : "translate-y-[100%]"
          } `}
        >
          <h2 className=" p-4 border-b-2 border-b-gray-00 ">
            {title}
            This should be a modal
          </h2>
          <div className="flex flex-col justify-around gap-6 p-4">
            {children}
            <TextField />
            <TextField />
          </div>
          <div className=" flex  rounded-b-xl h-fit bg-slate-300 justify-end  p-2">
            <TextButton onClick={() => setHidden(!hidden)}>Cancel</TextButton>
            <TextButton
              onClick={() => {
                handleClick();
                setHidden(!hidden);
              }}
            >
              Confirm
            </TextButton>
          </div>
        </div>
      </div>
    </>
  );
}
