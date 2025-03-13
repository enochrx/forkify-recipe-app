import View from "./View.js";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    const activeClass = this._data.id === id ? "preview__link--active" : "";

    return `
    <li class="preview">
        <a class="preview__link ${activeClass}" href="#${this._data.id}">
            <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
            </div>
         </a>
      </li>`;
  }
}

export default new PreviewView();

/* Alternatively
import View from './View';

export default class PreviewView extends View {
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join();
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
           <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                
              </div>
            </a>
          </li>
    `;
  }
}


///////////////////////////////////////////////////
Phil - 
This part was tricky for me as well. The short answer to your question is that the markup is inserted by the ORIGINAL render() method called on the bookmarksView in the controlAddBookmark function within controller.js

Since the first render() call has the default second parameter set to true (render = true), it will actually render the markup to the DOM. When it is set to false (render = false), it only returns markup. Think of it like a switch for a different setting.



I will try my best to illustrate the flow of data below



**controller.js**



bookmarksView.render(model.state.bookmarks); // Hello, I make the original render call. My end goal is to add the markup to the DOM!
This code first provides the bookmarks array data to the bookmarksView. Now, bookmarksView has access to the data (if the data exists or array is NOT empty). We are still in the ORIGINAL render() call for the bookmarksView from the controller. It's next job is to call _generateMarkup()



**create a bookmarks view**

Since the html markup and the overall code for bookmarks is almost exactly the same as the resultsView, we copy all of that code into a new js file called bookmarksView.js The only difference between the two are the parent elements where their html markup will be rendered, the message displayed and the error message.



At this point, we realize our code violtaes the DRY (Don't Repeat Yourself Principle).



**Keep code DRY : create previewView**

So we create a new view (previewView) that contains the common aspects of bookmarksView and results view, which is basically only the ability to obtain the id from the url and the html template literal markup that's inserted in the DOM.



bookmarksView and resultsView will rely on previewView to get their markup.

The markup would normally have been rendered by  bookmarksView and resultsView, respectively, by using the render function, but now previewView handles the markup.



That poses the question: How does previewView get access to the data from the model?

**bookmarksView**



Within the render() function, we will store the result of _generateMarkup in a variable called markup

_generateMarkup() will return a string. The string we need is in previewView but previewView doesn't know where the data is, so we need a way to pass the bookmarks array data to the previewView . We have a function for that! The render() method already passes data. Let's be efficient and instead of creating another function, we add a second parameter and gave the render method new instructions with the if statement .

render(data, render = false){ if(!render) return markup;} // I will provide data to the view of your choice, but the view will not try to insert markup to the page if render = false

This line of code is very important and it is saying "If render = false - DO NOT _clear() the parent element and DO NOT try to insert markup. I only want you to return a string. These rules only apply when we used previewView calls render() in the map() method below.



_generateMarkup() { return this._data.map(bookmark => previewView.render(bookmark, false)).join('')}



This _generateMarkup() method call belongs to bookmarksView, which is expecting a string that will be stored into the markup variable from the ORIGINAL render() call in the controller.



When we make this following call in the map() method:

previewView.render(bookmark, false) // Ok! I have my data (bookmarks). Oh, I noticed render = false: I will only deliver a string to _generateMarkup in bookmarksView



We are basically saying: "Hi previewView, I am giving you the bookmarks data, but I DO NOT want you to place anything in the DOM. Can you please just package a string  inside the const markup variable and deliver it to the bookmarksView.render() call? Thank you!



**previewView.js**

So now, the map method goes to work and constructs a preview element with the markup we placed in the preview.js file . When it's done, it will package and deliver a string to the original call that asked for all this which is in....



***bookmarksView.js***



bookmarksView.render(model.state.bookmarks) // My markup variable in the render method received a delivered string!

Remember, the markup variable within the original render() function call, in this file, now contains the result of the returned string from

previewView.render(bookmark, false) // I delivered a string!



Since render = true by default for the original call, it has the permission to move on to the last two lines of the render() code. I explicitly stated that the parameter is true only in this example so that you realize that this is the function responsible for inserting the markup to the DOM.



bookmarksView.render(model.state.bookmarks, render = true) // I made the original call to render the bookmarks data! I received my string when I called this._generateMarkup. Now what? My render parameter is NOT false. Cool, now I can insert the elements to the DOM




 this._clear(); 
 this._parentElement.insertAdjacentHTML('afterbegin', markup);


The way it clicked for me is to remember that the render() method has evolved a little. By default, it will actually place elements in the DOM, but when we set its second parameter to false, it will only return a string.



The second key is that we're essentially making a render() call within another render() call. The difference between the two calls is that the second render() call that happens when we map over the bookmarks data returns a string to its "parent-call" which is bookmarksView.render(model.state.bookmarks). You can say that it's an employee/serving the parent call.

An analogy may help: You can think of it like an associate and supervisor. The associate  (render = false) and the supervisor (render = true) can both complete the same the same task of drafting contracts. In terms of our code that means. (check if array data is empty, provide data to view, and return markup) but the associate doesn't have supervisor status (render = true), and is not allowed to sign the contract for approval. The associate can draft the contract and provide it to the supervisor for review (if(!render) return markup

Again, It's the original call has end goal of inserting the markup. The second call (in the map method) has the end goal of delivering a string. This entire set of tasks happened within the bookmarksView.render() call to render data. We just remixed the render() method to be flexible in the situations where we want to pass data but not place markup in the DOM.

///////////////////////////////////////////////////
Itay --

To understand this we need to look at the JS engine and specifically the event loop.

By adding multiple console logs we can watch when and from where the render() method is called.

render(data, render = true) {
 1   if (!data || (Array.isArray(data) && !data.length))
 2    return this.renderError();
 3   this._data = data;
 4  console.log(render, 'num 1');
 5  const markup = this._generateMarkup();
 6  console.log(render, 'num 2');
 7  if (!render) return markup;
 8  console.log(render, 'num 3');
 9  this._clear();
 10  this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
The 1st render() method is called in controller.js with the render parameter set to true.

Then it runs the code from lines 1-5, upon reaching line 5, *the engine pauses execution of the current render() call coming from controller.js* and proceeds to run - const markup = this._generateMarkup(); .



The _generateMarkup() method, when called on the bookmarksView and on the resultsView will trigger a loop using the .map array method and for each element of the passed data (model.state.bookmarks) it'll run previewView.render(bookmark,false); and store it's value inside a the markup variable.

_generateMarkup() {
1    const markup = this._data
2      .map(bookmark => {
3        return previewView.render(bookmark, false);
4      })
5      .join('');
6    console.log(markup);
7   return markup;
  }
All of this is happening with the execution of the first .render() call being PAUSED. (bookmarkView.render(model.state.bookmarks);)



After calling previewView.render(bookmark, false); it then does the original .render() method but returns at line 7 because the render parameter is set to false. The ._generateMarkup() method runs the .map for however many elements are inside the model.state.bookmarks array.

After it finished running the code and storing it inside markup (at line 1) it'll then continue the code and return the whole html string for all the elements.



NOW the FIRST .render() call will continue executing from line 5 and render the HTML because the render parameter is set by default to true and the markup data was returned and stored in the 1st markup variable inside the .render() method.



We can also see a console.log in the .render() method to help us understand this better:

(the true/false booleans we see is the printed value of the render parameter in the render method

true means - render = true --- false means - render = false)

true 'num 1' -- Initializing RENDER CALL FROM controller.js. bookmarksView.render(model.state.bookmarks);
 
-- EXECUTION FOR INTIALIZING RENDER CALL IS PAUSED.
false 'num 1' -- The render call inside _generateMarkup is executing
false 'num 2' -- The render call inside _generateMarkup is executing
 
<li class="preview"> 
--- A BOOKMARK FROM THE BOOKMARKS ARRAY IS GENERATED BUT NOT RENDERED INTO THE DOM BECAUSE render = false;
 
    <a class="preview__link preview__link--active" href="#5ed6604591c37cdc054bca10">
      <figure class="preview__fig">
        <img src="http://forkify-api.herokuapp.com/images/PizzaDip21of14f05.jpg" alt="Pizza Dip" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title"> Pizza Dip...</h4>
        <p class="preview__publisher">My Baking Addiction</p>
      </div>
    </a>
  </li>
 
--- .render() INSIDE _generateMarkup() FINISHED EXECUTING.
 
-- Initializing RENDER Call FROM controller.js continues executing.
true 'num 2' 
true 'num 3'
I hope this is clear enough for anyone in the future reading this.

*/
