import React, { useState, useEffect, useRef } from 'react';
import { useTable, useResizeColumns } from 'react-table';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import renderIcon from './renderIcon/RenderIcon';
import FetchGetAssetById from './fetchApi/FetchApi';
import DropArea from './dropArea/DropArea';

const apiUrl = process.env.REACT_APP_API_URL;


const Table = ({ columns, data ,toggleModal, selectItem, setActiveCard}) => {
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
  const handleRowOnClick = rowData =>{
    selectItem(rowData);
    // console.log(rowData);
  }
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
      case 'Asset of Cabinet':
        return <CabinetAssetCellView cell={cell} />; 
      default:
        return cell.render('Cell');
    }
  };
  const renderRowTd = (row) =>{
    if(setActiveCard)
    return (
    <>
     <tr {...row.getRowProps()} 
        onDoubleClick={() => handleRowDoubleClick(row.original)}
        onClick={()=>handleRowOnClick(row.original)}
        draggable 
        onDragStart={()=>setActiveCard(row.original)} 
        onDragEnd={()=>setActiveCard(null)}
        >
        {row.cells.map(cell => (
          <td 
            {...cell.getCellProps()}>
              
            {renderCellContent(cell)}
          </td>
        ))}
      
      
    </tr>
    <tr role='row'>
          
          <DropArea/>
    </tr>
    
    
    </>
     
    )
    else return  (
      <tr {...row.getRowProps()} 
      onDoubleClick={() => handleRowDoubleClick(row.original)}
      onClick={()=>handleRowOnClick(row.original)}
      >
      {row.cells.map(cell => (
        <td 
          {...cell.getCellProps()}>
            
          {renderCellContent(cell)}
        </td>
      ))}
      
      
    </tr>
    )
  }
  return (
    <div className='table-container'>
      <table className='table' {...getTableProps()}>
          <thead className='table-header'>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th  {...column.getHeaderProps()} style={{ width: column.width }}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                // <tr {...row.getRowProps()} 
                //   onDoubleClick={() => handleRowDoubleClick(row.original)}
                //   onClick={()=>handleRowOnClick(row.original)}
                //   draggable 
                //   onDragStart={()=>setActiveCard(row.original)} 
                //   onDragEnd={()=>setActiveCard(null)}
                //   >
                //   {row.cells.map(cell => (
                //     <td 
                //       {...cell.getCellProps()}>
                        
                //       {renderCellContent(cell)}
                //     </td>
                //   ))}
                  
                  
                // </tr>
                renderRowTd(row)
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

  function CabinetAssetCellView({ cell }) {
    const [asset, setAsset] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        if (cell.row.original.assetId) {
          const data = await FetchGetAssetById(cell.row.original.assetId);
          setAsset(data);
        }
      }
      fetchData();
    }, [cell.row.original.assetId]);
  
    return (
      <div className='view-connected'>
        {asset ? (
          <div>{asset}</div> // Hiển thị dữ liệu asset tùy ý bạn
        ) : (
          <div>Loading...</div> // Hoặc hiển thị thông báo đang tải
        )}
      </div>
    );
  }

  function TypeCellView({ cell }) {
    const pathRef = useRef(null);
    const [pathWidth, setPathWidth] = useState(0);

    useEffect(() => {
      if (pathRef.current) {
        setPathWidth(pathRef.current.offsetWidth);
      }
    }, []);

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
         {renderIcon(cell.row.original.type,openFilePath)}
        {/* {renderButton()} */}
        
        <div className='view-path'>
        {buttonDelete()}
        {/* {renderButton()} */}
        
        <div 
          ref={pathRef}
          className='view-path-path d-none d-md-inline-block'
          // style={{ left: `-${pathWidth + 60}px` }}
          >
        {cell.row.original.path}
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
  
  