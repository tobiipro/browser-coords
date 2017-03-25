/* @flow weak */

import _ from 'lodash';
import __debug from '../../util/debug';
import topWindow from './top-window';
import iframeWindow from './iframe-window';

let _debug = __debug(`tobii:atex:${__filename.replace(/\//g, ':')}`);

// -----------------------------------------------------------------------------

export let init = async function() {
  topWindow.init();
  iframeWindow.init();
};

export default exports;
