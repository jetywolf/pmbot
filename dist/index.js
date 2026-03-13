var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
__name(PerformanceEntry, "PerformanceEntry");
var PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
}, "PerformanceMark");
var PerformanceMeasure = class extends PerformanceEntry {
  entryType = "measure";
};
__name(PerformanceMeasure, "PerformanceMeasure");
var PerformanceResourceTiming = class extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
__name(PerformanceResourceTiming, "PerformanceResourceTiming");
var PerformanceObserverEntryList = class {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
__name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
var Performance = class {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
__name(Performance, "Performance");
var PerformanceObserver = class {
  __unenv__ = true;
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
__name(PerformanceObserver, "PerformanceObserver");
__publicField(PerformanceObserver, "supportedEntryTypes", []);
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream = class extends Socket {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  isRaw = false;
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
  isTTY = false;
};
__name(ReadStream, "ReadStream");

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream = class extends Socket2 {
  fd;
  constructor(fd) {
    super();
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  columns = 80;
  rows = 24;
  isTTY = false;
};
__name(WriteStream, "WriteStream");

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return "";
  }
  get versions() {
    return {};
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
__name(Process, "Process");

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// node_modules/hono/dist/compose.js
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/hono/dist/utils/body.js
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// node_modules/hono/dist/utils/url.js
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path = url.slice(start, end);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? tryDecode(value, decodeURIComponent_) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = /* @__PURE__ */ __name((contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
}, "setDefaultContentType");
var createResponseInstance = /* @__PURE__ */ __name((body, init) => new Response(body, init), "createResponseInstance");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    const responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders ?? new Headers();
    if (typeof arg === "object" && "headers" in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, { status, headers: responseHeaders });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = /* @__PURE__ */ __name((html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers)), "res");
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
}, "Context");

// node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { basePath: this._basePath, path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} Env - env Object
   * @param {ExecutionContext} - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "_Hono");

// node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path) {
  const matchers = this.buildAllMatchers();
  const match2 = /* @__PURE__ */ __name((method2, path2) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path2];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path2.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  }, "match2");
  this.match = match2;
  return match2(method, path);
}
__name(match, "match");

// node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class _Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context2, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        if (regexpStr === ".*") {
          throw PATH_ERROR;
        }
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new _Node();
        if (name !== "") {
          node.#varIndex = context2.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new _Node();
      }
    }
    node.insert(restTokens, index, paramMap, context2, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "_Node");

