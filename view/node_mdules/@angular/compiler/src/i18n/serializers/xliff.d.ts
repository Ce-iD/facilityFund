/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as i18n from '../i18n_ast';
import { Serializer } from './serializer';
export declare class Xliff extends Serializer {
    write(messages: i18n.Message[], locale: string | null): string;
    load(content: string, url: string): {
        locale: string;
        i18nNodesByMsgId: {
            [msgId: string]: i18n.Node[];
        };
    };
    digest(message: i18n.Message): string;
}
