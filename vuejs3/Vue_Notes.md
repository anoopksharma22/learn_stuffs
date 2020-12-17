# What is Vue.js?

> A javascript framework that makes building interactive and reactive web frontend.
>
> Reactive means, the UI changes with user inputs. Just like apps.
>
> It is a modern way of building web pages / UIs.
>
> - Traditionally we click a link and wait for the page to reload. But in modern approach we use java script which is already present in browser and can be used to fetch data and manipulate the DOM.
> - In modern approach the HTML/CSS/JS are fetched only once (first request) and later javascript is used to update the UI based on data fetched by API calls.

---

# Basic concepts

## How to create a basic vue app

> ## **data** option in vue app

- `Vue.createApp({})` returns the app.
  - It accepts an obtect.
  - The object has attribute `data`.
  - data has a function as it's value.
  - The function return and object which contains attributes which are used in html controlled by vue.

```javascript
const app = Vue.createApp({
  data() {
    return {
      mygoal: "I want to build my app",
      vueLink: "https://v3.vuejs.org",
    };
  },
});

app.mount("#user-goal");
```

---

> ## **Interpolation** => {{}} | interpolates data defined in vue app

- Only works between elements.
- Can not be used to set attribute values

```html
<p>{{ data_attribute }}</p>
```

---

> ## **v-bind** | add/sets values to attributes
>
> `v-bind:attribute_name`
> or
> `:attribute_name`
>
> Examples:
>
> `v-bind:href="vueLink"`
>
> `:href="vueLink"`

- v-bind is used to set value of an attribute.
- v-bind takes ab attribute after :

```html
<p>Learn Vue <a v-bind:href="vueLink">this link</a></p>

<!-- or -->

<p>Learn Vue <a :href="vueLink">this link</a></p>
```

---

> ## **method** option in vue app

- `methods` has an object full functions which would be called on various events in html
  - Note: **data** was itself a method but **methods** contains many list of methods.
- **data** attributes can be accessed in methods using **this.attribute_name**

> Javascript

```javascript
const app = Vue.createApp({
  data() {
    return {
      mygoal: "I want to build my app",
      vueLink: "https://v3.vuejs.org",
    };
  },
  methods: {
    outputRandomNumber() {
      return this.mygoal; // to access data attribute.
    }, // same as outputGoal : function(){}
  },
});

app.mount("#user-goal");
```

> HTML

```html
<p>{{ outputRandomNumber() }}</p>
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

> ## **v-on** | add event listeners
>
> `v-on:event_name`
> or
> `@event_name`
>
> Examples:
>
> `v-on:click`
>
> `@click`

- v-on used to add event listeners
- v-on takes and event name after :

```javascript
//example 1: putting javascript code
<button v-on:click="counter = counter + 1"></button>

//example 2: putting a function reference
<button v-on:click="funcction_name"></button>

//example 3: calling a function
<button v-on:click="funcction_name()"></button>

//example 4: alternative method
<button @click="counter = counter + 1"></button>
<button @click="funcction_name"></button>
<button @click.right="funcction_name()"></button>

```

- `Note: Putting function reference or calling function both have same meaning, vue manages it under the hood.`
  \_ `If we just put reference to the function, the function will get browser event object as first parameter by default.`
- `But if we call function with () eg: somefunction() then is will not get default event object as first argument as we have overwritten it with ().`
- `In order to pass browser event object with other arguments we can use `$event ` as an argument to the function, eg: ` function($event, arg1,agr2)` `
- ` `$event ` holds the event object from browser`

---

> ## **Event Modifiers**
>
> - used to prevent or modify the default behavior of browser elements.
>   > ### **Prevent** from submission:
>   >
>   > ```html
>   > <form v-on:submit.prevent="handle_submit_form"></form>
>   > ```
>   >
>   > ### **Add event listener on specific mouse button click**:
>   >
>   > ```html
>   > <button v-on:click.right="funcction_name"></button>
>   > ```

---

> ## **v-once** | to preserve initial value of an data attribute.

- for example to show initial value of a counter

```html
<p v-once>staring counter value {{ counter }}</p>
```

---

> ## **v-model** | Two way binding
>
> `v-model="data attribute"`

- shortcut for v-bind:value="name" v-on:input="setValue"

```html
<!-- HTML -->

<input type="text" v-model="name" />

<p>Your name {{ name }}</p>

<button v-on:click="resetName">Reset</button>
```

```javascript
// Javascript

