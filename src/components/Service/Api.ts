
import {DataProps} from "../data display/Types";

import {useState, useEffect} from "react";

export const useApi = (url: string) => {

const[data, setData] = useState<DataProps>();

    const apiCall = async() => {
        const response = await fetch(url);
        const dataFromCall = await response.json();
        setData(dataFromCall);
       };
    
    useEffect(()=>{
        apiCall();
    },[]);

    return {data,setData};
};

// export const callApi = async() => {
//  const promise = await fetch(url);
//  var fullIntialData = await promise.json();
//  console.log(fullIntialData);
// }
//export var fullIntialData: DataProps ;
