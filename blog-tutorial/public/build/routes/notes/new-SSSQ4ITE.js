import {
  require_note
} from "/build/_shared/chunk-E4QSSUG6.js";
import {
  require_session
} from "/build/_shared/chunk-GLWAIFE6.js";
import {
  Form,
  require_jsx_dev_runtime,
  require_react,
  useActionData
} from "/build/_shared/chunk-GMAVJ7O4.js";
import {
  __toESM
} from "/build/_shared/chunk-5KL4PAQL.js";

// app/routes/notes/new.jsx
var React = __toESM(require_react());
var import_note = __toESM(require_note());
var import_session = __toESM(require_session());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function NewNotePage() {
  var _a, _b, _c, _d, _e, _f;
  const actionData = useActionData();
  const titleRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  React.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    if ((_a2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a2.title) {
      (_b2 = titleRef.current) == null ? void 0 : _b2.focus();
    } else if ((_c2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c2.body) {
      (_d2 = bodyRef.current) == null ? void 0 : _d2.focus();
    }
  }, [actionData]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, {
    method: "post",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      width: "100%"
    },
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
            className: "flex w-full flex-col gap-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                children: "Title: "
              }, void 0, false, {
                fileName: "app/routes/notes/new.jsx",
                lineNumber: 59,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                ref: titleRef,
                name: "title",
                className: "flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose",
                "aria-invalid": ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.title) ? true : void 0,
                "aria-errormessage": ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.title) ? "title-error" : void 0
              }, void 0, false, {
                fileName: "app/routes/notes/new.jsx",
                lineNumber: 60,
                columnNumber: 11
              }, this)
            ]
          }, void 0, true, {
            fileName: "app/routes/notes/new.jsx",
            lineNumber: 58,
            columnNumber: 9
          }, this),
          ((_c = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c.title) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "pt-1 text-red-700",
            id: "title-error",
            children: actionData.errors.title
          }, void 0, false, {
            fileName: "app/routes/notes/new.jsx",
            lineNumber: 71,
            columnNumber: 11
          }, this)
        ]
      }, void 0, true, {
        fileName: "app/routes/notes/new.jsx",
        lineNumber: 57,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
            className: "flex w-full flex-col gap-1",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                children: "Body: "
              }, void 0, false, {
                fileName: "app/routes/notes/new.jsx",
                lineNumber: 79,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
                ref: bodyRef,
                name: "body",
                rows: 8,
                className: "w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6",
                "aria-invalid": ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.body) ? true : void 0,
                "aria-errormessage": ((_e = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _e.body) ? "body-error" : void 0
              }, void 0, false, {
                fileName: "app/routes/notes/new.jsx",
                lineNumber: 80,
                columnNumber: 11
              }, this)
            ]
          }, void 0, true, {
            fileName: "app/routes/notes/new.jsx",
            lineNumber: 78,
            columnNumber: 9
          }, this),
          ((_f = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _f.body) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "pt-1 text-red-700",
            id: "body-error",
            children: actionData.errors.body
          }, void 0, false, {
            fileName: "app/routes/notes/new.jsx",
            lineNumber: 92,
            columnNumber: 11
          }, this)
        ]
      }, void 0, true, {
        fileName: "app/routes/notes/new.jsx",
        lineNumber: 77,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
        className: "text-right",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
          type: "submit",
          className: "rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
          children: "Save"
        }, void 0, false, {
          fileName: "app/routes/notes/new.jsx",
          lineNumber: 99,
          columnNumber: 9
        }, this)
      }, void 0, false, {
        fileName: "app/routes/notes/new.jsx",
        lineNumber: 98,
        columnNumber: 7
      }, this)
    ]
  }, void 0, true, {
    fileName: "app/routes/notes/new.jsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}
export {
  NewNotePage as default
};
//# sourceMappingURL=/build/routes/notes/new-SSSQ4ITE.js.map
