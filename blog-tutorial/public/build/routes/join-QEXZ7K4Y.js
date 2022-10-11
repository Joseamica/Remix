import {
  require_user
} from "/build/_shared/chunk-M2ND3YFM.js";
import "/build/_shared/chunk-MLO7AD3D.js";
import {
  require_session
} from "/build/_shared/chunk-GLWAIFE6.js";
import {
  Form,
  Link,
  require_jsx_dev_runtime,
  require_react,
  useActionData,
  useSearchParams
} from "/build/_shared/chunk-LDV7LPTE.js";
import {
  __toESM
} from "/build/_shared/chunk-5KL4PAQL.js";

// app/routes/join.jsx
var React = __toESM(require_react());
var import_session = __toESM(require_session());
var import_user = __toESM(require_user());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var meta = () => {
  return {
    title: "Sign Up"
  };
};
function Join() {
  var _a, _b, _c, _d, _e;
  const [searchParams] = useSearchParams();
  const redirectTo = (_a = searchParams.get("redirectTo")) != null ? _a : void 0;
  const actionData = useActionData();
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  React.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    if ((_a2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a2.email) {
      (_b2 = emailRef.current) == null ? void 0 : _b2.focus();
    } else if ((_c2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c2.password) {
      (_d2 = passwordRef.current) == null ? void 0 : _d2.focus();
    }
  }, [actionData]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    className: "flex min-h-full flex-col justify-center",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "mx-auto w-full max-w-md px-8",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, {
        method: "post",
        className: "space-y-6",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
                htmlFor: "email",
                className: "block text-sm font-medium text-gray-700",
                children: "Email address"
              }, void 0, false, {
                fileName: "app/routes/join.jsx",
                lineNumber: 93,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "mt-1",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                    ref: emailRef,
                    id: "email",
                    required: true,
                    autoFocus: true,
                    name: "email",
                    type: "email",
                    autoComplete: "email",
                    "aria-invalid": ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email) ? true : void 0,
                    "aria-describedby": "email-error",
                    className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  }, void 0, false, {
                    fileName: "app/routes/join.jsx",
                    lineNumber: 100,
                    columnNumber: 15
                  }, this),
                  ((_c = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                    className: "pt-1 text-red-700",
                    id: "email-error",
                    children: actionData.errors.email
                  }, void 0, false, {
                    fileName: "app/routes/join.jsx",
                    lineNumber: 114,
                    columnNumber: 17
                  }, this)
                ]
              }, void 0, true, {
                fileName: "app/routes/join.jsx",
                lineNumber: 99,
                columnNumber: 13
              }, this)
            ]
          }, void 0, true, {
            fileName: "app/routes/join.jsx",
            lineNumber: 92,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
                htmlFor: "password",
                className: "block text-sm font-medium text-gray-700",
                children: "Password"
              }, void 0, false, {
                fileName: "app/routes/join.jsx",
                lineNumber: 122,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "mt-1",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
                    id: "password",
                    ref: passwordRef,
                    name: "password",
                    type: "password",
                    autoComplete: "new-password",
                    "aria-invalid": ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) ? true : void 0,
                    "aria-describedby": "password-error",
                    className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
                  }, void 0, false, {
                    fileName: "app/routes/join.jsx",
                    lineNumber: 129,
                    columnNumber: 15
                  }, this),
                  ((_e = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _e.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                    className: "pt-1 text-red-700",
                    id: "password-error",
                    children: actionData.errors.password
                  }, void 0, false, {
                    fileName: "app/routes/join.jsx",
                    lineNumber: 141,
                    columnNumber: 17
                  }, this)
                ]
              }, void 0, true, {
                fileName: "app/routes/join.jsx",
                lineNumber: 128,
                columnNumber: 13
              }, this)
            ]
          }, void 0, true, {
            fileName: "app/routes/join.jsx",
            lineNumber: 121,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
            type: "hidden",
            name: "redirectTo",
            value: redirectTo
          }, void 0, false, {
            fileName: "app/routes/join.jsx",
            lineNumber: 148,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
            type: "submit",
            className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
            children: "Create Account"
          }, void 0, false, {
            fileName: "app/routes/join.jsx",
            lineNumber: 149,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "flex items-center justify-center",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
              className: "text-center text-sm text-gray-500",
              children: [
                "Already have an account?",
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
                  className: "text-blue-500 underline",
                  to: {
                    pathname: "/login",
                    search: searchParams.toString()
                  },
                  children: "Log in"
                }, void 0, false, {
                  fileName: "app/routes/join.jsx",
                  lineNumber: 158,
                  columnNumber: 15
                }, this)
              ]
            }, void 0, true, {
              fileName: "app/routes/join.jsx",
              lineNumber: 156,
              columnNumber: 13
            }, this)
          }, void 0, false, {
            fileName: "app/routes/join.jsx",
            lineNumber: 155,
            columnNumber: 11
          }, this)
        ]
      }, void 0, true, {
        fileName: "app/routes/join.jsx",
        lineNumber: 91,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: "app/routes/join.jsx",
      lineNumber: 90,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: "app/routes/join.jsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}
export {
  Join as default,
  meta
};
//# sourceMappingURL=/build/routes/join-QEXZ7K4Y.js.map
