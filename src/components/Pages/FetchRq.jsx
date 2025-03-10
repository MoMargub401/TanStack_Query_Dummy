import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchPosts } from "../../API/Api";
import { NavLink } from "react-router-dom";

const FetchRq = () => {
  const [pageNumber, setPageNumber] = useState(0);

  //   const getPostsData = async () => {
  //     try {
  //       const res = await fetchPosts();
  //       res.status === 200 ? res?.data : [];
  //     } catch (error) {
  //       console.log(error);
  //       return [];
  //     }
  //   };

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(pageNumber),
  });

  const handleDelete = () => {
    console.log("Deleted");
  };

  const handleUpdate = () => {
    console.log("Updated");
  };

  return (
    <>
      <div>
        <ul className="section-accordion">
          {data?.map((curElem) => {
            const { id, title, body } = curElem;
            return (
              <li key={id}>
                <NavLink to={`/rq/${id}`}>
                  <p>{id}</p>
                  <p>{title}</p>
                  <p>{body}</p>
                </NavLink>
                <button onClick={() => handleDelete()}>Delete</button>
                <button onClick={() => handleUpdate()}>Update</button>
              </li>
            );
          })}
        </ul>

        <div className="pagination-section container">
          <button
            disabled={pageNumber === 0 ? true : false}
            onClick={() => setPageNumber((prev) => prev - 3)}
          >
            Prev
          </button>
          <p>{pageNumber / 3 + 1}</p>
          <button onClick={() => setPageNumber((prev) => prev + 3)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default FetchRq;
