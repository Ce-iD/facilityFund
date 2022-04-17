/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../errors';
import { stringify } from '../util/stringify';
import { stringifyForError } from './util/stringify_utils';
/** Called when directives inject each other (creating a circular dependency) */
export function throwCyclicDependencyError(token, path) {
    const depPath = path ? `. Dependency path: ${path.join(' > ')} > ${token}` : '';
    throw new RuntimeError(-200 /* CYCLIC_DI_DEPENDENCY */, `Circular dependency in DI detected for ${token}${depPath}`);
}
export function throwMixedMultiProviderError() {
    throw new Error(`Cannot mix multi providers and regular providers`);
}
export function throwInvalidProviderError(ngModuleType, providers, provider) {
    let ngModuleDetail = '';
    if (ngModuleType && providers) {
        const providerDetail = providers.map(v => v == provider ? '?' + provider + '?' : '...');
        ngModuleDetail =
            ` - only instances of Provider and Type are allowed, got: [${providerDetail.join(', ')}]`;
    }
    throw new Error(`Invalid provider for the NgModule '${stringify(ngModuleType)}'` + ngModuleDetail);
}
/** Throws an error when a token is not found in DI. */
export function throwProviderNotFoundError(token, injectorName) {
    const injectorDetails = injectorName ? ` in ${injectorName}` : '';
    throw new RuntimeError(-201 /* PROVIDER_NOT_FOUND */, `No provider for ${stringifyForError(token)} found${injectorDetails}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzX2RpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9lcnJvcnNfZGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUFDLFlBQVksRUFBbUIsTUFBTSxXQUFXLENBQUM7QUFDekQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBR3pELGdGQUFnRjtBQUNoRixNQUFNLFVBQVUsMEJBQTBCLENBQUMsS0FBYSxFQUFFLElBQWU7SUFDdkUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ2hGLE1BQU0sSUFBSSxZQUFZLGtDQUVsQiwwQ0FBMEMsS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQUVELE1BQU0sVUFBVSw0QkFBNEI7SUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQ3JDLFlBQWdDLEVBQUUsU0FBaUIsRUFBRSxRQUFjO0lBQ3JFLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN4QixJQUFJLFlBQVksSUFBSSxTQUFTLEVBQUU7UUFDN0IsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RixjQUFjO1lBQ1YsNkRBQTZELGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUMvRjtJQUVELE1BQU0sSUFBSSxLQUFLLENBQ1gsc0NBQXNDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUFHRCx1REFBdUQ7QUFDdkQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLEtBQVUsRUFBRSxZQUFxQjtJQUMxRSxNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRSxNQUFNLElBQUksWUFBWSxnQ0FFbEIsbUJBQW1CLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxTQUFTLGVBQWUsRUFBRSxDQUFDLENBQUM7QUFDN0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdG9yVHlwZX0gZnJvbSAnLi4vZGkvaW50ZXJmYWNlL2RlZnMnO1xuaW1wb3J0IHtSdW50aW1lRXJyb3IsIFJ1bnRpbWVFcnJvckNvZGV9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge3N0cmluZ2lmeX0gZnJvbSAnLi4vdXRpbC9zdHJpbmdpZnknO1xuXG5pbXBvcnQge3N0cmluZ2lmeUZvckVycm9yfSBmcm9tICcuL3V0aWwvc3RyaW5naWZ5X3V0aWxzJztcblxuXG4vKiogQ2FsbGVkIHdoZW4gZGlyZWN0aXZlcyBpbmplY3QgZWFjaCBvdGhlciAoY3JlYXRpbmcgYSBjaXJjdWxhciBkZXBlbmRlbmN5KSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93Q3ljbGljRGVwZW5kZW5jeUVycm9yKHRva2VuOiBzdHJpbmcsIHBhdGg/OiBzdHJpbmdbXSk6IG5ldmVyIHtcbiAgY29uc3QgZGVwUGF0aCA9IHBhdGggPyBgLiBEZXBlbmRlbmN5IHBhdGg6ICR7cGF0aC5qb2luKCcgPiAnKX0gPiAke3Rva2VufWAgOiAnJztcbiAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgIFJ1bnRpbWVFcnJvckNvZGUuQ1lDTElDX0RJX0RFUEVOREVOQ1ksXG4gICAgICBgQ2lyY3VsYXIgZGVwZW5kZW5jeSBpbiBESSBkZXRlY3RlZCBmb3IgJHt0b2tlbn0ke2RlcFBhdGh9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd01peGVkTXVsdGlQcm92aWRlckVycm9yKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBtaXggbXVsdGkgcHJvdmlkZXJzIGFuZCByZWd1bGFyIHByb3ZpZGVyc2ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dJbnZhbGlkUHJvdmlkZXJFcnJvcihcbiAgICBuZ01vZHVsZVR5cGU/OiBJbmplY3RvclR5cGU8YW55PiwgcHJvdmlkZXJzPzogYW55W10sIHByb3ZpZGVyPzogYW55KSB7XG4gIGxldCBuZ01vZHVsZURldGFpbCA9ICcnO1xuICBpZiAobmdNb2R1bGVUeXBlICYmIHByb3ZpZGVycykge1xuICAgIGNvbnN0IHByb3ZpZGVyRGV0YWlsID0gcHJvdmlkZXJzLm1hcCh2ID0+IHYgPT0gcHJvdmlkZXIgPyAnPycgKyBwcm92aWRlciArICc/JyA6ICcuLi4nKTtcbiAgICBuZ01vZHVsZURldGFpbCA9XG4gICAgICAgIGAgLSBvbmx5IGluc3RhbmNlcyBvZiBQcm92aWRlciBhbmQgVHlwZSBhcmUgYWxsb3dlZCwgZ290OiBbJHtwcm92aWRlckRldGFpbC5qb2luKCcsICcpfV1gO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEludmFsaWQgcHJvdmlkZXIgZm9yIHRoZSBOZ01vZHVsZSAnJHtzdHJpbmdpZnkobmdNb2R1bGVUeXBlKX0nYCArIG5nTW9kdWxlRGV0YWlsKTtcbn1cblxuXG4vKiogVGhyb3dzIGFuIGVycm9yIHdoZW4gYSB0b2tlbiBpcyBub3QgZm91bmQgaW4gREkuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dQcm92aWRlck5vdEZvdW5kRXJyb3IodG9rZW46IGFueSwgaW5qZWN0b3JOYW1lPzogc3RyaW5nKTogbmV2ZXIge1xuICBjb25zdCBpbmplY3RvckRldGFpbHMgPSBpbmplY3Rvck5hbWUgPyBgIGluICR7aW5qZWN0b3JOYW1lfWAgOiAnJztcbiAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgIFJ1bnRpbWVFcnJvckNvZGUuUFJPVklERVJfTk9UX0ZPVU5ELFxuICAgICAgYE5vIHByb3ZpZGVyIGZvciAke3N0cmluZ2lmeUZvckVycm9yKHRva2VuKX0gZm91bmQke2luamVjdG9yRGV0YWlsc31gKTtcbn1cbiJdfQ==