import axios, { AxiosResponse } from "axios";
import React from "react";
import EnvUrl from "../../EnvUrl";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DeleteAProduct from "./DeleteAProduct";

type Props = {};

export interface ImageInfoInterface {
  _id?: string;
  url: string;
  publicId: string;
}
export interface ProductInterface {
  _id?: string;
  name: string;
  description: string;
  numberOfPieces: number;
  photos: ImageInfoInterface[];
  price: number;
  __v?: number;
}

interface ProductsCSSPropertiesInterface {
    productCardDiv : React.CSSProperties,
    productsDiv :React.CSSProperties,
    productImage?: React.CSSProperties,
    insertButton?: React.CSSProperties,
    biggerDiv?: React.CSSProperties
}
const Products = ({}: Props) => {
  const [products, setProducts] = React.useState<ProductInterface[]>([]);
  const [trigg , setTrigg] = React.useState<boolean>(false)
  const navigate: NavigateFunction = useNavigate();
  
  const styling = React.useState<ProductsCSSPropertiesInterface>({
    productCardDiv: {
        margin: "1%", 
        height:"20%",
        width: "23%",
        padding: "1%",
        backgroundColor: "lightcoral",
        display:"flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems:"center",
        justifyItems:"center",
        borderRadius:"10px",
        color :"white"
    },
    productsDiv:{
        margin :"10%",
        width: "80%",
        display:"flex",
        flex:"wrap"
    },
    productImage:{
        width:"80%",

    }, 
    insertButton:{
        border:"none",
        backgroundColor: "lightskyblue",
        padding: "1%",
        borderRadius:"5px",
        fontWeight:"bold",
        marginLeft:"5%",
        marginTop:"3%"
    }, 
    biggerDiv:{
       width: "80%"
    }
  })

  const handleGetProducts: () => Promise<void> = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${EnvUrl}/api/products/all`
      );
      setProducts(response.data as ProductInterface[]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigationToCreateProduct: () => void = function () {
    navigate("/createAProduct");
  };

  React.useEffect(() => {
    handleGetProducts();
  }, [trigg]);

  return (
    <div style={styling[0].biggerDiv}>
      <button style={styling[0].insertButton} onClick={handleNavigationToCreateProduct}>
        Insert a Product
      </button>
      <div style ={styling[0].productsDiv}>
        {products.map((product, index) => {
          return (
            <>
              <div key={index} style={styling[0].productCardDiv}>
                <h4>{product?.name}</h4>
                <img  style={styling[0].productImage}src={`${product?.photos[0].url}`}/>
                <p>{product?.price} dt</p>
                <DeleteAProduct _id={product._id as string} setTrigg={setTrigg}/>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
