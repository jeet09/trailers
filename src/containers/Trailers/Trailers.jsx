import React, { Component } from 'react';
import TInstance from '../../axios-trailer';
import UISelect from '../../components/UI/Select/Select';
import Spinner from '../../components/UI/Spinner/Spinner';


import Trailer from '../../components/Trailer/Trailer';
import './Trailers.css';

export default class Trailers extends Component {

    state = {
        results: {
            all: [],
            filtered: []
        },
        loading: false,
        languageFilter: [],
        genreFilter: [],
        selectedGenere: 'All',
        selectedLanguage: 'All'
    }

    
    applyFilters = (type, e) => {
        this.setState({loading: true});
        const filter = e.target.value;
        this.setState({
            ['selected'+type]: filter
        })
        const results = [...this.state.results.all];
        let languageFilterResult = [], genereFilter = [];
        switch(type) {
            case 'Language':
                
                languageFilterResult = results.filter((v, i) => {            
                    return v.EventLanguage === filter;
                });
                console.log(languageFilterResult)
                this.setState({
                    results: {
                        filtered: languageFilterResult,
                        all: this.state.results.all
                    },
                    loading: false
                })
                break;
            case 'Genere':               
                genereFilter = results.filter((v, i) => {            
                    return v.EventGenre === filter;
                });
                console.log(genereFilter)
                this.setState({
                    results: {
                        filtered: genereFilter,
                        all: this.state.results.all
                    },
                    loading: false
                    
                })
                break; 
            default: 
                this.setState({
                    results: {
                        filtered: this.state.results.filtered,
                        all: this.state.results.all
                    },
                    loading: false
                    
                })
                break;
        }
    

    }


    componentDidMount() {
        this.setState({loading: true});
        
        TInstance.get('getData?cmd=GETTRAILERS&mtype=cs')
            .then(res => {    
                const genreData = [];                     
                this.setState({
                    results: {
                        all: Object.values(res.data[1]),
                        filtered: Object.values(res.data[1]),
                    },
                    languageFilter: res.data[0]
                });
                this.state.results.all.map(v => genreData.push(v.EventGenre));
                const uniqGeneres = [...new Set(genreData)]

                this.setState({genreFilter: uniqGeneres});
                this.setState({loading: false});
            }).catch(err => {
                this.setState({loading: false});
            })


    }

    render() {
        console.log(this.state)
        if(this.state.loading) {
            return <Spinner />
        }
        else {
            return (
                <div className='trailer-section'>
                        <div className='filters'>
                            <div style={{display: 'inline-block'}} className='mr-2'>
                                <UISelect
                                    selectedValue={this.state.selectedGenere}
                                    options={this.state.genreFilter}
                                    formControlID={'GenreFilter'}
                                    onChange={(e) => this.applyFilters('Genere', e)}
                                />
                            </div>
                            <div style={{display: 'inline-block', width: '200px'}}>
                                <UISelect
                                    selectedValue={this.state.selectedLanguage}
                                    options={this.state.languageFilter}
                                    formControlID={'LanguageFilter'}
                                    onChange={(e) => this.applyFilters('Language', e)}
                                />
                            </div>
                            
                            
                        </div>
                        
                        <Trailer data={this.state.results.filtered} />
                </div>
                
                
            )
        }
    }
}