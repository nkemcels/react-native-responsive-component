## react-native-responsive-component

![](intro.jpg)

This react native library provides a way of efficiently and dynamically rendering components based on a device's screen size and/or orientation irrespective of the platform. It achieves this by providing a new declarative syntax for applying different values of the same props to different devices based on their current orientation and/or screen size.

## Installation

**Yarn:** `yarn add react-native-responsive-component`

**Npm:** `npm install react-native-responsive-component --save`

## Demo
[Basic Usage - Example 1](https://snack.expo.io/@nkemcels/rnrc-basic-example-1)
 

## Usage

#### Example

```js
import { View } from "react-native";
import RComponent from "react-native-responsive-component";
```

```js
<RComponent
  render$={() => View}
  style$sm={{ flexDirection: "row", backgroundColor: "red" }}
  style$md-lnd={{ flexDirection: "column", justifyContent: "center" }}
  style$lg-ptr={{ flex: 1, backgroundColor: "blue" }}
/>
```

The `RComponent` above will render the `View` component with it's `style` prop set to `{flexDirection:"row", backgroundColor:"red"}` on small devices (**\$sm**), `{flexDirection:"column", justifyContent:"center"}` on medium devices (**\$md-lnd**) with the landscape orientation and `{flex:1, backgroundColor:"blue"}` on large devices with the portrait orientation (**\$lg-ptr**).

There are currently 3 break points for various screen sizes as shown by the table

<table>
  <tr>
    <th>Screen Size</th>
    <th>Break Point</th>
    <th>Label</th>
  </tr>
  <tr>
    <td> Small </td>
    <td> ⩽ 640px </td>
    <td>sm</td>
  </tr>
  <tr>
    <td> Medium </td>
    <td> > 640px and ⩽ 1007px </td>
    <td>md</td>
  </tr>
  <tr>
    <td> Large </td>
    <td> > 1007px </td>
    <td>lg</td>
  </tr>
<table>

#### Prop Commands

The prop command is what is used by `RComponent` to determine what prop to apply to the rendered component based on the device. A prop command always begins with a dollar ($) symbol after the prop name. 
Here are all the available prop commands that could be used.

<table>
  <tr>
    <th>Prop Command</th>
    <th>Scope</th>
  </tr>
  <tr>
    <td> $sm </td>
    <td>small devices in both portrait and landscape modes </td>
  </tr>
  <tr>
    <td> $sm-ptr </td>
    <td>small devices in portrait modes only</td>
  </tr>
  <tr>
    <td> $sm-lnd </td>
    <td>small devices in landscape modes only</td>
  </tr>
  <tr>
    <td> $md </td>
    <td>medium devices in both portrait and landscape modes </td>
  </tr>
  <tr>
    <td> $md-ptr </td>
    <td>medium devices in portrait modes only</td>
  </tr>
  <tr>
    <td> $md-lnd </td>
    <td>medium devices in landscape modes only</td>
  </tr>
  <tr>
    <td> $lg </td>
    <td>large devices in both portrait and landscape modes </td>
  </tr>
  <tr>
    <td> $lg-ptr </td>
    <td>large devices in portrait modes only</td>
  </tr>
  <tr>
    <td> $lg-lnd </td>
    <td>large devices in landscape modes only</td>
  </tr>
  <tr>
    <td> $ptr </td>
    <td>any device in portrait mode </td>
  </tr>
  <tr>
    <td> $lnd </td>
    <td>any device in landscape mode</td>
  </tr>
<table>

Multiple prop commands could be chained to extend it's scope. For example **$sm$md-lnd** will match for small devices in both portrait and landscape mode and medium devices in landscape mode only. e.g

```js
<RComponent
  render$={() => Text}
  style$md-ptr$sm-lnd={{ fontSize: 20 }}
  style$lg-lnd$md$sm={{ fontSize: 25 }}
  style={{ fontSize: 35 }}
/>
```

The above example will apply the `style` prop with `{fontSize:20}` for medium devices in portrait mode (**\$md-ptr**) and small devices in landscape mode (**\$sm-lnd**).
It will equally apply the `style` prop with `{fontSize:25}` for large devices in landscape mode(**\$lg-lnd**), medium devices in both portrait and landscape modes (**\$md**) and small devices in both portrait and landscape modes (**\$sm**).
For any other case, the `style` prop with `{fontSize:35}` will be applied.

Please note that if two prop commands conflict for the same prop, the prop command that is most specific to the device is applied. for example;

```js
<RComponent
  render$={() => View}
  style$md={{ flex: 1 }}
  style$md-ptr={{ flex: 2 }}
/>
```

In the case above, there's a conflict between the two `style` prop when on a medium device in portrait mode because the `$md` and `$md-ptr` prop commands both matches for this mode. In such a scenario, only the `style` prop with `{flex:2}` will be applied because it's prop command (**$md-ptr**) is more specific to the device and its current mode.
One last thing to note is that if a prop command is not specified, it always matches (although with the least precedence in case of conflict).


### Other Properties
<table>
  <tr>
    <th>Prop</th>
    <th>Description</th>
  </tr>
  <tr>
    <td> visible$&lt;prop-command&gt; </td>
    <td> Displays the component only if the prop command matches for the device and mode</td>
  </tr>
  <tr>
    <td> hidden$&lt;prop-command&gt; </td>
    <td> Hides the component only if the prop command matches for the device and mode </td>
  </tr>
  <tr>
    <td> render$&lt;prop-command&gt; </td>
    <td> A callback which returns a component to be rendered when the prop command matches </td>
  </tr>
<table>

#### More Use cases
Owing to the frequent use of the `View`, `Text` and `Image` components, react-native-responsive-components also provides precompiled `RView`, `RText` and `RImage` components so that the `render$` method could be ommited while using them. for example:

```js
import {RView, RText} from "react-native-responsive-component";
```
```js
<RView
   style$ptr = {{flexDirection:"row"}}
   style$lnd = {{flexDirection:"column"}}>
   (...)
</RView>   
```
There are equally helper/utility functions provided by the `RUtil` object of the library.
```js
import {RUtils} from "react-native-responsive-component";
```
```js
(...)
if(RUtils.isLandscapeMode()){
  //do something when in landscape mode
}
else if (RUtils.isSmallScreen()){
  //do something for small devices.
}  
```
The table below shows a list of available functions.
<table>
  <tr>
    <th>Function</th>
    <th>Description</th>
  </tr>
  <tr>
    <td> isLandscapeMode </td>
    <td> A function that returns true if devices is in landscape mode and false otherwise.</td>
  </tr>
  <tr>
    <td> isPortraitMode </td>
    <td> A function that returns true if device is in portrait mode and false otherwise. </td>
  </tr>
  <tr>
    <td> isSmallScreen </td>
    <td> returns true if is a small device (i.e ⩽ 640px) and false otherwise</td>
  </tr>
  <tr>
    <td> isMediumScreen </td>
    <td> returns true if is a medium device (i.e > 640px and ⩽ 1007px) and false otherwise</td>
  </tr>
  <tr>
    <td> isLargeScreen </td>
    <td> returns true if is a large device (i.e > 1007px ) and false otherwise</td>
  </tr>
  <tr>
    <td> getDeviceLabel </td>
    <td> returns the device label i.e. <b>"sm"</b> for small devices, <b>"md"</b> for medium devices and <b>"lg"</b> for large devices</td>
  </tr>
  <tr>
    <td> getDeviceSpecificLabel </td>
    <td> returns the device label coupled with the current mode of the device i.e. <b>"sm-ptr"</b> for small devices in portrait mode, <b>"sm-lnd"</b> for small devices in landscape mode, <b>"md-ptr"</b> for medium devices in portrait mode, <b>"md-lnd"</b> for medium devices in landscape mode, <b>"lg-ptr"</b> for large devices in portrait mode and <b>"lg-lnd"</b> for large devices in landscape mode,</td>
  </tr>
  <tr>
    <td> getDeviceMode </td>
    <td> returns the device's current mode, i.e <b>"lnd"</b> if device is in landscape mode or <b>"ptr"</b> if device is in portrait mode</td>
  </tr>
  <tr>
    <td> registerOrientationChangedListener </td>
    <td> this function accepts a callback as an argument which is invoked every time the orientation of the device is changed. The callback takes as arguments a javascript object of the form <b>{"width":Number, "height":Number, "orientation":"LANDSCAPE"|"PORTRAIT"}</b></td>
  </tr>
  <tr>
    <td> removeAllListeners </td>
    <td> Removes all orientation change listeners that have been registered. </td>
  </tr>
  <tr>
    <td> removeListener </td>
    <td> Removes a particular orientation change listener. It takes as argument the listener that is to be removed. </td>
  </tr>
<table>

### Contributing
If you love this library, consider contributing to make it better. Thanks
