export const namespaceStack = [{
    "console.log": console.log,
    "add": (a, b) => a + b,
}]

function readLitera(litera) {
    switch(typeof(litera)) {
        case "number":
        case "boolean":
        case "string":
            return litera;
        case "object":
            if(Array.isArray(litera)) {
                return  litera.map(member => readLitera(member));
            }
            if(litera?.type === "codeFn")
                return litera
            return doOpCode(litera);
        default:
            throw new Error("invaild itera");
    }
}

function doOpCode(op) {
    let { opCode } = op;
    switch(opCode) {
        case "getVar":
            return doGetVar(op);
        case "setVar":
            return doSetVar(op);
        case "defineFn":
            return doDefineFn(op);
        case "callFn":
            return doCallFn(op);
        case "getType":
            return doGetType(op);
        case "getArrLength":
        case "getArrayMember":
        case "setArrayMember":
        case "pushToArray":
        case "popFromArray":
            throw new Error('not implement');
        default:
            throw new Error("invaild opCode");
    }
}

function doGetVar(op) {
    let {opCode, name, namespace} = op;
    namespace = (namespace < 0) ? namespaceStack.length + namespace : namespace;
    if(opCode !== "getVar")
        throw new Error("opCode is not getVar, get ", opCode);
    if(namespace >= namespaceStack.length)
        throw new Error("out namespaceStack", namespaceStack.length, namespace)
    return namespaceStack[namespace][name]
}

function doSetVar(op) {
    let {opCode, name, namespace, value} = op;
    namespace = (namespace < 0) ? namespaceStack.length + namespace : namespace;
    if(opCode !== "setVar")
        throw new Error("opCode is not setVar, get ", opCode);
    if(namespace >= namespaceStack.length)
        throw new Error("out namespaceStack", namespaceStack.length, namespace)

    let v = readLitera(value);
    return namespaceStack[namespace][name] = v;
}

function doDefineFn(op) {
    let {opCode, body} = op;
    if(opCode !== "defineFn")
        throw new Error("opCode is not defineFn, get ", opCode);
    return {
        "type": "codeFn",
        body
    }
}

function doCallFn(op) {
    let {opCode, name, namespace} = op;
    namespace = (namespace < 0) ? namespaceStack.length + namespace : namespace;
    if(opCode !== "callFn")
        throw new Error("opCode is not callFn, get ", opCode);

    let fn = namespaceStack[namespace][name];

    namespaceStack.push({})

    switch (typeof(fn)) {
        case "function": // native function
            let currentNameSpace = namespaceStack.length - 1
            let args = namespaceStack[currentNameSpace -1]["args"]
            let result = fn.apply(null, args);
            namespaceStack[currentNameSpace -1]["return"] = result;
            break;
        case "object":
            if(fn?.type !== "codeFn")
                throw new Error("can't callFn", fn);
            for(let op of (fn?.body ?? [])){
                doOpCode(op);
            }
            break;
        default:
            throw new Error("can't callFn", fn);
    }

    namespaceStack.pop({})
}

function doGetType(op) {
    let {opCode, name, namespace} = op;
    namespace = (namespace < 0) ? namespaceStack.length + namespace : namespace;
    if(opCode !== "getType")
        throw new Error("opCode is not getType, get ", opCode);

    let v = namespaceStack[namespace][name];
    return typeof(v)
}

export function excute(opArray) {
    for(let o of opArray) {
        doOpCode(o);
    }
}
