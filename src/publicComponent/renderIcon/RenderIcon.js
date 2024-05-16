import React, { useState,useEffect  } from 'react';
import pdf from '../../FileIcon/pdf.png';
import zip from '../../FileIcon/zip.png';
import rar from '../../FileIcon/rar.jpg';
import word from '../../FileIcon/word.png';
import excel from '../../FileIcon/excel.png';
import ppt from '../../FileIcon/ppt.png';
import exe from '../../FileIcon/exe.png';
import otherFile from '../../FileIcon/file.png';

const renderIcon = (type) => {
    const fileType = type; // Lấy giá trị của trường "type" từ dữ liệu hàng
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
  export default renderIcon;

  function ImageView(props){
    return(
      <div className='view-file-icon'>
        <img src={props.img}></img>
      </div>
    )
  }