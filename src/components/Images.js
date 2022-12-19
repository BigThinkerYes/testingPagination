import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Images(props){
    const { data } = props;

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const[currentItems, setCurrentItems] = useState([]);
    const[pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    useEffect(()=>{
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        // setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount (Math.ceil(data.length / itemsPerPage));

    },[itemOffset,itemsPerPage,data]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <>
        {/* <Items currentItems={currentItems} /> */}
        
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
        />
        </>
    );
}

// // Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={4} />,
//   document.getElementById('container')
// );