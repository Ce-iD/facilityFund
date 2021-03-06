/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isNgContent } from '../ml_parser/tags';
const NG_CONTENT_SELECT_ATTR = 'select';
const LINK_ELEMENT = 'link';
const LINK_STYLE_REL_ATTR = 'rel';
const LINK_STYLE_HREF_ATTR = 'href';
const LINK_STYLE_REL_VALUE = 'stylesheet';
const STYLE_ELEMENT = 'style';
const SCRIPT_ELEMENT = 'script';
const NG_NON_BINDABLE_ATTR = 'ngNonBindable';
const NG_PROJECT_AS = 'ngProjectAs';
export function preparseElement(ast) {
    let selectAttr = null;
    let hrefAttr = null;
    let relAttr = null;
    let nonBindable = false;
    let projectAs = '';
    ast.attrs.forEach(attr => {
        const lcAttrName = attr.name.toLowerCase();
        if (lcAttrName == NG_CONTENT_SELECT_ATTR) {
            selectAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
            hrefAttr = attr.value;
        }
        else if (lcAttrName == LINK_STYLE_REL_ATTR) {
            relAttr = attr.value;
        }
        else if (attr.name == NG_NON_BINDABLE_ATTR) {
            nonBindable = true;
        }
        else if (attr.name == NG_PROJECT_AS) {
            if (attr.value.length > 0) {
                projectAs = attr.value;
            }
        }
    });
    selectAttr = normalizeNgContentSelect(selectAttr);
    const nodeName = ast.name.toLowerCase();
    let type = PreparsedElementType.OTHER;
    if (isNgContent(nodeName)) {
        type = PreparsedElementType.NG_CONTENT;
    }
    else if (nodeName == STYLE_ELEMENT) {
        type = PreparsedElementType.STYLE;
    }
    else if (nodeName == SCRIPT_ELEMENT) {
        type = PreparsedElementType.SCRIPT;
    }
    else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
        type = PreparsedElementType.STYLESHEET;
    }
    return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs);
}
export var PreparsedElementType;
(function (PreparsedElementType) {
    PreparsedElementType[PreparsedElementType["NG_CONTENT"] = 0] = "NG_CONTENT";
    PreparsedElementType[PreparsedElementType["STYLE"] = 1] = "STYLE";
    PreparsedElementType[PreparsedElementType["STYLESHEET"] = 2] = "STYLESHEET";
    PreparsedElementType[PreparsedElementType["SCRIPT"] = 3] = "SCRIPT";
    PreparsedElementType[PreparsedElementType["OTHER"] = 4] = "OTHER";
})(PreparsedElementType || (PreparsedElementType = {}));
export class PreparsedElement {
    constructor(type, selectAttr, hrefAttr, nonBindable, projectAs) {
        this.type = type;
        this.selectAttr = selectAttr;
        this.hrefAttr = hrefAttr;
        this.nonBindable = nonBindable;
        this.projectAs = projectAs;
    }
}
function normalizeNgContentSelect(selectAttr) {
    if (selectAttr === null || selectAttr.length === 0) {
        return '*';
    }
    return selectAttr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcHJlcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9wcmVwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTlDLE1BQU0sc0JBQXNCLEdBQUcsUUFBUSxDQUFDO0FBQ3hDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQztBQUM1QixNQUFNLG1CQUFtQixHQUFHLEtBQUssQ0FBQztBQUNsQyxNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztBQUNwQyxNQUFNLG9CQUFvQixHQUFHLFlBQVksQ0FBQztBQUMxQyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFDOUIsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDO0FBQ2hDLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDO0FBQzdDLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUVwQyxNQUFNLFVBQVUsZUFBZSxDQUFDLEdBQWlCO0lBQy9DLElBQUksVUFBVSxHQUFnQixJQUFJLENBQUM7SUFDbkMsSUFBSSxRQUFRLEdBQWdCLElBQUksQ0FBQztJQUNqQyxJQUFJLE9BQU8sR0FBZ0IsSUFBSSxDQUFDO0lBQ2hDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDbkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQyxJQUFJLFVBQVUsSUFBSSxzQkFBc0IsRUFBRTtZQUN4QyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUN6QjthQUFNLElBQUksVUFBVSxJQUFJLG9CQUFvQixFQUFFO1lBQzdDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxVQUFVLElBQUksbUJBQW1CLEVBQUU7WUFDNUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDdEI7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksb0JBQW9CLEVBQUU7WUFDNUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUNwQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxhQUFhLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3pCLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3hCO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLElBQUksSUFBSSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztJQUN0QyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN6QixJQUFJLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxRQUFRLElBQUksYUFBYSxFQUFFO1FBQ3BDLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7S0FDbkM7U0FBTSxJQUFJLFFBQVEsSUFBSSxjQUFjLEVBQUU7UUFDckMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztLQUNwQztTQUFNLElBQUksUUFBUSxJQUFJLFlBQVksSUFBSSxPQUFPLElBQUksb0JBQW9CLEVBQUU7UUFDdEUsSUFBSSxHQUFHLG9CQUFvQixDQUFDLFVBQVUsQ0FBQztLQUN4QztJQUNELE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDbEYsQ0FBQztBQUVELE1BQU0sQ0FBTixJQUFZLG9CQU1YO0FBTkQsV0FBWSxvQkFBb0I7SUFDOUIsMkVBQVUsQ0FBQTtJQUNWLGlFQUFLLENBQUE7SUFDTCwyRUFBVSxDQUFBO0lBQ1YsbUVBQU0sQ0FBQTtJQUNOLGlFQUFLLENBQUE7QUFDUCxDQUFDLEVBTlcsb0JBQW9CLEtBQXBCLG9CQUFvQixRQU0vQjtBQUVELE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFDVyxJQUEwQixFQUFTLFVBQWtCLEVBQVMsUUFBcUIsRUFDbkYsV0FBb0IsRUFBUyxTQUFpQjtRQUQ5QyxTQUFJLEdBQUosSUFBSSxDQUFzQjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFhO1FBQ25GLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUFHLENBQUM7Q0FDOUQ7QUFHRCxTQUFTLHdCQUF3QixDQUFDLFVBQXVCO0lBQ3ZELElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNsRCxPQUFPLEdBQUcsQ0FBQztLQUNaO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBodG1sIGZyb20gJy4uL21sX3BhcnNlci9hc3QnO1xuaW1wb3J0IHtpc05nQ29udGVudH0gZnJvbSAnLi4vbWxfcGFyc2VyL3RhZ3MnO1xuXG5jb25zdCBOR19DT05URU5UX1NFTEVDVF9BVFRSID0gJ3NlbGVjdCc7XG5jb25zdCBMSU5LX0VMRU1FTlQgPSAnbGluayc7XG5jb25zdCBMSU5LX1NUWUxFX1JFTF9BVFRSID0gJ3JlbCc7XG5jb25zdCBMSU5LX1NUWUxFX0hSRUZfQVRUUiA9ICdocmVmJztcbmNvbnN0IExJTktfU1RZTEVfUkVMX1ZBTFVFID0gJ3N0eWxlc2hlZXQnO1xuY29uc3QgU1RZTEVfRUxFTUVOVCA9ICdzdHlsZSc7XG5jb25zdCBTQ1JJUFRfRUxFTUVOVCA9ICdzY3JpcHQnO1xuY29uc3QgTkdfTk9OX0JJTkRBQkxFX0FUVFIgPSAnbmdOb25CaW5kYWJsZSc7XG5jb25zdCBOR19QUk9KRUNUX0FTID0gJ25nUHJvamVjdEFzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcnNlRWxlbWVudChhc3Q6IGh0bWwuRWxlbWVudCk6IFByZXBhcnNlZEVsZW1lbnQge1xuICBsZXQgc2VsZWN0QXR0cjogc3RyaW5nfG51bGwgPSBudWxsO1xuICBsZXQgaHJlZkF0dHI6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgbGV0IHJlbEF0dHI6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgbGV0IG5vbkJpbmRhYmxlID0gZmFsc2U7XG4gIGxldCBwcm9qZWN0QXMgPSAnJztcbiAgYXN0LmF0dHJzLmZvckVhY2goYXR0ciA9PiB7XG4gICAgY29uc3QgbGNBdHRyTmFtZSA9IGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChsY0F0dHJOYW1lID09IE5HX0NPTlRFTlRfU0VMRUNUX0FUVFIpIHtcbiAgICAgIHNlbGVjdEF0dHIgPSBhdHRyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAobGNBdHRyTmFtZSA9PSBMSU5LX1NUWUxFX0hSRUZfQVRUUikge1xuICAgICAgaHJlZkF0dHIgPSBhdHRyLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAobGNBdHRyTmFtZSA9PSBMSU5LX1NUWUxFX1JFTF9BVFRSKSB7XG4gICAgICByZWxBdHRyID0gYXR0ci52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGF0dHIubmFtZSA9PSBOR19OT05fQklOREFCTEVfQVRUUikge1xuICAgICAgbm9uQmluZGFibGUgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoYXR0ci5uYW1lID09IE5HX1BST0pFQ1RfQVMpIHtcbiAgICAgIGlmIChhdHRyLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcHJvamVjdEFzID0gYXR0ci52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBzZWxlY3RBdHRyID0gbm9ybWFsaXplTmdDb250ZW50U2VsZWN0KHNlbGVjdEF0dHIpO1xuICBjb25zdCBub2RlTmFtZSA9IGFzdC5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGxldCB0eXBlID0gUHJlcGFyc2VkRWxlbWVudFR5cGUuT1RIRVI7XG4gIGlmIChpc05nQ29udGVudChub2RlTmFtZSkpIHtcbiAgICB0eXBlID0gUHJlcGFyc2VkRWxlbWVudFR5cGUuTkdfQ09OVEVOVDtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBTVFlMRV9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNUWUxFO1xuICB9IGVsc2UgaWYgKG5vZGVOYW1lID09IFNDUklQVF9FTEVNRU5UKSB7XG4gICAgdHlwZSA9IFByZXBhcnNlZEVsZW1lbnRUeXBlLlNDUklQVDtcbiAgfSBlbHNlIGlmIChub2RlTmFtZSA9PSBMSU5LX0VMRU1FTlQgJiYgcmVsQXR0ciA9PSBMSU5LX1NUWUxFX1JFTF9WQUxVRSkge1xuICAgIHR5cGUgPSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRVNIRUVUO1xuICB9XG4gIHJldHVybiBuZXcgUHJlcGFyc2VkRWxlbWVudCh0eXBlLCBzZWxlY3RBdHRyLCBocmVmQXR0ciwgbm9uQmluZGFibGUsIHByb2plY3RBcyk7XG59XG5cbmV4cG9ydCBlbnVtIFByZXBhcnNlZEVsZW1lbnRUeXBlIHtcbiAgTkdfQ09OVEVOVCxcbiAgU1RZTEUsXG4gIFNUWUxFU0hFRVQsXG4gIFNDUklQVCxcbiAgT1RIRVJcbn1cblxuZXhwb3J0IGNsYXNzIFByZXBhcnNlZEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB0eXBlOiBQcmVwYXJzZWRFbGVtZW50VHlwZSwgcHVibGljIHNlbGVjdEF0dHI6IHN0cmluZywgcHVibGljIGhyZWZBdHRyOiBzdHJpbmd8bnVsbCxcbiAgICAgIHB1YmxpYyBub25CaW5kYWJsZTogYm9vbGVhbiwgcHVibGljIHByb2plY3RBczogc3RyaW5nKSB7fVxufVxuXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU5nQ29udGVudFNlbGVjdChzZWxlY3RBdHRyOiBzdHJpbmd8bnVsbCk6IHN0cmluZyB7XG4gIGlmIChzZWxlY3RBdHRyID09PSBudWxsIHx8IHNlbGVjdEF0dHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICcqJztcbiAgfVxuICByZXR1cm4gc2VsZWN0QXR0cjtcbn1cbiJdfQ==