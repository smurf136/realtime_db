import React, { Component } from 'react'
import styled from 'styled-components'

const Div = styled.div`
    
`

export default class Test extends Component {
    
    state = {
        name: ''
    }

    componentDidMount(){
        if(this.state.name !== this.props.name){
            this.setState({
                name: this.props.name || 'smurf'
            })
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.name !== this.props.name){
            this.setState({
                name: this.props
            })
        }
    }
    
    render() {
        console.log(this.props.name)
        return (
            <Div>
                <p>Test:  {this.state.name} </p>
            </Div>
        )
    }
}
