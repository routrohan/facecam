import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
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
      imageUrl: ''
    }
    // this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }

  onSubmit = ()=>{
    this.setState({imageUrl:this.state.input})
    console.log("click")
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    },
    function(err) {
      // there was an error
    }
  );
  }

  render(){
  return (
    <div className="App">
        <Particles className='Particles'
              params={particleOptions}
              
            />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm  onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );

  }
}

export default App;
