import { useReducer, useCallback } from 'react';
// import { db } from '../../firebase/config';
// import { collection, getDocs } from 'firebase/firestore';
import {
  LOAD_PUBLICATIONS,
  PUBLICATIONS_ERROR,
  FILTER_PUBLICATIONS,
} from '../types';
import PublicationsContext from './publicationsContext';
import publicationsReducer from './publicationsReducer';
import data from '../../data/faculty-data.json';

const PublicationsState = ({ children }) => {
  const initialState = {
    publications: [],
    filteredPublications: [],
    publication: null,
    isLoading: true,
    isPublicationLoading: true,
    publicationsError: null,
  };

  const [state, dispatch] = useReducer(publicationsReducer, initialState);

  const loadPublications = useCallback(() => {
    // const colRef = collection(db, 'facultyData');

    // try {
    //   const snapshot = await getDocs(colRef);
    //   if (snapshot.empty) {
    //     dispatch({
    //       type: PUBLICATIONS_ERROR,
    //       payload: 'No publications found',
    //     });
    //   } else {
    //     let allPublications = [];
    //     snapshot.forEach((doc) => {
    //       allPublications.push({ id: doc.id, ...doc.data() });
    //     });
    //     dispatch({ type: LOAD_PUBLICATIONS, payload: allPublications });
    //   }
    // } catch (error) {
    //   dispatch({
    //     type: PUBLICATIONS_ERROR,
    //     payload: `Database Error: ${error.message}`,
    //   });
    // }

    let allPublications = [];
    data.forEach((faculty, index) => {
      allPublications.push({ id: index, ...faculty });
    });

    try {
      dispatch({ type: LOAD_PUBLICATIONS, payload: allPublications });
    } catch (error) {
      dispatch({
        type: PUBLICATIONS_ERROR,
        payload: `Database Error: ${error.message}`,
      });
    }
  }, [dispatch]);

  const filterPublications = useCallback(
    (filters) => {
      dispatch({ type: FILTER_PUBLICATIONS, payload: filters });
    },
    [dispatch]
  );

  return (
    <PublicationsContext.Provider
      value={{
        publications: state.publications,
        filteredPublications: state.filteredPublications,
        isLoading: state.isLoading,
        publicationsError: state.publicationsError,
        loadPublications,
        filterPublications,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};

export default PublicationsState;
