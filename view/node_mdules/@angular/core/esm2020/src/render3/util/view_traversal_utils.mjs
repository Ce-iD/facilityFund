/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertDefined } from '../../util/assert';
import { assertLView } from '../assert';
import { readPatchedLView } from '../context_discovery';
import { isLContainer, isLView } from '../interfaces/type_checks';
import { CHILD_HEAD, CONTEXT, FLAGS, NEXT, PARENT } from '../interfaces/view';
/**
 * Gets the parent LView of the passed LView, if the PARENT is an LContainer, will get the parent of
 * that LContainer, which is an LView
 * @param lView the lView whose parent to get
 */
export function getLViewParent(lView) {
    ngDevMode && assertLView(lView);
    const parent = lView[PARENT];
    return isLContainer(parent) ? parent[PARENT] : parent;
}
/**
 * Retrieve the root view from any component or `LView` by walking the parent `LView` until
 * reaching the root `LView`.
 *
 * @param componentOrLView any component or `LView`
 */
export function getRootView(componentOrLView) {
    ngDevMode && assertDefined(componentOrLView, 'component');
    let lView = isLView(componentOrLView) ? componentOrLView : readPatchedLView(componentOrLView);
    while (lView && !(lView[FLAGS] & 512 /* IsRoot */)) {
        lView = getLViewParent(lView);
    }
    ngDevMode && assertLView(lView);
    return lView;
}
/**
 * Returns the `RootContext` instance that is associated with
 * the application where the target is situated. It does this by walking the parent views until it
 * gets to the root view, then getting the context off of that.
 *
 * @param viewOrComponent the `LView` or component to get the root context for.
 */
export function getRootContext(viewOrComponent) {
    const rootView = getRootView(viewOrComponent);
    ngDevMode &&
        assertDefined(rootView[CONTEXT], 'RootView has no context. Perhaps it is disconnected?');
    return rootView[CONTEXT];
}
/**
 * Gets the first `LContainer` in the LView or `null` if none exists.
 */
export function getFirstLContainer(lView) {
    return getNearestLContainer(lView[CHILD_HEAD]);
}
/**
 * Gets the next `LContainer` that is a sibling of the given container.
 */
