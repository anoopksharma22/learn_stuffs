# Vue

> A javascript framework that makes building interactive and reactive web frontend.
>
> Reactive means, the UI changes with user inputs. Just like apps.
>
> It is a modern way of building web pages / UIs.
>
> - Traditionally we click a link and wait for the page to reload. But in modern approach we use java script which is already present in browser and can be used to fetch data and manipulate the DOM.
> - In modern approach the HTML/CSS/JS are fetched only once (first request) and later javascript is used to update the UI based on data fetched by API calls.

# Basic concepts

## **Options API** ( vue 2)

### Vue file has mainly three sections

> ### **Template**

- All html and custom html attributes goes here
  - Custom html attributes are simply components.
  - Vue app can be divided into multiple components.
  - All components follow same file structure.

> ### **Script**

- All app configurations goes here.
- Or we can say in case of options api, all options are configured here.
  - data
  - methods
  - computed
  - watch
  - emits
  - props

> ### **Style**

- All css style goes here.
  - It can be global or scoped.
  - Global styles applicable for entire web app.
  - Scoped styles are generally defined in components and they are only applicable to the particular component where they are defined.

> ### Example .vue file

```javascript
// .vue file

<template>
    <standard-html-tag>
        <custom-html-tag>
        </custom-html-tag>
    </standard-html-tag>
</template>

<script>

//component imports.
import CustomComponent from './components/CustomComponent.vue';


export default{

    // props are defined in components and used to pass values from parent component to child component.
    props:{

    },

    // Custom event declared here, used to pass events from child component to parent component.
    emits:[],

    // data property defines all data related to the component. it returns an object with all data elements as keys.
    data(){
        return {
            name: "Anoop",
            phone: "9876543210"
        }
    },

    // All functions are defined here. Mostly bound with events.
    methods:{

    },

    // Same as methods but the functions defined here are not always executed, they are executed only when one of the dependency changes.
    computed:{

    },

    // Defined to watch any data property for changes and the function defined for that data property executes. Function name is same as data property. And does not return anything.
    watch:{

    },
}
</script>

<style scoped>
    .class-name{
        background: #ccc;
    }
</style>
```

---

# Options in detail

> ## **data**

- `Vue.createApp({})` returns the app.
  - It accepts an obtect.
  - The object has attribute `data`.
  - data has a function as it's value.
  - The function return and object which contains attributes which are used in html controlled by vue.

```javascript
  <script>
    export default {
        data() {
            return {
                mygoal: "I want to build my app",
                vueLink: "https://v3.vuejs.org",
            };
        }
    }
  </script>
```

> ## **method**

- `methods` has an object full functions which would be called on various events in html
  - Note: **data** was itself a method but **methods** contains many list of methods.
- **data** attributes can be accessed in methods using **this.attribute_name**

```javascript
<template>
    <p>{{ outputRandomNumber() }}</p>
    <button :click="showMyGoal"> Change Number </button>
</template>

<script>
    export default{
        data() {
            return {
            mygoal: "I want to build my app",
            vueLink: "https://v3.vuejs.org",
            };
        },
        methods: {
            outputRandomNumber() {
                return Math.random(0,1);
            }, // same as outputRandomNumber : function(){}
            showMyGoal(){
                return this.mygoal; // to access data attribute.
            }
        },
    };
</script>

```

> ## **computed**

- computed like methods takes an object with methods inside it.
- But the methods inside computed are executed differently.
- The functions are used as data attributes.
  - Hence they are never call ( with parenthesis ), used as variable/data attribute.
- This functions are run only when one of the dependencies get changed.
  - If the is any simple function from methods in html without any binding with event it will run every time when something changes in html. Hence in order to prevent this issue there is this concept of computed configuration option in Vue.

```javascript

<template>

    <input type="text" v-model="name" />

    <p>Your name {{ fullname }}</p>

    <button v-on:click="resetName">Reset</button>

</template>

<script>
    export default{
        data() {
            return {
            name: "",
            };
        },
        computed:{
            fullname(){
                if( this.name === '')
                {
                    return '';
                }
                else
                {
                    return this.name + ' ' + 'Sharma';
                }
            }
        },
        methods: {
            resetName() {
                this.name = "";
            },
        },
    };
</script>
```

> ## **watch**

