import { Dimensions } from "react-native";
import {
  SMALL_SCREEN_UPPER_BOUND,
  MEDIUM_SCREEN_UPPER_BOUND,
  SMALL_SCREEN_LABEL,
  MEDIUM_SCREEN_LABEL,
  LARGE_SCREEN_LABEL
} from "./constants";

/**
 * Returns true if the device is in landscape mode and false otherwise
 */
export function isLandscapeMode() {
  return Dimensions.get("window").width > Dimensions.get("window").height;
}

/**
 * Returns true if the device is in portrait mode and false otherwise
 */
export function isPortraitMode() {
  return !isLandscapeMode();
}

/**
 * Returns true if device has a small screen size.
 * This is applicable for all devices who's sizes are less than 640px
 */
export function isSmallScreen() {
  let isLandscape = isLandscapeMode();

  return (
    Dimensions.get("window")[`${isLandscape ? "height" : "width"}`] <=
    SMALL_SCREEN_UPPER_BOUND
  );
}

/**
 * Returns true if device has a medium screen size.
 * This is applicable for all devices who's sizes are greater than 640px
 * but less than 1007px
 */
export function isMediumScreen() {
  let isLandscape = isLandscapeMode();
  return (
    Dimensions.get("window")[`${isLandscape ? "height" : "width"}`] >
      SMALL_SCREEN_UPPER_BOUND &&
    Dimensions.get("window")[`${isLandscape ? "height" : "width"}`] <=
      MEDIUM_SCREEN_UPPER_BOUND
  );
}

/**
 * Returns true if device has a large screen size.
 * This is applicable for all devices who's sizes are less than 1007px
 */
export function isLargeScreen() {
  let isLandscape = isLandscapeMode();
  return (
    Dimensions.get("window")[`${isLandscape ? "height" : "width"}`] >
    MEDIUM_SCREEN_UPPER_BOUND
  );
}

export function getWidth(){
  return Dimensions.get("window").width;
}

export function getHeight(){
  return Dimensions.get("window").height;
}

/**
 * Returns the device's Label which is either 
 * **"sm"** for **small**, 
 * **"md"** for **medium** or
 * **"lg"** for **large**
 */
export function getDeviceLabel() {
  if (isSmallScreen()) {
    return SMALL_SCREEN_LABEL;
  } else if (isMediumScreen()) {
    return MEDIUM_SCREEN_LABEL;
  } else if (isLargeScreen()) {
    return LARGE_SCREEN_LABEL;
  }
}


/**
 * Returns the device's Label which is either 
 * **"sm-ptr"** for **small device in portrait mode**, 
 * **"md-ptr"** for **medium device in portrait mode**,
 * **"lg-ptr"** for **large device in portrait mode**,
 * **"sm-lnd"** for **small device in landscape mode**, 
 * **"md-lnd"** for **medium device in landscape mode** or
 * **"lg-lnd"** for **large device in landscape mode**
 */
export function getDeviceSpecificLabel(){
  let deviceLabel = getDeviceLabel();
  if(isLandscapeMode()){
    return deviceLabel+"-lnd";
  }else{
    return deviceLabel+"-ptr";
  }
}

/**
 * Returns **"ptr"** if device is in portrait mode or
 * **"lnd"** for landscape mode.
 */
export function getDeviceMode(){
  return isLandscapeMode()? "lnd" : "ptr";
}

/**
 * Returns all available labels as an array [**"sm"**, **"md"**, **"lg"**]
 */
export function getAvailableScreenLabels() {
  return [SMALL_SCREEN_LABEL, MEDIUM_SCREEN_LABEL, LARGE_SCREEN_LABEL];
}

let orientationChangeListeners = [];
/**
 * Allows for registration of orientation change listeners which
 * get triggered each time the orientation of the device changes.
 * The callback listener function will receive as argument an object
 * with 3 fields, `width`, `height` and `orientation` which will either be
 * **"LANDSCAPE"** or **"PORTRAIT"**
 * @param {callback} listener 
 */
export function registerOrientationChangedListener(listener = () => {}) {
  if(orientationChangeListeners.length == 0){  
    Dimensions.addEventListener("change", onOrientationChangeListener);
  }
  orientationChangeListeners.push(listener);
}


function onOrientationChangeListener(evt) {
  for (let listener of orientationChangeListeners) {
    listener({
      width: evt.window.width,
      height: evt.window.height,
      orientation: isLandscapeMode() ? "LANDSCAPE" : "PORTRAIT"
    });
  }
}

/**
 * Removes all the listeners
 */
export function removeAllListeners() {
  Dimensions.removeEventListener("change", onOrientationChangeListener);
  orientationChangeListeners = [];
}

/**
 * Removes a particular orientation change listener from the list of listeners.
 * The callback must be an instance of the listener that has to be removed.
 * @param {callback} changeListener 
 */
export function removeListener(changeListener) {
  orientationChangeListeners = orientationChangeListeners.filter(
    listener => listener != changeListener
  );
  if(orientationChangeListeners.length == 0){
    Dimensions.removeEventListener("change", onOrientationChangeListener);
  }
}