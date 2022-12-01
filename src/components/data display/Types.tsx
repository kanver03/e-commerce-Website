export type DataProps = {
   id: number,
   title : string,
   price: number,
   description: string,
   category: string,
   image: string,
   rating: {
    rate: number,
    count: number,
   },
}[];

export type ItemProps = {
    id: number,
    title : string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
     rate: number,
     count: number
            }
        };

export type MenuForMainDisplayProps = {
            url: string,
            //dataHide: React.Dispatch<React.SetStateAction<boolean>>,
            setData: React.Dispatch<React.SetStateAction<DataProps | undefined>>,
            setLoading: React.Dispatch<React.SetStateAction<string>>,
            setShowCartData:React.Dispatch<React.SetStateAction<boolean>>,
            setShowData: React.Dispatch<React.SetStateAction<boolean>>,
            
        };  
        
export type CartDataProps = {
    id: number,
    price: number,
    title: string,
    quantity: number,
    
}[];


