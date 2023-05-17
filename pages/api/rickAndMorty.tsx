import axios from 'axios';

export const getCharacter = async (name: string) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  };

export const liveOrDead = async () => {

    
    let response = null;
    while (response === null || response.data.status === "unknown") {
      const randomId = Math.floor(Math.random() * 671) + 1;

      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/character/${randomId}`);
        response = res
      } catch (error) {
        console.error(error);
      }
    }
    return response.data;

    
};
