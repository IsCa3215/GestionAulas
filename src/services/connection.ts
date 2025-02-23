import { DefaultTheme } from "@react-navigation/native";
import { cardEntity } from "../entities/cardEntity";
import { UserEntity, UserEntityLogin } from "../entities/userEntity";


const defaultUrl = 'http://192.168.1.146:3030';

// USER CONNECTION ------------------------------------------------------------------

export const registerUser = async (data: UserEntity): Promise<UserEntity> => {
    try {
        const response = await fetch(`${defaultUrl}/register`, {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify(data), // enviamos el user como json
        });

        const result = await response.json() as UserEntity;  // la respuesta a JSON
        if (response.ok) {
            console.log('Registro exitoso:', result);
            return result;
        } else {
            console.error('Error en el registro:', result);
            throw new Error('Error en el registro');
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
        throw error;
    }
}



export const loginUser = async (user: UserEntityLogin): Promise<UserEntity> => {
  try {
    const response = await fetch(`${defaultUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), // el servidor solo va a recibir el email y la password el cuál hará las comprobaciones
    });

    const result = await response.json() as UserEntity;

    // Si la respuesta está OK pues to pa'lante
    if (response.ok) {
      console.log('Login exitoso:', result);
      return result;  // devolvemos todos los datos de la consulta a la base de datos que hace el servidor, estos datos están como USERENTITY
    } else {
      throw new Error("Error, datos incorrectos");
    }
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    throw error; 
  }
};

// FIN USER CONNECTION ------------------------------------------------------------------

// EVENTS CONNECTION --------------------------------------------------------------------------

export const getEventsConnection = async (): Promise<cardEntity[]> => {
  try {
    const response = await fetch(`${defaultUrl}/getEvents`, {
      method: 'GET',  
      headers: {
          'Content-Type': 'application/json',  
      },
  });
  const tal = await response.json() as cardEntity[];
  console.log("eventos obtenidos: ", tal)
  return tal;
  } catch (error){
    throw error
  }
}

export const newEvent = async (card: cardEntity): Promise<cardEntity> => {
  try {
    const response = await fetch(`${defaultUrl}/getEvents`, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify(card)
  });
  const result = await response.json() as cardEntity;
    if(response.ok){
      console.log("todo correcto");
      return result;
    } else {
      throw new Error;
    }
  } catch (error) {
    throw error
  }
}

export const userEvents = async (user: UserEntityLogin): Promise<cardEntity> => {
  try {
    const response = await fetch(`${defaultUrl}/getUserEvents`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify(user)
    })
    const res = await response.json();
    console.log("usereventos")
    if(response.ok){
      console.log("connection", res)
      return res;
    } else {
      throw new Error('Failed to fetch user events');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

export const joinEvent = async (card: cardEntity, {email}: UserEntity) => {
  try{
    const response = await fetch(`${defaultUrl}/joinEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify({ card, email })
    })
  } catch (Error){
    throw Error
  }
}