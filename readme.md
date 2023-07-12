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

The package has two components:

### Collection

This component creates the entire checklist by itself, creating multiple instances of the Item component and wrapping them in a container that makes it easier to keep the layout responsive.

```
import { useState } from "react";
import { Collection } from "react-collection-checklist";

const data = [
    { "img": "/path-to-local-image.png", "name": "Alt Text to Local Image" },
    { "img": "https://domain.com/path-to-remote-image.png", "name": "Alt Text to Remote Image" }
];

export default function Home() {

  // When any of the images is clicked the state will be updated adding the index of the selected Item and its checked status (boolean) to the object.
  const [state, setState] = useState({});

  return (<Collection data={data} value={state} onClick={setState} />);
};

```

### Item

This component represents one item in the collection. While it was mainly made to be used inside Collection, it is possible to use it alone following this pattern:

```
import { useState } from "react";
import { Item } from "react-collection-checklist";

const data = { "img": "/path-to-local-image.png", "name": "Alt Text to Local Image" };

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

## Properties

### Collection

- data ([{ name: string, img: string }]): Array of the objects that will be passed as "data" to the Item component. The length of the array decides how many Item components will be instantiated.

- value ({}): Object that keeps the current state of all Items.

- onClick ( function ): Function that will be run with the updated value after each click to any of the Items.

- className ( string ): Optional property to override the main div's className.

- itemClassName ( string ): Optional property that will be passed to the className property of all Items.

- overlayClassName: Optional property that will be passed to the overlayClassName property of all Items.

- imgClassName: Optional property that will be passed to the imgClassName property of all Items.

- checkBoxClassName: Optional property that will be passed to the checkBoxClassName property of all Items.

### Item

- data ({ name: string, img: string }): Object where that has the alt text as "name" and the source of the image as "img".

- onClick ( boolean ): Function that will be ran with the new checked state when the image is clicked.

- className ( string ): Optional property to override the main div's className.

- overlayClassName ( string ): Optional property to override the colored overlay's div className.

- imgClassName ( string ): Optional property to override the image's className.

- checkBoxClassName ( string ): Optional property to override the checkbox's className.

- checked ( boolean ): Property that defines the current state of the checkbox.

## MIT License

Copyright (c) 2023 Erik Marques Schroeder

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
