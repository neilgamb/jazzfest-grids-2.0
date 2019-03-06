import axios from 'axios';

const url = 'http://localhost:5000/api/events/';

class EventService {

  // Get gridItem
  static getEvents(){
    return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.get(url);
          const data = res.data;
          resolve(
            data.map(event => ({
              ...event,
              createdAt: new Date(event.createdAt)
            }))
          );
        } catch(err) {
          reject(err);
        }
    })
  }

  // Create gridItem
  static insertEvent(text){
    return axios.post(url, { text })
  }
  
  // Delete gridItem
  static deleteEvent(id){
    return axios.delete(`${url}${id}`, )
  }
}

export default EventService;