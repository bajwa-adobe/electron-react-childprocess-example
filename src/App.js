import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
		txt_cmd:"",
		txt_args:"",
		txt_res:""
	};
  }
  
  handleClick = () => {
	 const s = this.state;
	 let cmd = s.txt_cmd;
	 if(!cmd){
		 cmd= "dir";
	 }

	 let args = [];	 
	 if(s.txt_args){
		args = s.txt_args.split(" ");
	 }
	 
	 window.runcmd(cmd, args, this.res_callback);
  }
  
  res_callback = (data, onerror) =>{
	  if(onerror){
		  //console.error("STDERR:", data);
		  this.setState({txt_res: "Err:"+ data});
	  }
	  else{
		  //console.log("STDOUT:", data);
		  const r = data;
			this.setState({txt_res: r});
	  }
  }
  
  handleChange = (itkey) => (e) =>{
	  if(itkey === "txt_cmd"){
		  this.setState({txt_cmd : e.target.value});
	  }
	  else if(itkey === "txt_args"){
		  this.setState({txt_args : e.target.value});
	  }
  }
  
  render() {
    return (
      <div className="App">
				<p>Run the command as child-process</p>	
				<p>
					<select style={{height:25}} value={this.state.txt_cmd} onChange={this.handleChange('txt_cmd')}>
						<option value="dir">dir (windows)</option>
						<option value="python">python</option>
					</select>
					<input style={{height:19}} type="text" value={this.state.txt_args} onChange={this.handleChange('txt_args')} />
					<button style={{height:25}} onClick={this.handleClick}>Run</button>
				</p>
				<hr/>
				<p>
					<span>Result:</span><br/>
					<textarea style={{height:500, width:300}} value={this.state.txt_res} />
				</p>
			</div>
    );
  }
  
  componentDidMount(){
  }
}

export default App;
