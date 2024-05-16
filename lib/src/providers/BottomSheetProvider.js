"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBottomSheet = void 0;
var BottomSheet_1 = __importDefault(require("../components/BottomSheet"));
var react_1 = __importStar(require("react"));
var initialState = {
    show: function () { },
    hide: function () { },
};
var BottomSheetContext = (0, react_1.createContext)(initialState);
var BottomSheetProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(false), isVisible = _b[0], setIsVisible = _b[1];
    var _c = (0, react_1.useState)(null), component = _c[0], setComponent = _c[1];
    var _d = (0, react_1.useState)(null), configurations = _d[0], setConfigurations = _d[1];
    var show = function (comp, config) {
        if (component) {
            return;
        }
        setIsVisible(true);
        setComponent(comp);
        setConfigurations(config !== null && config !== void 0 ? config : null);
    };
    var hide = function () {
        setIsVisible(false);
    };
    var reset = function () {
        setIsVisible(false);
        setComponent(null);
        setConfigurations(null);
    };
    return (react_1.default.createElement(BottomSheetContext.Provider, { value: { show: show, hide: hide } },
        children,
        component && (react_1.default.createElement(BottomSheet_1.default, { onHide: reset, height: configurations === null || configurations === void 0 ? void 0 : configurations.height, isVisible: isVisible }, component))));
};
exports.default = BottomSheetProvider;
var useBottomSheet = function () { return (0, react_1.useContext)(BottomSheetContext); };
exports.useBottomSheet = useBottomSheet;
