
if (typeof gdjs.evtsExt__FormatNumber__FormatBySeparator !== "undefined") {
  gdjs.evtsExt__FormatNumber__FormatBySeparator.registeredGdjsCallbacks.forEach(callback =>
    gdjs._unregisterCallback(callback)
  );
}

gdjs.evtsExt__FormatNumber__FormatBySeparator = {};
gdjs.evtsExt__FormatNumber__FormatBySeparator.idToCallbackMap = new Map();


gdjs.evtsExt__FormatNumber__FormatBySeparator.eventsList0 = function(runtimeScene, eventsFunctionContext) {

};gdjs.evtsExt__FormatNumber__FormatBySeparator.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
{isConditionTrue_1 = ((Number(eventsFunctionContext.getArgument("DecimalHouses")) || 0) == 0);
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
{let isConditionTrue_2 = false;
isConditionTrue_2 = false;
{isConditionTrue_2 = (gdjs.evtTools.string.strFind(("" + eventsFunctionContext.getArgument("Number")), ".") == -(1));
}
isConditionTrue_1 = isConditionTrue_2;
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber").setString(gdjs.evtsExt__FormatNumber__StrInsert.func(runtimeScene, gdjs.evtTools.common.toString(Math.floor(eventsFunctionContext.getArgument("Number"))), gdjs.evtTools.string.strLen(gdjs.evtTools.common.toString(Math.floor(eventsFunctionContext.getArgument("Number")))) - 3, eventsFunctionContext.getArgument("Separator"), eventsFunctionContext));
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("DecimalHouses")) || 0) > 0);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtTools.string.strFind(("" + eventsFunctionContext.getArgument("Number")), ".") != -(1));
}
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber").setString(gdjs.evtsExt__FormatNumber__StrInsert.func(runtimeScene, gdjs.evtTools.string.subStr(gdjs.evtTools.common.toString(eventsFunctionContext.getArgument("Number")), 0, gdjs.evtTools.string.strFind(gdjs.evtTools.common.toString(eventsFunctionContext.getArgument("Number")), ".")) + eventsFunctionContext.getArgument("DecimalSeparator") + gdjs.evtTools.string.subStr(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_PastDecimal")), 0, gdjs.evtTools.common.clamp(eventsFunctionContext.getArgument("DecimalHouses"), 0, 3)), gdjs.evtTools.string.strLen(gdjs.evtTools.common.toString(Math.floor(eventsFunctionContext.getArgument("Number")))) - 3, eventsFunctionContext.getArgument("Separator"), eventsFunctionContext));
}
}

}


{


let stopDoWhile_0 = false;
do {
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtTools.string.strFind(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), eventsFunctionContext.getArgument("Separator")) - 3 > 0);
}
if (isConditionTrue_0) {
let isConditionTrue_0 = false;
if (true) {
{runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber").setString(gdjs.evtsExt__FormatNumber__StrInsert.func(runtimeScene, gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), gdjs.evtTools.string.strFind(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber")), eventsFunctionContext.getArgument("Separator")) - 3, eventsFunctionContext.getArgument("Separator"), eventsFunctionContext));
}

{ //Subevents: 
gdjs.evtsExt__FormatNumber__FormatBySeparator.eventsList0(runtimeScene, eventsFunctionContext);} //Subevents end.
}
} else stopDoWhile_0 = true; 
} while (!stopDoWhile_0);

}


{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_FormatNumber"));}
}

}


};gdjs.evtsExt__FormatNumber__FormatBySeparator.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
{eventsFunctionContext.returnValue = gdjs.evtTools.common.toString(Math.floor(eventsFunctionContext.getArgument("Number")));}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("DecimalHouses")) || 0) > 0);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = (gdjs.evtTools.string.strFind(("" + eventsFunctionContext.getArgument("Number")), ".") != -(1));
}
}
if (isConditionTrue_0) {
{runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_PastDecimal").setString(gdjs.evtTools.string.subStr(gdjs.evtTools.common.toString(eventsFunctionContext.getArgument("Number")), gdjs.evtTools.string.strFind(gdjs.evtTools.common.toString(eventsFunctionContext.getArgument("Number")), ".") + 1, gdjs.evtTools.string.strLen(gdjs.evtTools.common.toString(eventsFunctionContext.getArgument("Number"))) - gdjs.evtTools.string.strFind(gdjs.evtTools.common.toString(eventsFunctionContext.getArgument("Number")), ".")));
}
{eventsFunctionContext.returnValue = gdjs.evtTools.string.subStr(gdjs.evtTools.common.toString(eventsFunctionContext.getArgument("Number")), 0, gdjs.evtTools.string.strFind(gdjs.evtTools.common.toString(eventsFunctionContext.getArgument("Number")), ".")) + eventsFunctionContext.getArgument("DecimalSeparator") + gdjs.evtTools.string.subStr(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("__FormatNumberExtension").getChild("_PastDecimal")), 0, gdjs.evtTools.common.clamp(eventsFunctionContext.getArgument("DecimalHouses"), 0, 3));}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = ((Number(eventsFunctionContext.getArgument("Number")) || 0) >= 1000);
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.evtsExt__FormatNumber__FormatBySeparator.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

gdjs.evtsExt__FormatNumber__FormatBySeparator.func = function(runtimeScene, Number, Separator, DecimalHouses, DecimalSeparator, parentEventsFunctionContext) {
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
if (argName === "Separator") return Separator;
if (argName === "DecimalHouses") return DecimalHouses;
if (argName === "DecimalSeparator") return DecimalSeparator;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


gdjs.evtsExt__FormatNumber__FormatBySeparator.eventsList2(runtimeScene, eventsFunctionContext);


return "" + eventsFunctionContext.returnValue;
}

gdjs.evtsExt__FormatNumber__FormatBySeparator.registeredGdjsCallbacks = [];