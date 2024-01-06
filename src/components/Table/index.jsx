import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from "xlsx";
import "./style.scss";
import InvoiceModal from "../InvoiceForm/InvoiceModal";

const Table = ({ columns, data }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [showDetail, setShowDetail] = useState();
  const itemsPerPage = 10;

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchValue(e.target.value);
  };

  const sortedData = sortColumn
    ? [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    })
    : data;

  const filteredData = searchValue
    ? sortedData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    )
    : sortedData;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const closeModal = () => {
    setIsOpen(false)
  }
  const openModal = (items) => {
    setShowDetail(items)
    setIsOpen(true)
  }

  return (
    <>
      <div className="row mt-4 mb-2 d-flex align-items-center">
        <div className="col-12 col-md-6">
          <div className="form-control input-search d-flex">
            <i className="ri-search-line" />
            <input
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div
        className="overflow-auto "
        style={{ maxWidth: "100vw", minHeight: "55vh" }}
      >
        <table className="table table-striped table-custom">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  onClick={() => handleSort(column.accessor)}
                  style={{
                    cursor: "pointer",
                    borderTop:
                      sortColumn === column.accessor
                        ? sortDirection === "asc"
                          ? "1px solid #bf0000b7"
                          : "1px solid transparent"
                        : "",
                    borderBottom:
                      sortColumn === column.accessor
                        ? sortDirection === "asc"
                          ? "1px solid transparent"
                          : "1px solid #bf0000b7"
                        : "",
                    color: sortColumn === column.accessor ? "#bf0000b7" : "",
                  }}
                >
                  {column.Header}
                </th>
              ))}
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                {columns?.map((column) => {
                  if (column.accessor  === "status") {
                    return (
                      <td key={`${column.accessor}-${index}`}>
                        <div className={`status-${item[column.accessor]}`}>
                          {item[column.accessor]}
                        </div>
                      </td>
                    );
                  } 
                  return (
                    <td onClick={() => openModal(item.allInfo)} key={`${column.accessor}-${index}`}>
                      {item[column.accessor]}
                    </td>
                  );
                })}
                <td>
                  <div>
                    <EditIcon className="edit-icon" />
                    <DeleteIcon className="delete-icon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row mt-3">
        <div className="col-6">
          <ul className="paging-box d-flex p-0">
            <li
              className={`paging-arrow`}
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
            >
              <i className="ri-skip-back-line" />
            </li>
            <li
              className={`paging-arrow`}
              onClick={() => {
                if (currentPage === 1) {
                } else {
                  paginate(currentPage - 1);
                }
              }}
            >
              <i className="ri-arrow-left-s-line" />
            </li>

            <li className="paging-number-total">
              <input
                type="text"
                className="paging-number-active"
                maxLength={4}
                value={currentPage}
                onChange={(e) => {
                  if (Number(e.target.value)) {
                    setCurrentPage(Number(e.target.value));
                  }
                }}
              />
              <div className="paging-number-of">of</div>
              <div className="paging-total-result">{totalPages}</div>
            </li>
            <li
              className={`paging-arrow`}
              onClick={() => {
                if (currentPage === totalPages) {
                } else {
                  paginate(currentPage + 1);
                }
              }}
            >
              <i className="ri-arrow-right-s-line" />
            </li>
            <li
              className={`paging-arrow`}
              onClick={() => {
                if (currentPage === totalPages) {
                } else {
                  paginate(totalPages);
                }
              }}
            >
              <i className="ri-skip-forward-line" />
            </li>
          </ul>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button className="btn btn-custom" onClick={exportToExcel}>
            <span className="d-none d-md-block">Export Excel</span>
            <i className="ri-file-excel-2-line d-block d-md-none" />
          </button>
        </div>
      </div>
      {showDetail &&
        <InvoiceModal
          tableDetail
          showModal={isOpen}
          closeModal={closeModal}
          info={showDetail}
          items={showDetail.items}
          currency={showDetail.currency}
          subTotal={showDetail.subTotal}
          taxAmmount={showDetail.taxAmount}
          discountAmmount={showDetail.discountAmount}
          total={showDetail.total} />
      }
    </>
  );
};

export default Table;