import React, { useState,useEffect  } from 'react';
import { useTable, useResizeColumns } from 'react-table';
import { Button } from 'react-bootstrap';
import pdf from '../FileIcon/pdf.png';
import zip from '../FileIcon/zip.png';
import rar from '../FileIcon/rar.jpg';
import word from '../FileIcon/word.png';
import excel from '../FileIcon/excel.png';
import ppt from '../FileIcon/ppt.png';
import exe from '../FileIcon/exe.png';
import otherFile from '../FileIcon/file.png';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL;


const Table = ({ columns, data ,toggleModal}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    useResizeColumns 
  );

  const handleRowDoubleClick = rowData => {
    toggleModal(rowData); 
    // console.log(rowData);
  };
  const renderCellContent = (cell) => {
    switch (cell.column.Header) {
      case 'IP':
        return <IpCellView cell={cell} />;
      case 'History':
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: cell.value }} />
          </div>
        );
      case 'Type':
        return <TypeCellView cell={cell} />;
      default:
        return cell.render('Cell');
    }
  };
  return (
    <div className='table-container'>
      <table className='table' {...getTableProps()}>
          <thead className='table-header'>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} style={{ width: column.width }}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onDoubleClick={() => handleRowDoubleClick(row.original)}>
                  {row.cells.map(cell => (
                    <td 
                      {...cell.getCellProps()}>
                        
                      {renderCellContent(cell)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
    </div>
    
  );
};

  export default Table;

  function IpCellView({ cell }) {
    const renderCircle = () => {
      if (cell.row.original.isConnect) {
        return cell.row.original.isConnect === "true" ? (
          <div className="circle-view circle-blue">
            <div className='circle-status circle-status-on'>online</div>
          </div>
        ) : (
          <div className="circle-view circle-red">
            <div className='circle-status circle-status-off'>offline</div>
          </div>
        );
      } else {
        return <div className="circle-view circle-red"></div>;
      }
    };
  
    return (
      <div className='view-connected'>
        <div className='row'>
          <div className='col-8'>
            {cell.value}
          </div>
  
          <div className='col-4 circle-container'>
            {renderCircle()}
          </div>
        </div>
      </div>
    );
  };

  function TypeCellView({ cell }) {
    const renderIcon = () => {
      const fileType = cell.row.original.type; // Lấy giá trị của trường "type" từ dữ liệu hàng
      // Dựa vào fileType để hiển thị icon phù hợp
      switch (fileType) {
        case ".pdf":
          return <ImageView img={pdf} />;
        case ".zip":
          return <ImageView img={zip} />;
        case ".rar":
          return <ImageView img={rar} />;
        case ".doc":
          return <ImageView img={word} />;
        case ".docx":
          return <ImageView img={word} />;
        case ".xls":
          return <ImageView img={excel} />;
        case ".xlsx":
          return <ImageView img={excel} />;
        case ".ppt":
          return <ImageView img={ppt} />;
        case ".pptx":
          return <ImageView img={ppt} />;
        case ".exe":
          return <ImageView img={exe} />;
        default:
          return <ImageView img={otherFile} />;
      }
    };

    const buttonView = (buttonName) => {
      return   <Button 
      variant="info" 
      style={{ marginLeft: '10px' }}
      onClick={openFilePath}
      >{buttonName}</Button>
    }

    const buttonDelete = () => {
      const role = localStorage.getItem('role');
      const item = JSON.parse(role);
      if (item && item.value == "Admin")
      return   <Button 
      variant="danger" 
      style={{ marginLeft: '10px' }}
      onClick={deleteFile}
      >Delete</Button>
      else return null;
    }
    const deleteFile = () =>{
      Swal.fire({
        title: `Do you want to Delete ${cell.row.original.name}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: `No`
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const id = cell.row.original.id;
            const formData = new FormData();
            formData.append('id', id);
            const getToken = localStorage.getItem("token");
            const token = JSON.parse(getToken);
        
            try{
                const response = await fetch(apiUrl+'/api/Document/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token.value,
                    },
                    body: formData
                });
                if (response.status === 200 || response.status === 201) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: response.statusText,
                        showConfirmButton: false,
                        timer: 1000
                    });
                    console.log('Phản hồi từ API:', response);
                } else {
                    console.error('Lỗi phản hồi:', response);
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: response.status+ " " + response.statusText,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }
            catch (error){
                console.error('Lỗi Catch:', error.message);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 2000
                });

            }
           
            
        } else if (result.isDenied) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Delete Failed!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    
    }

    const openFilePath = () =>{
      const path = cell.row.original.path;
      window.open(path, '_blank')
    }
    const renderButton = () =>{
      const fileType = cell.row.original.type; 
      switch (fileType) {
        case ".pdf":
          return buttonView("View");
       
        default:
          return buttonView("Dowload");;
      }
    }
  
    return (
      <div className='view-image'>
        <div className='row'>
        {renderIcon()}
        {/* {renderButton()} */}
        <div className='view-path'>
        {renderButton()}
        {buttonDelete()}
        </div>
        
          
        </div>
      </div>
    );
  };

  function ImageView(props){
    return(
      <div className='view-file-icon'>
        <img src={props.img}></img>
      </div>
    )
  }
  
  