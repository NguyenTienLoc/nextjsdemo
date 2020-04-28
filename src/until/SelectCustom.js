import React, { Component } from 'react'
import Select from 'react-select'
import _ from 'lodash'
class SelectCustom extends Component {
    constructor(props) {
      super(props)
    
      
    }
    _changeGender=(e)=>{
        this.props.onChange(e.value)
    }
    _defaultValue=()=>{
        const {options,value} = this.props;
        
        let index = _.findIndex(options,(i)=>{
            return i.value === value
        })
        let rt ={}
        if(index!==-1){
            rt = options[index];
        }
        return rt;
    }
    render() {
        const aa = this._defaultValue();
        // console.log(aa);
        return (
            <Select 
                onChange={this._changeGender} 
                value={aa} 
                options={this.props.options}
            />
        )
    }
}

export default SelectCustom