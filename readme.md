# React Collection Checklist

## Description

This package is just a simple image-based checklist for React, primarily created with the focus on card games and similar.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Properties](#properties)
- [License](#mit-license)

## Installation

```
npm install --save react-collection-checklist
```

## Usage

The package has three server components and one client component:

### Server Components

#### Paginated Collection

This component wraps around the Collection component adding pagination. Despite that, everything else works exactly as the Collection component.

```
import { useState } from "react";
import { PaginatedCollection } from "react-collection-checklist";

const data = [
    { "img": "/path-to-local-image.png", "name": "uniqueNameToImage" },
    { "img": "https://domain.com/path-to-remote-image.png", "name": "uniqueNameToImage2" }
];

export default function Home() {

  // When any of the images is clicked the state will be updated adding the index of the selected Item and its checked status (boolean) to the object.
  const [state, setState] = useState({});

  // This holds the state of the pagination, the component expects the starting index to be 1, not 0.
  const [paginationIndex, setPaginationIndex] = useState(1);

  return (
    <PaginatedCollection
      data={data}
      value={state}
      onClick={setState}
      paginationIndex={paginationIndex}
      onPaginationClick={setPaginationIndex}
    />
  );
};

```

#### Collection

This component creates the entire checklist by itself, creating multiple instances of the Item component and wrapping them in a container that makes it easier to keep the layout responsive.

```
import { useState } from "react";
import { Collection } from "react-collection-checklist";

const data = [
    { "img": "/path-to-local-image.png", "name": "uniqueNameToImage" },
    { "img": "https://domain.com/path-to-remote-image.png", "name": "uniqueNameToImage2" }
];

export default function Home() {

  // When any of the images is clicked the state will be updated adding the index of the selected Item and its checked status (boolean) to the object.
  const [state, setState] = useState({});

  return (<Collection data={data} value={state} onClick={setState} />);
};

```

#### Item

This component represents one item in the collection. While it was mainly made to be used inside Collection, it is possible to use it alone following this pattern:

```
import { useState } from "react";
import { Item } from "react-collection-checklist";

const data = { "img": "/path-to-local-image.png", "name": "uniqueNameToImage" };

export default function Home() {

  // When the resulting image is clicked it will change this state to the opposite of its current value.
  const [checked, setChecked] = useState(false);

  return (
    <Item
      data={data}
      checked={checked}
      onClick={setChecked}
    />
  );
};
```

### Client Components

#### Item

This component is a wrapper around the original Item server component, adding to it state and possibly data persistence without need of external code:

```
import { useState } from "react";
import { Item } from "react-collection-checklist/client";

const data = { "img": "/path-to-local-image.png", "name": "uniqueNameToImage" };

export default function Home() {
  return (
    <Item
      data={data}
      persistMode="localStorage"
    />
  );
};
```

## Properties

### Server Components

#### Paginated Collection

Besides the properties listed bellow, this component also receives all properties that Collection receives, the only difference being that the className property will refer to this component and not the Collection inside. For more information on those components refer to the Collection section bellow.

- paginationIndex ( number ): Index of the current paginated selection. The index starts at 1, not 0.

- onPaginationClick ( function ): Function that will run when a pagination button is clicked. Generally expected to be the setter function of the index.

- pageLimit ( number ): Option parameter to ets the size of the paginated selections. The standard is 20.

- collectionClassName ( string ): Optional property passed through as the className for the inner Collection component.

- buttonsContainerClassName ( string ): Optional property to add a className to the pagination buttons' container.

- paginationButtonsClassNames ({ buttonClassName, buttonNotFirstClassName, buttonSelectedClassName }): Optional property to add classNames to the buttons.
  - buttonClassName ( string ): A generic className added to all buttons.
  - buttonNotFirstClassName ( string ): A className that will be added to all besides the first one.
  - buttonSelectedClassName ( string ): A className that is added to the currently selected one.

#### Collection

- data ([{ name: string, img: string }]): Array of the objects that will be passed as "data" to the Item component. The length of the array decides how many Item components will be instantiated.

- value ({}): Object that keeps the current state of all Items.

- onClick ( function ): Function that will be run with the updated value after each click to any of the Items.

- className ( string ): Optional property to override the main div's className.

- itemClassNames ( { className, overlayClassName, imgClassName, checkBoxClassName } ): Optional property that carries all classNames to be passed through to properties with same name to all Items. Refer to the properties of same names in the Items section for more information on each.

#### Item

- data ({ name: string, img: string }): Object where that has the alt text as "name" and the source of the image as "img".

- onClick ( boolean ): Function that will be ran with the new checked state when the image is clicked.

- className ( string ): Optional property to override the main div's className.

- overlayClassName ( string ): Optional property to override the colored overlay's div className.

- imgClassName ( string ): Optional property to override the image's className.

- checkBoxClassName ( string ): Optional property to override the checkbox's className.

- checked ( boolean ): Property that defines the current state of the checkbox.

### Client Components

#### Item

- data ({ name: string, img: string }): Object where that has the alt text as "name" and the source of the image as "img".

- name ( string ): Optional parameter that is required if persistMode is set to "localStorage", this will define the name that is used to save the current state in the localStorage.

- onClick ( boolean ): Optional property of function that will be ran with the new checked state when the image is clicked.

- className ( string ): Optional property to override the main div's className.

- overlayClassName ( string ): Optional property to override the colored overlay's div className.

- imgClassName ( string ): Optional property to override the image's className.

- checkBoxClassName ( string ): Optional property to override the checkbox's className.

- startingValue ( boolean ): Optional property that defines the starting state of the checkbox. This will be ignored if persistMode is set to localStorage and there is information already saved.

- persistMode ( "none" | "localStorage" ): Optional property that defines if the data will persist through localStorage or not. Default: "none"

## MIT License

Copyright (c) 2023 HerrTuring

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
