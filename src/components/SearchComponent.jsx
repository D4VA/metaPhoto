import { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  Image
} from '@nextui-org/react';
import { PaginationComponent } from './PaginationComponent';
import ModalInfoComponent from './ModalInfoComponent';

const SearchComponent = () => {
  const [inputs, setInputs] = useState([
    { name: 'Photo title',key: 'title', value: '' },
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
    let url = `https://meta-photo-n5z4mr87u-d4vas-projects.vercel.app/api/photos?limit=${itemsPerPage}&offset=${offset}`;

    inputs.forEach(input => {
      if (input.value && input.value.trim() !== '') {
        url += `&${input.key}=${encodeURIComponent(input.value)}`;
      }
    });

    if (searchQuery) {
      url += `&title=${encodeURIComponent(searchQuery)}`;
    }

    console.log('url', url)

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

      console.log(result);
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {inputs.map((input, index) => (
          <Input
            key={index}
            label={input.name}
            placeholder={`Enter ${input.name}`}
            value={input.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}

        <Button auto onClick={handleSearch}>
          Search
        </Button>
        <Button auto onClick={handleClearFilter}>
          Clear Filters
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className={'justify-center mt-5'} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((item) => (
          <Card className="py-4 max-w-64 justify-between" key={item.id}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large"><span>Album user name: </span>{item.album.user.name}</h4>
              <p className="text-tiny"><span className="font-bold">Photo title: </span>{item.title}</p>
              <small className="text-default-500"><span className="font-bold">Album title: </span>{item.album.title}</small>
              <small className="text-default-500"><span className="font-bold">Album user email: </span>{item.album.user.email}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={item.url}
                width={270}
              />
            </CardBody>
            <ModalInfoComponent
              item={item}
            />
          </Card>
        ))}
      </div>

      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SearchComponent;
