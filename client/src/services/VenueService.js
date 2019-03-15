import axios from 'axios';

const url = 'api/venues/';

class VenueService {

  static getVenues(){
    return new Promise(async (resolve, reject) => {
        try {
          const res = await axios.get(url);
          const data = res.data;
          resolve(
            data.map(venue => ({
              ...venue,
              createdAt: new Date(venue.createdAt)
            }))
          );
        } catch(err) {
          reject(err);
        }
    })
  }

  // Create gridItem
  static insertVenue(text){
    return axios.post(url, { text })
  }
  
  // Delete gridItem
  static deleteVenue(id){
    return axios.delete(`${url}${id}`, )
  }
}

export default VenueService;