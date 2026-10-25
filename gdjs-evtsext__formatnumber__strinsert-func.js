
if (typeof gdjs.evtsExt__FormatNumber__StrInsert !== "undefined") {
  gdjs.evtsExt__FormatNumber__StrInsert.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__FormatNumber__StrInsert = {};
gdjs.evtsExt__FormatNumber__StrInsert.idToCallbackMap = new Map();


gdjs.evtsExt__FormatNumber__StrInsert.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = gdjs.evtTools.string.subStr(eventsFunctionContext.getArgument("String"), 0, eventsFunctionContext.getArgument("Position")) + eventsFunctionContext.getArgument("Character") + gdjs.evtTools.string.subStr(eventsFunctionContext.getArgument("String"), eventsFunctionContext.getArgument("Position"), gdjs.evtTools.string.strLen(eventsFunctionContext.getArgument("String")) - eventsFunctionContext.getArgument("Position"));}
}

}


};

gdjs.evtsExt__FormatNumber__StrInsert.func = function(runtimeScene, String, Position, Character, parentEventsFunctionContext) {
let scopeInstanceContainer = null;
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("FormatNumber"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("FormatNumber"),
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
if (argName === "String") return String;
if (argName === "Position") return Position;
if (argName === "Character") return Character;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__FormatNumber__StrInsert.eventsList0(runtimeScene, eventsFunctionContext);


return "" + eventsFunctionContext.returnValue;
}

gdjs.evtsExt__FormatNumber__StrInsert.registeredGdjsCallbacks = [];