// node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// node_modules/hono/dist/router/reg-exp-router/router.js
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    clearWildcardRegExpCache();
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// node_modules/hono/dist/router/trie-router/node.js
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = /* @__PURE__ */ __name((children) => {
  for (const _ in children) {
    return true;
  }
  return false;
}, "hasChildren");
var Node2 = /* @__PURE__ */ __name(class _Node2 {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (key in curNode.#children) {
        curNode = curNode.#children[key];
        if (pattern) {
          possibleKeys.push(pattern[1]);
        }
        continue;
      }
      curNode.#children[key] = new _Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
        score: this.#order
      }
    });
    return curNode;
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              this.#pushHandlerSets(handlerSets, astNode, method, node.#params);
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          const [key, name, matcher] = pattern;
          if (!part && !(matcher instanceof RegExp)) {
            continue;
          }
          const child = node.#children[key];
          if (matcher instanceof RegExp) {
            if (partOffsets === null) {
              partOffsets = new Array(len);
              let offset = path[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path.substring(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (hasChildren(child.#children)) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "_Node");

// node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// node_modules/hono/dist/middleware/cors/index.js
var cors = /* @__PURE__ */ __name((options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        set("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods.length) {
        set("Access-Control-Allow-Methods", allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  }, "cors2");
}, "cors");

// src/prompts.ts
var BASE_SYSTEM = `\u4F60\u662F\u4E00\u4F4D\u7ECF\u9A8C\u4E30\u5BCC\u7684\u4EA7\u54C1\u7ECF\u7406\uFF08PM\uFF09\u52A9\u624B\uFF0C\u4E13\u95E8\u670D\u52A1\u4E8E AI Vibe Coder\u2014\u2014\u4F7F\u7528 AI \u5DE5\u5177\uFF08Cursor\u3001Claude\u3001Copilot \u7B49\uFF09\u5FEB\u901F\u6784\u5EFA\u4EA7\u54C1\u7684\u72EC\u7ACB\u5F00\u53D1\u8005\u3002
\u8BF7\u59CB\u7EC8\u4F7F\u7528 Markdown \u683C\u5F0F\u8F93\u51FA\uFF0C\u7ED3\u6784\u6E05\u6670\uFF0C\u8BED\u8A00\u7B80\u6D01\u4E13\u4E1A\uFF0C\u5185\u5BB9\u5177\u4F53\u53EF\u6267\u884C\u3002`;
var prompts = {
  "validate-idea": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u521B\u4E1A\u987E\u95EE\u548C\u4EA7\u54C1\u9A8C\u8BC1\u4E13\u5BB6\u3002\u8BF7\u5BF9\u4EA7\u54C1\u60F3\u6CD5\u8FDB\u884C\u6DF1\u5EA6\u9A8C\u8BC1\u5206\u6790\uFF0C\u5E2E\u52A9\u5F00\u53D1\u8005\u5728\u5199\u4E00\u884C\u4EE3\u7801\u4E4B\u524D\u5C31\u4E86\u89E3\u673A\u4F1A\u4E0E\u98CE\u9669\u3002`,
    buildUser: (i) => `\u8BF7\u5BF9\u4EE5\u4E0B\u4EA7\u54C1\u60F3\u6CD5\u8FDB\u884C\u5168\u9762\u9A8C\u8BC1\u5206\u6790\uFF1A

**\u4EA7\u54C1\u60F3\u6CD5\uFF1A** ${i.idea}
**\u89E3\u51B3\u7684\u95EE\u9898/\u75DB\u70B9\uFF1A** ${i.problem}
**\u76EE\u6807\u7528\u6237\uFF1A** ${i.target}
${i.extra ? `**\u8865\u5145\u4FE1\u606F\uFF1A** ${i.extra}` : ""}

\u8BF7\u8F93\u51FA\u5B8C\u6574\u7684\u9A8C\u8BC1\u62A5\u544A\uFF0C\u5305\u542B\u4EE5\u4E0B\u7AE0\u8282\uFF1A

## \u{1F4A1} \u60F3\u6CD5\u9A8C\u8BC1\u62A5\u544A

### 1. \u95EE\u9898\u771F\u5B9E\u6027\u5206\u6790
- \u8FD9\u4E2A\u75DB\u70B9\u662F\u5426\u8DB3\u591F\u4E25\u91CD\uFF1F
- \u7528\u6237\u76EE\u524D\u5982\u4F55\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF1F
- \u75DB\u70B9\u89E6\u53D1\u9891\u7387\uFF08\u6BCF\u5929/\u6BCF\u5468/\u5076\u5C14\uFF09\uFF1F

### 2. \u89E3\u51B3\u65B9\u6848\u8BC4\u4F30
- \u4F60\u7684\u65B9\u6848\u662F\u5426\u771F\u6B63\u89E3\u51B3\u4E86\u95EE\u9898\uFF1F
- \u6838\u5FC3\u4EF7\u503C\u4E3B\u5F20\uFF08\u4E00\u53E5\u8BDD\uFF09
- \u6BD4\u73B0\u6709\u65B9\u6848\u597D\u5728\u54EA\u91CC\uFF1F

### 3. \u5E02\u573A\u89C4\u6A21\u4F30\u7B97
- TAM\uFF08\u603B\u4F53\u53EF\u5BFB\u5740\u5E02\u573A\uFF09
- SAM\uFF08\u53EF\u670D\u52A1\u7684\u5E02\u573A\uFF09
- SOM\uFF08\u5B9E\u9645\u53EF\u83B7\u53D6\u5E02\u573A\uFF09

### 4. \u7ADE\u54C1\u683C\u5C40
| \u7ADE\u54C1 | \u4F18\u52BF | \u52A3\u52BF | \u5B9A\u4EF7 |
|------|------|------|------|
\uFF08\u5217\u51FA 3-5 \u4E2A\u4E3B\u8981\u7ADE\u54C1\uFF09

**\u5DEE\u5F02\u5316\u673A\u4F1A\uFF1A**

### 5. Vibe Coding \u53EF\u884C\u6027
- \u6280\u672F\u590D\u6742\u5EA6\uFF081-5 \u661F\uFF09\uFF1A
- \u9884\u4F30\u72EC\u7ACB\u5F00\u53D1\u65F6\u95F4\uFF1A
- \u6700\u9002\u5408\u7684\u6280\u672F\u6808\u5EFA\u8BAE\uFF1A
- \u4E3B\u8981\u6280\u672F\u6311\u6218\uFF1A

### 6. \u98CE\u9669\u8BC4\u4F30
| \u98CE\u9669 | \u4E25\u91CD\u7A0B\u5EA6 | \u53D1\u751F\u6982\u7387 | \u5E94\u5BF9\u7B56\u7565 |
|------|---------|---------|---------|

### 7. \u7EFC\u5408\u8BC4\u5206
| \u7EF4\u5EA6 | \u8BC4\u5206\uFF081-10\uFF09| \u8BF4\u660E |
|------|-----------|------|
| \u95EE\u9898\u4E25\u91CD\u6027 | | |
| \u5E02\u573A\u89C4\u6A21 | | |
| \u6280\u672F\u53EF\u884C\u6027 | | |
| \u7ADE\u4E89\u683C\u5C40 | | |
| \u53D8\u73B0\u6F5C\u529B | | |
| **\u7EFC\u5408\u5F97\u5206** | | |

### 8. \u4E0B\u4E00\u6B65\u884C\u52A8\u5EFA\u8BAE
1. \u7ACB\u5373\u53EF\u4EE5\u505A\u7684\u9A8C\u8BC1\u5B9E\u9A8C\uFF08\u4E0D\u5199\u4EE3\u7801\uFF09
2. \u6700\u5C0F\u5316\u539F\u578B\u65B9\u5411
3. \u7B2C\u4E00\u6279\u7528\u6237\u83B7\u53D6\u7B56\u7565`
  },
  "persona": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u7528\u6237\u7814\u7A76\u4E13\u5BB6\u3002\u8BF7\u521B\u5EFA\u771F\u5B9E\u53EF\u4FE1\u3001\u6709\u8840\u6709\u8089\u7684\u7528\u6237\u753B\u50CF\uFF08Persona\uFF09\uFF0C\u5E2E\u52A9\u5F00\u53D1\u8005\u771F\u6B63\u7406\u89E3\u7528\u6237\u3002`,
    buildUser: (i) => `\u8BF7\u4E3A\u4EE5\u4E0B\u4EA7\u54C1\u751F\u6210 ${i.count || 3} \u4E2A\u7528\u6237\u753B\u50CF\uFF1A

**\u4EA7\u54C1\u63CF\u8FF0\uFF1A** ${i.product}
**\u76EE\u6807\u7528\u6237\uFF1A** ${i.target}
${i.extra ? `**\u8865\u5145\u8BF4\u660E\uFF1A** ${i.extra}` : ""}

\u6BCF\u4E2A\u753B\u50CF\u8BF7\u5305\u542B\u4EE5\u4E0B\u5B8C\u6574\u5185\u5BB9\uFF1A

## \u{1F464} \u7528\u6237\u753B\u50CF

### \u753B\u50CF [N]: [\u4E2D\u6587\u59D3\u540D] \xB7 [\u804C\u4F4D/\u8EAB\u4EFD]

**\u{1F4CA} \u57FA\u672C\u4FE1\u606F**
- \u5E74\u9F84\uFF1A
- \u804C\u4E1A\uFF1A
- \u6240\u5728\u57CE\u5E02\uFF1A
- \u6280\u672F\u719F\u7EC3\u5EA6\uFF1A\u2605\u2605\u2605\u2606\u2606
- \u6708\u6536\u5165\u8303\u56F4\uFF1A
- \u5E38\u7528\u8BBE\u5907\uFF1A

**\u{1F3AF} \u76EE\u6807\u4E0E\u52A8\u673A**
- \u4F7F\u7528\u4EA7\u54C1\u7684\u4E3B\u8981\u76EE\u6807\uFF083\u6761\uFF09
- \u5185\u5728\u52A8\u673A

**\u{1F624} \u75DB\u70B9\u4E0E\u632B\u6298**
- \u5F53\u524D\u9762\u4E34\u7684\u95EE\u9898\uFF084\u6761\uFF0C\u8981\u5177\u4F53\uFF09
- \u73B0\u6709\u5DE5\u5177/\u65B9\u6848\u7684\u4E0D\u8DB3

**\u{1F4F1} \u884C\u4E3A\u7279\u5F81**
- \u5178\u578B\u7684\u5DE5\u4F5C\u65E5\u573A\u666F
- \u4FE1\u606F\u83B7\u53D6\u6E20\u9053\uFF08\u793E\u533A/\u5A92\u4F53/\u5E73\u53F0\uFF09
- \u4ED8\u8D39\u610F\u613F\u4E0E\u4E60\u60EF
- \u5DE5\u5177\u504F\u597D

**\u{1F4AC} \u7528\u6237\u539F\u58F0**
> "\u4E00\u53E5\u771F\u5B9E\u53CD\u6620\u4ED6\u4EEC\u5FC3\u58F0\u7684\u8BDD..."

**\u{1F50D} \u5982\u4F55\u627E\u5230\u4ED6\u4EEC**
- \u53EF\u4EE5\u5728\u54EA\u4E9B\u5730\u65B9\u63A5\u89E6\u5230\u8FD9\u7C7B\u7528\u6237\uFF08\u5177\u4F53\u5E73\u53F0/\u793E\u533A/\u6E20\u9053\uFF09`
  },
  "prd": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u8D44\u6DF1\u4EA7\u54C1\u7ECF\u7406\uFF0C\u64C5\u957F\u4E3A\u72EC\u7ACB\u5F00\u53D1\u8005\u5199\u7B80\u6D01\u3001\u53EF\u6267\u884C\u7684 PRD\u2014\u2014\u4E0D\u662F\u5927\u516C\u53F8\u90A3\u79CD\u5197\u957F\u7684\u6587\u6863\uFF0C\u800C\u662F\u771F\u6B63\u6307\u5BFC\u5F00\u53D1\u7684\u4EA7\u54C1\u84DD\u56FE\u3002`,
    buildUser: (i) => `\u8BF7\u4E3A\u4EE5\u4E0B\u4EA7\u54C1\u751F\u6210\u5B8C\u6574\u7684\u4EA7\u54C1\u9700\u6C42\u6587\u6863\uFF08PRD\uFF09\uFF1A

**\u4EA7\u54C1\u540D\u79F0\uFF1A** ${i.product}
**\u4EA7\u54C1\u63CF\u8FF0\uFF1A** ${i.idea}
**\u4E3B\u8981\u529F\u80FD\uFF1A** ${i.features}
${i.target ? `**\u76EE\u6807\u7528\u6237\uFF1A** ${i.target}` : ""}

# \u{1F4CB} \u4EA7\u54C1\u9700\u6C42\u6587\u6863 (PRD)
**\u4EA7\u54C1\u540D\u79F0\uFF1A** ${i.product}
**\u6587\u6863\u7248\u672C\uFF1A** v1.0
**\u6700\u540E\u66F4\u65B0\uFF1A** ${(/* @__PURE__ */ new Date()).toLocaleDateString("zh-CN")}

---

## 1. \u4EA7\u54C1\u6982\u8FF0
- **\u4E00\u53E5\u8BDD\u5B9A\u4F4D\uFF1A**
- **\u6838\u5FC3\u4EF7\u503C\u4E3B\u5F20\uFF1A**
- **\u76EE\u6807\u7528\u6237\uFF1A**
- **\u4EA7\u54C1\u5F62\u6001\uFF1A**\uFF08Web App / \u79FB\u52A8\u7AEF / CLI \u5DE5\u5177 / Browser Extension / API \u670D\u52A1\uFF09

## 2. \u95EE\u9898\u9648\u8FF0
- **\u7528\u6237\u75DB\u70B9\uFF1A**\uFF08\u5177\u4F53\u63CF\u8FF0\uFF09
- **\u73B0\u6709\u89E3\u51B3\u65B9\u6848\u7684\u4E0D\u8DB3\uFF1A**
- **\u6211\u4EEC\u7684\u5DEE\u5F02\u5316\uFF1A**

## 3. \u4EA7\u54C1\u76EE\u6807\uFF08OKR \u683C\u5F0F\uFF09
**Objective\uFF1A**\uFF08\u5B63\u5EA6\u76EE\u6807\uFF09

**Key Results\uFF1A**
- KR1\uFF1A\uFF08\u53EF\u91CF\u5316\uFF09
- KR2\uFF1A\uFF08\u53EF\u91CF\u5316\uFF09
- KR3\uFF1A\uFF08\u53EF\u91CF\u5316\uFF09

## 4. \u6838\u5FC3\u529F\u80FD\u9700\u6C42

### MVP \u529F\u80FD\uFF08P0 - \u5FC5\u987B\u6709\uFF09
| \u529F\u80FD\u540D\u79F0 | \u529F\u80FD\u63CF\u8FF0 | \u7528\u6237\u4EF7\u503C | \u9A8C\u6536\u6807\u51C6 |
|---------|---------|---------|---------|

### V1.1 \u529F\u80FD\uFF08P1 - \u5E94\u8BE5\u6709\uFF09
| \u529F\u80FD\u540D\u79F0 | \u529F\u80FD\u63CF\u8FF0 | \u4F18\u5148\u539F\u56E0 |
|---------|---------|---------|

### \u540E\u7EED\u89C4\u5212\uFF08P2 - \u672A\u6765\u8003\u8651\uFF09
- \uFF08\u5217\u51FA\uFF09

## 5. \u7528\u6237\u6838\u5FC3\u6D41\u7A0B
\u63CF\u8FF0\u6700\u91CD\u8981\u7684 1-2 \u4E2A\u7528\u6237\u65C5\u7A0B\uFF08\u6B65\u9AA4\u63CF\u8FF0\uFF09

## 6. \u975E\u529F\u80FD\u9700\u6C42
- **\u6027\u80FD\uFF1A**
- **\u5B89\u5168\uFF1A**
- **\u53EF\u8BBF\u95EE\u6027\uFF1A**
- **\u56FD\u9645\u5316\uFF1A**

## 7. \u6210\u529F\u6307\u6807\uFF08KPI\uFF09
| \u6307\u6807 | \u5B9A\u4E49 | \u76EE\u6807\u503C | \u6D4B\u91CF\u65B9\u5F0F |
|------|------|-------|---------|

## 8. \u4E0A\u7EBF\u6807\u51C6\uFF08Definition of Done\uFF09
\u4EE5\u4E0B\u6761\u4EF6\u5168\u90E8\u6EE1\u8DB3\u624D\u80FD\u4E0A\u7EBF\uFF1A
- [ ] 
- [ ] 

## 9. \u98CE\u9669\u4E0E\u4F9D\u8D56
| \u98CE\u9669 | \u5F71\u54CD | \u6982\u7387 | \u7F13\u89E3\u63AA\u65BD |
|------|------|------|---------|`
  },
  "user-stories": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u654F\u6377\u5F00\u53D1\u4E13\u5BB6\u3002\u8BF7\u751F\u6210\u7ED3\u6784\u5316\u7684\u7528\u6237\u6545\u4E8B\uFF0C\u6BCF\u4E2A\u6545\u4E8B\u72EC\u7ACB\u3001\u53EF\u6D4B\u8BD5\u3001\u4EF7\u503C\u660E\u786E\uFF0C\u9002\u5408\u72EC\u7ACB\u5F00\u53D1\u8005\u7528 AI \u5FEB\u901F\u5B9E\u73B0\u3002`,
    buildUser: (i) => `\u8BF7\u5C06\u4EE5\u4E0B\u529F\u80FD\u9700\u6C42\u62C6\u89E3\u6210\u7528\u6237\u6545\u4E8B\uFF1A

**\u4EA7\u54C1\uFF1A** ${i.product}
**\u529F\u80FD\u5217\u8868\uFF1A** ${i.features}
${i.personas ? `**\u7528\u6237\u753B\u50CF\uFF1A** ${i.personas}` : ""}

\u8BF7\u6309 Epic \u5206\u7EC4\u8F93\u51FA\u7528\u6237\u6545\u4E8B\uFF1A

## \u{1F4DD} \u7528\u6237\u6545\u4E8B\u5217\u8868

\uFF08\u5BF9\u6BCF\u4E2A\u529F\u80FD\u6A21\u5757\u521B\u5EFA\u4E00\u4E2A Epic\uFF0C\u6BCF\u4E2A Epic \u5305\u542B 3-6 \u4E2A\u7528\u6237\u6545\u4E8B\uFF09

### Epic: [\u529F\u80FD\u6A21\u5757\u540D]

#### Story [\u7F16\u53F7]: [\u6545\u4E8B\u6807\u9898]
**\u683C\u5F0F\uFF1A** \u4F5C\u4E3A **[\u7528\u6237\u7C7B\u578B]**\uFF0C\u6211\u5E0C\u671B **[\u5B8C\u6210\u67D0\u4E8B]**\uFF0C\u4EE5\u4FBF **[\u83B7\u5F97\u67D0\u4EF7\u503C]**\u3002

**\u9A8C\u6536\u6807\u51C6\uFF1A**
- [ ] Given [\u524D\u7F6E\u6761\u4EF6]\uFF0CWhen [\u64CD\u4F5C]\uFF0CThen [\u671F\u671B\u7ED3\u679C]
- [ ] \uFF08\u66F4\u591A AC\uFF09

**\u4F18\u5148\u7EA7\uFF1A** \u{1F534} P0 / \u{1F7E0} P1 / \u{1F7E1} P2
**\u6545\u4E8B\u70B9\u6570\uFF1A** X \u70B9\uFF08\u7528 Fibonacci\uFF1A1/2/3/5/8/13\uFF09
**\u4F9D\u8D56\uFF1A** \u65E0 / \u4F9D\u8D56 Story [X]
**\u6280\u672F\u5907\u6CE8\uFF1A** \uFF08\u5B9E\u73B0\u6CE8\u610F\u4E8B\u9879\uFF09

---
\uFF08\u91CD\u590D\u4EE5\u4E0A\u683C\u5F0F\uFF09

\u6700\u540E\u8F93\u51FA\uFF1A
## \u{1F4CA} \u6545\u4E8B\u70B9\u6570\u6C47\u603B
| Epic | \u6545\u4E8B\u6570 | \u603B\u70B9\u6570 | \u9884\u4F30\u5DE5\u65F6\uFF08AI \u8F85\u52A9\uFF09 |
|------|-------|-------|-----------------|`
  },
  "mvp": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u7CBE\u76CA\u521B\u4E1A\u987E\u95EE\u3002\u5E2E\u52A9\u72EC\u7ACB\u5F00\u53D1\u8005\u7528\u6700\u5C0F\u6295\u5165\u9A8C\u8BC1\u4EA7\u54C1\u4EF7\u503C\uFF0C\u907F\u514D\u8FC7\u5EA6\u5F00\u53D1\u6CA1\u4EBA\u9700\u8981\u7684\u529F\u80FD\u3002`,
    buildUser: (i) => `\u8BF7\u4E3A\u4EE5\u4E0B\u4EA7\u54C1\u5B9A\u4E49 MVP \u8303\u56F4\uFF1A

**\u4EA7\u54C1\uFF1A** ${i.product}
**\u8BA1\u5212\u529F\u80FD\uFF1A** ${i.features}
**\u662F\u5426\u72EC\u7ACB\u5F00\u53D1\uFF1A** ${i.solo ? "\u662F\uFF0C\u4E00\u4E2A\u4EBA Vibe Coding" : "\u5C0F\u56E2\u961F\u5F00\u53D1"}
${i.timeline ? `**\u671F\u671B\u4E0A\u7EBF\u65F6\u95F4\uFF1A** ${i.timeline}` : ""}

## \u{1F3AF} MVP \u8303\u56F4\u6587\u6863

### 1. MVP \u76EE\u6807
- **\u8981\u9A8C\u8BC1\u7684\u6838\u5FC3\u5047\u8BBE\uFF1A**\uFF08\u5217\u51FA 2-3 \u4E2A\u6700\u5173\u952E\u7684\u5047\u8BBE\uFF09
- **MVP \u6210\u529F\u5B9A\u4E49\uFF1A**\uFF08X \u4E2A\u7528\u6237\u5728 30 \u5929\u5185\u5B8C\u6210 Y \u64CD\u4F5C\uFF09
- **\u76EE\u6807\u7528\u6237\u6570\uFF1A** \u524D N \u4E2A\u771F\u5B9E\u4ED8\u8D39/\u6D3B\u8DC3\u7528\u6237

### 2. \u529F\u80FD\u6E05\u5355

#### \u2705 \u7EB3\u5165 MVP\uFF08Must Have\uFF09
| \u529F\u80FD | \u7EB3\u5165\u7406\u7531 | \u9884\u4F30\u5DE5\u65F6\uFF08AI \u8F85\u52A9\uFF09 | \u5B9E\u73B0\u590D\u6742\u5EA6 |
|------|---------|-----------------|---------|

#### \u{1F504} V1.1 \u52A0\u5165\uFF08Should Have\uFF09
| \u529F\u80FD | \u52A0\u5165\u6761\u4EF6\uFF08\u89E6\u53D1\u6307\u6807\uFF09 |
|------|-----------------|

#### \u274C \u780D\u6389\uFF08Not in Scope\uFF09
| \u529F\u80FD | \u4E0D\u505A\u539F\u56E0 |
|------|---------|

### 3. MVP \u6280\u672F\u65B9\u6848
**\u63A8\u8350\u6280\u672F\u6808\uFF1A**\uFF08\u9002\u5408 Vibe Coding \u5FEB\u901F\u8FED\u4EE3\u7684\u9009\u62E9\uFF09

**\u6700\u5C0F\u57FA\u7840\u8BBE\u65BD\uFF1A**
- \u6570\u636E\u5E93\uFF1A
- \u90E8\u7F72\u5E73\u53F0\uFF1A
- \u5173\u952E\u7B2C\u4E09\u65B9\u670D\u52A1\uFF1A

### 4. \u65F6\u95F4\u4F30\u7B97
| \u9636\u6BB5 | \u5185\u5BB9 | \u65F6\u95F4\uFF08Vibe Coding \u914D\u5408 AI\uFF09 |
|------|------|--------------------------|
| \u642D\u5EFA\u57FA\u7840 | | |
| \u6838\u5FC3\u529F\u80FD | | |
| \u6D4B\u8BD5\u8C03\u4F18 | | |
| \u4E0A\u7EBF\u51C6\u5907 | | |
| **\u5408\u8BA1** | | |

### 5. MVP \u9A8C\u8BC1\u6307\u6807
**\u5B9A\u91CF\u6307\u6807\uFF1A**\uFF08\u5177\u4F53\u6570\u5B57\uFF09
**\u5B9A\u6027\u6307\u6807\uFF1A**\uFF08\u7528\u6237\u53CD\u9988\u8D28\u91CF\uFF09

### 6. \u4E0B\u67B6/\u8F6C\u5411\u6807\u51C6
\u5982\u679C\u4EE5\u4E0B\u60C5\u51B5\u53D1\u751F\uFF0C\u8003\u8651 Pivot\uFF1A
- \u6761\u4EF6 1
- \u6761\u4EF6 2`
  },
  "tech-stack": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u5168\u6808\u5DE5\u7A0B\u5E08\u548C\u6280\u672F\u987E\u95EE\uFF0C\u6DF1\u5EA6\u4E86\u89E3 AI \u8F85\u52A9\u5F00\u53D1\uFF08Vibe Coding\uFF09\u751F\u6001\u3002\u8BF7\u63A8\u8350\u6700\u9002\u5408\u5FEB\u901F\u6784\u5EFA\u3001\u6613\u4E8E\u7EF4\u62A4\u3001\u53EF\u72EC\u7ACB\u90E8\u7F72\u7684\u6280\u672F\u6808\u3002`,
    buildUser: (i) => `\u8BF7\u4E3A\u4EE5\u4E0B\u4EA7\u54C1\u63A8\u8350\u6280\u672F\u9009\u578B\uFF1A

**\u4EA7\u54C1\u63CF\u8FF0\uFF1A** ${i.product}
**\u9884\u671F\u89C4\u6A21\uFF1A** ${i.scale || "\u4E2A\u4EBA\u9879\u76EE\uFF0C\u521D\u671F < 1000 \u7528\u6237"}
**\u6280\u672F\u504F\u597D\uFF1A** ${i.preferences || "\u65E0\u7279\u6B8A\u504F\u597D"}

## \u{1F6E0}\uFE0F \u6280\u672F\u9009\u578B\u62A5\u544A

### \u63A8\u8350\u67B6\u6784\u603B\u89C8
\uFF08\u5148\u7ED9\u4E00\u4E2A\u67B6\u6784\u56FE/\u63CF\u8FF0\uFF0C\u518D\u5C55\u5F00\u8BF4\u660E\uFF09

### \u524D\u7AEF\u65B9\u6848
| \u9009\u9879 | \u63A8\u8350\u5EA6 | AI \u8F85\u52A9\u53CB\u597D\u5EA6 | \u4F18\u70B9 | \u7F3A\u70B9 | \u9002\u7528\u573A\u666F |
|------|-------|-------------|------|------|---------|
\uFF08\u5217\u51FA 3 \u4E2A\u9009\u9879\uFF0C\u6807\u6CE8\u63A8\u8350\uFF09

**\u{1F3C6} \u6700\u7EC8\u63A8\u8350\uFF1A** XXX
**\u7406\u7531\uFF1A**

### \u540E\u7AEF\u65B9\u6848
\uFF08\u540C\u4E0A\u683C\u5F0F\uFF09

### \u6570\u636E\u5E93\u65B9\u6848
\uFF08\u540C\u4E0A\u683C\u5F0F\uFF0C\u5305\u62EC\uFF1APostgreSQL/MySQL/SQLite/MongoDB/Supabase/PlanetScale \u7B49\uFF09

### \u90E8\u7F72\u5E73\u53F0
| \u5E73\u53F0 | \u6708\u8D39 | \u514D\u8D39\u989D\u5EA6 | \u63A8\u8350\u573A\u666F |
|------|------|---------|---------|

### AI/LLM \u96C6\u6210\uFF08\u5982\u9700\u8981\uFF09
\u63A8\u8350\u7684 AI API \u548C SDK

### \u5B8C\u6574\u63A8\u8350\u6280\u672F\u6808
\`\`\`
Frontend:  [\u6846\u67B6] + [\u6837\u5F0F] + [\u72B6\u6001\u7BA1\u7406]
Backend:   [\u8FD0\u884C\u65F6] + [\u6846\u67B6] + [ORM]
Database:  [\u6570\u636E\u5E93] + [\u6258\u7BA1\u65B9\u5F0F]
Deploy:    [\u5E73\u53F0]
Auth:      [\u89E3\u51B3\u65B9\u6848]
Payment:   [\u652F\u4ED8\u65B9\u6848]\uFF08\u5982\u9700\u8981\uFF09
Monitor:   [\u76D1\u63A7\u5DE5\u5177]
\`\`\`

### \u5FEB\u901F\u542F\u52A8\uFF08\u53EF\u76F4\u63A5\u6267\u884C\u7684\u547D\u4EE4\uFF09
\`\`\`bash
# \u9879\u76EE\u521D\u59CB\u5316
...
\`\`\`

### \u26A0\uFE0F \u5E38\u89C1\u9677\u9631
\uFF08\u72EC\u7ACB\u5F00\u53D1\u8005\u5BB9\u6613\u8E29\u7684\u5751\uFF09

### Vibe Coding \u6700\u4F73\u5B9E\u8DF5
\uFF08\u914D\u5408 AI \u5DE5\u5177\u7684\u5F00\u53D1\u6280\u5DE7\uFF09`
  },
  "launch-checklist": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u4EA7\u54C1\u8FD0\u8425\u4E13\u5BB6\uFF0C\u4E13\u95E8\u5E2E\u52A9\u72EC\u7ACB\u5F00\u53D1\u8005\uFF08Indie Hacker\uFF09\u987A\u5229\u5B8C\u6210\u4EA7\u54C1\u4E0A\u7EBF\u3002\u751F\u6210\u7684\u6E05\u5355\u8981\u5177\u4F53\u53EF\u6267\u884C\uFF0C\u4E0D\u80FD\u7A7A\u6CDB\u3002`,
    buildUser: (i) => `\u8BF7\u4E3A\u4EE5\u4E0B\u4EA7\u54C1\u751F\u6210\u4E0A\u7EBF\u6E05\u5355\uFF1A

**\u4EA7\u54C1\uFF1A** ${i.product}
**\u8BA1\u5212\u4E0A\u7EBF\u6E20\u9053\uFF1A** ${i.channels || "Product Hunt\u3001V2EX\u3001Twitter"}
${i.date ? `**\u8BA1\u5212\u4E0A\u7EBF\u65E5\u671F\uFF1A** ${i.date}` : ""}

## \u{1F680} \u4EA7\u54C1\u4E0A\u7EBF\u6E05\u5355

### \u{1F4C5} \u4E0A\u7EBF\u524D 2 \u5468

#### \u4EA7\u54C1\u5B8C\u6574\u6027
- [ ] \u6838\u5FC3\u529F\u80FD 100% \u5B8C\u6210\u5E76\u6D4B\u8BD5\u901A\u8FC7
- [ ] \u9519\u8BEF\u5904\u7406\u5B8C\u5584\uFF08404\u3001500\u3001\u7A7A\u72B6\u6001\u3001\u52A0\u8F7D\u72B6\u6001\uFF09
- [ ] \u79FB\u52A8\u7AEF\u9002\u914D\u68C0\u67E5
- [ ] \u8DE8\u6D4F\u89C8\u5668\u517C\u5BB9\u6027\u6D4B\u8BD5\uFF08Chrome/Firefox/Safari\uFF09
- [ ] \u6027\u80FD\u4F18\u5316\uFF08\u9996\u5C4F\u52A0\u8F7D < 3s\uFF09
- [ ] \uFF08\u4EA7\u54C1\u7279\u5B9A\u68C0\u67E5\u9879\uFF09

#### \u57FA\u7840\u8BBE\u65BD
- [ ] \u57DF\u540D\u8D2D\u4E70\u5E76\u914D\u7F6E DNS
- [ ] SSL \u8BC1\u4E66\u914D\u7F6E\uFF08HTTPS\uFF09
- [ ] CDN \u914D\u7F6E
- [ ] \u751F\u4EA7\u73AF\u5883\u53D8\u91CF\u8BBE\u7F6E
- [ ] \u6570\u636E\u5E93\u5907\u4EFD\u7B56\u7565
- [ ] \uFF08\u66F4\u591A\uFF09

#### \u7528\u6237\u4F53\u9A8C
- [ ] Onboarding \u6D41\u7A0B\u6D4B\u8BD5\uFF08\u4ECE\u6CE8\u518C\u5230\u7B2C\u4E00\u4E2A\u4EF7\u503C\u65F6\u523B < 5 \u5206\u949F\uFF09
- [ ] \u90AE\u4EF6\u901A\u77E5\u6D4B\u8BD5
- [ ] \u5E2E\u52A9\u6587\u6863/FAQ \u9875\u9762
- [ ] \u8054\u7CFB/\u53CD\u9988\u6E20\u9053
- [ ] 404 \u9875\u9762
- [ ] \uFF08\u66F4\u591A\uFF09

#### \u6CD5\u5F8B\u5408\u89C4
- [ ] \u9690\u79C1\u653F\u7B56\u9875\u9762
- [ ] \u670D\u52A1\u6761\u6B3E\u9875\u9762
- [ ] Cookie \u63D0\u793A\uFF08\u5982\u9002\u7528\uFF09
- [ ] GDPR \u5408\u89C4\uFF08\u5982\u9762\u5411\u6B27\u6D32\u7528\u6237\uFF09
- [ ] \u9000\u6B3E\u653F\u7B56\uFF08\u5982\u6709\u4ED8\u8D39\u529F\u80FD\uFF09

#### \u5206\u6790\u4E0E\u76D1\u63A7
- [ ] \u57CB\u70B9\u7EDF\u8BA1\uFF08Google Analytics / Plausible / Umami\uFF09
- [ ] \u9519\u8BEF\u76D1\u63A7\uFF08Sentry / BugSnag\uFF09
- [ ] \u6027\u80FD\u76D1\u63A7\uFF08Web Vitals\uFF09
- [ ] \u5173\u952E\u4E1A\u52A1\u6307\u6807\u76D1\u63A7
- [ ] \u544A\u8B66\u914D\u7F6E

#### \u8425\u9500\u51C6\u5907
- [ ] \u843D\u5730\u9875\u5B8C\u6210\uFF08\u6E05\u6670\u7684 Value Prop + CTA\uFF09
- [ ] OG \u56FE\u7247/\u793E\u4EA4\u9884\u89C8\u56FE
- [ ] \u793E\u4EA4\u5A92\u4F53\u8D26\u53F7\u521B\u5EFA
- [ ] Product Hunt \u9875\u9762\u8349\u7A3F
- [ ] \u53D1\u5E03\u6587\u6848\u51C6\u5907
- [ ] Demo \u89C6\u9891/GIF \u622A\u56FE

### \u{1F4C5} \u4E0A\u7EBF\u524D 48 \u5C0F\u65F6
- [ ] \u6700\u540E\u4E00\u8F6E\u5168\u6D41\u7A0B\u6D4B\u8BD5
- [ ] \u9080\u8BF7 5 \u4E2A\u670B\u53CB\u505A\u6700\u7EC8\u6D4B\u8BD5
- [ ] \u6240\u6709\u53D1\u5E03\u6750\u6599\u518D\u6B21\u68C0\u67E5
- [ ] \u5907\u597D\u5BA2\u670D/\u53CD\u9988\u54CD\u5E94\u65B9\u6848

### \u{1F3AF} \u4E0A\u7EBF\u5F53\u5929\uFF08T-0\uFF09
- [ ] \u53D1\u5E03\u5230 ${i.channels || "\u5404\u5E73\u53F0"}
- [ ] \u5B9E\u65F6\u76D1\u63A7\u6D41\u91CF\u548C\u9519\u8BEF
- [ ] \u79EF\u6781\u56DE\u590D\u6240\u6709\u8BC4\u8BBA\u548C\u53CD\u9988
- [ ] \u8BB0\u5F55\u6240\u6709 Bug \u548C\u53CD\u9988

### \u{1F4C5} \u4E0A\u7EBF\u540E\u7B2C\u4E00\u5468
- [ ] \u6BCF\u65E5\u5206\u6790\u6570\u636E
- [ ] \u6536\u96C6\u7528\u6237\u53CD\u9988\u5E76\u5206\u7C7B
- [ ] \u4FEE\u590D P0 Bug
- [ ] \u611F\u8C22\u65E9\u671F\u7528\u6237
- [ ] \u64B0\u5199\u4EA7\u54C1\u4E0A\u7EBF\u590D\u76D8\u6587\u7AE0

### \u{1F525} Vibe Coder \u7279\u522B\u6CE8\u610F\u4E8B\u9879
\uFF08\u72EC\u7ACB\u5F00\u53D1\u8005\u6700\u5BB9\u6613\u5FFD\u7565\u7684 5 \u4EF6\u4E8B\uFF09`
  },
  "marketing": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u589E\u957F\u8425\u9500\u4E13\u5BB6\uFF0C\u5E2E\u52A9\u72EC\u7ACB\u5F00\u53D1\u8005\u64B0\u5199\u9AD8\u8F6C\u5316\u7387\u7684\u8425\u9500\u6587\u6848\u3002\u8981\u6709\u5438\u5F15\u529B\u3001\u771F\u5B9E\u53EF\u4FE1\u3001\u7A81\u51FA\u4EF7\u503C\u800C\u975E\u529F\u80FD\u3002`,
    buildUser: (i) => `\u8BF7\u4E3A\u4EE5\u4E0B\u4EA7\u54C1\u751F\u6210\u591A\u6E20\u9053\u8425\u9500\u6587\u6848\uFF1A

**\u4EA7\u54C1\u540D\u79F0\uFF1A** ${i.product}
**\u6838\u5FC3\u4EF7\u503C\u4E3B\u5F20\uFF1A** ${i.value_prop}
**\u76EE\u6807\u7528\u6237\uFF1A** ${i.target}
**\u53D1\u5E03\u6E20\u9053\uFF1A** ${i.channels || "Product Hunt\u3001Twitter/X\u3001V2EX\u3001\u5373\u523B"}

## \u{1F4E2} \u8425\u9500\u6587\u6848\u96C6

### 1. Product Hunt \u53D1\u5E03\uFF08\u82F1\u6587\uFF09

**Tagline**\uFF08\u226460 \u5B57\u7B26\uFF0C\u4E0D\u80FD\u6709\u611F\u53F9\u53F7\uFF09\uFF1A
\`[Tagline]\`

**Description**\uFF08200-250 \u5B57\uFF0C\u8BB2\u6545\u4E8B\uFF0C\u7A81\u51FA\u4EF7\u503C\uFF0C\u907F\u514D\u672F\u8BED\uFF09\uFF1A

**First Comment by Maker**\uFF08150\u5B57\uFF0C\u5206\u4EAB\u6784\u5EFA\u5386\u7A0B\uFF0C\u8868\u8FBE\u611F\u8C22\uFF0C\u8BF7\u6C42\u53CD\u9988\uFF09\uFF1A

### 2. Twitter/X \u53D1\u5E03 Thread

**\u63A8\u6587 1 (Hook - \u5F15\u8D77\u5173\u6CE8)\uFF1A**
\uFF08\u5F3A\u6709\u529B\u7684\u5F00\u5934\uFF0C\u95EE\u9898/\u6570\u636E/\u53CD\u76F4\u89C9\u89C2\u70B9\uFF09

**\u63A8\u6587 2 (\u95EE\u9898\u63CF\u8FF0)\uFF1A**

**\u63A8\u6587 3 (\u89E3\u51B3\u65B9\u6848\u4ECB\u7ECD)\uFF1A**

**\u63A8\u6587 4 (\u529F\u80FD\u4EAE\u70B9 - \u622A\u56FE\u8BF4\u660E)\uFF1A**

**\u63A8\u6587 5 (\u793E\u4F1A\u8BC1\u660E/\u65E9\u671F\u6570\u636E)\uFF1A**

**\u63A8\u6587 6 (Call to Action)\uFF1A**
\uFF08Link + \u884C\u52A8\u53F7\u53EC\uFF09

### 3. V2EX \u5E16\u5B50\uFF08\u4E2D\u6587\uFF09

**\u6807\u9898\uFF1A**\uFF08\u5438\u5F15\u773C\u7403\uFF0C\u63ED\u793A\u4EF7\u503C\uFF09

**\u6B63\u6587\uFF1A**\uFF08\u63CF\u8FF0\u75DB\u70B9\u2192\u89E3\u51B3\u65B9\u6848\u2192\u529F\u80FD\u4EAE\u70B9\u2192\u9080\u8BF7\u8BD5\u7528\uFF0C500\u5B57\u5DE6\u53F3\uFF09

### 4. \u5373\u523B/\u5C0F\u7EA2\u4E66\uFF08\u4E2D\u6587\uFF0C\u66F4\u53E3\u8BED\u5316\uFF09

**\u5F00\u5934 Hook\uFF1A**
**\u6B63\u6587\uFF1A**\uFF08\u8F7B\u677E\u53E3\u8BED\uFF0C\u914D Emoji\uFF0C200\u5B57\uFF09
**\u8BDD\u9898\u6807\u7B7E\uFF1A**

### 5. \u843D\u5730\u9875\u6587\u6848

**Hero \u533A\u57DF\uFF1A**
- \u5927\u6807\u9898\uFF0810\u5B57\u4EE5\u5185\uFF0C\u76F4\u51FB\u75DB\u70B9\uFF09\uFF1A
- \u526F\u6807\u9898\uFF0825\u5B57\u4EE5\u5185\uFF0C\u89E3\u91CA\u4EF7\u503C\uFF09\uFF1A
- CTA \u6309\u94AE\u6587\u5B57\uFF1A
- Hero \u533A\u57DF\u5C0F\u5B57\uFF08\u89E3\u9664\u7591\u8651\uFF09\uFF1A

**3 \u4E2A\u6838\u5FC3\u4EF7\u503C\u70B9\uFF1A**
| \u56FE\u6807 | \u6807\u9898\uFF085\u5B57\uFF09 | \u63CF\u8FF0\uFF0820\u5B57\uFF09 |
|------|-----------|-----------|

**\u793E\u4F1A\u8BC1\u660E\u6587\u6848\u6A21\u677F\uFF08\u5F85\u586B\u771F\u5B9E\u6570\u636E\uFF09\uFF1A**

### 6. \u51B7\u542F\u52A8\u90AE\u4EF6\uFF08\u53D1\u7ED9\u76EE\u6807\u7528\u6237\uFF09

**\u4E3B\u9898\uFF1A**\uFF08\u6D4B\u8BD5 3 \u4E2A\u7248\u672C\uFF09
**\u6B63\u6587\uFF1A**\uFF08100\u5B57\uFF0C\u4E2A\u4EBA\u5316\uFF0C\u4EF7\u503C\u5BFC\u5411\uFF09`
  },
  "growth": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u589E\u957F\u9ED1\u5BA2\u548C\u4EA7\u54C1\u8FD0\u8425\u4E13\u5BB6\u3002\u4E3A\u72EC\u7ACB\u5F00\u53D1\u8005\u5236\u5B9A\u52A1\u5B9E\u7684\u589E\u957F\u7B56\u7565\u2014\u2014\u4E13\u6CE8\u524D 100 \u4E2A\u7528\u6237\uFF0C\u800C\u4E0D\u662F\u5047\u8BBE\u5DF2\u7ECF\u6709\u767E\u4E07\u7528\u6237\u3002`,
    buildUser: (i) => `\u8BF7\u4E3A\u4EE5\u4E0B\u4EA7\u54C1\u5236\u5B9A\u589E\u957F\u7B56\u7565\uFF1A

**\u4EA7\u54C1\uFF1A** ${i.product}
**\u5F53\u524D\u9636\u6BB5\uFF1A** ${i.stage || "\u521A\u4E0A\u7EBF\uFF0C< 100 \u7528\u6237"}
**\u5F53\u524D\u7528\u6237\u6570\uFF1A** ${i.current_users || "0"}
${i.extra ? `**\u8865\u5145\u4FE1\u606F\uFF1A** ${i.extra}` : ""}

## \u{1F4C8} \u589E\u957F\u7B56\u7565\u62A5\u544A

### 1. AARRR \u6F0F\u6597\u5206\u6790

| \u9636\u6BB5 | \u4E2D\u6587 | \u6838\u5FC3\u95EE\u9898 | \u5F53\u524D\u72B6\u6001 | \u5173\u952E\u6307\u6807 | \u4F18\u5316\u7B56\u7565 |
|------|------|---------|---------|---------|---------|
| Acquisition | \u83B7\u5BA2 | \u7528\u6237\u4ECE\u54EA\u91CC\u6765\uFF1F | | | |
| Activation | \u6FC0\u6D3B | \u7528\u6237\u7B2C\u4E00\u6B21\u4F53\u9A8C\u5230\u4EF7\u503C\u4E86\u5417\uFF1F | | | |
| Retention | \u7559\u5B58 | \u7528\u6237\u4F1A\u56DE\u6765\u5417\uFF1F | | | |
| Revenue | \u6536\u5165 | \u7528\u6237\u613F\u610F\u4ED8\u94B1\u5417\uFF1F | | | |
| Referral | \u63A8\u8350 | \u7528\u6237\u4F1A\u63A8\u8350\u7ED9\u670B\u53CB\u5417\uFF1F | | | |

### 2. \u5317\u6781\u661F\u6307\u6807\uFF08North Star Metric\uFF09
**\u63A8\u8350 NSM\uFF1A**\uFF08\u9009\u62E9\u4E00\u4E2A\u6700\u80FD\u4F53\u73B0\u7528\u6237\u4EF7\u503C\u7684\u6307\u6807\uFF09
**\u9009\u62E9\u7406\u7531\uFF1A**
**\u5F53\u524D\u503C \u2192 30 \u5929\u76EE\u6807\uFF1A**

### 3. \u524D 100 \u4E2A\u7528\u6237\u83B7\u53D6\u7B56\u7565\uFF08\u6309\u4F18\u5148\u7EA7\uFF09

#### \u{1F3C6} \u4F18\u5148\u7EA7 1\uFF1A\u9AD8\u6548\u4F4E\u6210\u672C\u6E20\u9053
\uFF08\u5177\u4F53\u884C\u52A8\u6B65\u9AA4\uFF0C\u4E0D\u662F\u6CDB\u6CDB\u800C\u8C08\uFF09

#### \u{1F948} \u4F18\u5148\u7EA7 2\uFF1A\u5185\u5BB9/\u793E\u533A\u6E20\u9053

#### \u{1F949} \u4F18\u5148\u7EA7 3\uFF1A\u5408\u4F5C/\u8054\u52A8\u6E20\u9053

### 4. \u6E20\u9053\u77E9\u9635\u5206\u6790
| \u6E20\u9053 | \u6F5C\u5728\u7528\u6237\u8D28\u91CF | \u83B7\u53D6\u6210\u672C | \u65F6\u6548\u6027 | \u53EF\u6269\u5C55\u6027 | \u5EFA\u8BAE |
|------|-----------|---------|-------|--------|------|

### 5. \u524D 4 \u5468\u589E\u957F\u5B9E\u9A8C\u8BA1\u5212
**\u7B2C 1 \u5468\uFF1A** \uFF08\u5177\u4F53\u5B9E\u9A8C\uFF09
**\u7B2C 2 \u5468\uFF1A** 
**\u7B2C 3 \u5468\uFF1A** 
**\u7B2C 4 \u5468\uFF1A** 

### 6. \u7528\u6237\u7559\u5B58\u7B56\u7565
- **D1 \u7559\u5B58\u63D0\u5347\uFF1A**\uFF08\u5177\u4F53\u63AA\u65BD\uFF09
- **D7 \u7559\u5B58\u63D0\u5347\uFF1A**
- **D30 \u7559\u5B58\u63D0\u5347\uFF1A**
- **\u6D41\u5931\u7528\u6237\u53EC\u56DE\uFF1A**

### 7. \u75C5\u6BD2\u4F20\u64AD\u673A\u5236\u8BBE\u8BA1
\u53EF\u4EE5\u5185\u7F6E\u5230\u4EA7\u54C1\u91CC\u7684\u4F20\u64AD\u673A\u5236\uFF08\u53C2\u8003 Notion/Figma/Calendly\uFF09

### 8. \u53D8\u73B0\u65F6\u673A\u4E0E\u7B56\u7565
\u4EC0\u4E48\u65F6\u5019\u5F00\u59CB\u6536\u8D39\uFF1F\u6536\u8D39\u7B56\u7565\u5EFA\u8BAE\uFF1F

### 9. \u91CC\u7A0B\u7891\u89C4\u5212
| \u91CC\u7A0B\u7891 | \u76EE\u6807 | \u5B8C\u6210\u6761\u4EF6 | \u9884\u4F30\u65F6\u95F4 |
|-------|------|---------|---------|
| Traction | | | |
| PMF | | | |
| Growth | | | |`
  },
  "competitors": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u5E02\u573A\u7814\u7A76\u4E13\u5BB6\uFF0C\u5E2E\u52A9\u72EC\u7ACB\u5F00\u53D1\u8005\u7406\u89E3\u7ADE\u4E89\u683C\u5C40\uFF0C\u627E\u5230\u5DEE\u5F02\u5316\u5B9A\u4F4D\uFF0C\u907F\u514D\u6B63\u9762\u7ADE\u4E89\u3002`,
    buildUser: (i) => `\u8BF7\u8FDB\u884C\u7ADE\u54C1\u5206\u6790\uFF1A

**\u6211\u7684\u4EA7\u54C1\uFF1A** ${i.product}
**\u7ADE\u54C1\u5217\u8868\uFF1A** ${i.competitors}
${i.extra ? `**\u8865\u5145\uFF1A** ${i.extra}` : ""}

## \u{1F3C6} \u7ADE\u54C1\u5206\u6790\u62A5\u544A

### 1. \u7ADE\u54C1\u6982\u89C8
\uFF08\u7B80\u8981\u4ECB\u7ECD\u6BCF\u4E2A\u7ADE\u54C1\u7684\u5B9A\u4F4D\u548C\u89C4\u6A21\uFF09

### 2. \u7ADE\u54C1\u5BF9\u6BD4\u77E9\u9635
| \u7EF4\u5EA6 | \u6211\u7684\u4EA7\u54C1 | ${i.competitors} |
|------|---------|------|
| \u6838\u5FC3\u529F\u80FD | | |
| \u76EE\u6807\u7528\u6237 | | |
| \u5B9A\u4EF7\u6A21\u5F0F | | |
| \u5B9A\u4EF7\u533A\u95F4 | | |
| \u6280\u672F\u5B9E\u73B0 | | |
| \u4F18\u52BF | | |
| \u52A3\u52BF | | |
| \u5E02\u573A\u4EFD\u989D | | |
| \u878D\u8D44\u60C5\u51B5 | | |

### 3. \u7ADE\u54C1\u6DF1\u5EA6\u5206\u6790
\uFF08\u5BF9\u6BCF\u4E2A\u7ADE\u54C1\uFF1A\u4EA7\u54C1\u4EAE\u70B9\u3001\u7528\u6237\u53CD\u9988\uFF08\u771F\u5B9E\u75DB\u70B9\uFF09\u3001\u5F31\u70B9/\u673A\u4F1A\uFF09

### 4. \u5E02\u573A\u7A7A\u767D\u4E0E\u673A\u4F1A
\u57FA\u4E8E\u7ADE\u54C1\u5206\u6790\u53D1\u73B0\u7684 3-5 \u4E2A\u5DEE\u5F02\u5316\u673A\u4F1A\uFF1A
1. **\u673A\u4F1A\uFF1A** \u2192 **\u5982\u4F55\u6293\u4F4F\uFF1A**
2. ...

### 5. \u5DEE\u5F02\u5316\u5B9A\u4F4D\u7B56\u7565

**\u7ADE\u4E89\u7EF4\u5EA6\u9009\u62E9\uFF1A**\uFF08\u4EF7\u683C/\u529F\u80FD/\u4F53\u9A8C/\u7EC6\u5206\u5E02\u573A/\u901F\u5EA6\uFF09

**\u63A8\u8350\u5B9A\u4F4D\uFF1A**
> "[\u4EA7\u54C1\u540D] \u662F\u4E13\u4E3A [\u76EE\u6807\u7528\u6237] \u8BBE\u8BA1\u7684 [\u54C1\u7C7B]\uFF0C
> \u4E0D\u540C\u4E8E [\u7ADE\u54C1]\uFF0C\u6211\u4EEC [\u72EC\u7279\u4E4B\u5904]\u3002"

**\u54C1\u724C\u8C03\u6027\u5EFA\u8BAE\uFF1A**

### 6. \u7ADE\u4E89\u58C1\u5792\u5EFA\u8BAE
\u5982\u4F55\u5EFA\u7ACB\u77ED\u671F\u548C\u957F\u671F\u62A4\u57CE\u6CB3\uFF1A
- **\u77ED\u671F\uFF081-3\u4E2A\u6708\uFF09\uFF1A**
- **\u4E2D\u671F\uFF083-12\u4E2A\u6708\uFF09\uFF1A**
- **\u957F\u671F\uFF081\u5E74+\uFF09\uFF1A**

### 7. \u5B9A\u4EF7\u7B56\u7565\u53C2\u8003
\u57FA\u4E8E\u7ADE\u54C1\u5B9A\u4EF7\u7684\u5EFA\u8BAE\u5B9A\u4EF7\u65B9\u6848\uFF08Free/Pro/Team \u4E09\u6863\uFF09

### 8. \u7ADE\u4E89\u98CE\u9669\u4E0E\u5E94\u5BF9
\u6700\u5927\u7684\u7ADE\u4E89\u5A01\u80C1\u53CA\u5E94\u5BF9\u9884\u6848`
  },
  "prioritize": {
    system: `${BASE_SYSTEM}

\u4F60\u662F\u8D44\u6DF1\u4EA7\u54C1\u7ECF\u7406\uFF0C\u64C5\u957F\u7528\u6570\u636E\u9A71\u52A8\u7684\u65B9\u5F0F\u5BF9\u529F\u80FD\u8FDB\u884C\u4F18\u5148\u7EA7\u6392\u5E8F\uFF0C\u5E2E\u52A9\u56E2\u961F\u628A\u7CBE\u529B\u653E\u5728\u6700\u6709\u4EF7\u503C\u7684\u4E8B\u60C5\u4E0A\u3002`,
    buildUser: (i) => `\u8BF7\u5BF9\u4EE5\u4E0B\u529F\u80FD\u5217\u8868\u8FDB\u884C\u4F18\u5148\u7EA7\u5206\u6790\uFF1A

**\u4EA7\u54C1\uFF1A** ${i.product}
**\u529F\u80FD\u5217\u8868\uFF1A**
${i.features}

## \u{1F4CA} \u529F\u80FD\u4F18\u5148\u7EA7\u62A5\u544A

### 1. RICE \u8BC4\u5206\u77E9\u9635

\u8BC4\u5206\u8BF4\u660E\uFF1A
- Reach (\u8986\u76D6\u7528\u6237\u6570/\u6708\uFF0C\u4F30\u7B97\u503C)
- Impact (\u5F71\u54CD\u529B\uFF1A3=\u5927\uFF0C2=\u4E2D\uFF0C1=\u5C0F\uFF0C0.5=\u5FAE)
- Confidence (\u4FE1\u5FC3\u5EA6\uFF1A100%/80%/50%)
- Effort (\u5F00\u53D1\u5DE5\u65F6\uFF0C\u4EBA\u5468)
- RICE Score = R \xD7 I \xD7 C / E

| \u529F\u80FD | Reach | Impact | Confidence | Effort | RICE Score | \u6392\u540D |
|------|-------|--------|------------|--------|-----------|------|

### 2. MoSCoW \u5206\u7C7B

#### \u{1F534} Must Have\uFF08\u5FC5\u987B\u6709\uFF0C\u6CA1\u6709\u4EA7\u54C1\u5C31\u4E0D\u80FD\u7528\uFF09
- \u529F\u80FD + \u7406\u7531

#### \u{1F7E0} Should Have\uFF08\u5E94\u8BE5\u6709\uFF0C\u7F3A\u5C11\u4F1A\u5F71\u54CD\u4F53\u9A8C\u4F46\u4E0D\u81F4\u547D\uFF09
- \u529F\u80FD + \u7406\u7531

#### \u{1F7E1} Could Have\uFF08\u53EF\u4EE5\u6709\uFF0C\u6709\u4F59\u529B\u518D\u505A\uFF09
- \u529F\u80FD + \u7406\u7531

#### \u26AA Won't Have\uFF08\u8FD9\u6B21\u4E0D\u505A\uFF0C\u539F\u56E0\u660E\u786E\uFF09
- \u529F\u80FD + \u539F\u56E0

### 3. \u4EF7\u503C/\u6210\u672C \u56DB\u8C61\u9650\u5206\u6790
\`\`\`
\u9AD8\u4EF7\u503C \u2502 \u6218\u7565\u6295\u8D44    \u2502 \u7ACB\u5373\u505A
        \u2502\uFF08\u89C4\u5212\u505A\uFF09   \u2502\uFF08Quick Wins\uFF09
        \u251C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
\u4F4E\u4EF7\u503C \u2502 \u4E0D\u505A        \u2502 \u586B\u5145\u4EFB\u52A1
        \u2502             \u2502\uFF08\u6709\u7A7A\u518D\u8BF4\uFF09
        \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
         \u9AD8\u6210\u672C           \u4F4E\u6210\u672C
\`\`\`
\uFF08\u5C06\u6BCF\u4E2A\u529F\u80FD\u5F52\u5165\u5BF9\u5E94\u8C61\u9650\uFF09

### 4. \u63A8\u8350\u5F00\u53D1\u987A\u5E8F
**\u7B2C\u4E00\u6279\uFF08MVP \u6838\u5FC3\uFF09\uFF1A**
1. \u529F\u80FD \u2192 \u7406\u7531

**\u7B2C\u4E8C\u6279\uFF08\u589E\u5F3A\u4F53\u9A8C\uFF09\uFF1A**

**\u7B2C\u4E09\u6279\uFF08\u6269\u5C55\u529F\u80FD\uFF09\uFF1A**

### 5. Quick Wins\uFF08\u7ACB\u5373\u53EF\u505A\uFF09
\u9AD8\u4EF7\u503C + \u4F4E\u6210\u672C\uFF0C\u53EF\u5728 1-2 \u5929\u5B8C\u6210\u7684\u529F\u80FD

### 6. \u98CE\u9669\u63D0\u793A
\u9700\u8981\u7279\u522B\u6CE8\u610F\u7684\u9AD8\u4F18\u5148\u7EA7\u4F46\u9AD8\u98CE\u9669\u529F\u80FD`
  },
  "chat": {
    system: `\u4F60\u662F PMBot\uFF0C\u4E00\u4F4D\u4E13\u4E3A AI Vibe Coder \u670D\u52A1\u7684\u4EA7\u54C1\u7ECF\u7406\u52A9\u624B\u3002

**\u4F60\u7684\u89D2\u8272\u5B9A\u4F4D\uFF1A**
- \u7ECF\u9A8C\u4E30\u5BCC\u7684\u4EA7\u54C1\u7ECF\u7406\uFF0810\u5E74\u4EE5\u4E0A\u7ECF\u9A8C\uFF09
- \u521B\u4E1A\u987E\u95EE\uFF08\u670D\u52A1\u8FC7\u591A\u4E2A\u72EC\u7ACB\u5F00\u53D1\u8005\u548C\u65E9\u671F\u521B\u4E1A\u56E2\u961F\uFF09
- \u589E\u957F\u9ED1\u5BA2\uFF08\u719F\u6089 0\u21921 \u548C 1\u219210 \u9636\u6BB5\u7684\u589E\u957F\u7B56\u7565\uFF09
- \u6280\u672F\u4EA7\u54C1\u7ECF\u7406\uFF08\u80FD\u591F\u7406\u89E3\u5F00\u53D1\u8005\u7684\u6280\u672F\u80CC\u666F\uFF09

**\u670D\u52A1\u5BF9\u8C61\uFF1A** AI Vibe Coder\uFF08\u4F7F\u7528 Cursor/Claude/Copilot \u7B49 AI \u5DE5\u5177\u72EC\u7ACB\u6784\u5EFA\u4EA7\u54C1\u7684\u5F00\u53D1\u8005\uFF09

**\u5BF9\u8BDD\u539F\u5219\uFF1A**
- \u7B80\u6D01\u76F4\u63A5\uFF0C\u7ED9\u51FA\u5177\u4F53\u53EF\u6267\u884C\u7684\u5EFA\u8BAE\uFF0C\u4E0D\u5E9F\u8BDD
- \u7528\u6570\u636E\u548C\u6846\u67B6\u652F\u6491\u89C2\u70B9
- \u627F\u8BA4\u4E0D\u786E\u5B9A\u6027\uFF0C\u4E0D\u7F16\u9020\u6570\u636E
- \u50CF\u4E00\u4E2A\u8BDA\u5B9E\u7684\u670B\u53CB\uFF0C\u800C\u975E\u8BA8\u597D\u7528\u6237\u7684\u52A9\u624B
- \u9002\u5F53\u4F7F\u7528 Emoji \u589E\u52A0\u53EF\u8BFB\u6027
- \u9002\u5F53\u4F7F\u7528 Markdown \u683C\u5F0F

**\u4E13\u4E1A\u9886\u57DF\uFF1A**
- \u4EA7\u54C1\u7B56\u7565\u4E0E\u5B9A\u4F4D
- \u7528\u6237\u7814\u7A76\u4E0E Persona
- PRD \u548C\u9700\u6C42\u5206\u6790
- MVP \u5B9A\u4E49\u548C\u4F18\u5148\u7EA7
- \u4EA7\u54C1\u4E0A\u7EBF\u548C\u589E\u957F
- \u7ADE\u54C1\u5206\u6790
- \u6570\u636E\u6307\u6807\u4F53\u7CFB

\u8BF7\u7528\u4E2D\u6587\u56DE\u7B54\uFF0C\u5FC5\u8981\u65F6\u4F7F\u7528\u82F1\u6587\u4E13\u4E1A\u672F\u8BED\u3002`,
    buildUser: (i) => `${i.message}`
  }
};
function getPrompt(tool) {
  return prompts[tool] ?? null;
}
__name(getPrompt, "getPrompt");

// src/html.ts
function getHTML() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>PMBot \u2014 AI \u4EA7\u54C1\u7ECF\u7406\u52A9\u624B</title>
<script src="https://cdn.jsdelivr.net/npm/marked@9.1.6/marked.min.js"><\/script>
<style>
:root{--bg:#09090b;--sf:#18181b;--sf2:#27272a;--bd:#3f3f46;--acc:#8b5cf6;--acc2:#7c3aed;--adim:rgba(139,92,246,.15);--tx:#fafafa;--tx2:#a1a1aa;--tx3:#71717a;--p1:#8b5cf6;--p2:#06b6d4;--ok:#22c55e;--err:#ef4444;--warn:#f59e0b;--r:8px;--tr:150ms ease;--sw:260px}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB',sans-serif;background:var(--bg);color:var(--tx);height:100vh;overflow:hidden}
#app{display:flex;height:100vh}
/* Scrollbar */
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bd);border-radius:3px}::-webkit-scrollbar-thumb:hover{background:var(--tx3)}
/* Sidebar */
#sidebar{width:var(--sw);flex-shrink:0;height:100vh;display:flex;flex-direction:column;background:var(--sf);border-right:1px solid var(--bd);overflow-y:auto}
.logo{display:flex;align-items:center;gap:8px;padding:18px 16px;border-bottom:1px solid var(--bd);flex-shrink:0}
.logo-icon{font-size:22px}.logo-text{font-size:17px;font-weight:800;letter-spacing:-.5px}
.logo-v{margin-left:auto;font-size:10px;font-weight:600;color:var(--acc);background:var(--adim);padding:2px 6px;border-radius:4px}
.proj-sec{padding:10px 12px;border-bottom:1px solid var(--bd);flex-shrink:0}
.proj-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.sec-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--tx3)}
.add-btn{width:22px;height:22px;border-radius:4px;background:transparent;border:1px solid var(--bd);color:var(--tx2);cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;transition:var(--tr);line-height:1}
.add-btn:hover{background:var(--sf2);color:var(--tx)}
.proj-item{display:flex;align-items:center;gap:7px;padding:5px 7px;border-radius:6px;cursor:pointer;transition:var(--tr)}
.proj-item:hover{background:var(--sf2)}.proj-item.active{background:var(--adim)}
.proj-dot{width:6px;height:6px;border-radius:50%;background:var(--tx3);flex-shrink:0}
.proj-item.active .proj-dot{background:var(--acc)}
.proj-name{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1}
.proj-item.active .proj-name{color:var(--acc)}
.proj-cnt{font-size:10px;color:var(--tx3);background:var(--sf2);padding:1px 5px;border-radius:3px;flex-shrink:0}
.no-proj{font-size:12px;color:var(--tx3);padding:4px 8px}
nav{flex:1;padding:8px;overflow-y:auto}
.ni{display:flex;align-items:center;gap:7px;padding:7px 10px;border-radius:var(--r);font-size:13px;color:var(--tx2);cursor:pointer;transition:var(--tr);text-decoration:none;user-select:none}
.ni:hover{background:var(--sf2);color:var(--tx)}.ni.active{background:var(--adim);color:var(--acc);font-weight:500}
.nsl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;padding:8px 10px 3px;color:var(--tx3)}
.nsl.p1{color:var(--p1)}.nsl.p2{color:var(--p2)}.ndiv{height:1px;background:var(--bd);margin:5px 0}
/* Main */
#main{flex:1;height:100vh;overflow-y:auto;background:var(--bg);display:flex;flex-direction:column}
/* Dashboard */
.dash{padding:28px 32px;max-width:920px}
.dash-title{font-size:26px;font-weight:800;margin-bottom:6px}
.dash-sub{font-size:14px;color:var(--tx2);line-height:1.7;margin-bottom:24px}
.dash-sub .hl{color:var(--acc);font-weight:600}
.pg{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px}
.pc{border:1px solid var(--bd);border-radius:12px;padding:18px;background:var(--sf)}
.pc-hdr{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.pc-title{font-size:13px;font-weight:700}
.ptag{font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;margin-left:auto}
.ptag.p1{background:rgba(139,92,246,.15);color:var(--p1)}.ptag.p2{background:rgba(6,182,212,.15);color:var(--p2)}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{font-size:12px;padding:4px 10px;border-radius:20px;background:var(--sf2);color:var(--tx2);cursor:pointer;transition:var(--tr);border:1px solid var(--bd)}
.chip:hover{background:var(--adim);color:var(--acc);border-color:var(--acc)}
.sec-title{font-size:13px;font-weight:700;margin-bottom:10px;color:var(--tx2)}
.ac{border:1px solid var(--bd);border-radius:var(--r);padding:12px 14px;background:var(--sf);margin-bottom:8px;cursor:pointer;transition:var(--tr)}
.ac:hover{border-color:var(--acc)}
.ac-hdr{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.atyp{font-size:10px;font-weight:600;padding:1px 5px;border-radius:3px;background:var(--sf2);color:var(--tx3);text-transform:uppercase}
.atitle{font-size:13px;font-weight:600;flex:1}
.adate{font-size:11px;color:var(--tx3)}
.aprev{font-size:12px;color:var(--tx2);line-height:1.5;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.empty{text-align:center;padding:32px;color:var(--tx3);font-size:13px;line-height:2}
/* Tool Page */
.tp{display:flex;flex-direction:column;height:100vh}
.th{padding:16px 24px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:12px;background:var(--sf);flex-shrink:0}
.ti{font-size:22px}
.tm{flex:1}.tt{font-size:17px;font-weight:700}.ts{font-size:12px;color:var(--tx2);margin-top:2px}
.pb{font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px}
.pb.p1{background:rgba(139,92,246,.15);color:var(--p1);border:1px solid rgba(139,92,246,.3)}
.pb.p2{background:rgba(6,182,212,.15);color:var(--p2);border:1px solid rgba(6,182,212,.3)}
.tb{flex:1;display:flex;overflow:hidden}
.tip{width:340px;flex-shrink:0;border-right:1px solid var(--bd);overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:12px}
.top{flex:1;overflow-y:auto;padding:24px}
/* Form */
.fg{display:flex;flex-direction:column;gap:5px}
label{font-size:12px;font-weight:600;color:var(--tx2)}
.rm{color:var(--err);margin-left:2px}
input[type=text],textarea,select{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--r);color:var(--tx);font-size:13px;padding:8px 10px;width:100%;font-family:inherit;transition:var(--tr);resize:vertical}
input[type=text]:focus,textarea:focus,select:focus{outline:none;border-color:var(--acc);background:rgba(139,92,246,.05)}
input[type=text]::placeholder,textarea::placeholder{color:var(--tx3)}
select option{background:var(--sf)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 16px;border-radius:var(--r);font-size:13px;font-weight:600;cursor:pointer;transition:var(--tr);border:none;font-family:inherit;white-space:nowrap}
.btnp{background:var(--acc);color:#fff;width:100%;padding:10px}.btnp:hover{background:var(--acc2)}.btnp:disabled{opacity:.5;cursor:not-allowed}
.btng{background:transparent;color:var(--tx2);border:1px solid var(--bd)}.btng:hover{background:var(--sf2);color:var(--tx)}
.btns{font-size:12px;padding:5px 10px}
.btnok{background:rgba(34,197,94,.1);color:var(--ok);border:1px solid rgba(34,197,94,.3)}.btnok:hover{background:rgba(34,197,94,.2)}
/* Output */
.oplaceholder{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:12px;color:var(--tx3)}
.oplaceholder-icon{font-size:36px;opacity:.4}.oplaceholder-text{font-size:14px;text-align:center;line-height:1.7}
.oc{font-size:14px;line-height:1.8;color:var(--tx2)}
.oc h1,.oc h2,.oc h3,.oc h4,.oc h5{color:var(--tx);margin:1.1em 0 .45em}
.oc h1{font-size:1.35em;border-bottom:1px solid var(--bd);padding-bottom:7px}
.oc h2{font-size:1.15em}.oc h3{font-size:1.05em;color:var(--acc)}.oc h4{font-size:.95em;color:var(--tx)}
.oc p{margin-bottom:.7em}.oc ul,.oc ol{padding-left:1.4em;margin-bottom:.7em}.oc li{margin-bottom:.3em}
.oc table{width:100%;border-collapse:collapse;margin:1em 0;font-size:13px}
.oc th{background:var(--sf);padding:7px 10px;text-align:left;font-weight:600;border:1px solid var(--bd);color:var(--tx)}
.oc td{padding:6px 10px;border:1px solid var(--bd)}.oc tr:nth-child(even){background:rgba(255,255,255,.02)}
.oc code{background:var(--sf2);padding:2px 5px;border-radius:3px;font-size:.88em;font-family:'JetBrains Mono','Fira Code',monospace;color:var(--p1)}
.oc pre{background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);padding:14px;overflow-x:auto;margin:.7em 0}
.oc pre code{background:none;padding:0;color:var(--tx);font-size:.85em}
.oc blockquote{border-left:3px solid var(--acc);padding:4px 14px;margin:.7em 0;color:var(--tx2);font-style:italic;background:var(--sf2);border-radius:0 var(--r) var(--r) 0}
.oc strong{color:var(--tx);font-weight:600}.oc a{color:var(--acc);text-decoration:none}.oc a:hover{text-decoration:underline}
.oc hr{border:none;border-top:1px solid var(--bd);margin:1em 0}
.oc input[type=checkbox]{margin-right:6px;accent-color:var(--acc)}
.oa{display:flex;align-items:center;gap:8px;margin-top:16px;padding-top:14px;border-top:1px solid var(--bd)}
.oalbl{font-size:12px;color:var(--tx3);margin-right:4px}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.cur{display:inline-block;width:2px;height:15px;background:var(--acc);margin-left:2px;vertical-align:text-bottom;animation:blink 1s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.genbadge{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--acc);background:var(--adim);padding:5px 12px;border-radius:20px;animation:pulse 1.5s infinite}
/* Chat */
.cp{display:flex;flex-direction:column;height:100vh}
.ch{padding:14px 22px;border-bottom:1px solid var(--bd);background:var(--sf);flex-shrink:0;display:flex;align-items:center;gap:10px}
.ctitle{font-size:15px;font-weight:700}.csub{font-size:12px;color:var(--tx2)}
.cms{flex:1;overflow-y:auto;padding:18px 22px;display:flex;flex-direction:column;gap:14px}
.cm{display:flex;gap:11px}.cm.user{flex-direction:row-reverse}
.cav{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}
.cav.bot{background:var(--adim)}.cav.user{background:var(--sf2)}
.cb{max-width:75%;padding:11px 13px;border-radius:12px;font-size:14px;line-height:1.65}
.cm.user .cb{background:var(--acc);color:#fff;border-top-right-radius:4px}
.cm.bot .cb{background:var(--sf);border:1px solid var(--bd);color:var(--tx);border-top-left-radius:4px}
.cm.bot .cb .oc{color:var(--tx2);font-size:13px}
.cia{padding:14px 22px;border-top:1px solid var(--bd);background:var(--sf);flex-shrink:0}
.cir{display:flex;gap:8px}
.ci{flex:1;background:var(--sf2);border:1px solid var(--bd);border-radius:10px;color:var(--tx);font-size:14px;padding:10px 13px;font-family:inherit;resize:none;max-height:120px;overflow-y:auto}
.ci:focus{outline:none;border-color:var(--acc)}
.csnd{width:38px;height:38px;border-radius:8px;background:var(--acc);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;transition:var(--tr);align-self:flex-end}
.csnd:hover{background:var(--acc2)}.csnd:disabled{opacity:.4;cursor:not-allowed}
.chint{font-size:11px;color:var(--tx3);margin-top:5px}
/* Modal */
.mo{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:100}
.mo.hidden{display:none}
.modal{background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:24px;width:420px;max-width:92vw}
.modal h3{font-size:15px;font-weight:700;margin-bottom:14px}
.modal input,.modal textarea{margin-bottom:10px}
.moa{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}
.amodal{width:820px;max-width:95vw;max-height:82vh;display:flex;flex-direction:column}
.amodal-body{overflow-y:auto;flex:1;margin-top:12px;padding-right:4px}
/* Onboarding */
.onb{border:1px solid var(--bd);border-radius:12px;padding:22px;background:var(--sf)}
.onb-title{font-size:15px;font-weight:700;margin-bottom:10px}
.onb-body{font-size:14px;color:var(--tx2);line-height:1.8}
/* Responsive */
@media(max-width:800px){.tip{width:300px}.pg{grid-template-columns:1fr}}
@media(max-width:640px){#sidebar{display:none}.tb{flex-direction:column}.tip{width:100%;border-right:none;border-bottom:1px solid var(--bd);max-height:50vh}}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
</style>
</head>
<body>
<div id="app">
  <aside id="sidebar">
    <div class="logo">
      <span class="logo-icon">\u26A1</span>
      <span class="logo-text">PMBot</span>
      <span class="logo-v">Beta</span>
    </div>
    <div class="proj-sec">
      <div class="proj-hdr">
        <span class="sec-lbl">\u9879\u76EE</span>
        <button class="add-btn" onclick="showCreateProject()" title="\u65B0\u5EFA\u9879\u76EE">+</button>
      </div>
      <div id="proj-list"><div class="no-proj">\u6682\u65E0\u9879\u76EE\uFF0C\u70B9\u51FB + \u521B\u5EFA</div></div>
    </div>
    <nav id="nav"></nav>
  </aside>
  <main id="main"></main>
</div>
<div id="mo" class="mo hidden" onclick="closeModal()">
  <div id="modal" class="modal" onclick="event.stopPropagation()"></div>
</div>
<script>
(function(){
// \u2500\u2500 Config \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var TOOLS = {
  'validate-idea':{title:'\u60F3\u6CD5\u9A8C\u8BC1',sub:'\u5728\u5199\u4EE3\u7801\u524D\uFF0C\u9A8C\u8BC1\u4F60\u7684\u4EA7\u54C1\u60F3\u6CD5\u662F\u5426\u503C\u5F97\u505A',icon:'\u{1F4A1}',phase:1,
    fields:[
      {id:'idea',label:'\u4EA7\u54C1\u60F3\u6CD5',type:'ta',ph:'\u7528 1-2 \u53E5\u8BDD\u63CF\u8FF0\u4F60\u7684\u4EA7\u54C1\u60F3\u6CD5...',req:true,rows:3},
      {id:'problem',label:'\u89E3\u51B3\u7684\u75DB\u70B9',type:'ta',ph:'\u4F60\u7684\u4EA7\u54C1\u89E3\u51B3\u4E86\u4EC0\u4E48\u5177\u4F53\u95EE\u9898\uFF1F\u7528\u6237\u5F53\u524D\u5982\u4F55\u89E3\u51B3\uFF1F',req:true,rows:3},
      {id:'target',label:'\u76EE\u6807\u7528\u6237',type:'text',ph:'\u4F8B\u5982\uFF1A\u72EC\u7ACB\u5F00\u53D1\u8005\u3001\u4E2D\u5C0F\u4F01\u4E1A\u4E3B...',req:true},
      {id:'extra',label:'\u8865\u5145\u4FE1\u606F\uFF08\u53EF\u9009\uFF09',type:'ta',ph:'\u7ADE\u54C1\u4FE1\u606F\u3001\u5E02\u573A\u89C4\u6A21\u4F30\u7B97\u3001\u6280\u672F\u7EA6\u675F...',req:false,rows:2}
    ],
    btn:'\u{1F50D} \u9A8C\u8BC1\u8FD9\u4E2A\u60F3\u6CD5',
    artTitle:function(i){return '\u60F3\u6CD5\u9A8C\u8BC1 \xB7 '+(i.idea||'').slice(0,25)}
  },
  'persona':{title:'\u7528\u6237\u753B\u50CF',sub:'\u521B\u5EFA\u771F\u5B9E\u53EF\u4FE1\u7684 Persona\uFF0C\u6DF1\u5165\u7406\u89E3\u4F60\u7684\u76EE\u6807\u7528\u6237',icon:'\u{1F464}',phase:1,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u63CF\u8FF0',type:'ta',ph:'\u7B80\u8981\u63CF\u8FF0\u4F60\u7684\u4EA7\u54C1\u529F\u80FD\u548C\u4EF7\u503C...',req:true,rows:3},
      {id:'target',label:'\u76EE\u6807\u7528\u6237',type:'text',ph:'\u4F60\u60F3\u63A5\u89E6\u54EA\u7C7B\u7528\u6237\uFF1F',req:true},
      {id:'count',label:'\u751F\u6210\u6570\u91CF',type:'sel',opts:['2','3','4'],req:false},
      {id:'extra',label:'\u8865\u5145\uFF08\u53EF\u9009\uFF09',type:'ta',ph:'\u5DF2\u6709\u7684\u7528\u6237\u8C03\u7814\u7ED3\u8BBA\u3001\u7279\u6B8A\u9650\u5236...',req:false,rows:2}
    ],
    btn:'\u{1F464} \u751F\u6210\u7528\u6237\u753B\u50CF',
    artTitle:function(i){return '\u7528\u6237\u753B\u50CF \xB7 '+(i.product||'').slice(0,20)}
  },
  'prd':{title:'PRD \u6587\u6863',sub:'\u751F\u6210\u7ED3\u6784\u5B8C\u6574\u3001\u53EF\u76F4\u63A5\u7528\u4E8E\u5F00\u53D1\u7684\u4EA7\u54C1\u9700\u6C42\u6587\u6863',icon:'\u{1F4CB}',phase:1,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u540D\u79F0',type:'text',ph:'\u4F8B\u5982\uFF1ANotionAI\u3001LogSnag...',req:true},
      {id:'idea',label:'\u4EA7\u54C1\u63CF\u8FF0',type:'ta',ph:'\u4EA7\u54C1\u7684\u6838\u5FC3\u529F\u80FD\u548C\u4EF7\u503C\u4E3B\u5F20...',req:true,rows:3},
      {id:'features',label:'\u4E3B\u8981\u529F\u80FD\u5217\u8868',type:'ta',ph:'\u6BCF\u884C\u4E00\u4E2A\u529F\u80FD\uFF1A
\u7528\u6237\u6CE8\u518C\u767B\u5F55
\u9879\u76EE\u7BA1\u7406
AI \u81EA\u52A8\u586B\u5145...',req:true,rows:5},
      {id:'target',label:'\u76EE\u6807\u7528\u6237\uFF08\u53EF\u9009\uFF09',type:'text',ph:'\u4F8B\u5982\uFF1A\u72EC\u7ACB\u5F00\u53D1\u8005...',req:false}
    ],
    btn:'\u{1F4CB} \u751F\u6210 PRD',
    artTitle:function(i){return 'PRD \xB7 '+(i.product||'')}
  },
  'user-stories':{title:'\u7528\u6237\u6545\u4E8B',sub:'\u5C06\u4EA7\u54C1\u9700\u6C42\u62C6\u89E3\u4E3A\u53EF\u6267\u884C\u7684 Agile \u7528\u6237\u6545\u4E8B',icon:'\u{1F4DD}',phase:1,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u540D\u79F0',type:'text',ph:'\u4EA7\u54C1\u540D\u79F0...',req:true},
      {id:'features',label:'\u529F\u80FD\u5217\u8868',type:'ta',ph:'\u5C06\u8981\u5B9E\u73B0\u7684\u529F\u80FD\uFF08\u6BCF\u884C\u4E00\u4E2A\uFF09\uFF1A
\u7528\u6237\u6CE8\u518C
\u9879\u76EE CRUD
\u90AE\u4EF6\u901A\u77E5...',req:true,rows:6},
      {id:'personas',label:'\u7528\u6237\u753B\u50CF\uFF08\u53EF\u9009\uFF09',type:'ta',ph:'\u7C98\u8D34\u7528\u6237\u753B\u50CF\u63CF\u8FF0\uFF0C\u8BA9\u6545\u4E8B\u66F4\u7CBE\u51C6...',req:false,rows:3}
    ],
    btn:'\u{1F4DD} \u751F\u6210\u7528\u6237\u6545\u4E8B',
    artTitle:function(i){return '\u7528\u6237\u6545\u4E8B \xB7 '+(i.product||'')}
  },
  'mvp':{title:'MVP \u8303\u56F4',sub:'\u7528\u6700\u5C0F\u6295\u5165\u9A8C\u8BC1\u4EA7\u54C1\u4EF7\u503C\uFF0C\u780D\u6389\u4E0D\u5FC5\u8981\u7684\u529F\u80FD',icon:'\u{1F3AF}',phase:1,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u540D\u79F0',type:'text',ph:'\u4EA7\u54C1\u540D\u79F0...',req:true},
      {id:'features',label:'\u8BA1\u5212\u529F\u80FD\uFF08\u5168\u90E8\uFF09',type:'ta',ph:'\u4F60\u60F3\u505A\u7684\u6240\u6709\u529F\u80FD\uFF08\u6BCF\u884C\u4E00\u4E2A\uFF09\uFF0CAI \u4F1A\u5E2E\u4F60\u7B5B\u9009 MVP \u8303\u56F4...',req:true,rows:6},
      {id:'solo',label:'\u5F00\u53D1\u65B9\u5F0F',type:'sel',opts:['\u72EC\u7ACB\u5F00\u53D1\uFF08Vibe Coding\uFF09','\u5C0F\u56E2\u961F\uFF082-3\u4EBA\uFF09'],req:false},
      {id:'timeline',label:'\u671F\u671B\u4E0A\u7EBF\u65F6\u95F4\uFF08\u53EF\u9009\uFF09',type:'text',ph:'\u4F8B\u5982\uFF1A2\u5468\u5185\u30011\u4E2A\u6708\u5185...',req:false}
    ],
    btn:'\u{1F3AF} \u5B9A\u4E49 MVP \u8303\u56F4',
    artTitle:function(i){return 'MVP \u8303\u56F4 \xB7 '+(i.product||'')}
  },
  'tech-stack':{title:'\u6280\u672F\u9009\u578B',sub:'\u63A8\u8350\u6700\u9002\u5408 Vibe Coding \u5FEB\u901F\u6784\u5EFA\u7684\u6280\u672F\u6808',icon:'\u{1F6E0}\uFE0F',phase:1,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u63CF\u8FF0',type:'ta',ph:'\u4F60\u8981\u6784\u5EFA\u4EC0\u4E48\uFF1F\u6709\u4EC0\u4E48\u7279\u6B8A\u9700\u6C42\uFF08\u5B9E\u65F6\u3001AI\u3001\u6587\u4EF6\u5904\u7406\u7B49\uFF09\uFF1F',req:true,rows:3},
      {id:'scale',label:'\u9884\u671F\u89C4\u6A21',type:'sel',opts:['\u4E2A\u4EBA\u9879\u76EE\uFF08< 1000 \u7528\u6237\uFF09','\u5C0F\u4EA7\u54C1\uFF08< 1 \u4E07\u7528\u6237\uFF09','\u589E\u957F\u578B\uFF08< 10 \u4E07\u7528\u6237\uFF09','\u89C4\u6A21\u5316\uFF0810 \u4E07+ \u7528\u6237\uFF09'],req:false},
      {id:'preferences',label:'\u6280\u672F\u504F\u597D\uFF08\u53EF\u9009\uFF09',type:'text',ph:'\u4F8B\u5982\uFF1A\u64C5\u957F TypeScript\u3001\u4E0D\u60F3\u7528 AWS...',req:false}
    ],
    btn:'\u{1F6E0}\uFE0F \u751F\u6210\u6280\u672F\u9009\u578B',
    artTitle:function(i){return '\u6280\u672F\u9009\u578B \xB7 '+(i.product||'').slice(0,20)}
  },
  'launch-checklist':{title:'\u4E0A\u7EBF\u6E05\u5355',sub:'\u4E0A\u7EBF\u524D\u3001\u4E0A\u7EBF\u5F53\u5929\u3001\u4E0A\u7EBF\u540E\u7684\u5B8C\u6574 Checklist',icon:'\u{1F680}',phase:2,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u540D\u79F0',type:'text',ph:'\u4EA7\u54C1\u540D\u79F0...',req:true},
      {id:'channels',label:'\u53D1\u5E03\u6E20\u9053',type:'text',ph:'\u4F8B\u5982\uFF1AProduct Hunt\u3001V2EX\u3001Twitter/X\u3001\u5373\u523B...',req:false},
      {id:'date',label:'\u8BA1\u5212\u4E0A\u7EBF\u65E5\u671F\uFF08\u53EF\u9009\uFF09',type:'text',ph:'\u4F8B\u5982\uFF1A2 \u5468\u540E\u30013\u6708\u5E95...',req:false}
    ],
    btn:'\u{1F680} \u751F\u6210\u4E0A\u7EBF\u6E05\u5355',
    artTitle:function(i){return '\u4E0A\u7EBF\u6E05\u5355 \xB7 '+(i.product||'')}
  },
  'marketing':{title:'\u8425\u9500\u6587\u6848',sub:'Product Hunt\u3001Twitter\u3001V2EX \u7B49\u591A\u6E20\u9053\u53D1\u5E03\u6587\u6848\u4E00\u952E\u751F\u6210',icon:'\u{1F4E2}',phase:2,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u540D\u79F0',type:'text',ph:'\u4EA7\u54C1\u540D\u79F0...',req:true},
      {id:'value_prop',label:'\u6838\u5FC3\u4EF7\u503C\u4E3B\u5F20',type:'ta',ph:'\u4EA7\u54C1\u6700\u6838\u5FC3\u7684\u4EF7\u503C\u662F\u4EC0\u4E48\uFF1F\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898\uFF1F\uFF081-2\u53E5\u8BDD\uFF09',req:true,rows:2},
      {id:'target',label:'\u76EE\u6807\u7528\u6237',type:'text',ph:'\u8FD9\u4E2A\u6587\u6848\u662F\u5199\u7ED9\u8C01\u770B\u7684\uFF1F',req:true},
      {id:'channels',label:'\u76EE\u6807\u6E20\u9053\uFF08\u53EF\u9009\uFF09',type:'text',ph:'\u4F8B\u5982\uFF1AProduct Hunt\u3001Twitter\u3001V2EX\u3001\u5373\u523B\u3001\u5C0F\u7EA2\u4E66...',req:false}
    ],
    btn:'\u{1F4E2} \u751F\u6210\u8425\u9500\u6587\u6848',
    artTitle:function(i){return '\u8425\u9500\u6587\u6848 \xB7 '+(i.product||'')}
  },
  'growth':{title:'\u589E\u957F\u7B56\u7565',sub:'AARRR \u5206\u6790\u5230\u524D 100 \u7528\u6237\u83B7\u53D6\uFF0C\u5236\u5B9A\u52A1\u5B9E\u7684\u589E\u957F\u8BA1\u5212',icon:'\u{1F4C8}',phase:2,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u540D\u79F0/\u63CF\u8FF0',type:'ta',ph:'\u4EA7\u54C1\u662F\u4EC0\u4E48\uFF1F\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\uFF1F',req:true,rows:2},
      {id:'stage',label:'\u5F53\u524D\u9636\u6BB5',type:'sel',opts:['\u521A\u4E0A\u7EBF\uFF08< 100 \u7528\u6237\uFF09','\u65E9\u671F\u589E\u957F\uFF08100-1000 \u7528\u6237\uFF09','\u6269\u5F20\u9636\u6BB5\uFF081000+ \u7528\u6237\uFF09'],req:false},
      {id:'current_users',label:'\u5F53\u524D\u7528\u6237\u6570',type:'text',ph:'0 / 100 / 500...',req:false},
      {id:'extra',label:'\u5DF2\u6709\u6E20\u9053/\u8D44\u6E90\uFF08\u53EF\u9009\uFF09',type:'ta',ph:'\u5DF2\u6709\u7684\u793E\u4EA4\u5A92\u4F53\u3001\u793E\u533A\u5173\u7CFB\u3001\u5408\u4F5C\u65B9\u7B49...',req:false,rows:2}
    ],
    btn:'\u{1F4C8} \u751F\u6210\u589E\u957F\u7B56\u7565',
    artTitle:function(i){return '\u589E\u957F\u7B56\u7565 \xB7 '+(i.product||'').slice(0,20)}
  },
  'competitors':{title:'\u7ADE\u54C1\u5206\u6790',sub:'\u6DF1\u5165\u5206\u6790\u7ADE\u4E89\u683C\u5C40\uFF0C\u627E\u5230\u5DEE\u5F02\u5316\u673A\u4F1A\u548C\u5E02\u573A\u5B9A\u4F4D',icon:'\u{1F3C6}',phase:2,
    fields:[
      {id:'product',label:'\u6211\u7684\u4EA7\u54C1',type:'ta',ph:'\u4F60\u7684\u4EA7\u54C1\u540D\u79F0\u548C\u6838\u5FC3\u529F\u80FD...',req:true,rows:2},
      {id:'competitors',label:'\u7ADE\u54C1\u5217\u8868',type:'ta',ph:'\u5217\u51FA\u4E3B\u8981\u7ADE\u54C1\uFF08\u6BCF\u884C\u4E00\u4E2A\uFF09\uFF1A
Notion
Linear
Coda...',req:true,rows:4},
      {id:'extra',label:'\u8865\u5145\uFF08\u53EF\u9009\uFF09',type:'ta',ph:'\u4F60\u5E0C\u671B\u91CD\u70B9\u6BD4\u8F83\u54EA\u4E9B\u7EF4\u5EA6\uFF1F\u5B9A\u4EF7\u53C2\u8003\uFF1F',req:false,rows:2}
    ],
    btn:'\u{1F3C6} \u5206\u6790\u7ADE\u54C1',
    artTitle:function(i){return '\u7ADE\u54C1\u5206\u6790 \xB7 '+(i.product||'').slice(0,20)}
  },
  'prioritize':{title:'\u529F\u80FD\u4F18\u5148\u7EA7',sub:'\u7528 RICE\u3001MoSCoW \u7B49\u6846\u67B6\u79D1\u5B66\u6392\u5E8F\uFF0C\u628A\u7CBE\u529B\u653E\u5BF9\u5730\u65B9',icon:'\u{1F4CA}',phase:2,
    fields:[
      {id:'product',label:'\u4EA7\u54C1\u540D\u79F0',type:'text',ph:'\u4EA7\u54C1\u540D\u79F0...',req:true},
      {id:'features',label:'\u529F\u80FD\u5217\u8868',type:'ta',ph:'\u6BCF\u884C\u4E00\u4E2A\u529F\u80FD\uFF1A
SSO \u5355\u70B9\u767B\u5F55
\u56E2\u961F\u534F\u4F5C
\u6570\u636E\u5BFC\u51FA
API \u63A5\u5165
\u79FB\u52A8\u7AEF App...',req:true,rows:8}
    ],
    btn:'\u{1F4CA} \u751F\u6210\u4F18\u5148\u7EA7\u62A5\u544A',
    artTitle:function(i){return '\u529F\u80FD\u4F18\u5148\u7EA7 \xB7 '+(i.product||'')}
  }
};
var P1=['validate-idea','persona','prd','user-stories','mvp','tech-stack'];
var P2=['launch-checklist','marketing','growth','competitors','prioritize'];

// \u2500\u2500 State \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
var S={tool:'dashboard',project:null,projects:[],gen:false,output:'',chatHist:[],lastInputs:{},lastToolId:''};

// \u2500\u2500 Utils \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function escA(s){return String(s||'').replace(/\\\\/g,'\\\\\\\\').replace(/'/g,"\\\\'")}

// \u2500\u2500 Projects \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function loadProjects(){
  try{var r=await fetch('/api/projects');S.projects=await r.json();renderProjList();}
  catch(e){console.error('load projects',e);}
}
async function createProject(){
  var nm=document.getElementById('p-name');
  var dc=document.getElementById('p-desc');
  if(!nm||!nm.value.trim()){if(nm)nm.focus();return;}
  try{
    var r=await fetch('/api/projects',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:nm.value.trim(),description:dc?dc.value.trim():''})});
    var p=await r.json();
    S.projects.unshift({id:p.id,name:p.name,description:p.description,createdAt:p.createdAt,artifactCount:0});
    S.project={id:p.id,name:p.name};
    closeModal();nm.value='';if(dc)dc.value='';
    renderProjList();renderPage(S.tool);
  }catch(e){alert('\u521B\u5EFA\u5931\u8D25\uFF1A'+e.message);}
}
function selectProject(id,name){
  S.project=id?{id:id,name:name}:null;
  renderProjList();renderPage(S.tool);
}
async function saveArtifact(){
  if(!S.project){alert('\u8BF7\u5148\u9009\u62E9\u6216\u521B\u5EFA\u9879\u76EE');return;}
  var tool=TOOLS[S.lastToolId];
  var title=tool?tool.artTitle(S.lastInputs):S.lastToolId;
  try{
    await fetch('/api/projects/'+S.project.id+'/artifacts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:S.lastToolId,title:title,content:S.output,inputs:S.lastInputs})});
    var p=S.projects.find(function(x){return x.id===S.project.id;});
    if(p)p.artifactCount=(p.artifactCount||0)+1;
    renderProjList();showToast('\u2705 \u5DF2\u4FDD\u5B58\u5230\u9879\u76EE\u300C'+S.project.name+'\u300D');
  }catch(e){alert('\u4FDD\u5B58\u5931\u8D25\uFF1A'+e.message);}
}

// \u2500\u2500 AI Generation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function generate(toolId,inputs){
  if(S.gen)return;
  S.gen=true;S.output='';S.lastInputs=inputs;S.lastToolId=toolId;
  var op=document.getElementById('out');
  var gb=document.getElementById('gb');
  if(gb){gb.disabled=true;gb.textContent='\u23F3 \u751F\u6210\u4E2D...';}
  if(op)op.innerHTML='<div style="padding:24px"><div class="genbadge">\u26A1 AI \u6B63\u5728\u751F\u6210\u5185\u5BB9\uFF0C\u8BF7\u7A0D\u5019...</div></div>';
  var fullText='';
  try{
    var res=await fetch('/api/ai/'+toolId,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({},inputs,{projectId:S.project?S.project.id:null}))});
    if(!res.ok)throw new Error('HTTP '+res.status);
    var reader=res.body.getReader();
    var dec=new TextDecoder();
    var buf='';
    if(op)op.innerHTML='<div class="oc" id="sc"></div>';
    var sc=document.getElementById('sc');
    while(true){
      var rd=await reader.read();
      if(rd.done)break;
      buf+=dec.decode(rd.value,{stream:true});
      var lines=buf.split('\\n');buf=lines.pop()||'';
      for(var i=0;i<lines.length;i++){
        var ln=lines[i].trim();
        if(!ln.startsWith('data:'))continue;
        var d=ln.slice(5).trim();
        if(d==='[DONE]'){S.gen=false;break;}
        try{var obj=JSON.parse(d);if(obj.text){fullText+=obj.text;if(sc){sc.innerHTML=marked.parse(fullText)+'<span class="cur"></span>';if(op)op.scrollTop=op.scrollHeight;}}}catch(ex){}
      }
    }
    if(sc)sc.innerHTML=marked.parse(fullText);
    S.output=fullText;
    if(op){
      var oa=document.createElement('div');
      oa.className='oa';
      oa.innerHTML='<span class="oalbl">\u751F\u6210\u5B8C\u6210</span><button class="btn btng btns" onclick="copyOut()">\u{1F4CB} \u590D\u5236</button><button class="btn btnok btns" onclick="saveArtifact()">\u{1F4BE} \u4FDD\u5B58\u5230\u9879\u76EE</button>';
      op.appendChild(oa);
    }
  }catch(e){
    if(op)op.innerHTML='<div style="padding:24px;color:var(--err)">\u274C \u751F\u6210\u5931\u8D25\uFF1A'+esc(String(e.message||e))+'<br><small style="color:var(--tx3)">\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\uFF0C\u6216\u7A0D\u540E\u91CD\u8BD5\u3002</small></div>';
  }finally{
    S.gen=false;
    if(gb){gb.disabled=false;var tl=TOOLS[toolId];gb.textContent=tl?tl.btn:'\u751F\u6210';}
  }
}
function copyOut(){
  navigator.clipboard.writeText(S.output).then(function(){showToast('\u2705 \u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F');});
}
function handleGenerate(toolId){
  var tool=TOOLS[toolId];if(!tool)return;
  var inputs={};var ok=true;
  for(var i=0;i<tool.fields.length;i++){
    var f=tool.fields[i];
    var el=document.getElementById('f-'+f.id);
    var val=el?el.value.trim():'';
    if(f.req&&!val){if(el){el.style.borderColor='var(--err)';el.focus();setTimeout(function(e){return function(){e.style.borderColor='';}}(el),2000);}ok=false;break;}
    inputs[f.id]=val;
  }
  if(!ok)return;
  generate(toolId,inputs);
}

