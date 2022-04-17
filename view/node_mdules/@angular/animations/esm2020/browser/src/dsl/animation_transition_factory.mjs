import { getOrSetAsInMap } from '../render/shared';
import { copyObj, interpolateParams, iteratorToArray } from '../util';
import { buildAnimationTimelines } from './animation_timeline_builder';
import { createTransitionInstruction } from './animation_transition_instruction';
const EMPTY_OBJECT = {};
export class AnimationTransitionFactory {
    constructor(_triggerName, ast, _stateStyles) {
        this._triggerName = _triggerName;
        this.ast = ast;
        this._stateStyles = _stateStyles;
    }
    match(currentState, nextState, element, params) {
        return oneOrMoreTransitionsMatch(this.ast.matchers, currentState, nextState, element, params);
    }
    buildStyles(stateName, params, errors) {
        const backupStateStyler = this._stateStyles['*'];
        const stateStyler = this._stateStyles[stateName];
        const backupStyles = backupStateStyler ? backupStateStyler.buildStyles(params, errors) : {};
        return stateStyler ? stateStyler.buildStyles(params, errors) : backupStyles;
    }
    build(driver, element, currentState, nextState, enterClassName, leaveClassName, currentOptions, nextOptions, subInstructions, skipAstBuild) {
        const errors = [];
        const transitionAnimationParams = this.ast.options && this.ast.options.params || EMPTY_OBJECT;
        const currentAnimationParams = currentOptions && currentOptions.params || EMPTY_OBJECT;
        const currentStateStyles = this.buildStyles(currentState, currentAnimationParams, errors);
        const nextAnimationParams = nextOptions && nextOptions.params || EMPTY_OBJECT;
        const nextStateStyles = this.buildStyles(nextState, nextAnimationParams, errors);
        const queriedElements = new Set();
        const preStyleMap = new Map();
        const postStyleMap = new Map();
        const isRemoval = nextState === 'void';
        const animationOptions = { params: { ...transitionAnimationParams, ...nextAnimationParams } };
        const timelines = skipAstBuild ?
            [] :
            buildAnimationTimelines(driver, element, this.ast.animation, enterClassName, leaveClassName, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors);
        let totalTime = 0;
        timelines.forEach(tl => {
            totalTime = Math.max(tl.duration + tl.delay, totalTime);
        });
        if (errors.length) {
            return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, [], [], preStyleMap, postStyleMap, totalTime, errors);
        }
        timelines.forEach(tl => {
            const elm = tl.element;
            const preProps = getOrSetAsInMap(preStyleMap, elm, {});
            tl.preStyleProps.forEach(prop => preProps[prop] = true);
            const postProps = getOrSetAsInMap(postStyleMap, elm, {});
            tl.postStyleProps.forEach(prop => postProps[prop] = true);
            if (elm !== element) {
                queriedElements.add(elm);
            }
        });
        const queriedElementsList = iteratorToArray(queriedElements.values());
        return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, timelines, queriedElementsList, preStyleMap, postStyleMap, totalTime);
    }
}
function oneOrMoreTransitionsMatch(matchFns, currentState, nextState, element, params) {
    return matchFns.some(fn => fn(currentState, nextState, element, params));
}
export class AnimationStateStyles {
    constructor(styles, defaultParams, normalizer) {
        this.styles = styles;
        this.defaultParams = defaultParams;
        this.normalizer = normalizer;
    }
    buildStyles(params, errors) {
        const finalStyles = {};
        const combinedParams = copyObj(this.defaultParams);
        Object.keys(params).forEach(key => {
            const value = params[key];
            if (value != null) {
                combinedParams[key] = value;
            }
        });
        this.styles.styles.forEach(value => {
            if (typeof value !== 'string') {
                const styleObj = value;
                Object.keys(styleObj).forEach(prop => {
                    let val = styleObj[prop];
                    if (val.length > 1) {
                        val = interpolateParams(val, combinedParams, errors);
                    }
                    const normalizedProp = this.normalizer.normalizePropertyName(prop, errors);
                    val = this.normalizer.normalizeStyleValue(prop, normalizedProp, val, errors);
                    finalStyles[normalizedProp] = val;
                });
            }
        });
        return finalStyles;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3RyYW5zaXRpb25fZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvZHNsL2FuaW1hdGlvbl90cmFuc2l0aW9uX2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBR3BFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXJFLE9BQU8sRUFBaUMsMkJBQTJCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUkvRyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFFeEIsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxZQUNZLFlBQW9CLEVBQVMsR0FBa0IsRUFDL0MsWUFBeUQ7UUFEekQsaUJBQVksR0FBWixZQUFZLENBQVE7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFlO1FBQy9DLGlCQUFZLEdBQVosWUFBWSxDQUE2QztJQUFHLENBQUM7SUFFekUsS0FBSyxDQUFDLFlBQWlCLEVBQUUsU0FBYyxFQUFFLE9BQVksRUFBRSxNQUE0QjtRQUNqRixPQUFPLHlCQUF5QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hHLENBQUM7SUFFRCxXQUFXLENBQUMsU0FBaUIsRUFBRSxNQUE0QixFQUFFLE1BQWU7UUFDMUUsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFD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LENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRpb25PcHRpb25zLCDJtVN0eWxlRGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7QW5pbWF0aW9uRHJpdmVyfSBmcm9tICcuLi9yZW5kZXIvYW5pbWF0aW9uX2RyaXZlcic7XG5pbXBvcnQge2dldE9yU2V0QXNJbk1hcH0gZnJvbSAnLi4vcmVuZGVyL3NoYXJlZCc7XG5pbXBvcnQge2NvcHlPYmosIGludGVycG9sYXRlUGFyYW1zLCBpdGVyYXRvclRvQXJyYXl9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge1N0eWxlQXN0LCBUcmFuc2l0aW9uQXN0fSBmcm9tICcuL2FuaW1hdGlvbl9hc3QnO1xuaW1wb3J0IHtidWlsZEFuaW1hdGlvblRpbWVsaW5lc30gZnJvbSAnLi9hbmltYXRpb25fdGltZWxpbmVfYnVpbGRlcic7XG5pbXBvcnQge1RyYW5zaXRpb25NYXRjaGVyRm59IGZyb20gJy4vYW5pbWF0aW9uX3RyYW5zaXRpb25fZXhwcic7XG5pbXBvcnQge0FuaW1hdGlvblRyYW5zaXRpb25JbnN0cnVjdGlvbiwgY3JlYXRlVHJhbnNpdGlvbkluc3RydWN0aW9ufSBmcm9tICcuL2FuaW1hdGlvbl90cmFuc2l0aW9uX2luc3RydWN0aW9uJztcbmltcG9ydCB7RWxlbWVudEluc3RydWN0aW9uTWFwfSBmcm9tICcuL2VsZW1lbnRfaW5zdHJ1Y3Rpb25fbWFwJztcbmltcG9ydCB7QW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyfSBmcm9tICcuL3N0eWxlX25vcm1hbGl6YXRpb24vYW5pbWF0aW9uX3N0eWxlX25vcm1hbGl6ZXInO1xuXG5jb25zdCBFTVBUWV9PQkpFQ1QgPSB7fTtcblxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvblRyYW5zaXRpb25GYWN0b3J5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF90cmlnZ2VyTmFtZTogc3RyaW5nLCBwdWJsaWMgYXN0OiBUcmFuc2l0aW9uQXN0LFxuICAgICAgcHJpdmF0ZSBfc3RhdGVTdHlsZXM6IHtbc3RhdGVOYW1lOiBzdHJpbmddOiBBbmltYXRpb25TdGF0ZVN0eWxlc30pIHt9XG5cbiAgbWF0Y2goY3VycmVudFN0YXRlOiBhbnksIG5leHRTdGF0ZTogYW55LCBlbGVtZW50OiBhbnksIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gb25lT3JNb3JlVHJhbnNpdGlvbnNNYXRjaCh0aGlzLmFzdC5tYXRjaGVycywgY3VycmVudFN0YXRlLCBuZXh0U3RhdGUsIGVsZW1lbnQsIHBhcmFtcyk7XG4gIH1cblxuICBidWlsZFN0eWxlcyhzdGF0ZU5hbWU6IHN0cmluZywgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSwgZXJyb3JzOiBFcnJvcltdKSB7XG4gICAgY29uc3QgYmFja3VwU3RhdGVTdHlsZXIgPSB0aGlzLl9zdGF0ZVN0eWxlc1snKiddO1xuICAgIGNvbnN0IHN0YXRlU3R5bGVyID0gdGhpcy5fc3RhdGVTdHlsZXNbc3RhdGVOYW1lXTtcbiAgICBjb25zdCBiYWNrdXBTdHlsZXMgPSBiYWNrdXBTdGF0ZVN0eWxlciA/IGJhY2t1cFN0YXRlU3R5bGVyLmJ1aWxkU3R5bGVzKHBhcmFtcywgZXJyb3JzKSA6IHt9O1xuICAgIHJldHVybiBzdGF0ZVN0eWxlciA/IHN0YXRlU3R5bGVyLmJ1aWxkU3R5bGVzKHBhcmFtcywgZXJyb3JzKSA6IGJhY2t1cFN0eWxlcztcbiAgfVxuXG4gIGJ1aWxkKFxuICAgICAgZHJpdmVyOiBBbmltYXRpb25Ecml2ZXIsIGVsZW1lbnQ6IGFueSwgY3VycmVudFN0YXRlOiBhbnksIG5leHRTdGF0ZTogYW55LFxuICAgICAgZW50ZXJDbGFzc05hbWU6IHN0cmluZywgbGVhdmVDbGFzc05hbWU6IHN0cmluZywgY3VycmVudE9wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zLFxuICAgICAgbmV4dE9wdGlvbnM/OiBBbmltYXRpb25PcHRpb25zLCBzdWJJbnN0cnVjdGlvbnM/OiBFbGVtZW50SW5zdHJ1Y3Rpb25NYXAsXG4gICAgICBza2lwQXN0QnVpbGQ/OiBib29sZWFuKTogQW5pbWF0aW9uVHJhbnNpdGlvbkluc3RydWN0aW9uIHtcbiAgICBjb25zdCBlcnJvcnM6IEVycm9yW10gPSBbXTtcblxuICAgIGNvbnN0IHRyYW5zaXRpb25BbmltYXRpb25QYXJhbXMgPSB0aGlzLmFzdC5vcHRpb25zICYmIHRoaXMuYXN0Lm9wdGlvbnMucGFyYW1zIHx8IEVNUFRZX09CSkVDVDtcbiAgICBjb25zdCBjdXJyZW50QW5pbWF0aW9uUGFyYW1zID0gY3VycmVudE9wdGlvbnMgJiYgY3VycmVudE9wdGlvbnMucGFyYW1zIHx8IEVNUFRZX09CSkVDVDtcbiAgICBjb25zdCBjdXJyZW50U3RhdGVTdHlsZXMgPSB0aGlzLmJ1aWxkU3R5bGVzKGN1cnJlbnRTdGF0ZSwgY3VycmVudEFuaW1hdGlvblBhcmFtcywgZXJyb3JzKTtcbiAgICBjb25zdCBuZXh0QW5pbWF0aW9uUGFyYW1zID0gbmV4dE9wdGlvbnMgJiYgbmV4dE9wdGlvbnMucGFyYW1zIHx8IEVNUFRZX09CSkVDVDtcbiAgICBjb25zdCBuZXh0U3RhdGVTdHlsZXMgPSB0aGlzLmJ1aWxkU3R5bGVzKG5leHRTdGF0ZSwgbmV4dEFuaW1hdGlvblBhcmFtcywgZXJyb3JzKTtcblxuICAgIGNvbnN0IHF1ZXJpZWRFbGVtZW50cyA9IG5ldyBTZXQ8YW55PigpO1xuICAgIGNvbnN0IHByZVN0eWxlTWFwID0gbmV3IE1hcDxhbnksIHtbcHJvcDogc3RyaW5nXTogYm9vbGVhbn0+KCk7XG4gICAgY29uc3QgcG9zdFN0eWxlTWFwID0gbmV3IE1hcDxhbnksIHtbcHJvcDogc3RyaW5nXTogYm9vbGVhbn0+KCk7XG4gICAgY29uc3QgaXNSZW1vdmFsID0gbmV4dFN0YXRlID09PSAndm9pZCc7XG5cbiAgICBjb25zdCBhbmltYXRpb25PcHRpb25zID0ge3BhcmFtczogey4uLnRyYW5zaXRpb25BbmltYXRpb25QYXJhbXMsIC4uLm5leHRBbmltYXRpb25QYXJhbXN9fTtcblxuICAgIGNvbnN0IHRpbWVsaW5lcyA9IHNraXBBc3RCdWlsZCA/XG4gICAgICAgIFtdIDpcbiAgICAgICAgYnVpbGRBbmltYXRpb25UaW1lbGluZXMoXG4gICAgICAgICAgICBkcml2ZXIsIGVsZW1lbnQsIHRoaXMuYXN0LmFuaW1hdGlvbiwgZW50ZXJDbGFzc05hbWUsIGxlYXZlQ2xhc3NOYW1lLCBjdXJyZW50U3RhdGVTdHlsZXMsXG4gICAgICAgICAgICBuZXh0U3RhdGVTdHlsZXMsIGFuaW1hdGlvbk9wdGlvbnMsIHN1Ykluc3RydWN0aW9ucywgZXJyb3JzKTtcblxuICAgIGxldCB0b3RhbFRpbWUgPSAwO1xuICAgIHRpbWVsaW5lcy5mb3JFYWNoKHRsID0+IHtcbiAgICAgIHRvdGFsVGltZSA9IE1hdGgubWF4KHRsLmR1cmF0aW9uICsgdGwuZGVsYXksIHRvdGFsVGltZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZVRyYW5zaXRpb25JbnN0cnVjdGlvbihcbiAgICAgICAgICBlbGVtZW50LCB0aGlzLl90cmlnZ2VyTmFtZSwgY3VycmVudFN0YXRlLCBuZXh0U3RhdGUsIGlzUmVtb3ZhbCwgY3VycmVudFN0YXRlU3R5bGVzLFxuICAgICAgICAgIG5leHRTdGF0ZVN0eWxlcywgW10sIFtdLCBwcmVTdHlsZU1hcCwgcG9zdFN0eWxlTWFwLCB0b3RhbFRpbWUsIGVycm9ycyk7XG4gICAgfVxuXG4gICAgdGltZWxpbmVzLmZvckVhY2godGwgPT4ge1xuICAgICAgY29uc3QgZWxtID0gdGwuZWxlbWVudDtcbiAgICAgIGNvbnN0IHByZVByb3BzID0gZ2V0T3JTZXRBc0luTWFwKHByZVN0eWxlTWFwLCBlbG0sIHt9KTtcbiAgICAgIHRsLnByZVN0eWxlUHJvcHMuZm9yRWFjaChwcm9wID0+IHByZVByb3BzW3Byb3BdID0gdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHBvc3RQcm9wcyA9IGdldE9yU2V0QXNJbk1hcChwb3N0U3R5bGVNYXAsIGVsbSwge30pO1xuICAgICAgdGwucG9zdFN0eWxlUHJvcHMuZm9yRWFjaChwcm9wID0+IHBvc3RQcm9wc1twcm9wXSA9IHRydWUpO1xuXG4gICAgICBpZiAoZWxtICE9PSBlbGVtZW50KSB7XG4gICAgICAgIHF1ZXJpZWRFbGVtZW50cy5hZGQoZWxtKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHF1ZXJpZWRFbGVtZW50c0xpc3QgPSBpdGVyYXRvclRvQXJyYXkocXVlcmllZEVsZW1lbnRzLnZhbHVlcygpKTtcbiAgICByZXR1cm4gY3JlYXRlVHJhbnNpdGlvbkluc3RydWN0aW9uKFxuICAgICAgICBlbGVtZW50LCB0aGlzLl90cmlnZ2VyTmFtZSwgY3VycmVudFN0YXRlLCBuZXh0U3RhdGUsIGlzUmVtb3ZhbCwgY3VycmVudFN0YXRlU3R5bGVzLFxuICAgICAgICBuZXh0U3RhdGVTdHlsZXMsIHRpbWVsaW5lcywgcXVlcmllZEVsZW1lbnRzTGlzdCwgcHJlU3R5bGVNYXAsIHBvc3RTdHlsZU1hcCwgdG90YWxUaW1lKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbmVPck1vcmVUcmFuc2l0aW9uc01hdGNoKFxuICAgIG1hdGNoRm5zOiBUcmFuc2l0aW9uTWF0Y2hlckZuW10sIGN1cnJlbnRTdGF0ZTogYW55LCBuZXh0U3RhdGU6IGFueSwgZWxlbWVudDogYW55LFxuICAgIHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiBib29sZWFuIHtcbiAgcmV0dXJuIG1hdGNoRm5zLnNvbWUoZm4gPT4gZm4oY3VycmVudFN0YXRlLCBuZXh0U3RhdGUsIGVsZW1lbnQsIHBhcmFtcykpO1xufVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uU3RhdGVTdHlsZXMge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgc3R5bGVzOiBTdHlsZUFzdCwgcHJpdmF0ZSBkZWZhdWx0UGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSxcbiAgICAgIHByaXZhdGUgbm9ybWFsaXplcjogQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyKSB7fVxuXG4gIGJ1aWxkU3R5bGVzKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0sIGVycm9yczogRXJyb3JbXSk6IMm1U3R5bGVEYXRhIHtcbiAgICBjb25zdCBmaW5hbFN0eWxlczogybVTdHlsZURhdGEgPSB7fTtcbiAgICBjb25zdCBjb21iaW5lZFBhcmFtcyA9IGNvcHlPYmoodGhpcy5kZWZhdWx0UGFyYW1zKTtcbiAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyYW1zW2tleV07XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICBjb21iaW5lZFBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdHlsZXMuc3R5bGVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3Qgc3R5bGVPYmogPSB2YWx1ZSBhcyBhbnk7XG4gICAgICAgIE9iamVjdC5rZXlzKHN0eWxlT2JqKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgIGxldCB2YWwgPSBzdHlsZU9ialtwcm9wXTtcbiAgICAgICAgICBpZiAodmFsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHZhbCA9IGludGVycG9sYXRlUGFyYW1zKHZhbCwgY29tYmluZWRQYXJhbXMsIGVycm9ycyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRQcm9wID0gdGhpcy5ub3JtYWxpemVyLm5vcm1hbGl6ZVByb3BlcnR5TmFtZShwcm9wLCBlcnJvcnMpO1xuICAgICAgICAgIHZhbCA9IHRoaXMubm9ybWFsaXplci5ub3JtYWxpemVTdHlsZVZhbHVlKHByb3AsIG5vcm1hbGl6ZWRQcm9wLCB2YWwsIGVycm9ycyk7XG4gICAgICAgICAgZmluYWxTdHlsZXNbbm9ybWFsaXplZFByb3BdID0gdmFsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmluYWxTdHlsZXM7XG4gIH1cbn1cbiJdfQ==