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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var DEVICE_HEIGHT = react_native_1.Dimensions.get('window').height;
var DEFAULT_BOTTOM_SHEET_HEIGHT = DEVICE_HEIGHT * 0.4;
var AnimatedPressable = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.Pressable);
var BottomSheet = function (_a) {
    var isVisible = _a.isVisible, children = _a.children, height = _a.height, onHide = _a.onHide;
    var BOTTOM_SHEET_HEIGHT = height !== null && height !== void 0 ? height : DEFAULT_BOTTOM_SHEET_HEIGHT;
    var translationY = (0, react_native_reanimated_1.useSharedValue)(0);
    var totalDragDistance = (0, react_native_reanimated_1.useSharedValue)(0);
    var styles = generateStyles();
    (0, react_1.useEffect)(function () {
        if (isVisible) {
            showBottomSheet();
        }
        else {
            hideBottomSheet();
        }
    }, [isVisible, BOTTOM_SHEET_HEIGHT]);
    var showBottomSheet = function () {
        translationY.value = (0, react_native_reanimated_1.withSpring)(-BOTTOM_SHEET_HEIGHT, { damping: 50 });
    };
    var hideBottomSheet = function () {
        translationY.value = (0, react_native_reanimated_1.withSpring)(0, { damping: 50 }, function () { return (0, react_native_reanimated_1.runOnJS)(onHide)(); });
    };
    var gesture = react_native_gesture_handler_1.Gesture.Pan()
        .onBegin(function () {
        totalDragDistance.value = translationY.value;
    })
        .onUpdate(function (event) {
        var totalY = event.translationY + totalDragDistance.value;
        if (totalY > -BOTTOM_SHEET_HEIGHT) {
            translationY.value = totalY;
        }
    })
        .onEnd(function () {
        if (translationY.value < -BOTTOM_SHEET_HEIGHT / 2) {
            (0, react_native_reanimated_1.runOnJS)(showBottomSheet)();
        }
        else {
            (0, react_native_reanimated_1.runOnJS)(hideBottomSheet)();
        }
    });
    var rBottomSheet = (0, react_native_reanimated_1.useAnimatedStyle)(function () { return ({
        transform: [{ translateY: translationY.value }],
    }); }, []);
    var rBackground = (0, react_native_reanimated_1.useAnimatedStyle)(function () { return ({
        opacity: (0, react_native_reanimated_1.interpolate)(translationY.value, [-BOTTOM_SHEET_HEIGHT, 0], [0.5, 0], react_native_reanimated_1.Extrapolation.CLAMP),
    }); }, [BOTTOM_SHEET_HEIGHT]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(AnimatedPressable, { pointerEvents: isVisible ? 'auto' : 'none', style: [styles.background, rBackground], onPress: hideBottomSheet }),
        react_1.default.createElement(react_native_gesture_handler_1.GestureDetector, { gesture: gesture },
            react_1.default.createElement(react_native_reanimated_1.default.View, { style: [styles.container, rBottomSheet] },
                react_1.default.createElement(react_native_1.View, { style: styles.handler }),
                children))));
    function generateStyles() {
        return react_native_1.StyleSheet.create({
            container: {
                flex: 1,
                width: '100%',
                position: 'absolute',
                height: BOTTOM_SHEET_HEIGHT,
                top: DEVICE_HEIGHT,
                backgroundColor: '#fff',
                borderRadius: 20,
            },
            background: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: '#303133',
            },
            handler: {
                width: 60,
                height: 6,
                borderRadius: 3,
                backgroundColor: '#999999',
                alignSelf: 'center',
                marginVertical: 20,
            },
        });
    }
};
exports.default = BottomSheet;
