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

  async executeSearch(searchTerm: string){
    try {
      const query = `
        SELECT * FROM ${process.env.TABLE1}
        WHERE titulo LIKE ? OR autor LIKE ? OR categoria LIKE ?;
      `;
      const [results] = await databaseConnect.query(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);

      console.log("Consulta de pesquisa executada");
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { ListBookService }