// \u2500\u2500 Chat \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function sendChat(){
  var inp=document.getElementById('ci');
  var msg=inp?inp.value.trim():'';
  if(!msg||S.gen)return;
  S.chatHist.push({role:'user',content:msg});
  if(inp)inp.value='';
  renderChat();
  S.gen=true;
  var sb=document.getElementById('csnd');if(sb)sb.disabled=true;
  S.chatHist.push({role:'bot',content:''});
  renderChat();
  var fullText='';
  try{
    var res=await fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg,projectId:S.project?S.project.id:null})});
    var reader=res.body.getReader();var dec=new TextDecoder();var buf='';
    var botIdx=S.chatHist.length-1;
    while(true){
      var rd=await reader.read();if(rd.done)break;
      buf+=dec.decode(rd.value,{stream:true});
      var lines=buf.split('\\n');buf=lines.pop()||'';
      for(var i=0;i<lines.length;i++){
        var ln=lines[i].trim();if(!ln.startsWith('data:'))continue;
        var d=ln.slice(5).trim();if(d==='[DONE]')break;
        try{var obj=JSON.parse(d);if(obj.text){fullText+=obj.text;S.chatHist[botIdx].content=fullText;updateLastBot(fullText);}}catch(ex){}
      }
    }
    S.chatHist[botIdx].content=fullText;
  }catch(e){S.chatHist[S.chatHist.length-1].content='\u274C \u8BF7\u6C42\u5931\u8D25\uFF1A'+e.message;}
  finally{S.gen=false;if(sb)sb.disabled=false;renderChat();}
}
function updateLastBot(text){
  var msgs=document.querySelectorAll('.cm.bot');
  var last=msgs[msgs.length-1];
  if(last){var oc=last.querySelector('.oc');if(oc){oc.innerHTML=marked.parse(text)+'<span class="cur"></span>';scrollChat();}}
}
function scrollChat(){var c=document.getElementById('cms');if(c)c.scrollTop=c.scrollHeight;}
function renderChat(){
  var c=document.getElementById('cms');if(!c)return;
  var html='';
  for(var i=0;i<S.chatHist.length;i++){
    var m=S.chatHist[i];
    var isBot=m.role==='bot';
    html+='<div class="cm '+(isBot?'bot':'user')+'"><div class="cav '+(isBot?'bot':'user')+'">'+(isBot?'\u26A1':'\u{1F464}')+'</div><div class="cb">';
    if(isBot){html+='<div class="oc">'+(m.content?marked.parse(m.content):'<span style="color:var(--tx3)">\u601D\u8003\u4E2D...</span>')+'</div>';}
    else{html+=esc(m.content);}
    html+='</div></div>';
  }
  c.innerHTML=html;scrollChat();
}

