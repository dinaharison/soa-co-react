import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useAuthStore from "./useAuthStore";

describe("useAuthStore", () => {
  it("test if useAuthStore stores user credentials correctly", () => {
    const { result } = renderHook(useAuthStore);
    result.current.loginUser(true, "token", "username");

    expect(result.current.user.token).toBe("token");
  });

  it("test if useAuthStore deletes user credentials correctly", () => {
    const { result } = renderHook(useAuthStore);
    result.current.logoutUser();

    expect(result.current.user.token).toBe(null);
  });
});
