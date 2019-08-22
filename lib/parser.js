import {
  HIGH_PRIORITY,
  MEDIUM_PRIORITY,
  LOW_PRIORITY,
  LEAST_PRIORITY
} from "./constants";
import {
  getDeviceSpecificLabel,
  getDeviceLabel,
  getDeviceMode
} from "./deviceUtils";

/**
 * Parses the props and returns the appropriate props 
 * based on the device size and orientation
 * @param {object} props 
 */
export function parseProps(props = {}) {
  let propPriorityMap = {};
  let newProps = {};
  for (let prop of Object.keys(props)) {
    if (props.hasOwnProperty(prop)) {
      let res = parseProp(prop);

      if (
        ((res.propName === "visible" && !res.matches) ||
          (res.propName === "hidden" && res.matches)) &&
        (!propPriorityMap["hidden$"] ||
          propPriorityMap["hidden$"].priority < res.priority)
      ) {
        newProps["hidden$"] = true;
        propPriorityMap["hidden$"] = res;
      } else if (
        ((res.propName === "hidden" && !res.matches) ||
          (res.propName === "visible" && res.matches)) &&
        (!propPriorityMap["hidden$"] ||
          propPriorityMap["hidden$"].priority < res.priority)
      ) {
        newProps["hidden$"] = false;
        propPriorityMap["hidden$"] = res;
      } else if (
        res.matches &&
        res.propName &&
        (!propPriorityMap[res.propName] ||
          propPriorityMap[res.propName].priority < res.priority)
      ) {
        propPriorityMap[res.propName] = res;
        newProps[res.propName] = props[prop];
      }
    }
  }

  return newProps;
}

//Helper function to analyze a single prop
function parseProp(prop) {
  if (!prop.includes("$")) {
    return { propName: prop, matches: true, priority: LEAST_PRIORITY };
  }

  let [mainProp, ...propCommands] = prop.split("$");
  if (propCommands instanceof Array) {
    let res = { priority: -1, matches: false };
    for (let propCommand of propCommands) {
      let _cm = parsePropCommand(propCommand);
      if (_cm.matches && _cm.priority > res.priority) {
        res = _cm;
      }
    }
    return { propName: mainProp, ...res };
  }
}

//Helper function to analyze a single prop command e.g "sm-lnd", "ptr" etc
function parsePropCommand(propCommand) {
  let deviceSpecificLabel = getDeviceSpecificLabel(); //either "sm-lnd" | "md-ptr" etc
  let deviceLabel = getDeviceLabel(); //either "sm" | "md" | "lg"
  let deviceMode = getDeviceMode(); //either "ptr" | "lnd"

  if (propCommand === deviceSpecificLabel) {
    return { priority: HIGH_PRIORITY, matches: true };
  } else if (propCommand === deviceLabel) {
    return { priority: MEDIUM_PRIORITY, matches: true };
  } else if (propCommand === deviceMode) {
    return { priority: LOW_PRIORITY, matches: true };
  } else if (propCommand === "") {
    return { priority: LEAST_PRIORITY, matches: true };
  }

  return { matches: false };
}
