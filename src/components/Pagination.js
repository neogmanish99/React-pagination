import React from "react";
import "./style.css";

const Pagination = ({
    postsPerPage,
    totalPosts,
    paginate,
    currentPage,
    maxPageNumerLimit,
    minPageNumerLimit,
    nextPageNumber,
    handlePrevBtn,
    isDisabled,
    lastBtndisabled,
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    //Disable the prev button
    if (currentPage == 1) {
        isDisabled = true;
    } else {
        isDisabled = false;
    }
    //Disable the last button
    if (currentPage == pageNumbers.length) {
        lastBtndisabled = true;
    }
    return (
        <>
            <nav>
                <ul className="pagination">
                    <button
                        className="butts"
                        onClick={handlePrevBtn}
                        disabled={isDisabled}
                    >
                        Prev
                    </button>
                    {pageNumbers.map((number) => {
                        //To show only 5 pageNumbers per page
                        if (
                            number < maxPageNumerLimit + 1 &&
                            number > minPageNumerLimit
                        ) {
                            return (
                                <li
                                    key={number}
                                    className={
                                        currentPage === number ? "active" : null
                                    }
                                >
                                    <a
                                        onClick={() => paginate(number)}
                                        href="!#"
                                        className="page-link"
                                    >
                                        {number}
                                    </a>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}
                    <button
                        className="butts"
                        onClick={nextPageNumber}
                        disabled={lastBtndisabled}
                    >
                        Next
                    </button>
                </ul>
            </nav>
        </>
    );
};

Pagination.defaultProps = {
    isDisabled: false,
    lastBtndisabled: false,
};

export default Pagination;
