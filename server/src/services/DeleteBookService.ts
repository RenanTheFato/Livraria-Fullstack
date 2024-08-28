import { databaseConnect } from "../database/connection"
import 'dotenv'

interface DeleteBookProps{
  id: number
}

class DeleteBookService{
  async execute({ id }: DeleteBookProps){

    if (!id) {
      throw new Error("Ação Inválida")
    }
    
    const deleteId = await databaseConnect.query(`DELETE FROM ${process.env.TABLE1} WHERE id = ?`,
    [id]
    );

    console.log(deleteId);

    if (!deleteId) {
      throw new Error("Identificador de deleção não encontrado")
    } else{
      console.log("Alvo deletado")
    }

  }
}

export{ DeleteBookService }