import axios, { AxiosResponse } from 'axios'
import React from 'react'
import EnvUrl from '../../EnvUrl'

type Props = {_id : string , setTrigg : React.Dispatch<React.SetStateAction<boolean>>}

const DeleteAProduct = ({_id , setTrigg}: Props) => {

  const styling = React.useState<React.CSSProperties>({
         border:"none",
         padding:"3%",
         borderRadius: "5px",
         fontWeight:"bold"
  })

  const handleDelete : ()=>Promise<void> =  async function (){
     try {
        const response :AxiosResponse = await axios.delete(`${EnvUrl}/api/products/delete/${_id}`)
        if (response.data){
            setTrigg(trigg=>!trigg)
        }
     } catch (error) {
        console.error(error)
     }
  }

  return (
    <button onClick={handleDelete} style={styling[0]}>Delete</button>
  )
}

export default DeleteAProduct