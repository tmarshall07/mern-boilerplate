# State
All global state management is kept in this directory. Generally this includes items that need to be accessed and mutated from multiple faraway components, where passing down the tree is too cumbersome.

## `initialState.js`
All global state variables should be declared and initialized here.

## `[TYPE]/actions.js`
Functions that are called along with a payload to be sent to the store. These are loosely organized by the type of action being performed, e.g. project actions are in `projects/actions.js`, etc.

## `reducer.js`
A master reducer function that specifies how the state's going to change depending on the action.
> NOTE: This should probably be broken up at some point.

# Context
This global store uses React's [Context](https://reactjs.org/docs/context.html) feature. Consuming the `Context` and accessing the store in a given component depends on the type of component.

## Functional components
For functional components, you'll need to use the React hook `useContext(MyContext)`. E.g.
```javascript
const { Store } = require('state/store');

function MyFunctionalComponent(props) {
  // Get context with useContext
  const context = React.useContext(Store);
  const {
    state: {
      // State variables
    },
    dispatch, // Dispatch function required to be passed with any action
  };

  return (
    <Container>
      // Etc.
    </Container>
  );
}
```

On the other hand, with class components, you access the store a little differently, like this:
```javascript
const { Store } = require('state/store');

class MyClassComponent extends React.Component {
  render() {
    // Accessible through `this`
    const context = this.context;

    return (
      <Container>
        // Etc.
      </Container>
    );
  }
}

MyClassComponent.contextType = Store; // Must set contextType
```