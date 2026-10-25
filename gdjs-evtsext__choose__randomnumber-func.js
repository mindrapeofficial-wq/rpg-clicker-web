
if (typeof gdjs.evtsExt__Choose__RandomNumber !== "undefined") {
  gdjs.evtsExt__Choose__RandomNumber.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__Choose__RandomNumber = {};
gdjs.evtsExt__Choose__RandomNumber.idToCallbackMap = new Map();


gdjs.evtsExt__Choose__RandomNumber.userFunc0x100a228 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
/** @type {string[]} */
const choices = eventsFunctionContext.getArgument("NumbersChoiceString").split(',');
eventsFunctionContext.returnValue = parseFloat(choices[Math.floor(Math.random() * choices.length)]);

};
gdjs.evtsExt__Choose__RandomNumber.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


gdjs.evtsExt__Choose__RandomNumber.userFunc0x100a228(runtimeScene, eventsFunctionContext);

}


};

gdjs.evtsExt__Choose__RandomNumber.func = function(runtimeScene, NumbersChoiceString, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("Choose"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("Choose"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "NumbersChoiceString") return NumbersChoiceString;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__Choose__RandomNumber.eventsList0(runtimeScene, eventsFunctionContext);


return Number(eventsFunctionContext.returnValue) || 0;
}

gdjs.evtsExt__Choose__RandomNumber.registeredGdjsCallbacks = [];