import React, { Component } from 'react'; 
import './MemeGenerator.css';

<style>
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');
</style>

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
          topText: "",
          bottomText: "",
          randomImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW92yBcqTHJru0351feL3KpcBoZJyTcQyipA&usqp=CAU",
          allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    componentDidMount() { //ensure that data is fetched at the beginning
        fetch("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW92yBcqTHJru0351feL3KpcBoZJyTcQyipA&usqp=CAU") //call to URL
          .then(response => response.json()) //turn promise into JS object
          .then(response => {
        const { memes } = response.data //pull memes array from response.data
        console.log(memes[0]) // check data is present
        this.setState({ allMemeImgs: memes }) // set allMemeImgs state
      })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]:value })
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input
                        className="input"
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />
                    <input 
                        className="input"
                        type="text"
                        name="bottomText"
                        placeholder="Bottom text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt='' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;