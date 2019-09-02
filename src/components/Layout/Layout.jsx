import React, { Component } from 'react';
import './Layout.css';
export default class Layout extends  Component {
    render() {
        return (
            <main className='Content'> 
                 {this.props.children}
            </main>

        )
    }
}