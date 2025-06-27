import { createContext, useContext, useEffect, useState } from "react";
import { UserDto } from "../core/domain/dtos/auth/UserDto";
import { EmpresaDto } from "../core/domain/dtos/empresa/EmpresaDto";

interface AuthContextType {
  user: UserDto | null;
  empresa: EmpresaDto | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: ( userData: UserDto, rememberMe: boolean ) => void;
  logout: () => void;
  setCompany: (empresaData: EmpresaDto) => void;
  refreshUser: (userData: UserDto) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDto | null>(null);
  const [empresa, setEmpresa] = useState<EmpresaDto | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    const storedEmpresa = sessionStorage.getItem("empresa");

    if(storedEmpresa){
      setEmpresa(JSON.parse(storedEmpresa));
    }
    
    setIsAuthenticated(!!storedUser);
    if(storedUser){
        setUser(JSON.parse(storedUser));
    }
    setLoading(false); 
  }, []);

  const login = (userData: UserDto, rememberMe: boolean) => {
    setIsAuthenticated(true);
    setUser(userData);
    if(userData.empresa){
      sessionStorage.setItem("empresa", JSON.stringify(userData.empresa));
      setEmpresa(userData.empresa);
    }
      
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("access_token", userData.token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
  };

  const setCompany = (empresaData: EmpresaDto) => {
    sessionStorage.setItem("empresa", JSON.stringify(empresaData));
    setEmpresa(empresaData);
  }

  const refreshUser = (userData: UserDto) => {
    setUser(userData);
    setEmpresa(userData.empresa);
    sessionStorage.setItem("empresa", JSON.stringify(userData.empresa));
    let storedUser = localStorage.getItem("user");
    if(storedUser){
      localStorage.setItem("user", JSON.stringify(userData));
      return;
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
      return;
    }
  }

  return (
    <AuthContext.Provider value={{ user, empresa, isAuthenticated, loading, login, logout, setCompany, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);