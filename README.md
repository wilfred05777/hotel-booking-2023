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

##### Calendar<DateRange> & Option {adult, children, room}

- code analysis / it will show Option & Calendar section if Toggle click back and forth and updates the UI

```jsx
//  Header.jsx
// --------------------------------------------------

// option for adult , children and rooms state

// ---- openOptions - onClick A ref
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
// ---- onClick A ref
<span
  // !openOptions opposite | hide and show options: adult, children, room selection
  onClick={() => setOpenOptions(!openOptions)}
  className="headerSearchText"
>
  {/* how did this happen? name? and the ui connection confuse? */}
  {`${options.adult} adult - ${options.children} children - ${options.room} room`}
</span>;

// ---- my side note: ----------------------
{
  /* how did this happen? name? and the ui connection confuse? */
  // My Understanding:
  // diri ipagawas sa cosnt [options, setOptions]
  // ang initial value updated value
}
{
  `${options.adult} adult - ${options.children} children - ${options.room} room `;
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

<hr>

##### CREATING 1ST LISTING w/ IMAGES

- start time 0:43:06 - 0:47:40 end
- create /component/featured/Featured.jsx
- create /component/featured/featured.scss
- add <Featured> to Home.jsx

```jsx
/// Home.jsx
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./home.scss";
import React from "react";
import Featured from "../../components/featured/Featured";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
      </div>
    </div>
  );
};

export default Home;
```

```scss
// home.scss
.homeContainer {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
```

```jsx
/// Featured.jsx
import React from "react";
import "./featured.scss";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="hotel"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Austin</h1>
          <h2>123 Properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="hotel"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Bombai</h1>
          <h2>123 Properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
          alt="hotel"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Corota</h1>
          <h2>123 Properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
```

```scss
// featured.scss
.featured {
  width: 100%;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  z-index: 1; /// para dili mo overlap ang featured

  .featuredItem {
    position: relative;
    color: #fff;
    border-radius: 10px; /// border-radius will not work without overflow hidden
    overflow: hidden;
    height: 215px; // 250px
    padding-bottom: 10px;
    margin-bottom: 10px;

    .featuredTitles {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }

    .featuredImg {
      width: 100%;
      object-fit: cover;
    }
  }
}
```

```scss
// header.scss
// z-index ang pinaka gamay ug value 1 is behind and the largest value will be the front
.header {
  background-color: #003580;
  color: #fff;
  display: flex;
  justify-content: center;
  position: relative;

  .headerContainer {
    width: 100%;
    max-width: 1024px;
    margin: 20px 0px 100px 0px;

    .headerList {
      display: flex;
      gap: 40px;
      margin-bottom: 50px;
    }
    .headerListItem {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;

      &.active {
        border: 1px solid #fff;
        padding: 10px;
        border-radius: 25px;
      }
    }

    .headerTitle {
    }

    .headerDesc {
      margin: 20px 0px;
    }
    .headerBtn {
      background-color: #0071c2;
      color: #fff;
      font-weight: 500;
      border: none;
      padding: 10px;
      cursor: pointer;
    }

    .headerSearch {
      height: 50px;
      background-color: #fff;
      border: 3px solid #febb02;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 20px 0px;
      border-radius: 5px;
      position: absolute;
      bottom: -25px;
      width: 100%;
      max-width: 1024px;
      z-index: 999; /// para dili mo overlap ang featured

      .headerSearchItem {
        display: flex;
        align-items: center;
        gap: 10px;

        .headerSearchInput {
          border: none;
          outline: none;
        }

        .date {
          position: absolute;
          top: 40px;
          z-index: 2; /// para dili mo overlap ang featured
        }

        .headerSearchText {
          color: lightgray;
          cursor: pointer;
        }

        .headerIcon {
          color: lightgray;
        }
      }

      .options {
        z-index: 2; /// para dili mo overlap ang featured
        position: absolute;
        top: 40px;
        background-color: #fff;
        color: gray;
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
        box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
        .optionItem {
          width: 200px;
          display: flex;
          justify-content: space-between;
          margin: 10px;
          .optionText {
          }
          .optionCounter {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 12px;
            color: #000;

            .optionCounterButton {
              width: 30px;
              height: 30px;
              border: 1px solid #0071c2;
              color: #0071c2;
              cursor: pointer;
              background-color: #fff;

              &:disabled {
                cursor: not-allowed;
              }
            }
            .optionCounterNumber {
            }
          }
        }
      }
    }
  }

  .headerContainer.listMode {
    margin: 20px 0px 0px 0px;
  }
}
```

<hr >

```scss
// 0:52:00
// PropertyList.jsx
// <div className="pListItem">

// propertyList.scss
.pListItem{
    flex:1; /// para ang kada image the same size mao ni purpose sa flex: 1 mag base sya kada element
    /// If an element has flex: 1, this means the size of all of the other elements will have the same width as their content, but the element with flex: 1 will have the remaining full space given to it.
```
