import React from "react";

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemes: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ allMemes: memes })
            })
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const random = Math.floor(Math.random() * this.state.allMemes.length)
        const newRandomImage = this.state.allMemes[random].url;
        this.setState({
            randomImage: newRandomImage
        })
    }

    onClick() {
       alert('Function currently no implemented.\nPlease take a screenshot of the page to save the content.');
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.topText} name="topText" placeholder="Top text" onChange={this.handleChange} />
                    <input type="text" value={this.state.bottomText} name="bottomText" placeholder="Bottom text" onChange={this.handleChange} />
                    <button>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" id="dataImage" />
                    <h2 id="inputTop" className="top">{this.state.topText}</h2>
                    <h2 id="inputBot" className="bottom">{this.state.bottomText}</h2><br />
                    <button onClick={this.onClick}>Export Image</button>
                </div>
            </div>
        );
    }
}

export default MemeGenerator;