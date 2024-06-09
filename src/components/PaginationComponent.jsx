import { Pagination } from "@nextui-org/react";

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
