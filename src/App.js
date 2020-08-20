import React from 'react';
import logo from './logo.svg';
import './App.css';
var synth = window.speechSynthesis;

// const { ipcRenderer } = window.require("electron")
// cenored pc IDUKBMH-EGPC5NU-GIJYKFS-G743XVH-JHM3KMY-RQL64ZT-36NVPNG-KXTDFAC

export default class App extends React.Component {

  componentDidMount(){
    this.runcall()
    setInterval(() => {
      this.runcall()
    }, 30000);
  }

  runcall(){

    var systemVoices = {
      windows: "Microsoft Eva Mobile - English (United States)",
      mac: "Samantha",
      google: "Google UK English Female"
    }

    synth.onvoiceschanged = function() {
      synth.getVoices();
      console.log('got them');
    }

    var utterThis = "Ticket number: A: 114, to counter number 1."
    var voices = speechSynthesis.getVoices()
    console.log(voices);
    if (Object.keys(voices).length) {  
      var voice = voices.find((data)=>{ return (data.name===systemVoices.windows) })
      console.log(voice);
      if(voice==null){ voice = voices.find((data)=>{ return (data.name===systemVoices.google) }) }
      console.log(voice);
      if(voice==null){ voice = voices.find((data)=>{ return (data.name===systemVoices.mac) }) }
      console.log(voice);
    }
    
    utterThis = new SpeechSynthesisUtterance(utterThis)
    utterThis.voice = voice
    synth.speak(utterThis)

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {/* <button onClick={ ()=>this.runcall() }>Goooooo</button> */}
        </header>
      </div>
    );
  }
}

