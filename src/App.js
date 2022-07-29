import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";

function App() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumerLimit, setmaxPageNumerLimit] = useState(5);
    const [minPageNumerLimit, setminPageNumberLimit] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
            setPost(res.data);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    //Get current Posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //Change Page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //handle next and prev buttons
    const nextPageNumber = (e) => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumerLimit) {
            setmaxPageNumerLimit(maxPageNumerLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumerLimit + pageNumberLimit);
        }
        e.preventDefault();
    };

    const handlePrevBtn = (e) => {
        setCurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit == 0) {
            setmaxPageNumerLimit(maxPageNumerLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumerLimit - pageNumberLimit);
        }
        e.preventDefault();
    };

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-primary mb-3">My Blog</h1>
                <Posts posts={currentPosts} loading={loading} />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    pageNumberLimit={pageNumberLimit}
                    maxPageNumerLimit={maxPageNumerLimit}
                    minPageNumerLimit={minPageNumerLimit}
                    nextPageNumber={nextPageNumber}
                    handlePrevBtn={handlePrevBtn}
                />
            </div>
        </>
    );
}

export default App;
