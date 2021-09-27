
import './App.css';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Test from './Components/Test/Test';
import Particles from 'react-particles-js';
import { Component } from 'react';
// import Clarifai from 'clarifai';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

// const app = new Clarifai.App({apiKey:'40568bc656c54d0787dd4c0d4347d63d'});

const initialState = {
  
    input:'',
    imageUrl: '',
    box:{},
    route:'signIn', //route will keep track where we are on the page
    isSignedIn:false,
    user:[
      {
        id:'',
        name: '',
        email:'',
        pwd:'',
        entries:0,
        joined:''
      }
    ]
  
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    this.setState({
      user: {
        id:data.id,
        name: data.name,
        email:data.email,
        pwd:data.pwd,
        entries:data.entries,
        joined:data.joined
      }
    })
  }

  componentDidMount(){
    // https://git.heroku.com/fast-shelf-29098.git/
    // http://localhost:3000/
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log);
  }

  onRouteChange = (route) =>{
 
   if(route === 'signOut'){

    this.setState(initialState);

   }else if(route === 'home'){
    this.setState({isSignedIn:true});
   }
   this.setState({route:route});
  }
  

  calculatefaceLocation = (data) => {

   const  clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputImage');
   const width = Number(image.width);
   const height = Number(image.height);

   return{

    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col*width),
    bottomRow: height - (clarifaiFace.bottom_row * height),

   }
    
  }

  displayFaceBox = (box) =>{
      this.setState({box:box});
  }

  onInputChange = (event) =>{
      this.setState({input:event.target.value});
  }

  // onSubmit = () => { 
  //   this.setState({imageUrl:this.state.input});
  //   // a403429f2ddf4b49b307e318f00e528b
  //   // https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Baby_Face.JPG/1200px-Baby_Face.JPG
  //   app.models.predict("a403429f2ddf4b49b307e318f00e528b",this.state.input)
  //   .then(
  //     function(response){
  //       console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        
  //     },
  //     function(err){
         
  //     }
  //   );
  // }

  //without security of API key
  // onSubmit = () => {
  //   this.setState({imageUrl:this.state.input});
  //   // a403429f2ddf4b49b307e318f00e528b
  //   // https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Baby_Face.JPG/1200px-Baby_Face.JPG
  //   app.models.predict("a403429f2ddf4b49b307e318f00e528b",this.state.input)
  //   .then(response =>{
  //     if(response){
  //       fetch('http://localhost:3000/image',{
  //         //we will pass object here that describe what the request will be
  //         method:'put',
  //         headers:{'Content-Type':'application/json'},
  //         body:JSON.stringify({
  //             id:this.state.user.id
             
  //         })
  //     }).then(response => response.json())
  //       .then(count => {
  //         this.setState(Object.assign(this.state.user, { entries: count})) //targegobject ,assigned value
  //       }).catch(console.log)
  //     }
  //     this.displayFaceBox(this.calculatefaceLocation(response))
  //   })
  //   .catch(err => console.log(err))
  // }

  //with security of API key
  onSubmit = () => {
    this.setState({imageUrl:this.state.input});
    // a403429f2ddf4b49b307e318f00e528b
    // https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Baby_Face.JPG/1200px-Baby_Face.JPG
    fetch('https://fast-shelf-29098.herokuapp.com/imageurl',{ 

      // http://localhost:3000/imageurl
      // https://git.heroku.com/fast-shelf-29098.git
      //we will pass object here that describe what the request will be
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          input:this.state.input
         
      })
  }).then(response => response.json())
    .then(response =>{
      if(response){
        fetch('https://fast-shelf-29098.herokuapp.com/image',{
  
          //we will pass object here that describe what the request will be
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              id:this.state.user.id
             
          })
      }).then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count})) //targegobject ,assigned value
        }).catch(console.log)
      }
      this.displayFaceBox(this.calculatefaceLocation(response))
    })
    .catch(err => console.log(err))
  }




  render(){

    return (
      <div className="App">
        <Particles className = "particles"
                params={{
                  particles: {
                    number:{
                      value:80,
                      density:{
                        enable:true,
                        value_area:800
                      }
                    }
                  }
                }}
              />
       <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
      {this.state.route === 'home' 
              ?
              <div>
              <Logo/>
              <Rank uname ={this.state.user.name} entries = {this.state.user.entries}/>
              <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
              <Test box = {this.state.box} imageUrl = {this.state.imageUrl}/>
              </div>
           
              :(
                this.state.route === 'signIn'  ?
                <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> 
              :
                <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> 

              )

           
  }
      </div>
 
    );
  }
}

export default App;
