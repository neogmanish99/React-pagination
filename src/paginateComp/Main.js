import React, { useState, useEffect } from "react";

const renderData = (data) => {
    return (
        <ul>
            {data.map((todo, index) => {
                return (
                    <>
                        <li key={index}>{todo.title}</li>
                    </>
                );
            })}
        </ul>
    );
};

const Main = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    //function for calculating the page numbers
    const pages = [];
    for (let i = 0; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }

    //Get current Posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (number) => {
        setCurrentPage(number);
    };

    //Creating a pageRender component
    const renderPageNumber = pages.map((number) => {
        return (
            <nav>
                <ul className="pagination">
                    <li
                        key={number}
                        id={number}
                        className="page-item"
                        onClick={() => paginate(number)}
                    >
                        <a href="!#" className="page-link"></a>
                        {number}
                    </li>
                </ul>
            </nav>
        );
    });

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);

    return (
        <div>
            Todo List
            {renderPageNumber}
            {renderData(currentPosts)}
        </div>
    );
};

export default Main;
