import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useEditUserMutation,
  useGetUsersQuery,
} from "../services/api";
import ContainerUser from "./ContainerUser";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: user, isSuccess } = useGetUserByIdQuery(id);
  const { refetch: refetchUser } = useGetUserByIdQuery(id);
  const [editUserMutation] = useEditUserMutation();
  const { refetch: refetchUsers } = useGetUsersQuery();

  const handleEditUser = async (data: any) => {
    try {
      await editUserMutation({ id, ...data });
      refetchUser(id);
      refetchUsers();
      navigate("/");
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <ContainerUser
      title="Edit User"
      isSuccess={isSuccess}
      onSubmit={handleEditUser}
      user={user}
    />
  );
};

export default EditUser;
