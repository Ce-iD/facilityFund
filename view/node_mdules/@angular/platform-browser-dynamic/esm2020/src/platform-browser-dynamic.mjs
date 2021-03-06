/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ResourceLoader } from '@angular/compiler';
import { createPlatformFactory } from '@angular/core';
import { platformCoreDynamic } from './platform_core_dynamic';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from './platform_providers';
import { CachedResourceLoader } from './resource_loader/resource_loader_cache';
export * from './private_export';
export { VERSION } from './version';
export { JitCompilerFactory } from './compiler_factory';
/**
 * @publicApi
 *
 * @deprecated This was previously necessary in some cases to test AOT-compiled components with View
 *     Engine, but is no longer since Ivy.

 */
export const RESOURCE_CACHE_PROVIDER = [{ provide: ResourceLoader, useClass: CachedResourceLoader, deps: [] }];
/**
 * @publicApi
 */
export const platformBrowserDynamic = createPlatformFactory(platformCoreDynamic, 'browserDynamic', INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0tYnJvd3Nlci1keW5hbWljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3NyYy9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBa0IscUJBQXFCLEVBQXNELE1BQU0sZUFBZSxDQUFDO0FBRTFILE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQywyQ0FBMkMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBRTdFLGNBQWMsa0JBQWtCLENBQUM7QUFDakMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUV0RDs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FDaEMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0FBRTFFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcscUJBQXFCLENBQ3ZELG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLDJDQUEyQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSZXNvdXJjZUxvYWRlcn0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXInO1xuaW1wb3J0IHtDb21waWxlckZhY3RvcnksIGNyZWF0ZVBsYXRmb3JtRmFjdG9yeSwgcGxhdGZvcm1Db3JlLCBQbGF0Zm9ybVJlZiwgUHJvdmlkZXIsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtwbGF0Zm9ybUNvcmVEeW5hbWljfSBmcm9tICcuL3BsYXRmb3JtX2NvcmVfZHluYW1pYyc7XG5pbXBvcnQge0lOVEVSTkFMX0JST1dTRVJfRFlOQU1JQ19QTEFURk9STV9QUk9WSURFUlN9IGZyb20gJy4vcGxhdGZvcm1fcHJvdmlkZXJzJztcbmltcG9ydCB7Q2FjaGVkUmVzb3VyY2VMb2FkZXJ9IGZyb20gJy4vcmVzb3VyY2VfbG9hZGVyL3Jlc291cmNlX2xvYWRlcl9jYWNoZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vcHJpdmF0ZV9leHBvcnQnO1xuZXhwb3J0IHtWRVJTSU9OfSBmcm9tICcuL3ZlcnNpb24nO1xuZXhwb3J0IHtKaXRDb21waWxlckZhY3Rvcnl9IGZyb20gJy4vY29tcGlsZXJfZmFjdG9yeSc7XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICpcbiAqIEBkZXByZWNhdGVkIFRoaXMgd2FzIHByZXZpb3VzbHkgbmVjZXNzYXJ5IGluIHNvbWUgY2FzZXMgdG8gdGVzdCBBT1QtY29tcGlsZWQgY29tcG9uZW50cyB3aXRoIFZpZXdcbiAqICAgICBFbmdpbmUsIGJ1dCBpcyBubyBsb25nZXIgc2luY2UgSXZ5LlxuXG4gKi9cbmV4cG9ydCBjb25zdCBSRVNPVVJDRV9DQUNIRV9QUk9WSURFUjogUHJvdmlkZXJbXSA9XG4gICAgW3twcm92aWRlOiBSZXNvdXJjZUxvYWRlciwgdXNlQ2xhc3M6IENhY2hlZFJlc291cmNlTG9hZGVyLCBkZXBzOiBbXX1dO1xuXG4vKipcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNvbnN0IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgPSBjcmVhdGVQbGF0Zm9ybUZhY3RvcnkoXG4gICAgcGxhdGZvcm1Db3JlRHluYW1pYywgJ2Jyb3dzZXJEeW5hbWljJywgSU5URVJOQUxfQlJPV1NFUl9EWU5BTUlDX1BMQVRGT1JNX1BST1ZJREVSUyk7XG4iXX0=