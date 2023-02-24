import { useSortable } from "@dnd-kit/sortable";
import { Dialog, Transition } from "@headlessui/react";
import {
  DocumentIcon,
  LinkIcon,
  PencilSquareIcon
} from "@heroicons/react/24/solid";
import { CSS } from "@dnd-kit/utilities";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import useFirestore from "../../../hooks/useFirestore";
import { RxDragHandleDots1 } from "react-icons/rx";
import { AiFillRobot } from "react-icons/ai";
import { generateBio } from "../../../../openai";
import { ImSpinner } from "react-icons/im";
import { toast } from "react-hot-toast";

type FormData = {
  prompt: string;
};

const BioGenerate = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { prompt: "" }
  });

  const onSubmit = handleSubmit(data => {
    setLoading(true);
    generateBio(data.prompt).then(data => {
      setResponse(data.choices[0].text?.replaceAll("\n", ""));
      setLoading(false);
    });
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response).then(() => {
      toast.success("Copied!");
    });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="btn-short w-full animate-text border-none bg-lime-500 font-semibold hover:bg-gradient-to-r hover:from-lime-500 hover:via-emerald-500 hover:to-teal-400"
        type="button"
      >
        <div className="flex items-center justify-center space-x-1">
          <AiFillRobot className="h-5 w-5" />
          <h1>Generate</h1>
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
                    Generate Bio with AI
                  </Dialog.Title>
                  <form onSubmit={onSubmit} className="mt-2 space-y-4">
                    <div className="flex flex-col space-y-2">
                      <label>
                        <div className="flex items-center space-x-1">
                          <span>Prompt</span>
                        </div>
                      </label>
                      <textarea
                        {...register("prompt", {
                          required: true,
                          maxLength: { value: 200, message: "Prompt too long." }
                        })}
                        className="input w-full resize-none"
                        placeholder="Teacher who likes fishing, has two kids, etc..."
                      />
                      {errors.prompt && (
                        <h1 className="text-red-500">
                          {errors.prompt.message}
                        </h1>
                      )}
                      <div className="mt-4 space-x-2">
                        <button
                          type="submit"
                          className="btn-short bg-tblue text-white"
                        >
                          Generate
                        </button>
                        <button
                          type="button"
                          className="btn-short"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
                  {loading ? (
                    <div className="mt-10 flex justify-center">
                      <ImSpinner className="h-5 w-5 animate-spin fill-black" />
                    </div>
                  ) : (
                    <div className="mt-10 flex flex-col">
                      {response && (
                        <button
                          onClick={handleCopy}
                          className="btn-short btn-black w-fit border-none"
                        >
                          <div className=" flex items-center space-x-1">
                            <DocumentIcon className="h-4 w-4" />
                            <h1>Copy</h1>
                          </div>
                        </button>
                      )}
                      <p className="">{response}</p>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BioGenerate;