// \u2500\u2500 Artifacts \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
async function loadArts(){
  if(!S.project)return;
  try{
    var r=await fetch('/api/projects/'+S.project.id);
    var p=await r.json();
    var c=document.getElementById('arts');if(!c)return;
    if(!p.artifacts||p.artifacts.length===0){c.innerHTML='<div class="empty">\u{1F5C2}\uFE0F \u6682\u65E0\u6587\u6863<br><small>\u4F7F\u7528\u5DE5\u5177\u751F\u6210\u5185\u5BB9\u540E\u70B9\u51FB\u300C\u4FDD\u5B58\u5230\u9879\u76EE\u300D</small></div>';return;}
    var html='';
    for(var i=0;i<p.artifacts.length;i++){
      var a=p.artifacts[i];
      html+='<div class="ac" onclick="showArt('+JSON.stringify(a).replace(/</g,'\\u003c')+')">';
      html+='<div class="ac-hdr"><span class="atyp">'+esc(a.type)+'</span><span class="atitle">'+esc(a.title)+'</span><span class="adate">'+new Date(a.createdAt).toLocaleDateString('zh-CN')+'</span></div>';
      html+='<div class="aprev">'+esc(a.content.slice(0,150))+'</div></div>';
    }
    c.innerHTML=html;
  }catch(e){console.error(e);}
}
function showArt(a){
  var m=document.getElementById('modal');
  m.className='modal amodal';
  m.innerHTML='<div style="display:flex;align-items:center;gap:8px;"><h3 style="flex:1">'+esc(a.title)+'</h3><button class="btn btng btns" onclick="navigator.clipboard.writeText('+JSON.stringify(a.content).replace(/</g,'\\u003c').replace(/"/g,'&quot;')+').then(function(){showToast('\u5DF2\u590D\u5236')})">\u{1F4CB} \u590D\u5236</button><button class="btn btng btns" onclick="closeModal()">\u2715</button></div><div style="font-size:11px;color:var(--tx3);margin-bottom:10px">'+new Date(a.createdAt).toLocaleString('zh-CN')+'</div><div class="amodal-body"><div class="oc">'+marked.parse(a.content)+'</div></div>';
  document.getElementById('mo').classList.remove('hidden');
}

// \u2500\u2500 Rendering \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function navigate(id){
  S.tool=id;
  document.querySelectorAll('.ni').forEach(function(el){el.classList.toggle('active',el.dataset.tool===id);});
  renderPage(id);
}
function renderPage(id){
  var m=document.getElementById('main');if(!m)return;
  if(id==='dashboard'){m.innerHTML=renderDash();setTimeout(loadArts,60);}
  else if(id==='chat'){m.innerHTML=renderChatPage();setupChat();}
  else if(TOOLS[id]){m.innerHTML=renderTool(id);}
}
function renderDash(){
  var html='<div class="dash">';
  html+='<div class="dash-title">\u26A1 PMBot \u2014 AI \u4EA7\u54C1\u7ECF\u7406\u52A9\u624B</div>';
  html+='<div class="dash-sub">\u4E13\u4E3A <span class="hl">AI Vibe Coder</span> \u8BBE\u8BA1\u7684 PM \u5DE5\u5177\u7BB1\u3002\u8986\u76D6\u4EA7\u54C1\u4ECE 0 \u5230 1 \u518D\u5230\u589E\u957F\u7684\u5168\u6D41\u7A0B\u3002';
  html+=S.project?(' \u5F53\u524D\u9879\u76EE\uFF1A<span class="hl">'+esc(S.project.name)+'</span>'):'<span style="color:var(--warn)">\u672A\u9009\u62E9\u9879\u76EE\uFF0C\u70B9\u51FB\u5DE6\u4FA7 + \u65B0\u5EFA\u4E00\u4E2A</span>';
  html+='</div>';
  html+='<div class="pg">';
  // Phase 1
  html+='<div class="pc"><div class="pc-hdr"><span style="font-size:20px">\u{1F680}</span><span class="pc-title">Phase 1 \xB7 \u4ECE 0 \u5230 1</span><span class="ptag p1">Phase 1</span></div><div class="chips">';
  for(var i=0;i<P1.length;i++){var t=TOOLS[P1[i]];html+='<div class="chip" onclick="navigate(''+P1[i]+'')">'+t.icon+' '+t.title+'</div>';}
  html+='</div></div>';
  // Phase 2
  html+='<div class="pc"><div class="pc-hdr"><span style="font-size:20px">\u{1F4C8}</span><span class="pc-title">Phase 2 \xB7 \u4ECE 1 \u5230\u589E\u957F</span><span class="ptag p2">Phase 2</span></div><div class="chips">';
  for(var j=0;j<P2.length;j++){var t2=TOOLS[P2[j]];html+='<div class="chip" onclick="navigate(''+P2[j]+'')">'+t2.icon+' '+t2.title+'</div>';}
  html+='</div></div></div>';
  // Artifacts or onboarding
  if(S.project){
    html+='<div><div class="sec-title">\u{1F4C2} '+esc(S.project.name)+' \u7684\u6587\u6863</div><div id="arts"><div style="color:var(--tx3);font-size:13px">\u52A0\u8F7D\u4E2D...</div></div></div>';
  } else {
    html+='<div class="onb"><div class="onb-title">\u{1F389} \u6B22\u8FCE\u4F7F\u7528 PMBot\uFF01</div><div class="onb-body">\u4E09\u6B65\u5F00\u59CB\u4F7F\u7528\uFF1A<br>1\uFE0F\u20E3 \u70B9\u51FB\u5DE6\u4FA7\u300C+\u300D\u521B\u5EFA\u4E00\u4E2A\u4EA7\u54C1\u9879\u76EE<br>2\uFE0F\u20E3 \u9009\u62E9 Phase 1 \u6216 Phase 2 \u7684\u5DE5\u5177<br>3\uFE0F\u20E3 \u586B\u5199\u8868\u5355\uFF0C\u70B9\u51FB\u751F\u6210\uFF0C\u4FDD\u5B58\u6587\u6863\u5230\u9879\u76EE<br><br>\u63A8\u8350\u4ECE\u8FD9\u91CC\u5F00\u59CB \u2192 <span class="chip" onclick="navigate('validate-idea')" style="display:inline-flex;cursor:pointer">\u{1F4A1} \u60F3\u6CD5\u9A8C\u8BC1</span></div></div>';
  }
  html+='</div>';
  return html;
}
function renderTool(id){
  var t=TOOLS[id];
  var pc=t.phase===1?'p1':'p2';
  var pl=t.phase===1?'Phase 1 \xB7 \u4ECE 0 \u5230 1':'Phase 2 \xB7 \u4ECE 1 \u5230\u589E\u957F';
  var html='<div class="tp">';
  html+='<div class="th"><span class="ti">'+t.icon+'</span><div class="tm"><div class="tt">'+t.title+'</div><div class="ts">'+t.sub+'</div></div><span class="pb '+pc+'">'+pl+'</span></div>';
  html+='<div class="tb"><div class="tip">';
  for(var i=0;i<t.fields.length;i++){html+=renderField(t.fields[i]);}
  html+='<button id="gb" class="btn btnp" onclick="handleGenerate(''+id+'')">'+t.btn+'</button>';
  if(S.project){html+='<div style="font-size:11px;color:var(--tx3);text-align:center">\u4FDD\u5B58\u5230\uFF1A'+esc(S.project.name)+'</div>';}
  else{html+='<div style="font-size:11px;color:var(--warn);text-align:center">\u{1F4A1} \u9009\u62E9\u9879\u76EE\u540E\u53EF\u4FDD\u5B58\u6587\u6863</div>';}
  html+='</div><div class="top" id="out">';
  html+='<div class="oplaceholder"><div class="oplaceholder-icon">'+t.icon+'</div><div class="oplaceholder-text">\u586B\u5199\u5DE6\u4FA7\u8868\u5355<br>\u70B9\u51FB\u300C'+t.btn+'\u300D<br>AI \u5C06\u751F\u6210\u4E13\u4E1A\u7684 PM \u6587\u6863</div></div>';
  html+='</div></div></div>';
  return html;
}
function renderField(f){
  var lbl='<label>'+esc(f.label)+(f.req?'<span class="rm">*</span>':'')+'</label>';
  if(f.type==='ta'){return '<div class="fg">'+lbl+'<textarea id="f-'+f.id+'" placeholder="'+esc(f.ph)+'" rows="'+(f.rows||3)+'"></textarea></div>';}
  if(f.type==='sel'){var opts='';for(var i=0;i<f.opts.length;i++){opts+='<option value="'+esc(f.opts[i])+'">'+esc(f.opts[i])+'</option>';}return '<div class="fg">'+lbl+'<select id="f-'+f.id+'">'+opts+'</select></div>';}
  return '<div class="fg">'+lbl+'<input type="text" id="f-'+f.id+'" placeholder="'+esc(f.ph)+'" /></div>';
}
function renderChatPage(){
  var html='<div class="cp">';
  html+='<div class="ch"><div><div class="ctitle">\u{1F4AC} PM \u5BF9\u8BDD</div><div class="csub">\u4E0E AI \u4EA7\u54C1\u7ECF\u7406\u81EA\u7531\u5BF9\u8BDD\uFF0C\u83B7\u53D6\u4EA7\u54C1\u5EFA\u8BAE\u548C\u7B56\u7565</div></div>';
  html+='<button class="btn btng btns" onclick="S.chatHist=[];renderChat();" style="margin-left:auto">\u6E05\u7A7A\u5BF9\u8BDD</button></div>';
  html+='<div class="cms" id="cms"></div>';
  html+='<div class="cia"><div class="cir"><textarea id="ci" class="ci" placeholder="\u95EE\u6211\u4EFB\u4F55\u4EA7\u54C1\u95EE\u9898... (Enter \u53D1\u9001\uFF0CShift+Enter \u6362\u884C)" rows="2"></textarea><button id="csnd" class="csnd" onclick="sendChat()">\u2191</button></div><div class="chint">Enter \u53D1\u9001 \xB7 Shift+Enter \u6362\u884C</div></div>';
  html+='</div>';
  return html;
}
function setupChat(){
  // Render existing history or welcome message
  if(S.chatHist.length===0){
    var c=document.getElementById('cms');
    if(c)c.innerHTML='<div class="cm bot"><div class="cav bot">\u26A1</div><div class="cb"><div class="oc">'+marked.parse('\u4F60\u597D\uFF01\u6211\u662F **PMBot**\uFF0C\u4F60\u7684 AI \u4EA7\u54C1\u7ECF\u7406\u52A9\u624B\u3002\\n\\n\u6211\u53EF\u4EE5\u5E2E\u4F60\uFF1A\\n- \u{1F3AF} \u5206\u6790\u4EA7\u54C1\u7B56\u7565\u548C\u5B9A\u4F4D\\n- \u{1F464} \u7814\u7A76\u76EE\u6807\u7528\u6237\u548C\u5E02\u573A\\n- \u{1F4C8} \u5236\u5B9A\u589E\u957F\u548C\u8425\u9500\u7B56\u7565\\n- \u{1F6E0}\uFE0F \u6280\u672F\u9009\u578B\u548C\u67B6\u6784\u5EFA\u8BAE\\n- \u{1F4CA} \u529F\u80FD\u4F18\u5148\u7EA7\u548C\u8DEF\u7EBF\u56FE\u89C4\u5212\\n\\n\u6709\u4EC0\u4E48\u4EA7\u54C1\u95EE\u9898\uFF0C\u76F4\u63A5\u95EE\u6211\u5427\uFF01')+'</div></div></div>';
  } else {renderChat();}
  var inp=document.getElementById('ci');
  if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat();}});
}

