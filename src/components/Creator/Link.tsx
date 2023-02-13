import { useSortable } from "@dnd-kit/sortable";
import { Dialog, Transition } from "@headlessui/react";
import { LinkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { CSS } from "@dnd-kit/utilities";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import useFirestore from "../../hooks/useFirestore";
import { RxDragHandleDots1 } from "react-icons/rx";

type FormData = {
  title: string;
  link: string;
};

const Link = (props: { link: string; title: string; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const { updateLink, deleteLink } = useFirestore();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: { title: props.title, link: props.link }
  });

  const style = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition
  };

  const onSubmit = handleSubmit(data => {
    updateLink(props.id, data.title, data.link);
    closeModal();
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setValue("title", props.title);
    setValue("link", props.link);
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
    deleteLink(props.id);
  };

  return (
    <>
      <div style={style} className="flex max-w-full flex-col">
        <div className="flex items-center space-x-1">
          <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="rotate-90"
          >
            <RxDragHandleDots1 className="h-6 w-6 fill-white" />
          </div>
          <button onClick={openModal}>
            <PencilSquareIcon className="h-5 w-5 fill-white" />
          </button>
        </div>
        <a target="_blank" href={props.link}>
          <div className="duration-250 mt-2 flex items-center space-x-4 rounded-2xl bg-white px-2 py-3 text-black shadow-lg transition hover:scale-[1.02] hover:shadow-xl">
            <div className="rounded-full bg-black p-2">
              <LinkIcon className="h-5 w-5 fill-white" />
            </div>
            <div className="overflow-hidden">
              <h1
                className="text-md font-bold"
                style={{ wordWrap: "break-word" }}
              >
                {props.title}
              </h1>
            </div>
          </div>
        </a>
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
                    Update Link
                  </Dialog.Title>
                  <form onSubmit={onSubmit} className="mt-2 space-y-4">
                    <div className="flex flex-col space-y-2">
                      <label>
                        <div className="flex items-center space-x-1">
                          <span>Title</span>
                        </div>
                      </label>
                      <input
                        {...register("title", {
                          required: true,
                          maxLength: { value: 50, message: "Title too long." }
                        })}
                        className="input w-full"
                        placeholder="Company website, personal website, etc."
                      />
                      <label>
                        <div className="flex items-center space-x-1">
                          <span>Link</span>
                          <LinkIcon className="mr-2 h-5 w-5 fill-black" />
                        </div>
                      </label>
                      <input
                        {...register("link", {
                          required: true,
                          pattern: linkRegex
                        })}
                        className="input w-full"
                        placeholder="https://google.com, etc."
                      />
                    </div>
                    {errors.link && (
                      <h1 className="text-red-500">Not valid link.</h1>
                    )}
                    {errors.title && (
                      <h1 className="text-red-500">{errors.title.message}</h1>
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

export default Link;
