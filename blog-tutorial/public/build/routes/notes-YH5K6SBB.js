import {
  useUser
} from "/build/_shared/chunk-TEG7NBGE.js";
import {
  require_note
} from "/build/_shared/chunk-E4QSSUG6.js";
import {
  require_session
} from "/build/_shared/chunk-GLWAIFE6.js";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  require_jsx_dev_runtime,
  useLoaderData
} from "/build/_shared/chunk-LOAKMVUP.js";
import {
  __toESM
} from "/build/_shared/chunk-5KL4PAQL.js";

// app/routes/notes.jsx
var import_session = __toESM(require_session());
var import_note = __toESM(require_note());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function NotesPage() {
  const data = useLoaderData();
  const user = useUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "flex h-full min-h-screen flex-col",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
        className: "flex items-center justify-between bg-slate-800 p-4 text-white",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
            className: "text-3xl font-bold",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
              to: ".",
              children: "Notes"
            }, void 0, false, {
              fileName: "app/routes/notes.jsx",
              lineNumber: 22,
              columnNumber: 11
            }, this)
          }, void 0, false, {
            fileName: "app/routes/notes.jsx",
            lineNumber: 21,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
            children: user.email
          }, void 0, false, {
            fileName: "app/routes/notes.jsx",
            lineNumber: 24,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, {
            action: "/logout",
            method: "post",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
              type: "submit",
              className: "rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
              children: "Logout"
            }, void 0, false, {
              fileName: "app/routes/notes.jsx",
              lineNumber: 26,
              columnNumber: 11
            }, this)
          }, void 0, false, {
            fileName: "app/routes/notes.jsx",
            lineNumber: 25,
            columnNumber: 9
          }, this)
        ]
      }, void 0, true, {
        fileName: "app/routes/notes.jsx",
        lineNumber: 20,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
        className: "flex h-full bg-white",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "h-full w-80 border-r bg-gray-50",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
                to: "new",
                className: "block p-4 text-xl text-blue-500",
                children: "+ New Note"
              }, void 0, false, {
                fileName: "app/routes/notes.jsx",
                lineNumber: 37,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
                fileName: "app/routes/notes.jsx",
                lineNumber: 41,
                columnNumber: 11
              }, this),
              data.noteListItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                className: "p-4",
                children: "No notes yet"
              }, void 0, false, {
                fileName: "app/routes/notes.jsx",
                lineNumber: 44,
                columnNumber: 13
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
                children: data.noteListItems.map((note) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NavLink, {
                    className: ({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`,
                    to: note.id,
                    children: [
                      "\u{1F4DD} ",
                      note.title
                    ]
                  }, void 0, true, {
                    fileName: "app/routes/notes.jsx",
                    lineNumber: 49,
                    columnNumber: 19
                  }, this)
                }, note.id, false, {
                  fileName: "app/routes/notes.jsx",
                  lineNumber: 48,
                  columnNumber: 17
                }, this))
              }, void 0, false, {
                fileName: "app/routes/notes.jsx",
                lineNumber: 46,
                columnNumber: 13
              }, this)
            ]
          }, void 0, true, {
            fileName: "app/routes/notes.jsx",
            lineNumber: 36,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "flex-1 p-6",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
              fileName: "app/routes/notes.jsx",
              lineNumber: 64,
              columnNumber: 11
            }, this)
          }, void 0, false, {
            fileName: "app/routes/notes.jsx",
            lineNumber: 63,
            columnNumber: 9
          }, this)
        ]
      }, void 0, true, {
        fileName: "app/routes/notes.jsx",
        lineNumber: 35,
        columnNumber: 7
      }, this)
    ]
  }, void 0, true, {
    fileName: "app/routes/notes.jsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
export {
  NotesPage as default
};
//# sourceMappingURL=/build/routes/notes-YH5K6SBB.js.map
