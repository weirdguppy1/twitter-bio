import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots1 } from "react-icons/rx";
import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { Transition, Dialog } from "@headlessui/react";
import useFirestore from "../../hooks/useFirestore";

type FormData = {
  title: string;
  content: string;
};

const Field = (props: {
  content: string;
  title: string;
  bio?: boolean;
  id: string;
}) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const { updateField, deleteField } = useFirestore();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { title: props.title, content: props.content }
  });

  const onSubmit = handleSubmit(data => {
    closeModal();
    updateField(props.id, data.title, data.content);
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setValue("title", props.title);
    setValue("content", props.content);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  const openDeleteModal = () => {
    closeModal();
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    closeDeleteModal();
    deleteField(props.id);
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    touchAction: "none"
  };

  return (
    <>
      <div
        style={style}
        className={clsx(
          "mt-4 flex flex-col  space-y-4 border-2 border-transparent p-4",
          !props.bio && "rounded-xl hover:border-gray-200/10"
        )}
      >
        <div className={clsx("flex items-start", !props.bio && "space-x-4")}>
          <div className="flex flex-col items-center space-y-1">
            <div ref={setNodeRef} {...attributes} {...listeners}>
              <RxDragHandleDots1
                className={clsx("h-6 w-6 fill-white", props.bio && "hidden")}
              />
            </div>
            <button onClick={openModal}>
              <PencilSquareIcon
                className={clsx("h-5 w-5 fill-white", props.bio && "hidden")}
              />
            </button>
          </div>
          <div className="flex flex-col items-start">
            <div className="flex w-fit max-w-sm flex-col rounded-md bg-black px-4 py-1">
              <div className="overflow-hidden">
                <h1
                  className={clsx(
                    "text-2xl font-bold",
                    props.bio &&
                      "animate-text bg-gradient-to-r from-purple-500 via-green-500 to-pink-600 bg-clip-text text-transparent"
                  )}
                  style={{ wordWrap: "break-word" }}
                >
                  {props.title}
                </h1>
              </div>
            </div>
            <p className="mx-3 mt-2 whitespace-pre-line text-lg">
              {props.content}
            </p>
          </div>
        </div>
      </div>
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
                    Update Field
                  </Dialog.Title>
                  <form className="mt-2 space-y-4" onSubmit={onSubmit}>
                    <div className="flex flex-col space-y-2">
                      <label>Field Name</label>
                      <input
                        {...register("title", {
                          required: true,
                          maxLength: {
                            value: 50,
                            message: "Title too long."
                          }
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
                    {errors.title && (
                      <h1 className="text-red-500">{errors.title.message}</h1>
                    )}
                    {errors.content && (
                      <h1 className="text-red-500">{errors.content.message}</h1>
                    )}
                    <button onClick={openDeleteModal}>
                      <h1 className="text-red-500 hover:underline">Delete</h1>
                    </button>
                    <div className="mt-4 space-x-2">
                      <button
                        type="submit"
                        className="btn-short bg-tblue text-white"
                      >
                        Update
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
      <Transition appear show={isDeleteOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                <Dialog.Panel className="flex w-full max-w-lg transform flex-col space-y-4 overflow-hidden rounded-2xl bg-white p-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-gray-900"
                  >
                    Are you sure you want to delete '{props.title}'?
                  </Dialog.Title>
                  <p>
                    Are sure you want to delete? This action cannot be undone.
                  </p>
                  <div className="flex space-x-2">
                    <button
                      className="btn-short bg-red-500 text-white"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn-short"
                      onClick={closeDeleteModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Field;
