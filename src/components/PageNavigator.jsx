import React from 'react';
import '../styles/components/PageNavigator.scss'

const PageNavigator = ({ currentPage, totalPages, setCurrentPage }) => {
    const handlePageChange = (page) => {
        console.log("hi");
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let page = 1; page <= totalPages; page++) {
            buttons.push(
                <div
                    key={page}
                    className={currentPage === page ? 'current-page' : 'other-page'}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </div>
            );
        }
        return buttons;
    };

    return (
        <div className="page-navigator">
            {renderPageButtons()}
        </div>
    );
};

export default PageNavigator;
