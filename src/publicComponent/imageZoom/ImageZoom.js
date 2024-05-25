import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './ImageZoom.css'
class ImageZoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false,
            detailX: 0,
            detailY: 0
        };
        this.detailImgRef = React.createRef();
    }
    handleMouseMove = (e) => {
        // console.log(123);
        const container = e.target.getBoundingClientRect();
        const detailContainer = this.detailImgRef.current.parentNode.getBoundingClientRect();
        const x = e.clientX - container.left;
        const y = e.clientY - container.top;

        // Tính toán vị trí phóng to của ảnh
        let detailX = -((x / container.width) * this.detailImgRef.current.width - detailContainer.width / 2);
        let detailY = -((y / container.height) * this.detailImgRef.current.height - detailContainer.height / 2);
        if(detailX>0){
            detailX = 0
        }
        if(detailY>0){
            detailY=0;
        }
        if(detailY<(detailContainer.height-this.detailImgRef.current.height)){
            detailY = detailContainer.height-this.detailImgRef.current.height;
        }
        if(detailX<(detailContainer.width-this.detailImgRef.current.width)){
            detailX = detailContainer.width-this.detailImgRef.current.width;
        }

        // console.log(detailX,this.detailImgRef.current.width,detailContainer.width)
        this.setState({ showDetail: true, detailX, detailY });
    }

    handleMouseLeave = () => {
        this.setState({ showDetail: false });
    }
    render() {
        const { showDetail, detailX, detailY } = this.state;
        return (
            <div className='img-asset-container'>
                <img 
                    className='img-asset-view-root' 
                    src={this.props.imgSrc} 
                    alt="Placeholder Image"
                    onMouseMove={this.handleMouseMove}
                    onMouseLeave={this.handleMouseLeave}
                />
                <div className="img-asset-view-detail card border-primary" style={{ display: showDetail ? 'flex' : 'none' }}>
                    <div className="card-body">
                        <img 
                            className='img-asset-view-detail-img' 
                            src={this.props.imgSrc}
                            alt="Placeholder Image"
                            ref={this.detailImgRef}
                            style={{ top: detailY, left: detailX }}
                        />
                    </div>
                </div>
                <Button 
                    className='btn-asset'
                    variant="info" 
                    onClick={this.props.openUploadFileForm}
                >
                    Change Image
                </Button>
            </div>
        );
    }
}

export default ImageZoom;