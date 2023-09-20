import React from 'react';

const Pagination = ({
    meta,
    links, 
    getData, 
    endUrl
}) => {
    const firstPage = () => {
        getData(links.first);
    };

    const previousPage = () => {
        getData(links.prev);
    };

    const nextPage = () => {
        getData(links.next);
    };

    const lastPage = () => {
        getData(links.last);
    };

    const renderPaginationNumbers = (meta) => {
        let paginationNumbers = [];
        let head = 1;
        let tail = meta.current_page + 2;
        
        // if the current page is greater than 2, then we need
        // to only show previous page and the next page
        // on the pagination list
        if (meta.current_page > 2) {
            head = meta.current_page - 1;
            tail = meta.current_page + 1;
        }

        if (tail > meta.last_page) {
            tail = meta.last_page;
        }

        for (let i=head; i <= tail; i++) {
            paginationNumbers.push(
                <a 
                    key={i} 
                    onClick={() => {
                        getData(`${endUrl}?page=${i}`)
                    }}
                    className='btn'
                >
                    {i}
                </a>
            );
        }

        return paginationNumbers;
    }

    return (
        <div className='paginationContainer'>
            <div className='paginationInfo'>
                {meta.from} - {meta.to} of {meta.total} items (Page {meta.current_page} of {meta.last_page})
            </div>
            <div className='right'>
                <div className='pagination'>
                    {meta.current_page > 1 && <a onClick={firstPage} className='btn'>First</a>}
                    {meta.current_page > 1 && <a onClick={previousPage} className='btn'>Previous</a>}
                    {renderPaginationNumbers(meta)}
                    {meta.current_page < meta.total && <a onClick={nextPage} className='btn'>Next</a>}
                    {meta.current_page < meta.total && <a onClick={lastPage} className='btn'>Last</a>}
                </div>
            </div>
        </div>
    );
}

export default Pagination;
