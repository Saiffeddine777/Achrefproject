import axios, { AxiosResponse } from "axios";
import React from "react";
import EnvUrl from "../../EnvUrl";
import { useNavigate } from "react-router-dom";

type Props = {};

enum Role {
  Admin = "Admin",
  User = "User",
  Developer = "Developer",
  Client = "Client",
}
interface DataToInsertInterface {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmedPassword: string;
  occupation: string;
  address: string;
  role: Role;
  __v?: number;
}
export interface UserInterface {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  occupation: string;
  address: string;
  role: Role;
  __v?: number;
}

interface SignUpCSSpropertiesInterface {
  divContainer: React.CSSProperties;
  innerDiv: React.CSSProperties;
  inputElement: React.CSSProperties;
  labelElement: React.CSSProperties;
  buttonElement: React.CSSProperties;
}
const SignUp = ({}: Props) => {

  const navigate = useNavigate()

  const [inserted, setInserted] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const styling = React.useState<SignUpCSSpropertiesInterface>({
    divContainer: {
      marginTop: "6%",
      marginLeft: "30%",
      marginRight: "30%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyItems: "center",
      alignContent: "center",
      backgroundColor: "lightcyan",
      justifyContent: "center",
      borderRadius: "10px",
    },
    innerDiv: {
      display: "flex",
      flexDirection: "column",
      padding: "1%",
      alignItems: "center",
      justifyItems: "center",
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: "white",
      margin: "4%",
      width: "70%",
      borderRadius: "10px",
    },
    inputElement: {
      padding: "1%",
      marginBottom: "2%",
      borderRadius: "10px",
      width: "90%",
    },
    labelElement: {
      padding: "1%",
      justifySelf: "right",
    },
    buttonElement: {
      marginTop: "3%",
      border: "none",
      padding: "4%",
      borderRadius: "10px",
      fontWeight: "bold",
    },
  });

  const dataToInsert = React.useRef<DataToInsertInterface>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmedPassword: "",
    occupation: "",
    address: "",
    role: Role.User,
  });

  const handleFirstNameChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    dataToInsert.current.firstName = e.target.value;
  };
  const handleLastNameChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    dataToInsert.current.lastName = e.target.value;
  };
  const handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    dataToInsert.current.email = e.target.value;
  };

  const handlePhoneNumberChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    dataToInsert.current.phoneNumber = e.target.value;
  };
  const handlePasswordChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    dataToInsert.current.password = e.target.value;
  };
  const handleConfirmedPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    dataToInsert.current.confirmedPassword = e.target.value;
  };
  const handleOccupationChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    dataToInsert.current.occupation = e.target.value;
  };

  const handleAddressChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    dataToInsert.current.address = e.target.value;
  };

  const handleSubmit: () => Promise<void |number> = async () => {
    try {
      if (
        dataToInsert.current.confirmedPassword === dataToInsert.current.password
      ) {
        const response: AxiosResponse<UserInterface> = await axios.post(
          `${EnvUrl}/api/users/create`,
          dataToInsert.current
        );
        if (response.data._id) {
          setInserted(true);
          return setTimeout(()=>{
             setInserted(false);
             navigate ("/signin");
          } ,2000)
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }

    setTimeout(() => {
      setInserted(false);
      setError(false);
    }, 2000);
  };
  return (
    <div style={styling[0].divContainer}>
      <h2>Sign Up Now</h2>
      <div style={styling[0].innerDiv}>
        <label style={styling[0].labelElement}>First Name :</label>
        <input
          style={styling[0].inputElement}
          defaultValue={dataToInsert.current.firstName}
          onChange={handleFirstNameChange}
        />
        <label style={styling[0].labelElement}>Last Name:</label>
        <input
          style={styling[0].inputElement}
          defaultValue={dataToInsert.current.lastName}
          onChange={handleLastNameChange}
        />
        <label style={styling[0].labelElement}>Email :</label>
        <input
          style={styling[0].inputElement}
          defaultValue={dataToInsert.current.email}
          onChange={handleEmailChange}
        />
        <label style={styling[0].labelElement}>Phone Number :</label>
        <input
          style={styling[0].inputElement}
          defaultValue={dataToInsert.current.phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <label style={styling[0].labelElement}>Password: </label>
        <input
          style={styling[0].inputElement}
          defaultValue={dataToInsert.current.password}
          onChange={handlePasswordChange}
          type={"password"}
        />
        <label style={styling[0].labelElement}>Confirm Password:</label>
        <input
          style={styling[0].inputElement}
          defaultValue={dataToInsert.current.confirmedPassword}
          onChange={handleConfirmedPasswordChange}
          type={"password"}
        />
        <label style={styling[0].labelElement}>Occupation: </label>
        <input
          style={styling[0].inputElement}
          defaultValue={dataToInsert.current.occupation}
          onChange={handleOccupationChange}
        />
        <label style={styling[0].labelElement}>Address:</label>
        <input
          style={styling[0].inputElement}
          defaultValue={dataToInsert.current.address}
          onChange={handleAddressChange}
        />
        <button style={styling[0].buttonElement} onClick={handleSubmit}>
          Submit
        </button>
        {error && <p>You have an Error Signing Up!</p>}
        {inserted && <p>You have SignUp Perfectly</p>}
      </div>
    </div>
  );
};

export default SignUp;
