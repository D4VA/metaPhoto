import { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { PaginationComponent } from './PaginationComponent';

const SearchComponent = () => {
  const [inputs, setInputs] = useState([
    { name: 'Photo title', key: 'title', value: '' },
    { name: 'Album title', key: 'album.title', value: '' },
    { name: 'album user email', key: 'album.user.email', value: '' }
  ]);
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [totalPages, setTotalPages] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    fetchData(currentPage, isSearchMode ? query : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isSearchMode, query]);

  const fetchData = async (page, searchQuery) => {
    const offset = (page - 1) * itemsPerPage;
    let url = `https://meta-photo-api.vercel.app/api/photos?limit=${itemsPerPage}&offset=${offset}`;

    inputs.forEach(input => {
      if (input.value && input.value.trim() !== '') {
        url += `&${input.key}=${encodeURIComponent(input.value)}`;
      }
    });

    if (searchQuery) {
      url += `&title=${encodeURIComponent(searchQuery)}`;
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();

      setData(result.data);
      setError(null);
      const totalPages = Math.ceil(result.total / itemsPerPage);
      setTotalPages(totalPages);
    } catch (err) {
      console.log(err)
      setError(err.message);
    }
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    setInputs(newInputs);
  };

  const handleSearch = () => {
    const searchQuery = query.trim();
    fetchData(1, searchQuery);
    setCurrentPage(1);
    setIsSearchMode(true);
  };

  const handleClearFilter = () => {
    setQuery('');
    setIsSearchMode(false);
    setCurrentPage(1);
    setInputs(inputs.map(input => ({ ...input, value: '' })));
    fetchData(1, '');
  };

  return (
    <div className={'p-1.5'}>
      <h3 className={'text-4xl font-bold m-auto mb-5 max-w-fit'}>
        Photo Search
      </h3>
      <SearchForm
        inputs={inputs}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        handleClearFilter={handleClearFilter}
      />

      {error && <p className="text-red-500">{error}</p>}

      <SearchResults data={data} />

      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SearchComponent;