// \u2500\u2500 Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function renderProjList(){
  var c=document.getElementById('proj-list');if(!c)return;
  if(!S.projects.length){c.innerHTML='<div class="no-proj">\u6682\u65E0\u9879\u76EE\uFF0C\u70B9\u51FB + \u521B\u5EFA</div>';return;}
  var html='';
  for(var i=0;i<S.projects.length;i++){
    var p=S.projects[i];
    var act=S.project&&S.project.id===p.id;
    html+='<div class="proj-item'+(act?' active':'')+'" onclick="selectProject(''+escA(p.id)+'',''+escA(p.name)+'')">';
    html+='<div class="proj-dot"></div><span class="proj-name">'+esc(p.name)+'</span>';
    if(p.artifactCount)html+='<span class="proj-cnt">'+p.artifactCount+'</span>';
    html+='</div>';
  }
  c.innerHTML=html;
}
function buildNav(){
  var c=document.getElementById('nav');if(!c)return;
  var html='<div class="ni" data-tool="dashboard" onclick="navigate('dashboard')">\u{1F3E0} \u5DE5\u4F5C\u53F0</div>';
  html+='<div class="nsl p1">Phase 1 \xB7 \u4ECE 0 \u5230 1</div>';
  for(var i=0;i<P1.length;i++){var t=TOOLS[P1[i]];html+='<div class="ni" data-tool="'+P1[i]+'" onclick="navigate(''+P1[i]+'')">'+t.icon+' '+t.title+'</div>';}
  html+='<div class="nsl p2">Phase 2 \xB7 \u4ECE 1 \u5230\u589E\u957F</div>';
  for(var j=0;j<P2.length;j++){var t2=TOOLS[P2[j]];html+='<div class="ni" data-tool="'+P2[j]+'" onclick="navigate(''+P2[j]+'')">'+t2.icon+' '+t2.title+'</div>';}
  html+='<div class="ndiv"></div><div class="ni" data-tool="chat" onclick="navigate('chat')">\u{1F4AC} PM \u5BF9\u8BDD</div>';
  c.innerHTML=html;
}

