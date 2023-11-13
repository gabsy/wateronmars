import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalProvider';

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export default useGlobalContext;
