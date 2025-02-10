import { UserEntity, UserEntityLogin } from "../entities/userEntity";


const defaultUrl = 'http://192.168.1.146:3030';


export async function registerUser(data: UserEntity) {
    try {
        const response = await fetch('http://192.168.9.35:3030/register', {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify(data), // enviamos el user como json
        });

        const result = await response.json();  // la respuesta a JSON
        if (response.ok) {
            console.log('Registro exitoso:', result.message);
        } else {
            console.error('Error en el registro:', result.error);
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
    }
}



export const loginUser = async (user: UserEntityLogin): Promise<UserEntity> => {
  try {
    const response = await fetch('http://192.168.1.146:3030/login', {
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
      throw new Error("error");
    }
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    throw error; 
  }
};
