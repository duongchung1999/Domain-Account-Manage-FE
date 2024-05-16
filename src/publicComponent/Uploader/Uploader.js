import { useState } from 'react';
import './Uploader.css';
import { MdCloudUpload,MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import renderIcon from '../renderIcon/RenderIcon';


const apiUrl = process.env.REACT_APP_API_URL;


function Uploader({ setParentOpenForm }){
    const [image,setImage] = useState(null)
    const [fileName,setFileName] = useState("No selected file")
    const [file,setFile]=useState(null)
    const [openForm,setOpenForm] = useState(true)
    const [dragging, setDragging] = useState(false);
   
    const  handleFileUpload = (event) => {
        // const file = file;
        // const fileName = this.state.fileName;
        Swal.fire({
            title: `Do you want to upload ${fileName}?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: `No`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const formData = new FormData();
                // formData.append('name',fileName);
                formData.append('file', file);
                const getToken = localStorage.getItem("token");
                const token = JSON.parse(getToken)
            
                try{
                    const response = await fetch(apiUrl+'/api/Document/upload', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + token.value,
                        },
                        body: formData
                    });
                    if (response.status === 201 || response.status === 204||response.status===200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response.statusText,
                            showConfirmButton: false,
                            timer: 1000
                        });
                        // setOpenForm(false);
                        setParentOpenForm(false) ;
                        console.log('Phản hồi từ API:', response);
                    } else {
                        console.error('Lỗi:', response);
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
                    console.error('Lỗi:', error.message);
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
                title: "Upload Failed!",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        
      };
    const renderImage = () =>{
        console.log(file)
        if(file && file.name.includes(".jpg")){
            return <img className='view-image' src={image} alt={fileName}/>
        }
        else {
            const fileExtension = file.name.split('.').pop();
            const extension = "."+fileExtension;
            return renderIcon(extension);
        }
    }
    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const files = event.dataTransfer.files;
        if (files && files[0]) {
            setFileName(files[0].name);
            setImage(URL.createObjectURL(files[0]));
            setFile(files[0]);
        }
    };
    return(
        
        <main>
            <form
            className='uploader-inputFile col' 
            onClick={()=> document.querySelector(".file-inputFile-select").click()}
            onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            >
                <input
                        type="file"
                        className="file-inputFile-select"
                        hidden
                        onChange={({target: {files}})=>{
                            files[0] && setFileName(files[0].name);
                            if(files){
                                setImage(URL.createObjectURL(files[0]));
                                setFile(files[0]);
                            }
                        }}
                    />
                {image?
                
                // <img src={image} width={120} height={120} alt={fileName}/>
                renderImage()
                
                :
                <div className='uploader-select-area'>
                <MdCloudUpload className='uploader-select-icon' color='#1475cf' size={90}/> 
                <p>Browse file to upload</p>
                </div>
                }
            </form>

            <section className='uploader-fileName'>
                <AiFillFileImage size={30} color='#1475cf'/>
                <span >
                    {fileName}
                    <MdDelete 
                    size={30}
                    onClick={()=>{
                        setFileName("No Selected file");
                        setImage(null);
                        setFile(null);
                    }}/>
                </span>

            </section>
            <Button 
                        className='col'
                            variant="danger" 
                            onClick={handleFileUpload}
                        >Upload</Button>
            
        </main>
    )
}
export default Uploader;
