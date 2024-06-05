import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation, useGetUsersQuery } from "../services/api";
import ContainerUser from "./ContainerUser";

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [addUserMutation] = useAddUserMutation();
  const { refetch } = useGetUsersQuery();

  const handleAddUser = async (data: any) => {
    const currentDate = new Date().toISOString();
    try {
      await addUserMutation({...data, registrationDate: currentDate});
      refetch();
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <ContainerUser
      title="Add User"
      onSubmit={handleAddUser}
      user={null}
    />
  );
};

export default AddUser;
