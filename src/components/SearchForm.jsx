import { Input, Button } from '@nextui-org/react';
import PropTypes from 'prop-types';

const SearchForm = ({ inputs, handleInputChange, handleSearch, handleClearFilter }) => {
  return (
    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
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
  );
};

SearchForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClearFilter: PropTypes.func.isRequired,
};

export default SearchForm;