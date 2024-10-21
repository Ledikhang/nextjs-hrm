import { List } from "@/models/list-err.model";
import axios from "axios";

// export async function fetchList(): Promise<AxiosResponse<List[], Error>> {
//   try {
//     const response = await axios.get("http://localhost:4000/list");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching list:", error);
//     throw error;
//   }
// }

export const fetchList = async (): Promise<List[]> => {
    try {
        const response = await axios.get("http://localhost:3000/list-err"); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
    }
};
