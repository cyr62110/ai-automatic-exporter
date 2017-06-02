/**
 * ESSDK uses a javascript engine compatible with the 1999 specification.
 * Unfortunately, due to this quite old engine, some of the ES5 function cannot be replaced totally by shim.
 * This file will provide partial shim tailor made for ESSDK. Do not try to use this in a web browser.
 */

let shouldReplaceDefineProperty = false;
if (Object.defineProperty) {
    try {
        let test = {};
        // setting setter & getter must not throw exception
        Object.defineProperty(test, "test_setter_getter", {
            set: (value) => {},
            get: () => { return ""; }
        });

        // setting value must works
        Object.defineProperty(test, "test_value", {
            value: "test"
        });
        shouldReplaceDefineProperty = test.test_value !== "test";
    } catch (e) {
        shouldReplaceDefineProperty = true;
    }
}

if (!Object.defineProperty || shouldReplaceDefineProperty) {
    let ERR_NON_OBJECT_DESCRIPTOR = 'Property description must be an object: ';
    let ERR_NON_OBJECT_TARGET = 'Object.defineProperty called on non-object: ';

    Object.defineProperty = function defineProperty(object, property, descriptor) {
        if (typeof object !== 'object' && typeof object !== 'function' || object === null) {
            throw new TypeError(ERR_NON_OBJECT_TARGET + object);
        }
        if (typeof descriptor !== 'object' && typeof descriptor !== 'function' || descriptor === null) {
            throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
        }

        if ('value' in descriptor) {
            object[property] = descriptor.value;
        } else {
            if ('get' in descriptor) {
                // Not supported by ESSDK, fail silently
            }
            if ('set' in descriptor) {
                // Not supported by ESSDK, fail silently
            }
        }
        return object;
    };
}

if (!Object.defineProperties) {
    Object.defineProperties = function defineProperties(object, properties) {
        Object.keys(properties).forEach(function (property) {
            if (property !== '__proto__') {
                Object.defineProperty(object, property, properties[property]);
            }
        });
        return object;
    };
}
