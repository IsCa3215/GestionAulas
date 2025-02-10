import { create } from "zustand";
import { UserEntity, UserEntityLogin } from "../entities/userEntity";
import { loginUser, registerUser } from "../services/connection"; // Suponemos que la función loginUser está correctamente definida

interface UserStore {
  user: UserEntity | null; // user tiene que ser de tipo userEntity para poder recuperar toda la información del usuario
  loading: boolean;
  error: string | null;
  loginUserStore: (user: UserEntityLogin) => Promise<UserEntity | null>;
  removeUser: () => void;
  registerUser: (user: UserEntity) => Promise<any>;
}

const useStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  /**
   * función que me permite iniciar sesión en la aplicación
   * @param user Es de tipo userEntityLogin el cual recibe sólamente un email y un password
   * @returns Devuelve todos los datos del usuario logeado si se han encontrado.
   */
  
  loginUserStore: async (user: UserEntityLogin): Promise<UserEntity | null> => {
    set({ loading: true, error: null, user: null });

    try {
    
      const loggedUser = await loginUser(user);

      if (!loggedUser || !loggedUser.token) { // si no hay usuario o token el login falla
        set({ error: 'Login failed: Token missing or incorrect', loading: false, user: null });
        return null;
      }

      // Si la respuesta es exitosa, almaceno los datos completos del usuario en el estado
      set({ user: loggedUser, loading: false });
      return loggedUser; // Devolvemos el objeto completo del usuario
    } catch (error) {
      set({
        loading: false,
        error: 'Login failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
      });
      console.error('Login failed', error);
      return null;
    }
  },

  removeUser: () => {
    set({ user: null });
  },

  registerUser: async (user: UserEntity) => {
    return registerUser(user);
  }
}));
export default useStore;