// \u2500\u2500 Modal \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function showCreateProject(){
  var m=document.getElementById('modal');
  m.className='modal';
  m.innerHTML='<h3>\u{1F4C1} \u65B0\u5EFA\u9879\u76EE</h3><div class="fg" style="margin-bottom:10px"><label>\u9879\u76EE\u540D\u79F0<span class="rm">*</span></label><input type="text" id="p-name" placeholder="\u4F8B\u5982\uFF1A\u6211\u7684 SaaS \u4EA7\u54C1" /></div><div class="fg"><label>\u9879\u76EE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label><textarea id="p-desc" placeholder="\u4E00\u53E5\u8BDD\u63CF\u8FF0\u8FD9\u4E2A\u4EA7\u54C1..." rows="2"></textarea></div><div class="moa"><button onclick="closeModal()" class="btn btng">\u53D6\u6D88</button><button onclick="createProject()" class="btn btnp" style="width:auto;padding:9px 20px">\u521B\u5EFA\u9879\u76EE</button></div>';
  document.getElementById('mo').classList.remove('hidden');
  setTimeout(function(){var e=document.getElementById('p-name');if(e)e.focus();},60);
}
function closeModal(){document.getElementById('mo').classList.add('hidden');}

// \u2500\u2500 Toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
function showToast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:22px;right:22px;background:var(--sf);border:1px solid var(--bd);border-radius:8px;padding:10px 16px;font-size:13px;z-index:200;box-shadow:0 4px 20px rgba(0,0,0,.5);animation:fadeIn .2s ease;';
  t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove();},2500);
}

