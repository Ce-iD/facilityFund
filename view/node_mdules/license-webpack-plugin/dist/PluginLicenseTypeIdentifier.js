"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginLicenseTypeIdentifier = void 0;
var PluginLicenseTypeIdentifier = /** @class */ (function () {
    function PluginLicenseTypeIdentifier(logger, licenseTypeOverrides, preferredLicenseTypes, handleLicenseAmbiguity, handleMissingLicenseType) {
        this.logger = logger;
        this.licenseTypeOverrides = licenseTypeOverrides;
        this.preferredLicenseTypes = preferredLicenseTypes;
        this.handleLicenseAmbiguity = handleLicenseAmbiguity;
        this.handleMissingLicenseType = handleMissingLicenseType;
    }
    PluginLicenseTypeIdentifier.prototype.findLicenseIdentifier = function (compilation, packageName, packageJson) {
        if (this.licenseTypeOverrides && this.licenseTypeOverrides[packageName]) {
            return this.licenseTypeOverrides[packageName];
        }
        var licensePropValue = packageJson.license;
        if (licensePropValue) {
            return typeof licensePropValue === 'string'
                ? licensePropValue
                : licensePropValue.type;
        }
        // handle deprecated "licenses" field in package.json
        if (Array.isArray(packageJson.licenses) &&
            packageJson.licenses.length > 0) {
            if (packageJson.licenses.length === 1) {
                return packageJson.licenses[0].type;
            }
            // handle multiple licenses when we have a preferred license type
            var licenseTypes = packageJson.licenses.map(function (x) { return x.type; });
            var licenseType = this.findPreferredLicense(licenseTypes, this.preferredLicenseTypes);
            if (licenseType !== null) {
                // found preferred license
                return licenseType;
            }
            var resolvedLicenseType = this.handleLicenseAmbiguity(packageName, packageJson.licenses);
            this.logger.warn(compilation, packageName + " specifies multiple licenses: " + licenseTypes + ". Automatically selected " + resolvedLicenseType + ". Use the preferredLicenseTypes or the licenseTypeOverrides option to resolve this warning.");
            return resolvedLicenseType;
        }
        this.logger.warn(compilation, "could not find any license type for " + packageName + " in its package.json");
        return this.handleMissingLicenseType(packageName);
    };
    PluginLicenseTypeIdentifier.prototype.findPreferredLicense = function (licenseTypes, preferredLicenseTypes) {
        var e_1, _a, e_2, _b;
        try {
            for (var preferredLicenseTypes_1 = __values(preferredLicenseTypes), preferredLicenseTypes_1_1 = preferredLicenseTypes_1.next(); !preferredLicenseTypes_1_1.done; preferredLicenseTypes_1_1 = preferredLicenseTypes_1.next()) {
                var preferredLicenseType = preferredLicenseTypes_1_1.value;
                try {
                    for (var licenseTypes_1 = (e_2 = void 0, __values(licenseTypes)), licenseTypes_1_1 = licenseTypes_1.next(); !licenseTypes_1_1.done; licenseTypes_1_1 = licenseTypes_1.next()) {
                        var licenseType = licenseTypes_1_1.value;
                        if (preferredLicenseType === licenseType) {
                            return preferredLicenseType;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (licenseTypes_1_1 && !licenseTypes_1_1.done && (_b = licenseTypes_1.return)) _b.call(licenseTypes_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (preferredLicenseTypes_1_1 && !preferredLicenseTypes_1_1.done && (_a = preferredLicenseTypes_1.return)) _a.call(preferredLicenseTypes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    };
    return PluginLicenseTypeIdentifier;
}());
exports.PluginLicenseTypeIdentifier = PluginLicenseTypeIdentifier;
