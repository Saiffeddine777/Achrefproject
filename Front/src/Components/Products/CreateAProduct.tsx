import axios, { AxiosResponse } from "axios";
import React from "react";
import EnvUrl from "../../EnvUrl";

type Props = {};

export interface ProductInterface {
  _id?: string;
  name: string;
  description: string;
  numberOfPieces: number;
  photos: string[] | FileList | null;
  price: number;
  __v?: number;
}

interface CreateProductCSSPropertiesInterface {
  bigDiv: React.CSSProperties;
  label: React.CSSProperties;
  input: React.CSSProperties;
  textarea: React.CSSProperties;
  fileInput?: React.CSSProperties;
}

enum InsertingStateEnum {
  NothingYet,
  Inserted,
  Error,
}

const CreateAProduct = ({}: Props) => {
  const [insertingState, setInsertingState] =
    React.useState<InsertingStateEnum>(InsertingStateEnum.NothingYet);

  const styling = React.useState<CreateProductCSSPropertiesInterface>({
    bigDiv: {
      margin: "5%",
      display: "flex",
      flexDirection: "column",
      width: "60%",
    },
    label: {
      marginBottom: "1%",
      fontSize: "20px",
    },
    input: {
      borderRadius: "5px",
      height: "30px",
      marginBottom: "1%",
    },
    textarea: {
      borderRadius: "5px",
      height: "100px",
      marginBottom: "1%",
    },
  });

  const [productToInsert, setProductToInsert] =
    React.useState<ProductInterface>({
      name: "",
      description: "",
      numberOfPieces: 0,
      photos: null,
      price: 0,
    });

  const submitProduct: () => Promise<void> = async () => {
    try {
      const formData  : FormData= new FormData()
       
       if (productToInsert.photos){
          for (const photo of productToInsert.photos){
             formData.append("files" , photo)
          }
       }

       formData.append("name", productToInsert.name)
       formData.append("description", productToInsert.description)
       formData.append("price", productToInsert.price.toString())
       formData.append("numberOfPieces", productToInsert.numberOfPieces.toString())

      const response: AxiosResponse = await axios.post(
        `${EnvUrl}/api/products/create`,
        formData
      );
      if (response?.data) {
        setInsertingState(InsertingStateEnum.Inserted);
      }
    } catch (error) {
      console.log(error);
      setInsertingState(InsertingStateEnum.Error);
    }

    setTimeout(() => {
      setInsertingState(InsertingStateEnum.NothingYet);
    }, 2000);
  };

  const handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setProductToInsert((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleDescriptionChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (e) => {
    setProductToInsert((prev) => {
      return { ...prev, description: e.target.value };
    });
  };

  const handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setProductToInsert((prev) => {
      return { ...prev, price: Number(e.target.value) };
    });
  };

  const handlephotosChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setProductToInsert((prev) => {
      return { ...prev, photos: e.target.files };
    });
  };

  const handleNumberOfPiecesChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void = (e) => {
    setProductToInsert((prev) => {
      return { ...prev, numberOfPieces: Number(e.target.value) };
    });
  };
   
  return (
    <div style={styling[0].bigDiv}>
      <label style={styling[0].label}>Name Your Product: </label>
      <input
        type={"text"}
        defaultValue={productToInsert.name}
        onChange={handleNameChange}
        style={styling[0].input}
      />
      <label style={styling[0].label}>Describe the product:</label>
      <textarea
        defaultValue={productToInsert.description}
        onChange={handleDescriptionChange}
        style={styling[0].textarea}
      ></textarea>
      <label style={styling[0].label}>How many pieces does it have:</label>
      <input
        type={"number"}
        defaultValue={productToInsert.numberOfPieces}
        onChange={handleNumberOfPiecesChange}
        style={styling[0].input}
      />
      <label style={styling[0].label}>Any Photos: </label>
      <input
        type={"file"}
        multiple  
        onChange={handlephotosChange}
        style={styling[0].input}
      />
      <label style={styling[0].label}>how much will it cost:</label>
      <input
        type={"number"}
        onChange={handlePriceChange}
        style={styling[0].input}
      />
      <button onClick={submitProduct}>Submit</button>
      {insertingState === InsertingStateEnum.Inserted && (
        <p>Product Has been Inserted</p>
      )}
      {insertingState === InsertingStateEnum.Error && (
        <p>Error Inseting The Product</p>
      )}
    </div>
  );
};

export default CreateAProduct;
