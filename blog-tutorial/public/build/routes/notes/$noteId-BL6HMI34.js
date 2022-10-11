import {
  require_note
} from "/build/_shared/chunk-E4QSSUG6.js";
import {
  require_session
} from "/build/_shared/chunk-GLWAIFE6.js";
import {
  Form,
  require_jsx_dev_runtime,
  useCatch,
  useLoaderData
} from "/build/_shared/chunk-LDV7LPTE.js";
import {
  __toESM
} from "/build/_shared/chunk-5KL4PAQL.js";

// app/routes/notes/$noteId.jsx
var import_note = __toESM(require_note());
var import_session = __toESM(require_session());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function NoteDetailsPage() {
  const data = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
        className: "text-2xl font-bold",
        children: data.note.title
      }, void 0, false, {
        fileName: "app/routes/notes/$noteId.jsx",
        lineNumber: 33,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
        className: "py-6",
        children: data.note.body
      }, void 0, false, {
        fileName: "app/routes/notes/$noteId.jsx",
        lineNumber: 34,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {
        className: "my-4"
      }, void 0, false, {
        fileName: "app/routes/notes/$noteId.jsx",
        lineNumber: 35,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, {
        method: "post",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
          type: "submit",
          className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
          children: "Delete"
        }, void 0, false, {
          fileName: "app/routes/notes/$noteId.jsx",
          lineNumber: 37,
          columnNumber: 9
        }, this)
      }, void 0, false, {
        fileName: "app/routes/notes/$noteId.jsx",
        lineNumber: 36,
        columnNumber: 7
      }, this)
    ]
  }, void 0, true, {
    fileName: "app/routes/notes/$noteId.jsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    children: [
      "An unexpected error occurred: ",
      error.message
    ]
  }, void 0, true, {
    fileName: "app/routes/notes/$noteId.jsx",
    lineNumber: 51,
    columnNumber: 10
  }, this);
}
function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      children: "Note not found"
    }, void 0, false, {
      fileName: "app/routes/notes/$noteId.jsx",
      lineNumber: 58,
      columnNumber: 12
    }, this);
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
export {
  CatchBoundary,
  ErrorBoundary,
  NoteDetailsPage as default
};
//# sourceMappingURL=/build/routes/notes/$noteId-BL6HMI34.js.map
