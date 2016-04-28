// Performance optomisations for React applications
// Alex Reardon

// main perfoamcne hotspot in react application is redudant processing and DOM diggint in compotnents. in order to avoid this, return false from shouldComponenetUpdate as high in hireacy
//  to faciliate this, make shouldComponenetUpdate checks fast and easy
// 
// redudant processing in componenets that do not update the DOM, DOM diffing leag nodes that do not beed to be update
// initial render is everything, propose one leage node. ideal only update nodes along critical path of leaf nodes, default is waste all nodes.
// but every compotent has shoudlcomponentUpdate(nextProps, nextState) which always defaults to ture, so every time update your top level props, every component in the whole application wil render
// ideally no deep equality checks.

class Item extends React.Component {
    shouldComponentUpdate(nextProps) {
      // expensive!
      return isDeepEqual(this.props, nextProps);
    }
    // ...
}

const newValue = {
    ...oldValue
    // any modifications you want to do
};


// fast check - only need to check references
newValue === oldValue; // false

// you can also use the Object.assign syntax if you prefer
const newValue2 = Object.assign({}, oldValue);

newValue2 === oldValue; // false

//in a redux reducer

// in this Redux reducer we are going to change the description of an item
export default (state, action) => {

    if(action.type === 'ITEM_DESCRIPTION_UPDATE') {

        const {itemId, description} = action;

        const items = state.items.map(item => {
            // action is not relevant to this item - we can return the old item unmodified
            if(item.id !== itemId) {
              return item;
            }

            // we want to change this item
            // this will keep the 'value' of the old item but 
            // return a new object with an updated description
            return {
              ...item,
              description
            };
        });

        return {
          ...state,
          items
        };
    }

    return state;
}
// great check if only item diff. allows for:

// super fast - all you are doing is checking references!
shouldComponentUpdate(nextProps) {
    return isObjectEqual(this.props, nextProps);
}

const isObjectEqual = (obj1, obj2) => {
    if(!isObject(obj1) || !isObject(obj2)) {
        return false;
    }

    // are the references the same?
    if (obj1 === obj2) {
       return true;
    }

   // does it contain objects with the same keys?
   const item1Keys = Object.keys(obj1).sort();
   const item2Keys = Object.keys(obj2).sort();

   if (!isArrayEqual(item1Keys, item2Keys)) {
        return false;
   }

   // does every object in props have the same reference?
   return item2Keys.every(key => {
       const value = obj1[key];
       const nextValue = obj2[key];

       if (value === nextValue) {
           return true;
       }

       // special case for arrays - check one level deep
       return Array.isArray(value) &&
           Array.isArray(nextValue) &&
           isArrayEqual(value, nextValue);
   });
};

const isArrayEqual = (array1 = [], array2 = []) => {
    if (array1 === array2) {
        return true;
    }

    // check one level deep
    return array1.length === array2.length &&
        array1.every((item, index) => item === array2[index]);
};

//should compoenentUpdate gets big fast, causing retugn false when not (state not representied correclty) or ture when shouldnt (this rerendering and performance issue)
// generally loose coupling between components. allows to change children's behavior without parent needing t know about chamge. allow children to operate in isolation without needing a parent to tighly control its behavior
// by denormalizing (merging) dat strucutre, can use simple reference checks if anythin changed. ex:
onst state = {
    items: [
        {
            id: 5,
            description: 'some really cool item',

            // interaction now lives on the item itself
            interaction: {
                isSelected: true
            }
        }
    ]
};

// easier checks now!
import React, {Component, PropTypes} from 'react';

class List extends Component {

    propTypes = {
        items: PropTypes.array.isRequired
    }

    shouldComponentUpdate (nextProps) {
        // so easy
        return isObjectEqual(this.props, nextProps);
    }

    render() {
            <div>
                {this.props.items.map(item => {

                    return (
                    <Item item={item}
                        isSelected={item.interaction.isSelected} />);
                })}
            </div>
        }
}

// avvoid dynamic props as data model allows props straight through
// great redux timer. also use flame chart

export default store => next => action => {
    console.time(action.type);

    // `next` is a function that takes an 'action' and sends it through to the 'reducers'
    // this will result in a re-render of your application
    const result = next(action);

    // how long did the render take?
    console.timeEnd(action.type);

    return result;
};