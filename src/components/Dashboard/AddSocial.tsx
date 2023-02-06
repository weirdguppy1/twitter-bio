import { Dialog, Transition } from "@headlessui/react";
import { GlobeAltIcon, LinkIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";

type FormData = {
  link: string;
};

const AddSocial = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const linkRegex =
    /^(https?:\/\/)?(www\.)?(instagram|twitter|facebook|tiktok|github|(open\.)?spotify|youtube)\.(com|me|io)\/[A-Za-z0-9._]+\/?$/;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    setValue("link", "");
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
        onClick={openModal}
        className="btn-short w-full animate-text border-none  bg-gradient-to-r from-purple-500 to-red-500 font-semibold"
      >
        <div className="flex items-center space-x-2">
          <GlobeAltIcon className="h-5 w-5" />
          <span>Add Socials</span>
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
                    <span>Add Social</span>
                  </Dialog.Title>
                  <div className="flex flex-col space-y-2">
                    <h1>Supports:</h1>
                    <div className="flex items-center space-x-1">
                      <FaInstagram className="h-6 w-6 fill-purple-500" />
                      <FaTwitter className="h-6 w-6 fill-tblue" />
                      <FaTiktok className="h-6 w-6" />
                      <FaYoutube className="h-6 w-6 fill-red-500" />
                      <FaGithub className="h-6 w-6 fill-black" />
                      <FaFacebook className="h-6 w-6 fill-blue-500" />
                      <FaSpotify className="h-6 w-6 fill-green-600" />
                    </div>
                  </div>
                  <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div className="flex flex-col space-y-1">
                      <label>
                        <div className="flex items-center space-x-1">
                          <span>Social Link</span>
                          <LinkIcon className="mr-2 h-5 w-5 fill-black" />
                        </div>
                      </label>
                      <div className="flex">
                        <input
                          {...register("link", {
                            required: true,
                            pattern: linkRegex
                          })}
                          className="input w-full"
                          type="text"
                          placeholder="https://instagram.com/username, etc."
                        />
                        {errors.link && <span>Not valid url</span>}
                      </div>
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

export default AddSocial;