// \u2500\u2500 Init \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
marked.setOptions({breaks:true,gfm:true});
buildNav();
loadProjects().then(function(){navigate('dashboard');});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
window.navigate=navigate;window.showCreateProject=showCreateProject;window.closeModal=closeModal;
window.createProject=createProject;window.selectProject=selectProject;
window.handleGenerate=handleGenerate;window.saveArtifact=saveArtifact;window.copyOut=copyOut;
window.sendChat=sendChat;window.showArt=showArt;window.showToast=showToast;window.S=S;
})();
<\/script>
</body>
</html>`;
}
__name(getHTML, "getHTML");

// src/index.ts
var app = new Hono2();
app.use("*", cors());
app.get("/", (c) => c.html(getHTML()));
app.get(
  "/api/health",
  (c) => c.json({ ok: true, version: "1.0.0", ts: Date.now() })
);
app.get("/api/projects", async (c) => {
  const raw2 = await c.env.KV.get("projects:list");
  const list = raw2 ? JSON.parse(raw2) : [];
  return c.json(list);
});
app.post("/api/projects", async (c) => {
  const body = await c.req.json();
  if (!body.name?.trim())
    return c.json({ error: "\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" }, 400);
  const project = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    description: body.description?.trim() ?? "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    artifacts: []
  };
  await c.env.KV.put(`project:${project.id}`, JSON.stringify(project));
  const raw2 = await c.env.KV.get("projects:list");
  const list = raw2 ? JSON.parse(raw2) : [];
  list.unshift({
    id: project.id,
    name: project.name,
    description: project.description,
    createdAt: project.createdAt,
    artifactCount: 0
  });
  await c.env.KV.put("projects:list", JSON.stringify(list));
  return c.json(project, 201);
});
app.get("/api/projects/:id", async (c) => {
  const raw2 = await c.env.KV.get(`project:${c.req.param("id")}`);
  if (!raw2)
    return c.json({ error: "\u9879\u76EE\u4E0D\u5B58\u5728" }, 404);
  return c.json(JSON.parse(raw2));
});
app.put("/api/projects/:id", async (c) => {
  const raw2 = await c.env.KV.get(`project:${c.req.param("id")}`);
  if (!raw2)
    return c.json({ error: "\u9879\u76EE\u4E0D\u5B58\u5728" }, 404);
  const project = JSON.parse(raw2);
  const body = await c.req.json();
  if (body.name)
    project.name = body.name.trim();
  if (body.description !== void 0)
    project.description = body.description.trim();
  project.updatedAt = Date.now();
  await c.env.KV.put(`project:${project.id}`, JSON.stringify(project));
  const listRaw = await c.env.KV.get("projects:list");
  if (listRaw) {
    const list = JSON.parse(listRaw);
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      list[idx].name = project.name;
      list[idx].description = project.description;
      await c.env.KV.put("projects:list", JSON.stringify(list));
    }
  }
  return c.json(project);
});
app.delete("/api/projects/:id", async (c) => {
  const id = c.req.param("id");
  await c.env.KV.delete(`project:${id}`);
  const listRaw = await c.env.KV.get("projects:list");
  if (listRaw) {
    const list = JSON.parse(listRaw);
    await c.env.KV.put(
      "projects:list",
      JSON.stringify(list.filter((p) => p.id !== id))
    );
  }
  return c.json({ ok: true });
});
app.post("/api/projects/:id/artifacts", async (c) => {
  const raw2 = await c.env.KV.get(`project:${c.req.param("id")}`);
  if (!raw2)
    return c.json({ error: "\u9879\u76EE\u4E0D\u5B58\u5728" }, 404);
  const project = JSON.parse(raw2);
  const body = await c.req.json();
  const artifact = {
    id: crypto.randomUUID(),
    ...body,
    createdAt: Date.now()
  };
  project.artifacts.unshift(artifact);
  project.updatedAt = Date.now();
  await c.env.KV.put(`project:${project.id}`, JSON.stringify(project));
  const listRaw = await c.env.KV.get("projects:list");
  if (listRaw) {
    const list = JSON.parse(listRaw);
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx !== -1)
      list[idx].artifactCount = project.artifacts.length;
    await c.env.KV.put("projects:list", JSON.stringify(list));
  }
  return c.json(artifact, 201);
});
app.delete("/api/projects/:id/artifacts/:aid", async (c) => {
  const raw2 = await c.env.KV.get(`project:${c.req.param("id")}`);
  if (!raw2)
    return c.json({ error: "\u9879\u76EE\u4E0D\u5B58\u5728" }, 404);
  const project = JSON.parse(raw2);
  project.artifacts = project.artifacts.filter((a) => a.id !== c.req.param("aid"));
  project.updatedAt = Date.now();
  await c.env.KV.put(`project:${project.id}`, JSON.stringify(project));
  return c.json({ ok: true });
});
app.post("/api/ai/:tool", async (c) => {
  const tool = c.req.param("tool");
  const body = await c.req.json();
  const prompt = getPrompt(tool);
  if (!prompt)
    return c.json({ error: `\u672A\u77E5\u5DE5\u5177: ${tool}` }, 400);
  const systemMsg = prompt.system;
  const userMsg = prompt.buildUser(body);
  if (c.env.ANTHROPIC_API_KEY) {
    return streamAnthropic(c.env.ANTHROPIC_API_KEY, systemMsg, userMsg);
  } else if (c.env.OPENAI_API_KEY) {
    return streamOpenAI(c.env.OPENAI_API_KEY, systemMsg, userMsg);
  } else {
    return streamWorkersAI(c.env.AI, systemMsg, userMsg);
  }
});
function normalizeStream(source, extractText) {
  const encoder = new TextEncoder();
  let buffer = "";
  return new ReadableStream({
    async start(controller) {
      const reader = source.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
            break;
          }
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:"))
              continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              continue;
            }
            try {
              const parsed = JSON.parse(data);
              const text = extractText(parsed);
              if (text) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ text })}

`)
                );
              }
            } catch {
            }
          }
        }
      } catch (e) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ text: `

[\u9519\u8BEF: ${String(e)}]` })}