- Similar to computed but the difference it is tied to a data attribute.
  - it function name is same as data attribute name.
  - the function fires whenever the data attribute changes.
  - it does't returns anything, because it is not called inside the html.( works like middleware).
  - It gets two arguments by default ( newValue, oldValue) of the data attribute.

```javascript
<template>

    <input type="text" v-model="name" />

    <p>Your name {{ fullname }}</p>

    <button v-on:click="resetName">Reset</button>

</template>

<script>
    export default {
        data() {
            return {
            name: "",
            fullname : "Sharma",
            };
        },
        watch:{
            name(newValue,oldValue){
            if( newValue === '' ){
                this.fullname == ''
            }
            this.fullname = newValue + ' ' + this.fullname;
            }
        },

        methods: {
            resetName() {
            this.name = "";
            },
        },
    };
</script>
```

> ## **props**
>
> `NOTE`: Check component communication section for more details ion how to use props.

- Used to pass data from parent to child
  - App.vue -> ChildComponent.vue
- Note: Data flow is unidirectional ie. child cannot modify the data passed to it.
- prop option is defined in child component, to make it aware that it is going to receive following attributes from it's parent component.

```javascript
//simplest form
prop : [ name , phoneNumber, emailAddress ]

// with type validation
prop : {
  name : String,
  phoneNumber: String,
  emailAddress: String
}

// with type required, default and validator function
prop : {
  name : {
    type: String,
    required: true
  },
  phoneNumber: {
    type : String,
    required: true
  },
  emailAddress:{
    type: String,
    required: false,
    default: "dummy@localhost.com" //  this can also be function.
    validator: function(value){
      return value.match(/^.*?@[a-z]+\.[a-z]+$/);
    }
  }
}
```

### Supported prop values:

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

> ## **emits**
>
> `NOTE`: Check component communication section for more details ion how to use emits.

```javascript
<script>
    export default {

        emits:['toggle-visibility'], // optional to consolidate all emits at one place

        // Below is another way of defining the emits with validation.
        // Note: the function passed here a validation function for the event, this not the function which will run on this event.
        emits:{
            'toggle-visibility':function(id){
                if(id){
                    return true;
                }
                else{
                    console.warn("Id is missing");
                }
            }
        },
</script>

```

---

> # How it works?
>
> Consider below project for example.

```bash
vue-cli-01-a-new-vue-project
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.vue
    ├── component
    │   └── FriendContact.vue
    └── main.js
```

- ### There are four main files:

  1. public/index.html `( main index file )`
  1. App.vue `(main vue app file)`
  1. component/FriendContact.vue `( vue component file)`
  1. main.js `( main javascript file)`

> ### index.html
>
> - The index file just holds the div where vue app will be mounted.

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

> ### App.vue
>
> - Main vue app where we add multiple components

```javascript
// App.vue

<template>
  <section>
    <h2>My friends</h2>
    <ul>
      <friend-contact></friend-contact>
    </ul>
  </section>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>
```

> ### FriendContact.vue
>
> - Vue Component

```javascript
//FriendContact.vue

<template>
  <li>
    <h2>{{ friend.name }}</h2>
    <button @click="toggleDetails">Show</button>
    <ul v-if="detailsAreVisible">
      <li>Phone: {{ friend.phone }}</li>
      <li>email: {{ friend.email }}</li>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: "Anoop",
        name: "Anoop Sharma",
        phone: "9876543210",
        email: "anoop@localhost.com",
      },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
};
</script>

```

> ### main.js
>
> - Main javascript files which binds everything together.
> - We import createApp from vue module.
> - Then App.vue is imported.
> - Then components are imported.
> - The we create our Vue app using `createApp();`
>   - createApp takes our main vue App as argument.
> - Then we add out component to our app using `app.component("custom-html-tag",Component);`
>   - this custome html tag will used in our main vue app template to place our component there.
> - Finally we mount the app to our index.html.

```javascript
//main.js

import { createApp } from "vue";
import App from "./App.vue";
import FriendContact from "./component/FriendContact.vue";

const app = createApp(App);
app.component("friend-contact", FriendContact);
app.mount("#app");
```

---

# Explore vue in details

# **Vue directives**

> ## **Interpolation** => {{}} | interpolates data defined in vue app

