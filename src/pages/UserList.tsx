import React from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import { useGetUsersQuery, useDeleteUserMutation } from "../services/api";

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const { data: users, isSuccess, refetch } = useGetUsersQuery();
  const [deleteUserMutation] = useDeleteUserMutation();

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserMutation(id);
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      {isSuccess && (
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDeleteUser}
        />
      )}
      <button
        onClick={() => navigate("/add")}
        className="mb-4 bg-blue-500 text-white p-2 rounded mx-5"
      >
        Add User
      </button>
    </div>
  );
};

export default UserList;
