import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import useFirestore from "../../../../hooks/useFirestore";

type FormData = {
  name: string;
  content: string;
};

const AddField = () => {
  let [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>();
  const { addField } = useFirestore();

  const onSubmit = handleSubmit(data => {
    addField(data.name, data.content);
    setValue("content", "");
    setValue("name", "");
    closeModal();
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="btn-short btn-white w-full border-none font-semibold"
        onClick={openModal}
      >
        <div className="flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>Add Field</span>
        </div>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-tblack bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto font-satoshi">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Add Text Field
                  </Dialog.Title>
                  <form className="mt-2 space-y-4" onSubmit={onSubmit}>
                    <div className="flex flex-col space-y-1">
                      <label>Field Title</label>
                      <input
                        {...register("name", {
                          required: true,
                          maxLength: { value: 50, message: "Title too long." }
                        })}
                        className="input w-full"
                        placeholder="Job, Hobbies, etc."
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label>Field Content</label>
                      <textarea
                        {...register("content", {
                          required: true,
                          maxLength: {
                            value: 2000,
                            message: "Content too long."
                          }
                        })}
                        className="input h-24 w-full resize-none"
                        placeholder="Content for text field..."
                      />
                    </div>
                    {errors.name && (
                      <h1 className="text-red-500">{errors.name.message}</h1>
                    )}
                    {errors.content && (
                      <h1 className="text-red-500">{errors.content.message}</h1>
                    )}
                    <div className="mt-4 space-x-2">
                      <button
                        type="submit"
                        className="btn-short bg-tblue text-white"
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="btn-short"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddField;
