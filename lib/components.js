import React from "react";
import { parseProps } from "./parser";
import {Text, Image, View} from "react-native";
import {
  registerOrientationChangedListener,
  removeListener
} from "./deviceUtils";

export default class RComponent extends React.Component {
  orientationChangeHandler = () => {
    this.forceUpdate();
  };
  componentDidMount() {
    registerOrientationChangedListener(this.orientationChangeHandler);
  }
  componentWillUnmount() {
    removeListener(this.orientationChangeHandler);
  }
  render() {
    const props = parseProps(this.props);
    const { render$, hidden$, ...restProps } = props;
    const Component = typeof render$ == "function" ? render$() : null;

    if (Component && props && !hidden$) {
      return <Component {...restProps}>{this.props.children}</Component>;
    } else {
      return null;
    }
  }
}

export const RView = function(props){
  return (
    <RComponent render$ = {()=>View} {...props}>
      {props.children}
    </RComponent>
  )
}

export const RImage = function(props){
  return (
    <RComponent render$ = {()=>Image} {...props} />
  )
}

export const RText = function(props){
  return (
    <RComponent render$ = {()=>Text} {...props}>
      {props.children}
    </RComponent>
  )
}