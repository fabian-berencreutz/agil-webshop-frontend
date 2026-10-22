import { describe, expect, it } from "vitest";
import { getMe } from "../service/authService";

describe("getMe", () => {
  it("återställer inloggad användare", async () => {
    const user = await getMe();

    expect(user).not.toBeNull();
    expect(user?.subject).toBe("admin@webshop.se");
    expect(user?.roles).toContain("ADMIN");
  });
});