export function getNextLContainer(container) {
    return getNearestLContainer(container[NEXT]);
}
function getNearestLContainer(viewOrContainer) {
    while (viewOrContainer !== null && !isLContainer(viewOrContainer)) {
        viewOrContainer = viewOrContainer[NEXT];
    }
    return viewOrContainer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld190cmF2ZXJzYWxfdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3V0aWwvdmlld190cmF2ZXJzYWxfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFlBQVksRUFBRSxPQUFPLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQXFCLElBQUksRUFBRSxNQUFNLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUc1Rzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxLQUFZO0lBQ3pDLFNBQVMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUN6RCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLGdCQUEwQjtJQUNwRCxTQUFTLElBQUksYUFBYSxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzFELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUUsQ0FBQztJQUMvRixPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxtQkFBb0IsQ0FBQyxFQUFFO1FBQ25ELEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDaEM7SUFDRCxTQUFTLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsZUFBeUI7SUFDdEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzlDLFNBQVM7UUFDTCxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLHNEQUFzRCxDQUFDLENBQUM7SUFDN0YsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFnQixDQUFDO0FBQzFDLENBQUM7QUFHRDs7R0FFRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxLQUFZO0lBQzdDLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFNBQXFCO0lBQ3JELE9BQU8sb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsZUFBc0M7SUFDbEUsT0FBTyxlQUFlLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ2pFLGVBQWUsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekM7SUFDRCxPQUFPLGVBQW9DLENBQUM7QUFDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2Fzc2VydERlZmluZWR9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7YXNzZXJ0TFZpZXd9IGZyb20gJy4uL2Fzc2VydCc7XG5pbXBvcnQge3JlYWRQYXRjaGVkTFZpZXd9IGZyb20gJy4uL2NvbnRleHRfZGlzY292ZXJ5JztcbmltcG9ydCB7TENvbnRhaW5lcn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtpc0xDb250YWluZXIsIGlzTFZpZXd9IGZyb20gJy4uL2ludGVyZmFjZXMvdHlwZV9jaGVja3MnO1xuaW1wb3J0IHtDSElMRF9IRUFELCBDT05URVhULCBGTEFHUywgTFZpZXcsIExWaWV3RmxhZ3MsIE5FWFQsIFBBUkVOVCwgUm9vdENvbnRleHR9IGZyb20gJy4uL2ludGVyZmFjZXMvdmlldyc7XG5cblxuLyoqXG4gKiBHZXRzIHRoZSBwYXJlbnQgTFZpZXcgb2YgdGhlIHBhc3NlZCBMVmlldywgaWYgdGhlIFBBUkVOVCBpcyBhbiBMQ29udGFpbmVyLCB3aWxsIGdldCB0aGUgcGFyZW50IG9mXG4gKiB0aGF0IExDb250YWluZXIsIHdoaWNoIGlzIGFuIExWaWV3XG4gKiBAcGFyYW0gbFZpZXcgdGhlIGxWaWV3IHdob3NlIHBhcmVudCB0byBnZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExWaWV3UGFyZW50KGxWaWV3OiBMVmlldyk6IExWaWV3fG51bGwge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TFZpZXcobFZpZXcpO1xuICBjb25zdCBwYXJlbnQgPSBsVmlld1tQQVJFTlRdO1xuICByZXR1cm4gaXNMQ29udGFpbmVyKHBhcmVudCkgPyBwYXJlbnRbUEFSRU5UXSEgOiBwYXJlbnQ7XG59XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIHJvb3QgdmlldyBmcm9tIGFueSBjb21wb25lbnQgb3IgYExWaWV3YCBieSB3YWxraW5nIHRoZSBwYXJlbnQgYExWaWV3YCB1bnRpbFxuICogcmVhY2hpbmcgdGhlIHJvb3QgYExWaWV3YC5cbiAqXG4gKiBAcGFyYW0gY29tcG9uZW50T3JMVmlldyBhbnkgY29tcG9uZW50IG9yIGBMVmlld2BcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RWaWV3KGNvbXBvbmVudE9yTFZpZXc6IExWaWV3fHt9KTogTFZpZXcge1xuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZChjb21wb25lbnRPckxWaWV3LCAnY29tcG9uZW50Jyk7XG4gIGxldCBsVmlldyA9IGlzTFZpZXcoY29tcG9uZW50T3JMVmlldykgPyBjb21wb25lbnRPckxWaWV3IDogcmVhZFBhdGNoZWRMVmlldyhjb21wb25lbnRPckxWaWV3KSE7XG4gIHdoaWxlIChsVmlldyAmJiAhKGxWaWV3W0ZMQUdTXSAmIExWaWV3RmxhZ3MuSXNSb290KSkge1xuICAgIGxWaWV3ID0gZ2V0TFZpZXdQYXJlbnQobFZpZXcpITtcbiAgfVxuICBuZ0Rldk1vZGUgJiYgYXNzZXJ0TFZpZXcobFZpZXcpO1xuICByZXR1cm4gbFZpZXc7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYFJvb3RDb250ZXh0YCBpbnN0YW5jZSB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aFxuICogdGhlIGFwcGxpY2F0aW9uIHdoZXJlIHRoZSB0YXJnZXQgaXMgc2l0dWF0ZWQuIEl0IGRvZXMgdGhpcyBieSB3YWxraW5nIHRoZSBwYXJlbnQgdmlld3MgdW50aWwgaXRcbiAqIGdldHMgdG8gdGhlIHJvb3QgdmlldywgdGhlbiBnZXR0aW5nIHRoZSBjb250ZXh0IG9mZiBvZiB0aGF0LlxuICpcbiAqIEBwYXJhbSB2aWV3T3JDb21wb25lbnQgdGhlIGBMVmlld2Agb3IgY29tcG9uZW50IHRvIGdldCB0aGUgcm9vdCBjb250ZXh0IGZvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RDb250ZXh0KHZpZXdPckNvbXBvbmVudDogTFZpZXd8e30pOiBSb290Q29udGV4dCB7XG4gIGNvbnN0IHJvb3RWaWV3ID0gZ2V0Um9vdFZpZXcodmlld09yQ29tcG9uZW50KTtcbiAgbmdEZXZNb2RlICYmXG4gICAgICBhc3NlcnREZWZpbmVkKHJvb3RWaWV3W0NPTlRFWFRdLCAnUm9vdFZpZXcgaGFzIG5vIGNvbnRleHQuIFBlcmhhcHMgaXQgaXMgZGlzY29ubmVjdGVkPycpO1xuICByZXR1cm4gcm9vdFZpZXdbQ09OVEVYVF0gYXMgUm9vdENvbnRleHQ7XG59XG5cblxuLyoqXG4gKiBHZXRzIHRoZSBmaXJzdCBgTENvbnRhaW5lcmAgaW4gdGhlIExWaWV3IG9yIGBudWxsYCBpZiBub25lIGV4aXN0cy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0TENvbnRhaW5lcihsVmlldzogTFZpZXcpOiBMQ29udGFpbmVyfG51bGwge1xuICByZXR1cm4gZ2V0TmVhcmVzdExDb250YWluZXIobFZpZXdbQ0hJTERfSEVBRF0pO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5leHQgYExDb250YWluZXJgIHRoYXQgaXMgYSBzaWJsaW5nIG9mIHRoZSBnaXZlbiBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0TENvbnRhaW5lcihjb250YWluZXI6IExDb250YWluZXIpOiBMQ29udGFpbmVyfG51bGwge1xuICByZXR1cm4gZ2V0TmVhcmVzdExDb250YWluZXIoY29udGFpbmVyW05FWFRdKTtcbn1cblxuZnVuY3Rpb24gZ2V0TmVhcmVzdExDb250YWluZXIodmlld09yQ29udGFpbmVyOiBMQ29udGFpbmVyfExWaWV3fG51bGwpIHtcbiAgd2hpbGUgKHZpZXdPckNvbnRhaW5lciAhPT0gbnVsbCAmJiAhaXNMQ29udGFpbmVyKHZpZXdPckNvbnRhaW5lcikpIHtcbiAgICB2aWV3T3JDb250YWluZXIgPSB2aWV3T3JDb250YWluZXJbTkVYVF07XG4gIH1cbiAgcmV0dXJuIHZpZXdPckNvbnRhaW5lciBhcyBMQ29udGFpbmVyIHwgbnVsbDtcbn1cbiJdfQ==