`
          )
        );
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    }
  });
}
__name(normalizeStream, "normalizeStream");
var SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "X-Accel-Buffering": "no"
};
async function streamWorkersAI(ai, system, user) {
  const result = await ai.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    stream: true,
    max_tokens: 4096
  });
  const stream = normalizeStream(
    result,
    (p) => p.response ?? null
  );
  return new Response(stream, { headers: SSE_HEADERS });
}
__name(streamWorkersAI, "streamWorkersAI");
async function streamOpenAI(apiKey, system, user) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      stream: true,
      max_tokens: 4096
    })
  });
  if (!res.ok || !res.body) {
    return new Response(`data: ${JSON.stringify({ text: "OpenAI \u8BF7\u6C42\u5931\u8D25" })}
data: [DONE]

`, {
      headers: SSE_HEADERS
    });
  }
  const stream = normalizeStream(
    res.body,
    (p) => {
      const d = p;
      return d.choices?.[0]?.delta?.content ?? null;
    }
  );
  return new Response(stream, { headers: SSE_HEADERS });
}
__name(streamOpenAI, "streamOpenAI");
async function streamAnthropic(apiKey, system, user) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-3-5-haiku-20241022",
      system,
      messages: [{ role: "user", content: user }],
      stream: true,
      max_tokens: 4096
    })
  });
  if (!res.ok || !res.body) {
    return new Response(`data: ${JSON.stringify({ text: "Anthropic \u8BF7\u6C42\u5931\u8D25" })}
data: [DONE]

`, {
      headers: SSE_HEADERS
    });
  }
  const stream = normalizeStream(
    res.body,
    (p) => {
      const d = p;
      if (d.type === "content_block_delta")
        return d.delta?.text ?? null;
      return null;
    }
  );
  return new Response(stream, { headers: SSE_HEADERS });
}
__name(streamAnthropic, "streamAnthropic");
var src_default = app;
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
