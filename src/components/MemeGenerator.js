import React, { Component } from "react";
import ScreenCapture from './ScreenCapture';
import Popup from "reactjs-popup";

class MemeGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemes: [],
            screenCapture: "",
            open: false,
            title: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
        this.dragElement = this.dragElement.bind(this);
        this.handleScreenCapture = this.handleScreenCapture.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                this.setState({ allMemes: memes })
            })
    }

    handleScreenCapture = (screenCapture) => {
        this.setState({
            screenCapture
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
            randomImage: newRandomImage,
            topText: "",
            bottomText: ""
        })
    }

    onClick() {
        alert('Function currently no implemented.\nPlease take a screenshot of the page to save the content.');
    }

    // ==
    //Source https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
    dragElement(elmnt) {
        if (elmnt === 1) {
            elmnt = document.getElementById("topInput");
        } else {
            elmnt = document.getElementById("botInput");
        }

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    // == 

    handleScreenCapture = screenCapture => {
        this.setState(
            {
                screenCapture
            },
            () => {
                screenCapture && this.openModal();
            }
        );
    };

    openModal = () => {
        this.setState({ open: true });
    };

    closeModal = () => {
        this.setState({ open: false, screenCapture: "" });
    };

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSave = () => {
        console.log(this.state.title, this.state.screenCapture);
        alert('in');
    };

    render() {
        const { screenCapture } = this.state;
        console.log(screenCapture);
        return (
            <ScreenCapture onEndCapture={this.handleScreenCapture}>
                {({ onStartCapture }) => (
                    <>
                        <div className="container">
                            <form className="meme-form" onSubmit={this.handleSubmit}>
                                <input type="text" value={this.state.topText} name="topText" placeholder="Top text" onChange={this.handleChange} />
                                <input type="text" value={this.state.bottomText} name="bottomText" placeholder="Bottom text" onChange={this.handleChange} />
                                <button>Generate</button>
                            </form>
                            <div className="meme">
                                <img src={this.state.randomImage} alt="" id="dataImage" />
                                <div id="topInput" className="top">
                                    <h2 id="inputTop" draggable="true" onDragStart={() => this.dragElement(1)}>{this.state.topText}</h2>
                                </div>
                                <div id="botInput" className="bottom">
                                    <h2 id="inputBot" draggable="true" onDragStart={() => this.dragElement(2)}>{this.state.bottomText}</h2><br />
                                </div>
                            </div>
                            <button onClick={onStartCapture}>Export Image</button>
                        </div>
                        <Popup open={this.state.open} modal closeOnDocumentClick>
                            <div className="modal">
                                <div className="modal__header">
                                    <button onClick={this.closeModal}>&times;</button>
                                </div>
                                <div className="modal__body">
                                    <div>
                                        <label>Title: </label>
                                        <input id="test"
                                            type="text"
                                            onChange={this.handleOnChange}
                                            name="title"
                                            value={this.state.title}
                                        />
                                    </div>
                                    <div className="image__container">
                                        {screenCapture && (
                                            <img src={screenCapture} alt="screen capture" />
                                        )}
                                    </div>
                                </div>
                                <div className="modal__footer">
                                    <button onClick={this.handleSave}>Save</button>
                                    <button onClick={this.closeModal}>Cancel</button>
                                </div>
                            </div>
                        </Popup>
                    </>
                )}
            </ScreenCapture>
        );
    }
}

export default MemeGenerator;