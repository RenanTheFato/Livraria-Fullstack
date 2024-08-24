import { databaseConnect } from "../database/connection";
import 'dotenv'

class ListBookService{

  async execute(){
    
    try {
    
      const [query] = await databaseConnect.query(`SELECT * FROM ${process.env.TABLE1};`);
      console.log("Consulta Executada");
      return query;
    
    } catch (error) {
      
      console.error(error);
      throw error;
      
    }

  }
}

export { ListBookService }