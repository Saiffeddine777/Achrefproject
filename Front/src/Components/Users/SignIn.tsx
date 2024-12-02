
import React from 'react'
// import { useNavigate } from 'react-router-dom'
import { fetchUserAPIThunk } from '../../StateSlices/SignInSlice'
import { useAppDispatch , useAppSelector } from '../../ReduxTools/Hooks'
type Props = {}

interface SignInCSSPropertiesInterface{
    containerDiv :React.CSSProperties ,
    innerDiv:React.CSSProperties ,
    labelElement: React.CSSProperties,
    inputElement :React.CSSProperties,
    buttonElement :React.CSSProperties
}

const SignIn = ({}: Props) => {

    // const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const state = useAppSelector(state=>state.signedInUser)


    const dataToInsert = React.useRef<{password :string , email:string}>({
        password:"",
        email:""
    })

    const styling = React.useState<SignInCSSPropertiesInterface>({
        containerDiv:{
             marginTop: "10%",
             marginLeft :"20%",
             marginRight:"20%",
             backgroundColor:"lightcyan",
             display: "flex",
             flexDirection: "column",
             alignContent: "center",
             justifyContent:"center",
             alignItems:"center",
             borderRadius: "10px"
        },
        innerDiv:{
             backgroundColor : "white",
             width : "60%",
            display: "flex",
             flexDirection: "column",
             alignContent: "center",
             alignItems:"center",
             justifyContent:"center",
             padding : "5%",
             margin :"5%",
             borderRadius : "10px"
        },
        labelElement:{
            padding : "2%",
        },
        inputElement:{
            padding:"2%",
            borderRadius: "10px"
        },
        buttonElement:{
            border :"none",
            marginTop: "3%",
            padding: "2%",
            borderRadius: "10px"
        }
    })

    const handleSignInRequest : ()=>void = async()=>{
        const email : string  = dataToInsert.current.email 
        const password : string  = dataToInsert.current.password 

       dispatch(fetchUserAPIThunk({email , password}) as any)
    }

    const handleEmailChange : (e:React.ChangeEvent<HTMLInputElement>) => void = (e)=>{
         dataToInsert.current.email = e.target.value
    }

    const handlePasswordChange : (e: React.ChangeEvent<HTMLInputElement>) => void = (e)=>{
        dataToInsert.current.password = e.target.value
    }
    console.log(state)
   return (
    <div style={styling[0].containerDiv}>
        <h2>Sign In</h2>
        <div style={styling[0].innerDiv}>
        <label style={styling[0].labelElement}>Email: </label>
        <input  style={styling[0].inputElement} type={"text"} defaultValue={dataToInsert.current.email}  onChange={handleEmailChange}/>
        <label  style={styling[0].labelElement}>Password :</label>
        <input style={styling[0].inputElement} type={"password"} defaultValue={dataToInsert.current.password} onChange={handlePasswordChange}/>
        <button onClick={handleSignInRequest} style={styling[0].buttonElement}>Sign In</button>
        </div>
    </div>
  )
}

export default SignIn