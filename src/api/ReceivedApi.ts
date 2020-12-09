import {BACKEND_API} from '../config'
import axios from 'axios'
export class ReceivedApi {
    static RECEIVED_API_URL = `${BACKEND_API}/received`
    
    static async getReceivedInvoice(params:any) {
        try {
            const result = await axios.get(this.RECEIVED_API_URL+'/findall', {
              params,
            });            
            return result.data;
          } catch {
            alert('Cannot fetch data');
            return [];
          }
    }

    static async getAllReceivedInvoice() {
      try {
          const result = await axios.get(this.RECEIVED_API_URL+'/findall');            
          return result.data;
        } catch {
          alert('Cannot fetch data');
          return [];
        }
    }
    
    static async insertReceivedInvoice(data:object) {
        const result = await axios.post(this.RECEIVED_API_URL,data).then(response => {
            return response;
          });
        return result.data;
    }

    static async getReceivedInvoiceById(id:string){
      try {
        const result = await axios.get(this.RECEIVED_API_URL+'/'+id);            
        return result.data;
      } catch {
        alert('Cannot fetch data');
        return [];
      }
    }
    static async deleteReceivedInvoiceById(id:string){
      await axios.delete(this.RECEIVED_API_URL+'/'+id)
    }
}