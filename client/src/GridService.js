import axios from 'axios';

const url = 'http://localhost:5000/api/gridItems/';

class GridService {

  // Get gridItem
  static getGridItems(){
    return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.get(url);
          const data = res.data;
          resolve(
            data.map(gridItem => ({
              ...gridItem,
              createdAt: new Date(gridItem.createdAt)
            }))
          );
        } catch(err) {
          reject(err);
        }
    })
  }

  // Create gridItem
  static insertPost(text){
    return axios.post(url, { text })
  }
  
  // Delete gridItem
  static deletePost(id){
    return axios.delete(`${url}${id}`, )
  }
}

export default GridService;