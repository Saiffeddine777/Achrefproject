import React from "react";
import { UserInterface } from "./SignUp";
import axios, { AxiosResponse } from "axios";
import EnvUrl from "../../EnvUrl";
import DeleteUser from "./DeleteUser";

type Props = {};
interface UsersListCSSPropertiesInterface {
    containerDiv ?: React.CSSProperties,
    userDiv ?: React.CSSProperties,
    titleSpan ?: React.CSSProperties
}

function Users({}: Props) {
  const [users, setUsers] = React.useState<UserInterface[]>([]);
  const [trigg ,setTrigg] = React.useState<boolean>(false)
  const styling = React.useState<UsersListCSSPropertiesInterface>({
      containerDiv: {
           margin:"5%"
      },
      userDiv:{
          marginBottom: "4%",
          borderWidth: "3px",
          backgroundColor: "lightcoral",
          padding: "2%",
          width:"40%",
          borderRadius: "10px"
      },
      titleSpan:{
          fontWeight: "bold"
      }
  })

  const handleUsersFetching: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${EnvUrl}/api/users/all`
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleUsersFetching();
  }, [trigg]);

  return (
    <div style={styling[0].containerDiv}>
      {users.map((user, index) => {
        return (
          <div style={styling[0].userDiv} key={index}>
            <h3>
             <span style={styling[0].titleSpan}> Name:</span> {user?.firstName} {user?.lastName}
            </h3>
            <p> <span style={styling[0].titleSpan}>  Job:</span> {user?.occupation}</p>
            <p>  <span style={styling[0].titleSpan}> Email </span>{user?.email}</p>
            <p> <span style={styling[0].titleSpan}> Address: </span>{user?.address}</p>
            <p> <span style={styling[0].titleSpan}> Phone Number:</span> {user?.phoneNumber} </p>
            <p> <span style={styling[0].titleSpan}> Role:</span> {user?.role}</p>
            <DeleteUser _id={user?._id as string} setTrigg={setTrigg}/>
          </div>
        );
      })}
    </div>
  );
}

export default Users;
