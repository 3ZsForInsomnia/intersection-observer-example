# Example usage of IntersectionObserver API #

I was discussing the new IntersectionObserver Browser API works, and figured I would create a small example using React. It is a powerful new mechanism for determining (asynchronously via the Observer pattern) whether a given element or set of elements is visible within the viewport.

It has a lot of great use cases, from lazy loading to rerender optimization (do not rerender an element/image/etc unless visible) and more. It isn't that complex and is supported by nearly all major browsers and versions, and I find it to be a lot cleaner and more configurable than detecting where the user is and what is visible each time the scroll event is fired. Much of this is due to it handling much of that work for you by allowing you to simply target any HTML Element and setting a visibility threshold.

I hope this is informative and helpful for anyone who comes across this!

## How to run this example ##

I might put this into a CodePen later, but for now it is pretty simple to look through. To run it, simply clone the repo, run ```npm install``` and ```npm start```!