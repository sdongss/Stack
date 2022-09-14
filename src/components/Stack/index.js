import React, { Component } from 'react'
import './index.css'
import axios  from 'axios'
export default class Stack extends Component {
constructor(props){
    super(props)
    this.stackContent = React.createRef()
    this.stack = React.createRef()
}
state = {
    color:this.props.color,
    stackList:[],
    isShow:false,
    value:''
}
// 点击了添加按钮
addStack(){
    this.setState({
        isShow:true,
    })
}
// 添加任务
addItem(e){
    if(this.state.value == ''){
        return 
    }
  
    let arr = [...this.state.stackList]
    arr.push(this.state.value)
    // 后端也添加任务项，入数据库
    this.addStackTo(this.state.value)

    this.setState({
        stackList:arr,
        isShow:false,
        value:''
    })
}
componentDidMount(){
    let stack = this.stack.current
    // 任务拖动，向公共父组件传递拖动的任务名称
    stack.addEventListener('dragstart',e =>{
        e.stopPropagation()
        let key = e.target.getAttribute('data-key') 
        key = parseInt(key)
        let item = this.state.stackList.find(item=>{
            return item.id == key
        })
        // console.log(item)
        
        // this.props.sendTitle(this.state.stackList[key])
        this.props.sendTitle(item)

    },false)
    // 拖动结束，在任务列删除对应的列
    stack.addEventListener('dragend',e =>{
        // 自定义属性，获取对应的下标
        let key = e.target.getAttribute('data-key') 
        key = parseInt(key)
        // 修改组件stackList状态
        let arr = [...this.state.stackList]
        arr = arr.filter((item,index) =>{
            return item.id !== key
        })
        this.setState({
            stackList:arr
        })
    },false)
    // 任务容器
    let stackContent = this.stackContent.current
    stackContent.addEventListener('dragenter',e =>{
        
    },false)
    // 任务项进入任务容器
    stackContent.addEventListener('dragover',e =>{
        e.preventDefault()
        e.target.style.border = 'solid 1px blue'
      

    },false)
    // 离开容器
    stackContent.addEventListener('dragleave',e =>{
        
        e.preventDefault()
        e.target.style.border = 'none'

    },false)
    // 放入任务
    stackContent.addEventListener('drop',e =>{
        e.preventDefault()
        let arr = [...this.state.stackList]
        arr.push(this.props.title)
        this.updateStack(this.props.title.id)
        this.setState({
            stackList:arr
        })
        this.props.sendTitle('')
        e.target.style.border = 'none'
        
    },false)
    // 获取后端的任务数据
    this.getStack()
}
// 获取后端的任务列表
async getStack(){
    let type = this.props.type
    let status;
    if(type == 'prepare'){
        status = 0
    }else if(type == 'learning'){
        status = 1
    }else {
        status = 2
    }
    console.log(status)
    const {data:res} = await axios.get('http://127.0.0.1:3000/stack/allstack')
    
    let arr = res.data
    arr = arr.filter(item =>{
        return item.status == status
    })
    this.setState({
        stackList:arr
    })
}
// 向数据库添加任务
async addStackTo(name) {
    console.log('点击了')
    const {data:res} = await axios.get('http://127.0.0.1:3000/stack/addstack',{params:{title:name}})
    console.log(res)
}
// 向数据库更改对应的任务状态
async updateStack(id){
    let type = this.props.type
    let status;
    if(type == 'prepare'){
        status = 0
    }else if(type == 'learning'){
        status = 1
    }else {
        status = 2
    }
    const {data:res} = await axios.get('http://127.0.0.1:3000/stack/updatestack',{params:{id:id,status:status}})
}
// 添加按钮，展示输入框
showInput(){
    if(this.state.isShow){
        return (
            <div>
            <input type="text" onChange={e => this.setState({value:e.target.value.trim()})} value={this.state.value} onBlur={this.addItem.bind(this)}></input>
            </div>
        )
    }
    
}
// 添加按钮按需展示
showBtn(){
    if(this.props.type == 'prepare'){
        return (
            <div className='addBtn' onClick={this.addStack.bind(this)}><span>+</span></div>
        )
    }
}
// 删除任务项
deleteStack(key){
    let arr = [...this.state.stackList]
    arr = arr.filter((item,index) =>{
        return index !== key
    })
    this.setState({
        stackList:arr
    })
}
  render() {
    return (
      <div className='stack' ref={this.stack}>
        {/* 任务队列标题 */}
        <h5 style={{backgroundColor:this.state.color}}>{this.props.children}</h5>
        {/* 任务容器 */}
        <div className='content' style={{backgroundColor:this.state.color}} ref={this.stackContent}>
            <div className='stack-item'>
                {/* 任务项 */}
                {this.state.stackList.map((item,index) => (<div key={index} className="item-title" draggable="true" data-key={item.id}>{item.title}<div className='clear' onClick={this.deleteStack.bind(this,index)}>#</div></div>))}
                {this.showInput.call(this)}
            </div>
            {/* <div className='addBtn' onClick={this.addStack.bind(this)}><span>+</span></div> */}
            {this.showBtn()}
        </div>
      </div>
    )
  }
}
