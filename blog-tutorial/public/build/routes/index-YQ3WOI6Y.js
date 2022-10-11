import {
  useOptionalUser
} from "/build/_shared/chunk-MLO7AD3D.js";
import {
  Link,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-LDV7LPTE.js";
import {
  __toESM
} from "/build/_shared/chunk-5KL4PAQL.js";

// app/routes/index.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Index() {
  const user = useOptionalUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
    className: "relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
      className: "relative sm:pb-16 sm:pt-8",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
          className: "mx-auto max-w-7xl sm:px-6 lg:px-8",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "relative shadow-xl sm:overflow-hidden sm:rounded-2xl",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "absolute inset-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
                    className: "h-full w-full object-cover",
                    src: "https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg",
                    alt: "Sonic Youth On Stage"
                  }, void 0, false, {
                    fileName: "app/routes/index.jsx",
                    lineNumber: 13,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                    className: "absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply"
                  }, void 0, false, {
                    fileName: "app/routes/index.jsx",
                    lineNumber: 19,
                    columnNumber: 15
                  }, this)
                ]
              }, void 0, true, {
                fileName: "app/routes/index.jsx",
                lineNumber: 12,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                className: "relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
                    className: "text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
                      className: "block uppercase text-yellow-500 drop-shadow-md",
                      children: "Indie Stack"
                    }, void 0, false, {
                      fileName: "app/routes/index.jsx",
                      lineNumber: 23,
                      columnNumber: 17
                    }, this)
                  }, void 0, false, {
                    fileName: "app/routes/index.jsx",
                    lineNumber: 22,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
                    className: "mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl",
                    children: "Check the README.md file for instructions on how to get this project deployed."
                  }, void 0, false, {
                    fileName: "app/routes/index.jsx",
                    lineNumber: 27,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                    className: "mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center",
                    children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
                      to: "/notes",
                      className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8",
                      children: [
                        "View Notes for ",
                        user.email
                      ]
                    }, void 0, true, {
                      fileName: "app/routes/index.jsx",
                      lineNumber: 33,
                      columnNumber: 19
                    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
                      className: "space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
                          to: "/join",
                          className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8",
                          children: "Sign up"
                        }, void 0, false, {
                          fileName: "app/routes/index.jsx",
                          lineNumber: 41,
                          columnNumber: 21
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
                          to: "/login",
                          className: "flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600",
                          children: "Log In"
                        }, void 0, false, {
                          fileName: "app/routes/index.jsx",
                          lineNumber: 47,
                          columnNumber: 21
                        }, this)
                      ]
                    }, void 0, true, {
                      fileName: "app/routes/index.jsx",
                      lineNumber: 40,
                      columnNumber: 19
                    }, this)
                  }, void 0, false, {
                    fileName: "app/routes/index.jsx",
                    lineNumber: 31,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
                    href: "https://remix.run",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
                      src: "https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg",
                      alt: "Remix",
                      className: "mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                    }, void 0, false, {
                      fileName: "app/routes/index.jsx",
                      lineNumber: 57,
                      columnNumber: 17
                    }, this)
                  }, void 0, false, {
                    fileName: "app/routes/index.jsx",
                    lineNumber: 56,
                    columnNumber: 15
                  }, this)
                ]
              }, void 0, true, {
                fileName: "app/routes/index.jsx",
                lineNumber: 21,
                columnNumber: 13
              }, this)
            ]
          }, void 0, true, {
            fileName: "app/routes/index.jsx",
            lineNumber: 11,
            columnNumber: 11
          }, this)
        }, void 0, false, {
          fileName: "app/routes/index.jsx",
          lineNumber: 10,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
          className: "mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
            className: "mt-6 flex flex-wrap justify-center gap-8",
            children: [
              {
                src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
                alt: "Fly.io",
                href: "https://fly.io"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764395-137ec949-382c-43bd-a3c0-0cb8cb22e22d.svg",
                alt: "SQLite",
                href: "https://sqlite.org"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
                alt: "Prisma",
                href: "https://prisma.io"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
                alt: "Tailwind",
                href: "https://tailwindcss.com"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
                alt: "Cypress",
                href: "https://www.cypress.io"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
                alt: "MSW",
                href: "https://mswjs.io"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
                alt: "Vitest",
                href: "https://vitest.dev"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
                alt: "Testing Library",
                href: "https://testing-library.com"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                alt: "Prettier",
                href: "https://prettier.io"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                alt: "ESLint",
                href: "https://eslint.org"
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                alt: "TypeScript",
                href: "https://typescriptlang.org"
              }
            ].map((img) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
              href: img.href,
              className: "flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
                alt: img.alt,
                src: img.src,
                className: "object-contain"
              }, void 0, false, {
                fileName: "app/routes/index.jsx",
                lineNumber: 141,
                columnNumber: 17
              }, this)
            }, img.href, false, {
              fileName: "app/routes/index.jsx",
              lineNumber: 136,
              columnNumber: 15
            }, this))
          }, void 0, false, {
            fileName: "app/routes/index.jsx",
            lineNumber: 68,
            columnNumber: 11
          }, this)
        }, void 0, false, {
          fileName: "app/routes/index.jsx",
          lineNumber: 67,
          columnNumber: 9
        }, this)
      ]
    }, void 0, true, {
      fileName: "app/routes/index.jsx",
      lineNumber: 9,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: "app/routes/index.jsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-YQ3WOI6Y.js.map
