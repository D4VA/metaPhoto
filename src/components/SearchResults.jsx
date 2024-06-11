import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import ModalInfoComponent from './ModalInfoComponent';
import PropTypes from 'prop-types';

const SearchResults = ({ data }) => {

  return (
    <div className="justify-center mt-5 flex flex-wrap gap-5">
      {data.map((item) => (
        <Card className="py-4 max-w-64 justify-between" key={item.id}>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">
              <span>Album user name: </span>{item.album.user.name}
            </h4>
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
  );
};

SearchResults.propTypes = {
    data: PropTypes.array.isRequired,
  };

export default SearchResults;