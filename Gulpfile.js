var requireDir = require('require-dir');
require('events').EventEmitter.prototype._maxListeners = 100;
// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });