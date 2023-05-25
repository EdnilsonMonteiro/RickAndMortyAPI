import axios, { AxiosResponse } from 'axios';

interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  type: string;
  status: string;
}

interface CharacterResponse {
  data: {
    results: Character[];
  }
}

export const getCharacterByName = async (name: string) => {
    try {
      const response: CharacterResponse = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  };

export const getCharacterById = async () => {

    let response: AxiosResponse<Character> | null = null;
    while (response === null || response.data.status === "unknown") {
      const randomId: number = Math.floor(Math.random() * 671) + 1;

      try {
        const res: AxiosResponse<Character> = await axios.get(`https://rickandmortyapi.com/api/character/${randomId}`);
        response = res
      } catch (error) {
        console.error(error);
      }
    }
    return response.data
};

export const getCharactersById = async () => {

  let charactersList: Character[] = []

  for(let i = 0; i < 10; i++) {
    const randomId: number = Math.floor(Math.random() * 671) + 1;

      try {
        const res: AxiosResponse<Character> = await axios.get(`https://rickandmortyapi.com/api/character/${randomId}`);
        charactersList.push(res.data)
      } catch (error) {
        console.error(error);
      }
  }

  return charactersList
}

export const getRandomImage = async () => {
  let response: AxiosResponse<Character> | null = null;

  while (response === null || response.data.status === "unknown") {
    const randomId: number = Math.floor(Math.random() * 671) + 1;

    try {
      const res: AxiosResponse<Character> = await axios.get(`https://rickandmortyapi.com/api/character/${randomId}`);
      response = res;
      const imageUrl = response.data.image;

      return imageUrl;
    } catch (error) {
      console.error(error);
    }
  }
};