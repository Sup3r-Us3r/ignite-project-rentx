import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react';

import { api } from '../services/api';
import { database } from '../database';
import { User as UserModel } from '../database/models/User';

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { user, token } = response.data as any;
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<UserModel>('users');
      await database.write(async () => {
        await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<UserModel>('users');

      await database.write(async () => {
        // await database.unsafeResetDatabase();
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = await database.get<UserModel>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update(userData => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<UserModel>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        setData(userData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: data,
        signOut,
        updateUser,
        loading,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
