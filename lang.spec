[
    "version": "v1",
    {
        "type": [
            "int32",
            "int64",
            "uint32",
            "uint64",
            "float32",
            "float64",
            "ufloat32",
            "ufloat64",
            "cstring",
            "boolean",
            "array",
            "codeFn",
            "nativeFn",
        ],
        "litera": []
    }
    ,
    {
        "opCode": "getVar",
        "name": "name",
        "namespace": -1
    }, {
        "opCode": "setVar",
        "name": "name",
        "namespace": -1,
        "value": { /*litera, opCode*/ }
    }, {
        "opCode": "defineFn",
        "body": [
            // {opCode}...
        ]
    }, {
       "opCode": "callFn",
        "name": "name",
        "namespace": -1
    }, {
        "opCode": "getType",
        "name": "name",
        "namespace": -1,
    }, {
        "opCode": "getArrLength",
        "name": "name",
        "namespace": -1,
    }, {
        "opCode": "getArrayMember",
        "name": "name",
        "namespace": -1,
        "index": {
            "name": "name",
            "namespace": -1
        }
    }, {
        "opCode": "setArrayMember",
        "name": "name",
        "namespace": -1,
        "index": {
            "name": "name",
            "namespace": -1
        },
        "value": { /*litera, opCode*/ }
    }, {
        "opCode": "pushToArray",
        "name": "name",
        "namespace": -1,
        "value": { /*litera, opCode*/ }
    }, {
        "opCode": "popFromArray",
        "name": "name",
        "namespace": -1,
    }
]
