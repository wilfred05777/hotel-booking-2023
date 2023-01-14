# Booking Hotel MERN

#### Track Your Job Search

Project in Action - [Booking Hotel MERN](https://www.jobify.live/)

#### Support

Find the App Useful? [You can always buy me a coffee](https://www.buymeacoffee.com/johnsmilga)

#### Run The App Locally

```jsx
npm run install-dependencies
```

- rename .env.temp to .env
- setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME

```jsx
npm start
```

- visit url http://localhost:3000/

#### Setup React App

- create <b>client</b> folder
- open terminal

```jsx
cd client
```

```jsx
npx create-react-app .
```

```jsx
npm start
```

- set editor/browser side by side
- copy/paste assets from complete project

#### Spring Cleaning

- in src remove
- App.css
- App.test.js
- logo.svg
- reportWebVitals.js
- setupTests.js
- fix App.js and index.js

#### Title and Favicon

- change title in public/index.html
- replace favicon.ico in public
- resource [Generate Favicons](https://favicon.io/)

#### Normalize.css and Global Styles

- CSS in JS (styled-components)
- saves times on the setup
- less lines of css
- speeds up the development
- normalize.css
- small CSS file that provides cross-browser consistency in the default styling of HTML elements.
- [normalize docs](https://necolas.github.io/normalize.css/)

```jsx
npm install normalize.css
```

- import 'normalize.css' in index.js
- SET BEFORE 'index.css'
- replace contents of index.css
- if any questions about normalize or specific styles
- Coding Addict - [Default Starter Video](https://youtu.be/UDdyGNlQK5w)
- Repo - [Default Starter Repo](https://github.com/john-smilga/default-starter)

<hr>

#### Header & Navbar Creation

<hr>

##### Set range-date in Navbar, Searchbar and Styling

- npm i react-date-range [npm package](https://www.npmjs.com/package/react-date-range)
- [react date range official doc](https://hypeserver.github.io/react-date-range/)

```jsx
//Header.jsx
  import { DateRange } from "react-date-range";
  import "react-date-range/dist/styles.css"; // main css file
  import "react-date-range/dist/theme/default.css"; // theme css file
  import { format } from "date-fns";
  ...

  /// hides the range-date upon first load of the front page
  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(), //
      endDate: new Date(), // format because its a pure javascript
      key: "selection"
    }
  ]);

  ...
  {/* <span className="headerSearchText">date to date</span> */}
    <span
      /// !openDate opposite | hide and show calendar
      onClick={() => setOpenDate(!openDate)}
      className="headerSearchText"
    >
    {`
    ${
      //  diri mo reflect ang output sa gi select  sa <DateRange>
      // gi convert sa format() from plain javascript to react deadable
      // data[0] zero means first index
      format(date[0].startDate, "MM/dd/yyyy")} to ${format(
      date[0].endDate,
      "MM/dd/yyyy"
    )}
    `}</span>

    // ...
    { /// state ni sa calendar sa searchbar kung  iclick mo gawas ang <DateRange> which is ang calendar selection
    openDate && (
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={date}
        className="date"
      />
    );
}
    // ...more line of code ...
```

```scss
  // In Header.jsx
  // note:
  // <div className="header"> sulod sa header selector ang mga child selector
  // <div
  //
  // ang mga child select are : headerSearchItem, headerSearchInput, .date, headerSearchText
  //
  // Dili mo gana ang position absolute kung walay naka assign na position relative sa parent element

  // Reminder to myself sa styling sa scss/css
  // Child Selector = position: absolute
  // Parent Selector = position: relative

  //header.scss
  //  parent element
    .header{
      background-color: #003580;
      color: #fff;
      display: flex;
      justify-content: center;
      position: relative; //// parent element is here

    .headerSearchItem{
        display: flex;
        align-items: center;
        gap: 10px;

        .headerSearchInput{
          border: none;
          outline: none; /// removes the border outline sa input box
        }

        .date{
          position: absolute;
          top: 40px; /// mo baba sa search bar tungod sa position absolute ug relative:parent element
        }

        .headerSearchText{
          color: lightgray;
          cursor: pointer;
        }

```

<hr>
- code analysis

```jsx
//  Header.jsx
// --------------------------------------------------

// option for adult , children and rooms state
const [openOptions, setOpenOptions] = useState(false);

// ang mo consume sa option is a pointer and setOption is the updater sa output
const [options, setOptions] = useState({
  // initial value sa options
  adult: 1,
  children: 0,
  room: 1
});

// --------------------------------------------------

const handleOption = (name, operation) => {
  setOptions((prev) => {
    return {
      ...prev,
      //// how did this happen? name? and the ui connection confuse?
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1
    };
  });
};
// ----------------------------------------------------
{
  /* how did this happen? name? and the ui connection confuse? */
  // My Understanding:
  // diri ipagawas sa cosnt [options, setOptions]
  // ang initial value updated value
}
{
  `
  ${options.adult} adult - ${options.children} children - ${options.room} room
  `;
}

// -----------------------------------------------------

//  ma trigger nga ma disable kung mo baba equal or less than zero ang count pag iclick sa user ang minus/d = for decrement
<div className="optionItem">
  <span className="optionText">Adult</span>
  <div className="optionCounter">
    <button
      /// prevents going to negative number
      disabled={options.adult <= 0}
      className="optionCounterButton"
      onClick={() => handleOption("adult", "d")}
    >
      -
    </button>
    <span className="optionCounterNumber">{options.adult}</span>
    <button
      className="optionCounterButton"
      onClick={() => handleOption("adult", "i")}
    >
      +
    </button>
  </div>
</div>;
```

<hr>

##### Setting url / it will show header section if navigate to /hotel it will hide

<hr>

```jsx
// Hotel.jsx
<Navbar />
<Header type="list" />
```

```jsx
// Header.jsx
const Header = ({ type }) => {
...
<div className="header">
    <div
      /// mo trigger kung naa ko sa url / or /hotel
      className={
        type === "list" ? "headerContainer listMode" : "headerContainer"
      }
    >
  ....

  {/* pag ang type dili equal sa list ihide nya,
          if kung mo navigate ang user sa default ur which is '/' makita ang Header section and if pag mo navigate sa /hotel ihide ang Header section ug SearchBar
  */}
  {type !== "list" && (
      <>
      // ...code
      </>
  }
```

```jsx

```
