import React, { useState,useEffect  } from 'react';
import pdf from '../../FileIcon/pdf.png';
import zip from '../../FileIcon/zip.png';
import rar from '../../FileIcon/rar.jpg';
import word from '../../FileIcon/word.png';
import excel from '../../FileIcon/excel.png';
import ppt from '../../FileIcon/ppt.png';
import exe from '../../FileIcon/exe.png';
import otherFile from '../../FileIcon/file.png';

const renderIcon = (type,click) => {
    const fileType = type; // Lấy giá trị của trường "type" từ dữ liệu hàng
    // Dựa vào fileType để hiển thị icon phù hợp
    switch (fileType) {
      case ".pdf":
        return <ImageView img={pdf} onClick={click}/>;
      case ".zip":
        return <ImageView img={zip} onClick={click}/>;
      case ".rar":
        return <ImageView img={rar} onClick={click}/>;
      case ".doc":
        return <ImageView img={word} onClick={click}/>;
      case ".docx":
        return <ImageView img={word} onClick={click}/>;
      case ".xls":
        return <ImageView img={excel} onClick={click}/>;
      case ".xlsx":
        return <ImageView img={excel} onClick={click}/>;
      case ".ppt":
        return <ImageView img={ppt} onClick={click}/>;
      case ".pptx":
        return <ImageView img={ppt} onClick={click}/>;
      case ".exe":
        return <ImageView img={exe} onClick={click}/>;
      default:
        return <ImageView img={otherFile} onClick={click}/>;
    }
  };
  export default renderIcon;

  function ImageView(props){
    return(
      <div className='view-file-icon' onClick={props.onClick}>
        <img src={props.img}></img>
      </div>
    )
  }