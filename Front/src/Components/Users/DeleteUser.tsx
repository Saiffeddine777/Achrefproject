import axios, { AxiosResponse } from 'axios'
import React from 'react'
import EnvUrl from '../../EnvUrl'

type Props = {
    _id :string,
    setTrigg :React.Dispatch<React.SetStateAction<boolean>> 
}

interface DeleteUserCSSPropertiesInterface{
    button?:React.CSSProperties
}

const DeleteUser = ({_id , setTrigg}: Props) => {
  const styling = React.useState<DeleteUserCSSPropertiesInterface>({
     button:{
          border :"none",
          backgroundColor: "white",
          padding:"2%",
          borderRadius :"5px",
          fontWeight: "bold"
     }
  }) 
  const handleDeleteUser :  ()=> Promise<void> = async ()=>{
    try{
       const response :AxiosResponse = await axios.delete(`${EnvUrl}/api/users/delete/${_id}`)
       if (response.data){
         setTrigg (trigg => !trigg)
       }
    }
    catch(error){
       console.error(error)
    }
  } 
  return (
     <button style={styling[0].button} onClick={handleDeleteUser}>Delete</button>
  )
}

export default DeleteUser