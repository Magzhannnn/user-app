import React from "react";
import UserForm from "../components/UserForm";
import { IUser } from "../types/user";
import { useNavigate } from "react-router-dom";

interface Props {
  onSumbit: () => void;
  user: IUser | null;
  title: string;
  isSuccess: boolean;
}

const ContainerUser: React.FC<Props> = ({
  onSubmit,
  user,
  title,
  isSuccess,
}) => {
  const navigate = useNavigate();

  const navigateHandle = () => {
    navigate("/");
  };
  return (
    <>
      <div className="fixed top-[75px] left-[70px] font-bold cursor-pointer bg-red-500 text-white py-2 px-9 rounded hover:bg-red-700" onClick={navigateHandle}>
        Back
      </div>
      <div className="w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl mb-4">{title}</h2>
        {isSuccess && user && (
          <UserForm onSubmit={onSubmit} defaultValues={user} />
        )}
        {!user && <UserForm onSubmit={onSubmit} />}
      </div>
    </>
  );
};

export default ContainerUser;
