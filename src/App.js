import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Rank from './components/Rank/Rank'
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';


const particleOptions = {
  particles: {
    number:{
      value:30,
      density: {
        enable:true,
        value_area: 800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'db3c64f2e5c24154a1d7b3af0c12f892'
 });

class App extends Component {
  constructor(){
    super ();
    this.state = {
      input:'',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn: false
    }
    // this.onInputChange = this.onInputChange.bind(this);
  }

  calculateFaceLocation = (data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width,height)

    return {
      leftCol : clarifaiFace.left_col*width,
      topRow : clarifaiFace.top_row*height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }


  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box:box})
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }

  onSubmit = ()=>{
    this.setState({imageUrl:this.state.input})
    console.log("click")
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn:false})
    }
    else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render(){
  return (
    <div className="App">
        <Particles className='Particles'
              params={particleOptions}
              
            />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange} />

      {
        this.state.route === 'home' ? 
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm  onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        
        : (
          this.state.route === 'signin'? 
          <Signin onRouteChange = {this.onRouteChange}/> 
            :
          <Register onRouteChange = {this.onRouteChange}/>
        )

        
        
        
      }
    </div>
  );

  }
}

export default App;
