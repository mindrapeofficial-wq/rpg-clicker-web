
if (typeof gdjs.evtsExt__FormatNumber__FormatByUnit !== "undefined") {
  gdjs.evtsExt__FormatNumber__FormatByUnit.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__FormatNumber__FormatByUnit = {};
gdjs.evtsExt__FormatNumber__FormatByUnit.idToCallbackMap = new Map();


gdjs.evtsExt__FormatNumber__FormatByUnit.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("DecimalHouses")) || 0) > 0);
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber").setString(gdjs.evtTools.string.subStr(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), 0, gdjs.evtTools.string.strFind(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), ".")) + eventsFunctionContext.getArgument("DecimalSeparator") + gdjs.evtTools.string.subStr(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), gdjs.evtTools.string.strFind(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), ".") + 1, gdjs.evtTools.string.strLen(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber"))) - gdjs.evtTools.string.strFind(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), ".")));
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtTools.string.strAt(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), 0) == eventsFunctionContext.getArgument("DecimalSeparator"));
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber").setString(gdjs.evtTools.string.subStr(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), 1, gdjs.evtTools.string.strLen(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber"))) - 1));
}
}

}


{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber"));}
}

}


};gdjs.evtsExt__FormatNumber__FormatByUnit.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = gdjs.evtTools.common.toString(gdjs.evtTools.common.floorTo(eventsFunctionContext.getArgument("Number"), eventsFunctionContext.getArgument("DecimalHouses")));}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("Number")) || 0) >= 1000);
}
if (isConditionTrue_0) {
{gdjs.evtTools.network.jsonToVariableStructure(eventsFunctionContext.getArgument("Array"), runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_Array"));
}
{runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber").setString(gdjs.evtTools.common.toString(gdjs.evtTools.common.floorTo(eventsFunctionContext.getArgument("Number") / Math.pow(1000, Math.floor((gdjs.evtTools.string.strLen(gdjs.evtTools.common.toString(Math.floor(eventsFunctionContext.getArgument("Number")))) - 1) / 3)), gdjs.evtTools.common.clamp(eventsFunctionContext.getArgument("DecimalHouses"), 0, 3))) + gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_Array").getChild(Math.floor((gdjs.evtTools.string.strLen(gdjs.evtTools.common.toString(Math.floor(eventsFunctionContext.getArgument("Number")))) - 1) / 3) - 1)));
}

{ //Subevents
gdjs.evtsExt__FormatNumber__FormatByUnit.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__FormatNumber__FormatByUnit.func = function(runtimeScene, Number, Array, DecimalHouses, DecimalSeparator, parentEventsFunctionContext) {
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
if (argName === "Number") return Number;
if (argName === "Array") return Array;
if (argName === "DecimalHouses") return DecimalHouses;
if (argName === "DecimalSeparator") return DecimalSeparator;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__FormatNumber__FormatByUnit.eventsList1(runtimeScene, eventsFunctionContext);


return "" + eventsFunctionContext.returnValue;
}

gdjs.evtsExt__FormatNumber__FormatByUnit.registeredGdjsCallbacks = [];