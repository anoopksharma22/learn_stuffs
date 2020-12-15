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

> ## **Interpolation** => {{}}

- Only works between elements.
- Can not be used to set attribute values

```html
<p>{{ data_attribute }}</p>
```

---

> ## **v-bind**

- v-bind is used to set value of an attribute.

```html
<p>Learn Vue <a v-bind:href="vueLink">this link</a></p>
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

> ## **v-html**

- used to return data in form of html
  - the data returned fom vue function is always in form of text
  - this is to prevent cross site scripting attacks

```html
<p v-html="someFunctionWhichReturnHTML()"></p>
<p v-html="someDataAttributeWithHTML"></p>
```
