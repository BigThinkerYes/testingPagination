import React, { useEffect, useState, useContext } from 'react';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { FavoritesContext } from './FavoritesProvider';
import Button from 'react-bootstrap/Button';

export default function Images(props, {userFilteredList, url, name}){
    //added
    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
    const [user, setUser] = useState(null);
    //
    const {data} = props;

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(7);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;
    //added
    const fetchUser = async () => {
        // render the first page of 50 characters (array of id, name, image, url)
        const res = await fetch(url);
        const data = await res.json();
        setUser(data);
        console.log(user)
      };
      //
    useEffect(()=>{
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset,endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
        fetchUser();
    }, [itemOffset, itemsPerPage, data, userFilteredList]);

    const handlePageClick = (event) =>{
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return(
        <>
            {user ? (
            <div className="images">
                {/* {currentItems.map((image) =>{
                    return(
                        <div className="images">
                            <img
                            src={`${image.imageUrl}`}
                            className="img-fluid rounded-start pt-3 ps ps-2"
                            alt={image.name}
                            />
                        </div>
                    )
                })} */}
                {/* ----------------------------------------- */}
               
                {currentItems.map((image) =>{
                    return(
                        <div className="card mb-3 w-100 h-100 indiv-card d-flex" >
                            <div className="row g-0">
                                <div className="col-md-6 my-auto">
                                <img src={`${image.imageUrl}`} className="img-fluid rounded-start pt-3 ps-2" alt="disney characters"/>
                                </div>
                                <div className="col-md-6 my-auto">
                                <div className="card-body">
                                    <Link to={`/characters/${image.url.substring(37)}`} style={{color: "black"}}>
                                    <h5 className="card-title">{image.name}</h5>
                                    </Link>
                                </div>
                                </div>
                            </div>
                        <div className="d-flex justify-content-center mt-3">
                            {isFavorite(name) ? (
                            <Button onClick={() => removeFavorite(name)} variant="danger" >
                                Remove from Favorites
                            </Button>
                            ) : (
                            <Button onClick={() => addFavorite({ name, url })}>
                                Add to Favorites
                            </Button>
                            )}
                        </div>
                        </div>
                    ) 
                })}
                {/* ---------------------------------------------- */}
            {/* </div>):("")} */}
            <ReactPaginate
            breakLabel="..."
            nextLabel="next>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
            />
            </div>):("")}
        </>
    )
}
