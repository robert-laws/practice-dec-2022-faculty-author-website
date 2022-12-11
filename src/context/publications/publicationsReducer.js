import {
  LOAD_PUBLICATIONS,
  PUBLICATIONS_ERROR,
  FILTER_PUBLICATIONS,
} from '../types';

const publicationsReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
        publication: null,
        isLoading: false,
        publicationsError: null,
        publicationError: null,
      };

    case PUBLICATIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        publicationsError: action.payload,
      };

    case FILTER_PUBLICATIONS:
      return {
        ...state,
        filteredPublications: state.publications.filter((publication) => {
          if (
            action.payload.docTypes.length > 0 &&
            action.payload.docTypes.some((docType) =>
              publication.documentType.includes(docType)
            )
          ) {
            return true;
          }

          if (
            action.payload.languages.length > 0 &&
            action.payload.languages.some((language) =>
              publication.language.includes(language)
            )
          ) {
            return true;
          }

          return false;
        }),
      };

    default:
      return state;
  }
};

export default publicationsReducer;
