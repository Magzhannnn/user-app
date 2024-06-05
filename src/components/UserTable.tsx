import React from "react";
import { Fragment } from "react/jsx-runtime";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  registrationDate: string;
};

type Props = {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  if(!users.length) {
    return <div className='font-bold text-3xl text-center mt-5'>Нет пользователей!!!</div>
  }

  return (
    <div className="gridClass gap-4 bg-white shadow-md rounded-lg p-4 m-5">
      <div className="font-semibold">№</div>
      <div className="font-semibold">Имя</div>
      <div className="font-semibold">Фамилия</div>
      <div className="font-semibold">Email</div>
      <div className="font-semibold">Навыки</div>
      <div className="font-semibold">Дата регистрации</div>
      <div className="font-semibold">Действия</div>
      {users.map((user, idx) => (
        <Fragment  key={user.id}>
          <div className="">{idx+1}</div>
          <div className="">{user.firstName}</div>
          <div className="">{user.lastName}</div>
          <div className="">{user.email}</div>
          <div className="">
            {user.skills && user.skills.length ? user.skills.join(", ") : "-"}
          </div>
          <div className="">
            {new Date(user.registrationDate).toLocaleDateString()}
          </div>
          <div className=" flex justify-center space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
              onClick={() => onEdit(user.id)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </Fragment >
      ))}
    </div>
  );
};

export default UserTable;
