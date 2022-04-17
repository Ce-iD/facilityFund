/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// THIS CODE IS GENERATED - DO NOT MODIFY.
const u = undefined;
function plural(val) {
    const n = val, i = Math.floor(Math.abs(val)), v = val.toString().replace(/^[^.]*\.?/, '').length, f = parseInt(val.toString().replace(/^[^.]*\.?/, ''), 10) || 0;
    if (v === 0 && (i % 10 === 1 && !(i % 100 === 11)) || f % 10 === 1 && !(f % 100 === 11))
        return 1;
    if (v === 0 && (i % 10 === Math.floor(i % 10) && (i % 10 >= 2 && i % 10 <= 4) && !(i % 100 >= 12 && i % 100 <= 14)) || f % 10 === Math.floor(f % 10) && (f % 10 >= 2 && f % 10 <= 4) && !(f % 100 >= 12 && f % 100 <= 14))
        return 3;
    return 5;
}
export default ["sr-Cyrl-BA", [["a", "p"], ["прије подне", "по подне"], u], [["а", "p"], ["прије подне", "по подне"], u], [["н", "п", "у", "с", "ч", "п", "с"], ["нед", "пон", "уто", "сре", "чет", "пет", "суб"], ["недјеља", "понедјељак", "уторак", "сриједа", "четвртак", "петак", "субота"], ["не", "по", "ут", "ср", "че", "пе", "су"]], [["н", "п", "у", "с", "ч", "п", "с"], ["нед", "пон", "уто", "сри", "чет", "пет", "суб"], ["недјеља", "понедјељак", "уторак", "сриједа", "четвртак", "петак", "субота"], ["не", "по", "ут", "ср", "че", "пе", "су"]], [["ј", "ф", "м", "а", "м", "ј", "ј", "а", "с", "о", "н", "д"], ["јан", "феб", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "нов", "дец"], ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"]], u, [["п.н.е.", "н.е."], ["п. н. е.", "н. е."], ["прије нове ере", "нове ере"]], 1, [6, 0], ["d.M.yy.", "dd.MM.y.", "dd. MMMM y.", "EEEE, dd. MMMM y."], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1} {0}", u, u, u], [",", ".", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0%", "#,##0.00 ¤", "#E0"], "BAM", "КМ", "Босанскохерцеговачка конвертибилна марка", { "AUD": [u, "$"], "BAM": ["КМ", "KM"], "GEL": [u, "ლ"], "KRW": [u, "₩"], "NZD": [u, "$"], "PHP": [u, "₱"], "TWD": ["NT$"], "USD": ["US$", "$"], "VND": [u, "₫"] }, "ltr", plural];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ItQ3lybC1CQS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9sb2NhbGVzL3NyLUN5cmwtQkEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsMENBQTBDO0FBQzFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQztBQUVwQixTQUFTLE1BQU0sQ0FBQyxHQUFXO0lBQzNCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVqSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQztRQUNuRixPQUFPLENBQUMsQ0FBQztJQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ3JOLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsT0FBTyxDQUFDLENBQUM7QUFDVCxDQUFDO0FBRUQsZUFBZSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsYUFBYSxFQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxhQUFhLEVBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxRQUFRLENBQUMsRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsVUFBVSxFQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsZ0JBQWdCLEVBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxtQkFBbUIsQ0FBQyxFQUFDLENBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsZUFBZSxDQUFDLEVBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLDBDQUEwQyxFQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsRUFBQyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vLyBUSElTIENPREUgSVMgR0VORVJBVEVEIC0gRE8gTk9UIE1PRElGWS5cbmNvbnN0IHUgPSB1bmRlZmluZWQ7XG5cbmZ1bmN0aW9uIHBsdXJhbCh2YWw6IG51bWJlcik6IG51bWJlciB7XG5jb25zdCBuID0gdmFsLCBpID0gTWF0aC5mbG9vcihNYXRoLmFicyh2YWwpKSwgdiA9IHZhbC50b1N0cmluZygpLnJlcGxhY2UoL15bXi5dKlxcLj8vLCAnJykubGVuZ3RoLCBmID0gcGFyc2VJbnQodmFsLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteLl0qXFwuPy8sICcnKSwgMTApIHx8IDA7XG5cbmlmICh2ID09PSAwICYmIChpICUgMTAgPT09IDEgJiYgIShpICUgMTAwID09PSAxMSkpIHx8IGYgJSAxMCA9PT0gMSAmJiAhKGYgJSAxMDAgPT09IDExKSlcbiAgICByZXR1cm4gMTtcbmlmICh2ID09PSAwICYmIChpICUgMTAgPT09IE1hdGguZmxvb3IoaSAlIDEwKSAmJiAoaSAlIDEwID49IDIgJiYgaSAlIDEwIDw9IDQpICYmICEoaSAlIDEwMCA+PSAxMiAmJiBpICUgMTAwIDw9IDE0KSkgfHwgZiAlIDEwID09PSBNYXRoLmZsb29yKGYgJSAxMCkgJiYgKGYgJSAxMCA+PSAyICYmIGYgJSAxMCA8PSA0KSAmJiAhKGYgJSAxMDAgPj0gMTIgJiYgZiAlIDEwMCA8PSAxNCkpXG4gICAgcmV0dXJuIDM7XG5yZXR1cm4gNTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW1wic3ItQ3lybC1CQVwiLFtbXCJhXCIsXCJwXCJdLFtcItC/0YDQuNGY0LUg0L/QvtC00L3QtVwiLFwi0L/QviDQv9C+0LTQvdC1XCJdLHVdLFtbXCLQsFwiLFwicFwiXSxbXCLQv9GA0LjRmNC1INC/0L7QtNC90LVcIixcItC/0L4g0L/QvtC00L3QtVwiXSx1XSxbW1wi0L1cIixcItC/XCIsXCLRg1wiLFwi0YFcIixcItGHXCIsXCLQv1wiLFwi0YFcIl0sW1wi0L3QtdC0XCIsXCLQv9C+0L1cIixcItGD0YLQvlwiLFwi0YHRgNC1XCIsXCLRh9C10YJcIixcItC/0LXRglwiLFwi0YHRg9CxXCJdLFtcItC90LXQtNGY0LXRmdCwXCIsXCLQv9C+0L3QtdC00ZjQtdGZ0LDQulwiLFwi0YPRgtC+0YDQsNC6XCIsXCLRgdGA0LjRmNC10LTQsFwiLFwi0YfQtdGC0LLRgNGC0LDQulwiLFwi0L/QtdGC0LDQulwiLFwi0YHRg9Cx0L7RgtCwXCJdLFtcItC90LVcIixcItC/0L5cIixcItGD0YJcIixcItGB0YBcIixcItGH0LVcIixcItC/0LVcIixcItGB0YNcIl1dLFtbXCLQvVwiLFwi0L9cIixcItGDXCIsXCLRgVwiLFwi0YdcIixcItC/XCIsXCLRgVwiXSxbXCLQvdC10LRcIixcItC/0L7QvVwiLFwi0YPRgtC+XCIsXCLRgdGA0LhcIixcItGH0LXRglwiLFwi0L/QtdGCXCIsXCLRgdGD0LFcIl0sW1wi0L3QtdC00ZjQtdGZ0LBcIixcItC/0L7QvdC10LTRmNC10ZnQsNC6XCIsXCLRg9GC0L7RgNCw0LpcIixcItGB0YDQuNGY0LXQtNCwXCIsXCLRh9C10YLQstGA0YLQsNC6XCIsXCLQv9C10YLQsNC6XCIsXCLRgdGD0LHQvtGC0LBcIl0sW1wi0L3QtVwiLFwi0L/QvlwiLFwi0YPRglwiLFwi0YHRgFwiLFwi0YfQtVwiLFwi0L/QtVwiLFwi0YHRg1wiXV0sW1tcItGYXCIsXCLRhFwiLFwi0LxcIixcItCwXCIsXCLQvFwiLFwi0ZhcIixcItGYXCIsXCLQsFwiLFwi0YFcIixcItC+XCIsXCLQvVwiLFwi0LRcIl0sW1wi0ZjQsNC9XCIsXCLRhNC10LFcIixcItC80LDRgFwiLFwi0LDQv9GAXCIsXCLQvNCw0ZhcIixcItGY0YPQvVwiLFwi0ZjRg9C7XCIsXCLQsNCy0LNcIixcItGB0LXQv1wiLFwi0L7QutGCXCIsXCLQvdC+0LJcIixcItC00LXRhlwiXSxbXCLRmNCw0L3Rg9Cw0YBcIixcItGE0LXQsdGA0YPQsNGAXCIsXCLQvNCw0YDRglwiLFwi0LDQv9GA0LjQu1wiLFwi0LzQsNGYXCIsXCLRmNGD0L1cIixcItGY0YPQu1wiLFwi0LDQstCz0YPRgdGCXCIsXCLRgdC10L/RgtC10LzQsdCw0YBcIixcItC+0LrRgtC+0LHQsNGAXCIsXCLQvdC+0LLQtdC80LHQsNGAXCIsXCLQtNC10YbQtdC80LHQsNGAXCJdXSx1LFtbXCLQvy7QvS7QtS5cIixcItC9LtC1LlwiXSxbXCLQvy4g0L0uINC1LlwiLFwi0L0uINC1LlwiXSxbXCLQv9GA0LjRmNC1INC90L7QstC1INC10YDQtVwiLFwi0L3QvtCy0LUg0LXRgNC1XCJdXSwxLFs2LDBdLFtcImQuTS55eS5cIixcImRkLk1NLnkuXCIsXCJkZC4gTU1NTSB5LlwiLFwiRUVFRSwgZGQuIE1NTU0geS5cIl0sW1wiSEg6bW1cIixcIkhIOm1tOnNzXCIsXCJISDptbTpzcyB6XCIsXCJISDptbTpzcyB6enp6XCJdLFtcInsxfSB7MH1cIix1LHUsdV0sW1wiLFwiLFwiLlwiLFwiO1wiLFwiJVwiLFwiK1wiLFwiLVwiLFwiRVwiLFwiw5dcIixcIuKAsFwiLFwi4oieXCIsXCJOYU5cIixcIjpcIl0sW1wiIywjIzAuIyMjXCIsXCIjLCMjMCVcIixcIiMsIyMwLjAwwqDCpFwiLFwiI0UwXCJdLFwiQkFNXCIsXCLQmtCcXCIsXCLQkdC+0YHQsNC90YHQutC+0YXQtdGA0YbQtdCz0L7QstCw0YfQutCwINC60L7QvdCy0LXRgNGC0LjQsdC40LvQvdCwINC80LDRgNC60LBcIix7XCJBVURcIjpbdSxcIiRcIl0sXCJCQU1cIjpbXCLQmtCcXCIsXCJLTVwiXSxcIkdFTFwiOlt1LFwi4YOaXCJdLFwiS1JXXCI6W3UsXCLigqlcIl0sXCJOWkRcIjpbdSxcIiRcIl0sXCJQSFBcIjpbdSxcIuKCsVwiXSxcIlRXRFwiOltcIk5UJFwiXSxcIlVTRFwiOltcIlVTJFwiLFwiJFwiXSxcIlZORFwiOlt1LFwi4oKrXCJdfSxcImx0clwiLCBwbHVyYWxdO1xuIl19