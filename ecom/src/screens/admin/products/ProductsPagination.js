import React from 'react';
import { Pagination, Dropdown } from 'react-bootstrap';

const ProductsPagination = ({
	handlePreviousPage,
	handleNextPage,
	renderPaginationItems,
	limit,
	setLimit,
}) => {
	const limits = [10, 15, 20, 25, 50];

	const renderLimitItems = () => {
		return limits.map((item) => (
			<Dropdown.Item key={item} onClick={() => setLimit(item)}>
				{item}
			</Dropdown.Item>
		));
	};

	return (
		<>
			<Pagination className='justify-content-center'>
				<Pagination.Prev onClick={handlePreviousPage} />
				{renderPaginationItems()}
				<Pagination.Next onClick={handleNextPage} />
			</Pagination>
			<div className='d-flex justify-content-center mt-3'>
				<label htmlFor='limit'>Items per page:</label>
				<Dropdown className='ml-2'>
					<Dropdown.Toggle variant='outline-secondary' id='limit-dropdown'>
						{limit}
					</Dropdown.Toggle>
					<Dropdown.Menu>{renderLimitItems()}</Dropdown.Menu>
				</Dropdown>
			</div>
		</>
	);
};

export default ProductsPagination;
