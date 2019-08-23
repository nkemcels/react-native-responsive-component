## react-native-responsive-component
This react native library provides a way of efficiently and dynamically rendering components based on a device's screen size and/or orientation irrespective of the platform. It achieves this by providing a declarative syntax for applying different values of the same props to different devices based on their current orientation and/or screen size.

## Installation
**Yarn:** `yarn add react-native-responsive-component` 

**Npm:** `npm install react-native-responsive-component --save` 


## Usage

#### Example
```js
import { View } from "react-native";
import RComponent from "react-native-responsive-component";
```
```js
<RComponent
	render$ = { () => View }
    style$sm = {{flexDirection:"row", backgroundColor:"red"}}
    style$md-lnd = {{flexDirection:"column", justifyContent:"center"}}
    style$lg-ptr = {{flex:1, backgroundColor:"blue"}}
/>
```
The `RComponent` above will render the `View` component with it's `style` prop set to `{flexDirection:"row", backgroundColor:"red"}` on small devices (**$sm**),  `{flexDirection:"column", justifyContent:"center"}` on medium devices (**$md-lnd**) with the landscape orientation and `{flex:1, backgroundColor:"blue"}` on large devices with the portrait orientation (**$lg-ptr**).

There are currently 3 break points for various screen sizes as shown on the table
<table>
  <tr>
    <th>Screen Size</th>
    <th>Break Point</th>
    <th>Label</th>
  </tr>
  <tr>
    <td> Small </td>
    <td> <= 640px </td>
    <td>sm</td>
  </tr>
  <tr>
    <td> Medium </td>
    <td> > 640px and <= 1007px </td>
    <td>md</td>
  </tr>
  <tr>
    <td> Large </td>
    <td> > 1007px </td>
    <td>lg</td>
  </tr>
<table>

#### Prop Commands
The prop command is what is used by `RComponent` to determine what prop to apply to the rendered component based on the device.
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
  render$ = {()=>Text}
  style$md-ptr$sm-lnd = {{fontSize:20}}
  style$lg-lnd$md$sm = {{fontSize:25}}
  style={{fontSize:35}}
 />
```
The above example will apply the `style` prop with `{fontSize:20}` for medium devices in portrait mode (**$md-ptr**) and small devices in landscape mode (**$sm-lnd**).
It will equally apply the `style` prop with `{fontSize:25}` for large devices in landscape mode(**$lg-lnd**), medium devices in both portrait and landscape modes (**$md**) and small devices in both portrait and landscape modes (**$sm**).
For any other case, the `style` prop with `{fontSize:35}` will be applied.

Please note that if two prop values conflict for the same prop, the prop value who's prop command is most specific to the device is applied. e.g
```js
<RComponent
   render$ = { () => View }
   style$md = {{flex:1}}
   style$md-ptr = {{flex:2}}
/>
```
In the case above, if the device is a medium device and is portrait, only the `style` prop with `{flex:2}` will be applied because it's prop command is more specific to the device. 