Vue.createApp({
  data() {
    return {
      name: "",
    };
  },
  methods: {
    resetName() {
      this.name = "";
    },
  },
});
```

- In above example the name data attribute is bound both ways.
  - When we enter something in input the data attribute gets that value we typed.
  - When we press resetButton it sets the name data attribute to null which inturn make the input null.

---

> ## **computed** option in vue app

- computed like methods takes an object with methods inside it.
- But the methods inside computed are executed differently.
- The functions are used as data attributes.
  - Hence they are never call ( with parenthesis ), used as variable/data attribute.
- This functions are run only when one of the dependencies get changed.
  - If the is any simple function from methods in html without any binding with event it will run every time when something changes in html. Hence in order to prevent this issue there is this concept of computed configuration option in Vue.

```html
<!-- HTML -->

<input type="text" v-model="name" />

<p>Your name {{ fullname }}</p>

<button v-on:click="resetName">Reset</button>
```

```javascript
// Javascript

Vue.createApp({
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
  methods: {
    resetName() {
      this.name = "";
    },
  },
});
```

---

> ## **watch** option in vue app

- Similar to computed but the difference it is tied to a data attribute.
  - it function name is same as data attribute name.
  - the function fires whenever the data attribute changes.
  - it does't returns anything, because it is not called inside the html.( works like middleware).
  - It gets two arguments by default ( newValue, oldValue) of the data attribute.

```html
<!-- HTML -->

<input type="text" v-model="name" />

<p>Your name {{ fullname }}</p>

<button v-on:click="resetName">Reset</button>
```

```javascript
// Javascript

Vue.createApp({
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
  computed:{
    // fullname(){
    //   if( this.name === '')
    //   {
    //     return '';
    //   }
    //   return this.name + ' ' + 'Sharma';
  }
  methods: {
    resetName() {
      this.name = "";
    },
  },
});
```

---

> # Conditional statements

> ## **v-if , v-else, v-else-if**

- For conditionally rendering a html

```html
<p v-if="goals.lenght === 0">You have 0 goals</p>

<ul v-else-if="goals.lenght > 0">
  <li>Goal</li>
</ul>

<p v-else>...</p>
```

`Note: The for v-else or v-else-if to work they should be in the element which are direct neighbors of v-if elemnt`

`* v-if conditional statements remove/add the elements from DOM based on the condition`

> ## **v-show**

- For conditionally showing a html element.
- This shows or hides the element using css display property, so elements are not removed from the DOM they are just hidden. ( style:"display:none"). It just adds style css property.

```html
<p v-show="goals.length === 0 ">You have zero goals</p>
```

`Note: When to use v-if and when to use v-show?`

` * Adding and removing elements is expensive task, so id there is an element whose visibility is toggled a lot we should use v-show.`

`* If elements are should be present only when a condition is true and later not required we should use v-if. Because it is not ideal to have a lot of useless DOM elements`

> ## **v-for** | for loop in Vue

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
<ul v-if="goals.length > 0 ">
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

> ### How to remove an item from list

- We can make use of event listener and pass the index to a function which will remove the item, and due to reactivity of Vue the li item will be removed from html

```html
<div id="app">
  <ul v-if="goals.length > 0 ">
    <li v-for="(goal,index) in goals" @click="removeItem(index)">
      {{ index }} - {{ goal }}
    </li>
  </ul>
</div>
```

```javascript
Vue.createApp({
  data() {
    return {
      goals: ["Get Better in Vue", "Make website"],
    };
  },
  methods: {
    removeItem(index) {
      this.goals.splice(index, 1);
    },
  },
}).mount("#app");
```

> `Note: It is a good practice to always use :key="some unique value eg: id from db in v-for"`
>
> ```html
> <div id="app">
>  <ul v-if="goals.length > 0 ">
>    <li v-for="(goal,index) in goals" @click="removeItem(index) :key="goal">
>      {{ index }} - {{ goal }}
>    </li>
>  </ul>
> </div>
> ```
>
> `You would ask why?`
>
> `* Answer is little complicated and but the simple explanation is Vue tries to reuse the components for performance but this can be issue sometime.`

---

> # Refs

- Another way of passing values from HTML to Vue app.
- We can use special Vue keyword `ref ` in html elements.
- And we can access the ref using `$refs.keyWord ` in Vue app.
- `$refs ` give the entire HTML object, so we can use any property of the HTML object. Just like event object.

```html
<input type="text" ref="inputText" />
```

```javascript
methods:{
  setText(){
   this.text = this.$refs.inputText.value;
  }
}
```

# TODO:

Hooks:

- beforeCreate(){}
- created(){}
- beforeMount(){}
- mounted(){}
- beforeUpdate(){}
- updated(){}
- beforeUnmount(){}
- unmounted(){}
