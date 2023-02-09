import { Dialog, Transition } from "@headlessui/react";
import { DocumentIcon, LinkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import useFirestore from "../../hooks/useFirestore";

type FormData = {
  link: string;
  title: string;
};

const AddLink = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [link, setLink] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>();
  const linkRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const { addLink } = useFirestore();

  const onSubmit = handleSubmit(data => {
    setValue("link", "");
    addLink(data.link, data.title);
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
          <span>Add Link</span>
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
                    Add Link
                  </Dialog.Title>
                  <form onSubmit={onSubmit} className="mt-2 space-y-4">
                    <div className="flex flex-col space-y-1">
                      <label>
                        <div className="flex items-center space-x-1">
                          <span>Title</span>
                          <DocumentIcon className="mr-2 h-5 w-5 fill-black" />
                        </div>
                      </label>
                      <input
                        {...register("title", {
                          required: true,
                          pattern: linkRegex
                        })}
                        value={link}
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
                        value={link}
                        className="input w-full"
                        placeholder="https://google.com, etc."
                      />
                    </div>
                    <div className="mt-4 space-x-2">
                      <button
                        type="submit"
                        className="btn-short bg-tblue text-white"
                        onClick={closeModal}
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="btn-short btn-black"
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

export default AddLink;
