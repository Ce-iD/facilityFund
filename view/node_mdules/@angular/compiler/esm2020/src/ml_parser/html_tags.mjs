/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TagContentType } from './tags';
export class HtmlTagDefinition {
    constructor({ closedByChildren, implicitNamespacePrefix, contentType = TagContentType.PARSABLE_DATA, closedByParent = false, isVoid = false, ignoreFirstLf = false, preventNamespaceInheritance = false } = {}) {
        this.closedByChildren = {};
        this.closedByParent = false;
        this.canSelfClose = false;
        if (closedByChildren && closedByChildren.length > 0) {
            closedByChildren.forEach(tagName => this.closedByChildren[tagName] = true);
        }
        this.isVoid = isVoid;
        this.closedByParent = closedByParent || isVoid;
        this.implicitNamespacePrefix = implicitNamespacePrefix || null;
        this.contentType = contentType;
        this.ignoreFirstLf = ignoreFirstLf;
        this.preventNamespaceInheritance = preventNamespaceInheritance;
    }
    isClosedByChild(name) {
        return this.isVoid || name.toLowerCase() in this.closedByChildren;
    }
    getContentType(prefix) {
        if (typeof this.contentType === 'object') {
            const overrideType = prefix === undefined ? undefined : this.contentType[prefix];
            return overrideType ?? this.contentType.default;
        }
        return this.contentType;
    }
}
let _DEFAULT_TAG_DEFINITION;
// see https://www.w3.org/TR/html51/syntax.html#optional-tags
// This implementation does not fully conform to the HTML5 spec.
let TAG_DEFINITIONS;
export function getHtmlTagDefinition(tagName) {
    if (!TAG_DEFINITIONS) {
        _DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
        TAG_DEFINITIONS = {
            'base': new HtmlTagDefinition({ isVoid: true }),
            'meta': new HtmlTagDefinition({ isVoid: true }),
            'area': new HtmlTagDefinition({ isVoid: true }),
            'embed': new HtmlTagDefinition({ isVoid: true }),
            'link': new HtmlTagDefinition({ isVoid: true }),
            'img': new HtmlTagDefinition({ isVoid: true }),
            'input': new HtmlTagDefinition({ isVoid: true }),
            'param': new HtmlTagDefinition({ isVoid: true }),
            'hr': new HtmlTagDefinition({ isVoid: true }),
            'br': new HtmlTagDefinition({ isVoid: true }),
            'source': new HtmlTagDefinition({ isVoid: true }),
            'track': new HtmlTagDefinition({ isVoid: true }),
            'wbr': new HtmlTagDefinition({ isVoid: true }),
            'p': new HtmlTagDefinition({
                closedByChildren: [
                    'address', 'article', 'aside', 'blockquote', 'div', 'dl', 'fieldset',
                    'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5',
                    'h6', 'header', 'hgroup', 'hr', 'main', 'nav', 'ol',
                    'p', 'pre', 'section', 'table', 'ul'
                ],
                closedByParent: true
            }),
            'thead': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'] }),
            'tbody': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'], closedByParent: true }),
            'tfoot': new HtmlTagDefinition({ closedByChildren: ['tbody'], closedByParent: true }),
            'tr': new HtmlTagDefinition({ closedByChildren: ['tr'], closedByParent: true }),
            'td': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
            'th': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
            'col': new HtmlTagDefinition({ isVoid: true }),
            'svg': new HtmlTagDefinition({ implicitNamespacePrefix: 'svg' }),
            'foreignObject': new HtmlTagDefinition({
                // Usually the implicit namespace here would be redundant since it will be inherited from
                // the parent `svg`, but we have to do it for `foreignObject`, because the way the parser
                // works is that the parent node of an end tag is its own start tag which means that
                // the `preventNamespaceInheritance` on `foreignObject` would have it default to the
                // implicit namespace which is `html`, unless specified otherwise.
                implicitNamespacePrefix: 'svg',
                // We want to prevent children of foreignObject from inheriting its namespace, because
                // the point of the element is to allow nodes from other namespaces to be inserted.
                preventNamespaceInheritance: true,
            }),
            'math': new HtmlTagDefinition({ implicitNamespacePrefix: 'math' }),
            'li': new HtmlTagDefinition({ closedByChildren: ['li'], closedByParent: true }),
            'dt': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'] }),
            'dd': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'], closedByParent: true }),
            'rb': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
            'rt': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
            'rtc': new HtmlTagDefinition({ closedByChildren: ['rb', 'rtc', 'rp'], closedByParent: true }),
            'rp': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
            'optgroup': new HtmlTagDefinition({ closedByChildren: ['optgroup'], closedByParent: true }),
            'option': new HtmlTagDefinition({ closedByChildren: ['option', 'optgroup'], closedByParent: true }),
            'pre': new HtmlTagDefinition({ ignoreFirstLf: true }),
            'listing': new HtmlTagDefinition({ ignoreFirstLf: true }),
            'style': new HtmlTagDefinition({ contentType: TagContentType.RAW_TEXT }),
            'script': new HtmlTagDefinition({ contentType: TagContentType.RAW_TEXT }),
            'title': new HtmlTagDefinition({
                // The browser supports two separate `title` tags which have to use
                // a different content type: `HTMLTitleElement` and `SVGTitleElement`
                contentType: { default: TagContentType.ESCAPABLE_RAW_TEXT, svg: TagContentType.PARSABLE_DATA }
            }),
            'textarea': new HtmlTagDefinition({ contentType: TagContentType.ESCAPABLE_RAW_TEXT, ignoreFirstLf: true }),
        };
    }
    // We have to make both a case-sensitive and a case-insensitive lookup, because
    // HTML tag names are case insensitive, whereas some SVG tags are case sensitive.
    return TAG_DEFINITIONS[tagName] ?? TAG_DEFINITIONS[tagName.toLowerCase()] ??
        _DEFAULT_TAG_DEFINITION;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF90YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL21sX3BhcnNlci9odG1sX3RhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBZ0IsTUFBTSxRQUFRLENBQUM7QUFFckQsTUFBTSxPQUFPLGlCQUFpQjtJQVk1QixZQUFZLEVBQ1YsZ0JBQWdCLEVBQ2hCLHVCQUF1QixFQUN2QixXQUFXLEdBQUcsY0FBYyxDQUFDLGFBQWEsRUFDMUMsY0FBYyxHQUFHLEtBQUssRUFDdEIsTUFBTSxHQUFHLEtBQUssRUFDZCxhQUFhLEdBQUcsS0FBSyxFQUNyQiwyQkFBMkIsR0FBRyxLQUFLLEtBU2pDLEVBQUU7UUEzQkUscUJBQWdCLEdBQTZCLEVBQUUsQ0FBQztRQUl4RCxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUloQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQW9CNUIsSUFBSSxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM1RTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxJQUFJLE1BQU0sQ0FBQztRQUMvQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLElBQUksSUFBSSxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQywyQkFBMkIsR0FBRywyQkFBMkIsQ0FBQztJQUNqRSxDQUFDO0lBRUQs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SixJQUFJLGlCQUFpQixDQUFDLEVBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBQyxDQUFDO1lBQzNGLEtBQUssRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsYUFBYSxFQUFFLElBQUksRUFBQyxDQUFDO1lBQ25ELFNBQVMsRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsYUFBYSxFQUFFLElBQUksRUFBQyxDQUFDO1lBQ3ZELE9BQU8sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxRQUFRLEVBQUMsQ0FBQztZQUN0RSxRQUFRLEVBQUUsSUFBSSxpQkFBaUIsQ0FBQyxFQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsUUFBUSxFQUFDLENBQUM7WUFDdkUsT0FBTyxFQUFFLElBQUksaUJBQWlCLENBQUM7Z0JBQzdCLG1FQUFtRTtnQkFDbkUscUVBQXFFO2dCQUNyRSxXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxjQUFjLENBQUMsYUFBYSxFQUFDO2FBQzdGLENBQUM7WUFDRixVQUFVLEVBQUUsSUFBSSxpQkFBaUIsQ0FDN0IsRUFBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUMsQ0FBQztTQUMzRSxDQUFDO0tBQ0g7SUFDRCwrRUFBK0U7SUFDL0UsaUZBQWlGO0lBQ2pGLE9BQU8sZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckUsdUJBQXVCLENBQUM7QUFDOUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1RhZ0NvbnRlbnRUeXBlLCBUYWdEZWZpbml0aW9ufSBmcm9tICcuL3RhZ3MnO1xuXG5leHBvcnQgY2xhc3MgSHRtbFRhZ0RlZmluaXRpb24gaW1wbGVtZW50cyBUYWdEZWZpbml0aW9uIHtcbiAgcHJpdmF0ZSBjbG9zZWRCeUNoaWxkcmVuOiB7W2tleTogc3RyaW5nXTogYm9vbGVhbn0gPSB7fTtcbiAgcHJpdmF0ZSBjb250ZW50VHlwZTogVGFnQ29udGVudFR5cGV8XG4gICAgICB7ZGVmYXVsdDogVGFnQ29udGVudFR5cGUsIFtuYW1lc3BhY2U6IHN0cmluZ106IFRhZ0NvbnRlbnRUeXBlfTtcblxuICBjbG9zZWRCeVBhcmVudDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeDogc3RyaW5nfG51bGw7XG4gIGlzVm9pZDogYm9vbGVhbjtcbiAgaWdub3JlRmlyc3RMZjogYm9vbGVhbjtcbiAgY2FuU2VsZkNsb3NlOiBib29sZWFuID0gZmFsc2U7XG4gIHByZXZlbnROYW1lc3BhY2VJbmhlcml0YW5jZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgY2xvc2VkQnlDaGlsZHJlbixcbiAgICBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeCxcbiAgICBjb250ZW50VHlwZSA9IFRhZ0NvbnRlbnRUeXBlLlBBUlNBQkxFX0RBVEEsXG4gICAgY2xvc2VkQnlQYXJlbnQgPSBmYWxzZSxcbiAgICBpc1ZvaWQgPSBmYWxzZSxcbiAgICBpZ25vcmVGaXJzdExmID0gZmFsc2UsXG4gICAgcHJldmVudE5hbWVzcGFjZUluaGVyaXRhbmNlID0gZmFsc2VcbiAgfToge1xuICAgIGNsb3NlZEJ5Q2hpbGRyZW4/OiBzdHJpbmdbXSxcbiAgICBjbG9zZWRCeVBhcmVudD86IGJvb2xlYW4sXG4gICAgaW1wbGljaXROYW1lc3BhY2VQcmVmaXg/OiBzdHJpbmcsXG4gICAgY29udGVudFR5cGU/OiBUYWdDb250ZW50VHlwZXx7ZGVmYXVsdDogVGFnQ29udGVudFR5cGUsIFtuYW1lc3BhY2U6IHN0cmluZ106IFRhZ0NvbnRlbnRUeXBlfSxcbiAgICBpc1ZvaWQ/OiBib29sZWFuLFxuICAgIGlnbm9yZUZpcnN0TGY/OiBib29sZWFuLFxuICAgIHByZXZlbnROYW1lc3BhY2VJbmhlcml0YW5jZT86IGJvb2xlYW5cbiAgfSA9IHt9KSB7XG4gICAgaWYgKGNsb3NlZEJ5Q2hpbGRyZW4gJiYgY2xvc2VkQnlDaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBjbG9zZWRCeUNoaWxkcmVuLmZvckVhY2godGFnTmFtZSA9PiB0aGlzLmNsb3NlZEJ5Q2hpbGRyZW5bdGFnTmFtZV0gPSB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5pc1ZvaWQgPSBpc1ZvaWQ7XG4gICAgdGhpcy5jbG9zZWRCeVBhcmVudCA9IGNsb3NlZEJ5UGFyZW50IHx8IGlzVm9pZDtcbiAgICB0aGlzLmltcGxpY2l0TmFtZXNwYWNlUHJlZml4ID0gaW1wbGljaXROYW1lc3BhY2VQcmVmaXggfHwgbnVsbDtcbiAgICB0aGlzLmNvbnRlbnRUeXBlID0gY29udGVudFR5cGU7XG4gICAgdGhpcy5pZ25vcmVGaXJzdExmID0gaWdub3JlRmlyc3RMZjtcbiAgICB0aGlzLnByZXZlbnROYW1lc3BhY2VJbmhlcml0YW5jZSA9IHByZXZlbnROYW1lc3BhY2VJbmhlcml0YW5jZTtcbiAgfVxuXG4gIGlzQ2xvc2VkQnlDaGlsZChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1ZvaWQgfHwgbmFtZS50b0xvd2VyQ2FzZSgpIGluIHRoaXMuY2xvc2VkQnlDaGlsZHJlbjtcbiAgfVxuXG4gIGdldENvbnRlbnRUeXBlKHByZWZpeD86IHN0cmluZyk6IFRhZ0NvbnRlbnRUeXBlIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuY29udGVudFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCBvdmVycmlkZVR5cGUgPSBwcmVmaXggPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHRoaXMuY29udGVudFR5cGVbcHJlZml4XTtcbiAgICAgIHJldHVybiBvdmVycmlkZVR5cGUgPz8gdGhpcy5jb250ZW50VHlwZS5kZWZhdWx0O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb250ZW50VHlwZTtcbiAgfVxufVxuXG5sZXQgX0RFRkFVTFRfVEFHX0RFRklOSVRJT04hOiBIdG1sVGFnRGVmaW5pdGlvbjtcblxuLy8gc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNTEvc3ludGF4Lmh0bWwjb3B0aW9uYWwtdGFnc1xuLy8gVGhpcyBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdCBmdWxseSBjb25mb3JtIHRvIHRoZSBIVE1MNSBzcGVjLlxubGV0IFRBR19ERUZJTklUSU9OUyE6IHtba2V5OiBzdHJpbmddOiBIdG1sVGFnRGVmaW5pdGlvbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIdG1sVGFnRGVmaW5pdGlvbih0YWdOYW1lOiBzdHJpbmcpOiBIdG1sVGFnRGVmaW5pdGlvbiB7XG4gIGlmICghVEFHX0RFRklOSVRJT05TKSB7XG4gICAgX0RFRkFVTFRfVEFHX0RFRklOSVRJT04gPSBuZXcgSHRtbFRhZ0RlZmluaXRpb24oKTtcbiAgICBUQUdfREVGSU5JVElPTlMgPSB7XG4gICAgICAnYmFzZSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnbWV0YSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnYXJlYSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnZW1iZWQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAgICAgJ2xpbmsnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAgICAgJ2ltZyc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnaW5wdXQnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAgICAgJ3BhcmFtJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICdocic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAnYnInOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAgICAgJ3NvdXJjZSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAndHJhY2snOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lzVm9pZDogdHJ1ZX0pLFxuICAgICAgJ3dicic6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aXNWb2lkOiB0cnVlfSksXG4gICAgICAncCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7XG4gICAgICAgIGNsb3NlZEJ5Q2hpbGRyZW46IFtcbiAgICAgICAgICAnYWRkcmVzcycsICdhcnRpY2xlJywgJ2FzaWRlJywgICAnYmxvY2txdW90ZScsICdkaXYnLCAgJ2RsJywgICdmaWVsZHNldCcsXG4gICAgICAgICAgJ2Zvb3RlcicsICAnZm9ybScsICAgICdoMScsICAgICAgJ2gyJywgICAgICAgICAnaDMnLCAgICdoNCcsICAnaDUnLFxuICAgICAgICAgICdoNicsICAgICAgJ2hlYWRlcicsICAnaGdyb3VwJywgICdocicsICAgICAgICAgJ21haW4nLCAnbmF2JywgJ29sJyxcbiAgICAgICAgICAncCcsICAgICAgICdwcmUnLCAgICAgJ3NlY3Rpb24nLCAndGFibGUnLCAgICAgICd1bCdcbiAgICAgICAgXSxcbiAgICAgICAgY2xvc2VkQnlQYXJlbnQ6IHRydWVcbiAgICAgIH0pLFxuICAgICAgJ3RoZWFkJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3Rib2R5JywgJ3Rmb290J119KSxcbiAgICAgICd0Ym9keSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWyd0Ym9keScsICd0Zm9vdCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ3Rmb290JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3Rib2R5J10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICAgICAndHInOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2Nsb3NlZEJ5Q2hpbGRyZW46IFsndHInXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICd0ZCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWyd0ZCcsICd0aCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ3RoJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3RkJywgJ3RoJ10sIGNsb3NlZEJ5UGFyZW50OiB0cnVlfSksXG4gICAgICAnY29sJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtpc1ZvaWQ6IHRydWV9KSxcbiAgICAgICdzdmcnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2ltcGxpY2l0TmFtZXNwYWNlUHJlZml4OiAnc3ZnJ30pLFxuICAgICAgJ2ZvcmVpZ25PYmplY3QnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe1xuICAgICAgICAvLyBVc3VhbGx5IHRoZSBpbXBsaWNpdCBuYW1lc3BhY2UgaGVyZSB3b3VsZCBiZSByZWR1bmRhbnQgc2luY2UgaXQgd2lsbCBiZSBpbmhlcml0ZWQgZnJvbVxuICAgICAgICAvLyB0aGUgcGFyZW50IGBzdmdgLCBidXQgd2UgaGF2ZSB0byBkbyBpdCBmb3IgYGZvcmVpZ25PYmplY3RgLCBiZWNhdXNlIHRoZSB3YXkgdGhlIHBhcnNlclxuICAgICAgICAvLyB3b3JrcyBpcyB0aGF0IHRoZSBwYXJlbnQgbm9kZSBvZiBhbiBlbmQgdGFnIGlzIGl0cyBvd24gc3RhcnQgdGFnIHdoaWNoIG1lYW5zIHRoYXRcbiAgICAgICAgLy8gdGhlIGBwcmV2ZW50TmFtZXNwYWNlSW5oZXJpdGFuY2VgIG9uIGBmb3JlaWduT2JqZWN0YCB3b3VsZCBoYXZlIGl0IGRlZmF1bHQgdG8gdGhlXG4gICAgICAgIC8vIGltcGxpY2l0IG5hbWVzcGFjZSB3aGljaCBpcyBgaHRtbGAsIHVubGVzcyBzcGVjaWZpZWQgb3RoZXJ3aXNlLlxuICAgICAgICBpbXBsaWNpdE5hbWVzcGFjZVByZWZpeDogJ3N2ZycsXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gcHJldmVudCBjaGlsZHJlbiBvZiBmb3JlaWduT2JqZWN0IGZyb20gaW5oZXJpdGluZyBpdHMgbmFtZXNwYWNlLCBiZWNhdXNlXG4gICAgICAgIC8vIHRoZSBwb2ludCBvZiB0aGUgZWxlbWVudCBpcyB0byBhbGxvdyBub2RlcyBmcm9tIG90aGVyIG5hbWVzcGFjZXMgdG8gYmUgaW5zZXJ0ZWQuXG4gICAgICAgIHByZXZlbnROYW1lc3BhY2VJbmhlcml0YW5jZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgJ21hdGgnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2ltcGxpY2l0TmFtZXNwYWNlUHJlZml4OiAnbWF0aCd9KSxcbiAgICAgICdsaSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWydsaSddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ2R0JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ2R0JywgJ2RkJ119KSxcbiAgICAgICdkZCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWydkdCcsICdkZCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ3JiJzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKFxuICAgICAgICAgIHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3JiJywgJ3J0JywgJ3J0YycsICdycCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ3J0JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKFxuICAgICAgICAgIHtjbG9zZWRCeUNoaWxkcmVuOiBbJ3JiJywgJ3J0JywgJ3J0YycsICdycCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ3J0Yyc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWydyYicsICdydGMnLCAncnAnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICdycCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbihcbiAgICAgICAgICB7Y2xvc2VkQnlDaGlsZHJlbjogWydyYicsICdydCcsICdydGMnLCAncnAnXSwgY2xvc2VkQnlQYXJlbnQ6IHRydWV9KSxcbiAgICAgICdvcHRncm91cCc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y2xvc2VkQnlDaGlsZHJlbjogWydvcHRncm91cCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ29wdGlvbic6XG4gICAgICAgICAgbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjbG9zZWRCeUNoaWxkcmVuOiBbJ29wdGlvbicsICdvcHRncm91cCddLCBjbG9zZWRCeVBhcmVudDogdHJ1ZX0pLFxuICAgICAgJ3ByZSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7aWdub3JlRmlyc3RMZjogdHJ1ZX0pLFxuICAgICAgJ2xpc3RpbmcnOiBuZXcgSHRtbFRhZ0RlZmluaXRpb24oe2lnbm9yZUZpcnN0TGY6IHRydWV9KSxcbiAgICAgICdzdHlsZSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7Y29udGVudFR5cGU6IFRhZ0NvbnRlbnRUeXBlLlJBV19URVhUfSksXG4gICAgICAnc2NyaXB0JzogbmV3IEh0bWxUYWdEZWZpbml0aW9uKHtjb250ZW50VHlwZTogVGFnQ29udGVudFR5cGUuUkFXX1RFWFR9KSxcbiAgICAgICd0aXRsZSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbih7XG4gICAgICAgIC8vIFRoZSBicm93c2VyIHN1cHBvcnRzIHR3byBzZXBhcmF0ZSBgdGl0bGVgIHRhZ3Mgd2hpY2ggaGF2ZSB0byB1c2VcbiAgICAgICAgLy8gYSBkaWZmZXJlbnQgY29udGVudCB0eXBlOiBgSFRNTFRpdGxlRWxlbWVudGAgYW5kIGBTVkdUaXRsZUVsZW1lbnRgXG4gICAgICAgIGNvbnRlbnRUeXBlOiB7ZGVmYXVsdDogVGFnQ29udGVudFR5cGUuRVNDQVBBQkxFX1JBV19URVhULCBzdmc6IFRhZ0NvbnRlbnRUeXBlLlBBUlNBQkxFX0RBVEF9XG4gICAgICB9KSxcbiAgICAgICd0ZXh0YXJlYSc6IG5ldyBIdG1sVGFnRGVmaW5pdGlvbihcbiAgICAgICAgICB7Y29udGVudFR5cGU6IFRhZ0NvbnRlbnRUeXBlLkVTQ0FQQUJMRV9SQVdfVEVYVCwgaWdub3JlRmlyc3RMZjogdHJ1ZX0pLFxuICAgIH07XG4gIH1cbiAgLy8gV2UgaGF2ZSB0byBtYWtlIGJvdGggYSBjYXNlLXNlbnNpdGl2ZSBhbmQgYSBjYXNlLWluc2Vuc2l0aXZlIGxvb2t1cCwgYmVjYXVzZVxuICAvLyBIVE1MIHRhZyBuYW1lcyBhcmUgY2FzZSBpbnNlbnNpdGl2ZSwgd2hlcmVhcyBzb21lIFNWRyB0YWdzIGFyZSBjYXNlIHNlbnNpdGl2ZS5cbiAgcmV0dXJuIFRBR19ERUZJTklUSU9OU1t0YWdOYW1lXSA/PyBUQUdfREVGSU5JVElPTlNbdGFnTmFtZS50b0xvd2VyQ2FzZSgpXSA/P1xuICAgICAgX0RFRkFVTFRfVEFHX0RFRklOSVRJT047XG59XG4iXX0=