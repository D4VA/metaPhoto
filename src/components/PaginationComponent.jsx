import { Pagination } from "@nextui-org/react";
import PropTypes from "prop-types";

export const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '24px auto' }}>
      <Pagination
        isCompact
        showControls
        total={totalPages > 1 ? totalPages : 1}
        page={currentPage}
        onChange={(page) => handlePageChange(page)}
      />
    </div>
  );
};

PaginationComponent.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
