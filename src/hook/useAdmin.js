import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

// El hook personalizado 
export const useAdmin = () => {
  const context = useContext(AdminContext);
};