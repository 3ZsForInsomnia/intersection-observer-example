import React, { Component } from 'react';
import './App.css';
import { fakeData, moreFakeData } from './data'; // Static fake data to import

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: fakeData
    }
    // Prepare the callback for passing down the component tree
    this.addNewDataToState = this.addNewDataToState.bind(this);
  }

  addNewDataToState() {
    this.setState({
      feed: [].concat(fakeData, moreFakeData)
      // In a real world situation this would likely be an HTTP request
    });
  }

  render() {
    return (
      <div className="App">
        <Feed feed={this.state.feed}
          callbackForLastPost={this.addNewDataToState}
        />
      </div>
    );
  }
}

export default App;

// Convenience component - not technically necessary
const Feed = ({feed, callbackForLastPost}) => {
  return(
    <div>
      { feed.map((post, index) => {
        if (index === feed.length - 1) {
          return <Post key={index} post={post} isLast={true}
            callbackForLastPost={callbackForLastPost} />
        }
        else return <Post key={index} post={post} isLast={false}
          callbackForLastPost={null} />
      }) }
    </div>
  )
}

class Post extends Component {
  constructor(props) {
    super(props);
  }

    isLastItemVisible = new IntersectionObserver(
      // List of entries that have been defined for the IntersectionObserver
      (entries, self) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Run the callback when the observed element is visible according to its defined threshold
            this.props.callbackForLastPost();
            // Remove observer since the current target is no longer the last post
            self.unobserve(entry.target);
          }
        });
      },
      // Threshold to determine how much of the observed element should
      //    be visible before firing the callback
      { root: document.querySelector("root"), threshold: 0.5 }
    );

  componentDidMount() {
    if (this.props.isLast) {
      const target = document.querySelector("#last-post");
      this.isLastItemVisible.observe(target);
    }
  }

  render() {
    if (this.props.isLast) {
      return(
        <div id="last-post">
          <h3>{this.props.post.author}</h3>
          <p>{this.props.post.text}</p>
        </div>
      )
    }
    else return(
      <div>
        <h3>{this.props.post.author}</h3>
        <p>{this.props.post.text}</p>
      </div>
    )
  }
}