- Only works between elements.
- Can not be used to set attribute values

```html
<p>{{ data_attribute }}</p>
```

---

> ## **v-bind** | add/sets values to attributes

`v-bind:attribute_name`
or
`:attribute_name`

Examples:

```html
<p>Try this <a :href="data-attribute">Link</a></p>
```

---

> ## **v-html** | put content of type html on tags

- used to return data in form of html
  - the data returned fom vue function is always in form of text
  - this is to prevent cross site scripting attacks

```html
<p v-html="someFunctionWhichReturnHTML()"></p>
<p v-html="someDataAttributeWithHTML"></p>
```

---

> ## **v-model** | Two way binding

`v-model="data attribute"`

- shortcut for v-bind:value="name" v-on:input="setValue"

```html
<input type="text" v-model="data-property" />
```

---

> ## **v-once** | to preserve initial value of an data attribute.

- for example to show initial value of a counter

```html
<p v-once>staring counter value {{ counter }}</p>
```

---

> ## **v-on** | add event listeners

`v-on:event_name`
or
`@event_name`

- v-on used to add event listeners
- v-on takes and event name after

```javascript
//example 1: putting javascript code
<button v-on:click="counter = counter + 1"></button>

//example 2: putting a function reference
<button v-on:click="funcction_name"></button>

//example 3: calling a function
<button v-on:click="funcction_name()"></button>

//example 4: alternative shorthand method
<button @click="counter = counter + 1"></button>
<button @click="funcction_name"></button>
<button @click.right="funcction_name()"></button>
```

`Note:`

- Putting function reference or calling function both have same meaning, vue manages it under the hood.

  If we just put reference to the function, the function will get browser event object as first parameter by default.

- But if we call function with () eg: somefunction() then is will not get default event object as first argument as we have overwritten it with ().
- In order to pass browser event object with other arguments we can use `$event ` as an argument to the function, eg: ` function($event, arg1,agr2)`
- `$event ` holds the event object from browser

> ### **Event Modifiers**

- used to prevent or modify the default behavior of browser elements.

  #### **Prevent** from submission:

  ```html
  <form v-on:submit.prevent="handle_submit_form"></form>
  ```

  #### **Add event listener on specific mouse button click**:

  ```html
  <button v-on:click.right="funcction_name"></button>
  ```

---

> ## **v-if , v-else, v-else-if**

- For conditionally rendering a html

```html
<p v-if="goals.lenght === 0">You have 0 goals</p>

<ul v-else-if="goals.lenght > 0">
  <li>Goal</li>
</ul>

<p v-else>...</p>
```

`Note:`

- The for v-else or v-else-if to work they should be in the element which are direct neighbors of v-if element

- v-if conditional statements remove/add the elements from DOM based on the condition

---

> ## **v-for**

- for loop in Vue

```html
<!-- - Used to render list -->

<ul v-if="goals.length > 0 ">
  <li v-for="goal in goals">{{ goal }}</li>
</ul>

<!-- We can also get the index of element in v-for -->

<ul v-if="goals.length > 0 ">
  <li v-for="(goal,index) in goals">{{ index }} - {{ goal }}</li>
</ul>
```

> ### Working with objects

```html
<!-- getting value -->
<ul>
  <li v-for="value in {name:'Anoop',age:32,address:'Pune'}">{{value}}</li>
</ul>

<!-- get key as well -->
<ul>
  <li v-for="(value,key) in {name:'Anoop',age:32,address:'Pune'}">
    {{key}}: {{value}}
  </li>
</ul>

<!-- get index as well as well -->
<ul>
  <li v-for="(value,key,index) in {name:'Anoop',age:32,address:'Pune'}">
    {{ index }} - {{ key }}: {{ value }}
  </li>
</ul>

<!-- looping through range of numbers -->
<ul>
  <li v-for="num in 10">{{ num }}</li>
</ul>
```

---

> # TODO:

# Component communication

### Props

### emits

### provide and Inject

### events

### Slots

### Dynamic components

### Keep alive

### Teleporting Elements

## How to Add html

## How to add style

### How to add dynamic classes

### Animation and transitions

## Handling forms

## Sending https requests

# Vue Router

# Vuex ( state management)

# Vue Authentication

# Functionality reuse Mixins

# Composition API
