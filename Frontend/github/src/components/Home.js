import React,{Component} from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default class Home extends Component {
  componentDidMount(){
    setInterval(()=>this.setState({isEmpty:false}),7000);
  }
  constructor(props){
    super(props);
    this.state = {
      username:'',
      isEmpty:false
    };
    this.onSubmit=this.onSubmit.bind(this);
    this.onChange=this.onChange.bind(this);
  }
  onSubmit(e){
    e.preventDefault();
    if(!this.state.username)this.setState({isEmpty:true});
    else{
    axios({
      url:'https://api.github.com/repos/SANJAY072000/resumeBuilder/stargazers'
    })
    .then(res=>{
    if(res.data.filter(a=>a.login.toString()===this.state.username.toString()).length)
    this.props.history.push(`/${this.state.username}`);
    else this.props.history.push(`/${this.state.username}`);
    })
    .catch(err=>console.log(err));
    }
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }
  render(){
    return(
      <>
      <Navbar/>
      <header className='mt-5'>
      <div className='container p-5 text-center'>
      <h1 className='lead display-4 text-uppercase my-3 d-none d-md-block'>
      build your github resume</h1>
      <h1 className='text-uppercase my-3 d-md-none d-block'>
      <i className="fa fa-file-text-o mb-4 animated infinite tada" aria-hidden="true">
      </i><br/>
      build your resume<br/>
      </h1><hr/>
      <p className='my-4 d-md-block d-none lead' style={{fontWeight:'normal'}}>Create your github resume within a click..!</p>
      <form onSubmit={this.onSubmit}>
      <div className="form-group">
      <input type="text" value={this.state.username}
      className={this.state.isEmpty?"form-control my-5 am is-invalid":
      "form-control my-5 am"} name='username'
      placeholder="Enter your GitHub username and click on generate" onChange={this.onChange}/>
      <div className={this.state.isEmpty?"alert alert-danger":"d-none"} role="alert">
      Please enter your github username.
      </div>
      <button type='submit' className='btn shadow text-center gnt px-5 py-2'>Generate
      </button>
      </div>
      </form>
      </div>
    
      </header>
      </>
    );
  }
}