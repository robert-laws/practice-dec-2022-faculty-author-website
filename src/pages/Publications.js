import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import PublicationsContext from '../context/publications/publicationsContext';
import {
  ListItem,
  Navigation,
  Pagination,
  CheckBoxList,
  Heading,
} from '../components';

export const Publications = () => {
  const {
    publications,
    filteredPublications,
    isLoading,
    publicationsError,
    loadPublications,
    filterPublications,
  } = useContext(PublicationsContext);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentTypesArray, setDocumentTypesArray] = useState([]);
  const [languageArray, setLanguageArray] = useState([]);
  const [yearArray, setYearArray] = useState([]);

  const [formValues, setFormValues] = useState({
    docTypes: [],
    languages: [],
    years: [],
  });

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    if (filteredPublications.length > 0) {
      return filteredPublications.slice(firstPageIndex, lastPageIndex);
    }

    return publications.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, publications, filteredPublications, pageSize]);

  const addEntries = (array, field) => {
    const data = {};

    array.forEach((item) => {
      const dataField = item[field].trim();

      if (data[dataField]) {
        data[dataField]++;
      } else {
        data[dataField] = 1;
      }
    });

    return data;
  };

  const addAndSortEntries = (array, field) => {
    const data = {};

    array.forEach((item) => {
      const dataField = item[field].trim();

      if (data[dataField]) {
        data[dataField]++;
      } else {
        data[dataField] = 1;
      }
    });

    let sortable = [];

    for (let field in data) {
      sortable.push([field, data[field]]);
    }

    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });

    return sortable;
  };

  const inputHandler = useCallback((inputName, value) => {
    setFormValues((prevState) => {
      return { ...prevState, [inputName]: value };
    });
  }, []);

  useEffect(() => {
    if (publications.length === 0) {
      loadPublications();
    }
  }, [publications, loadPublications]);

  useEffect(() => {
    if (publications) {
      let documentTypes = addAndSortEntries(publications, 'documentType');
      setDocumentTypesArray(documentTypes);
    }
  }, [publications]);

  useEffect(() => {
    if (publications) {
      let languages = addAndSortEntries(publications, 'language');
      setLanguageArray(languages);
    }
  }, [publications]);

  useEffect(() => {
    if (publications) {
      let years = addEntries(publications, 'year');
      let result = Object.entries(years).reverse();
      setYearArray(result);
    }
  }, [publications]);

  useEffect(() => {
    filterPublications(formValues);
  }, [formValues, filterPublications]);

  // console.log(documentTypesArray);

  return (
    <>
      <Navigation />
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold mt-4'>Publications</h2>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                        >
                          Author
                        </th>
                        <th
                          style={{ minWidth: '2rem' }}
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Title
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Publication Year
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Document Type
                        </th>
                        <th
                          scope='col'
                          className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                        >
                          <span className='sr-only'>Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {isLoading && !publicationsError ? (
                        <tr>
                          <td>Loading...</td>
                        </tr>
                      ) : (
                        <>
                          {currentTableData.map((publication) => (
                            <ListItem
                              key={publication.id}
                              id={publication.id}
                              author={`${publication.firstName} ${publication.lastName}`}
                              title={
                                publication.title
                                  ? publication.title
                                  : publication.sourceTitle
                              }
                              year={publication.year}
                              documentType={publication.documentType}
                            />
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalCount={
                    filteredPublications.length > 0
                      ? filteredPublications.length
                      : publications.length
                  }
                  pageSize={pageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
                <hr className='my-4' />
                <div>
                  <label
                    htmlFor='pageSizeSelect'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Show Number of Rows
                  </label>
                  <select
                    name='pageSizeSelect'
                    id='pageSizeSelect'
                    className='mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                    defaultValue='10'
                    onChange={(e) => setPageSize(Number(e.target.value))}
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                  </select>
                  <hr className='my-4' />
                  <Heading text='Document Types' size='large' />
                  <CheckBoxList
                    listName='docTypes'
                    boxItems={documentTypesArray}
                    checkedList={[]}
                    onInput={inputHandler}
                  />
                  <hr className='my-4' />
                  <Heading text='Languages' size='large' />
                  <CheckBoxList
                    listName='languages'
                    boxItems={languageArray}
                    checkedList={[]}
                    onInput={inputHandler}
                  />
                  <hr className='my-4' />
                  <Heading text='Years' size='large' />
                  <CheckBoxList
                    listName='years'
                    boxItems={yearArray}
                    checkedList={[]}
                    onInput={inputHandler}
                  />
                  {/* {documentTypesArray.length > 0 &&
                    documentTypesArray.map((item, index) => (
                      <div key={index}>
                        {item[0]} ({item[1]})
                      </div>
                    ))}
                  {languageArray.length > 0 &&
                    languageArray.map((item, index) => (
                      <div key={index}>
                        {item[0] === ''
                          ? `No Language Provided (${item[1]})`
                          : `${item[0]} (${item[1]})`}
                      </div>
                    ))}
                  {yearArray.length > 0 &&
                    yearArray.map((item, index) => (
                      <div key={index}>
                        {item[0]} ({item[1]})
                      </div>
                    ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// {publicationsError && <p>{publicationsError}</p>}
