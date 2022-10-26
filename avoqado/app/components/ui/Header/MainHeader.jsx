// import { db } from "../../../services/db";

import { ChevronLeftIcon } from "@heroicons/react/outline";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  ActionButton,
  LoginButton,
  ActionModal,
  Modal,
} from "../../../components";

export const MainHeader = ({ changeHeader, children, hide, request }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();
  const goBack = () => navigate(-1);

  return (
    <div>
      <nav className="fixed top-0 inset-x-0 z-50 max-w-mobile-full m-auto bg-white flex flex-row justify-between p-2 rounded-b-2xl drop-shadow-lg items-center">
        {pathname.includes("menu") ? (
          <button onClick={goBack}>
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        ) : (
          <Link to={{}} className="">
            <label className="text-xl">avoqado</label>
          </Link>
        )}
        <ActionButton onClick={() => setShowModal(true)} />

        <LoginButton />
      </nav>
    </div>
    // <nav className="fixed top-0 right-0 left-0 z-50 max-w-mobile-full m-auto ">

    //     <div className="flex flex-row justify-between px-2 py-2 rounded-b-2xl bg-white shadow-md items-center ">
    //       <div>
    //         {/* <img
    //     src={require("../../utils/images/logo.png")}
    //     className="h-6 w-5"
    //   /> */}
    //         {changeHeader ? (
    //           <button
    //             onClick={goBack}
    //             className="flex flex-row items-center space-x-1 "
    //           >
    //             <div className="flex flex-row">
    //               <ChevronLeftIcon className="w-5 h-5" />
    //               <p>back</p>
    //             </div>
    //           </button>
    //         ) : (
    //           <Link to="/" className="">
    //             <label className="text-xl">avoqado</label>
    //           </Link>
    //         )}
    //       </div>

    //       <ActionButton onClick={() => setShowModal(true)} />
    //       <LoginButton />
    //       {/* C-START: ActionModal */}
    //       {showModal && (
    //         <Modal onClose={() => setShowModal(false)} modalClassName={true}>
    //           <ActionModal onClick={() => setShowModal(false)} />
    //         </Modal>
    //       )}
    //     </div>

    //   {children}
    // </nav>
  );
};
