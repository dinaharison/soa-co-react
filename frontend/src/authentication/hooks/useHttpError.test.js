import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useHttpError from "./useHttpError";

describe("useHttpError", () => {
  it("check if useHttpError handle server side errors", () => {
    const mockError = {
      response: {
        data: {
          message: "a server side response",
        },
      },
    };
    const { result } = renderHook(useHttpError);
    expect(result.current.readError(mockError)).toBe("a server side response");
  });

  it(
    ("check if useHttpError handle if it cannot connect to the server",
    () => {
      const { result } = renderHook(useHttpError);
      const mockError = {
        request: {
          method: "POST",
          headers: {},
        },
        message: "cannot connect to the server",
      };
      expect(result.current.readError(mockError)).toBe(
        "cannot connect to the server"
      );
    })
  );

  it("checks if useHttpError handle an unknown error", () => {
    const mockError = {};
    const { result } = renderHook(useHttpError);
    expect(result.current.readError(mockError)).toBe(
      "Oops! Something bad happened, try again later"
    );
  });
});
