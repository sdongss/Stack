import React, { Component } from 'react'
import Stack from '../../components/Stack'
import './index.css'
export default class Home extends Component {
    // 公共组件状态
   state ={
    item:''
   }
   getTitle(name){
    this.setState({
        item:name
    })
   }
  render() {
    return (
      <div className='home'>
        <Stack sendTitle = {this.getTitle.bind(this)} title={this.state.item} type="prepare">Prepare</Stack>
        <Stack color="#9CD28E" sendTitle = {this.getTitle.bind(this)} title={this.state.item} type="learning">Learning</Stack>
        <Stack color="#DDDDDD" sendTitle = {this.getTitle.bind(this)} title={this.state.item} type="complete">Complete</Stack>
      </div>
    )
  }
}
