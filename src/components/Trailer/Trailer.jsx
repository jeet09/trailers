import React, { Component } from 'react';
import {
    Row,
    Col,
    Card
} from 'react-bootstrap';

import './Trailer.css';



class Trailer extends Component {

    state = {
        showIframe: false,
        trailer: null,
        rowId: null
    }

    iframeSource = (src) => {
        console.log(src)
        const iframe = `<iframe src=${src} width="540" height="450"></iframe>`; 
        
    
        return (
            <div dangerouslySetInnerHTML={{__html: iframe}} />
        )        
    
    }

    showIframe = (trailer, idx) => {
        
        const url = (new URL(trailer.TrailerURL)).searchParams;
        const newUrl = `"https://youtube.com/embed/${url.get('v')}"`;
        
        this.setState({
            showIframe: true,
            trailer: newUrl,
            rowId: idx

        });
                
    }
   

    render() {
        let content = [];
    

        const rows = [...Array( Math.ceil(this.props.data.length / 4) )];
        

        const productRows = rows.map( (row, idx) => this.props.data.slice(idx * 4, idx * 4 + 4) );
        
        

        content = productRows.map((row, idx) => (
            <div key={idx}>
                <Row  className='mb-3'>    
                    
                    { row.map( (trailer,index) => 
                    <Col  md={3} key={index} > { 
                        <Card style={{ width: '18rem' }} className='cursor-pointer' onClick={() => this.showIframe(trailer, idx)}>  
                                        
                            <Card.Img 
                                alt="Trailer Image" 
                                className="card-img-top img-fluid" 
                                src={`https://in.bmscdn.com/events/moviecard/${trailer.EventCode}.jpg`} 
                            />
                            <Card.Body>
                                <Card.Title>{trailer.EventTitle}</Card.Title>

                                <div className='card-content'>
                                    <div className='float-left'>
                                        {trailer.EventLanguage}
                                    </div>
                                    <div className='float-right'>
                                        {trailer.wtsPerc}%
                                    </div>
                                    
                                    
                                </div>
                            </Card.Body>

                        </Card>
                        }
                        </Col>                     
                    )
                    
                }
                </Row>
                {
                    this.state.showIframe && idx === this.state.rowId ? this.iframeSource(this.state.trailer) : null
                }
                 
            </div>

        ));



        return (
            <div>
                {content}
            </div>
        )
    
    }
};

export default Trailer;