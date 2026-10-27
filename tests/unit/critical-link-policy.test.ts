import { describe, expect, it } from "vitest";
import {
  isApprovedHost,
  isBlockedAddress,
  parseApprovedUrl,
} from "../../scripts/critical-link-policy.mjs";

describe("critical link security policy", () => {
  it("allows the reviewed external hosts and rejects arbitrary hosts", () => {
    expect(isApprovedHost("github.com")).toBe(true);
    expect(isApprovedHost("www.linkedin.com")).toBe(true);
    expect(isApprovedHost("attacker.example")).toBe(false);
  });

  it("rejects credentials and unapproved hosts before any request", () => {
    expect(parseApprovedUrl("https://user:password@github.com/path")).toMatchObject({
      ok: false,
      securityBlocked: true,
    });
    expect(parseApprovedUrl("https://attacker.example/redirect")).toMatchObject({
      ok: false,
      securityBlocked: true,
    });
    expect(parseApprovedUrl("https://github.com:8443/BastienLopez")).toMatchObject({
      ok: false,
      securityBlocked: true,
    });
  });

  it("blocks private, loopback, link-local and reserved addresses", () => {
    expect(isBlockedAddress("127.0.0.1")).toBe(true);
    expect(isBlockedAddress("10.0.0.8")).toBe(true);
    expect(isBlockedAddress("169.254.10.2")).toBe(true);
    expect(isBlockedAddress("192.168.1.10")).toBe(true);
    expect(isBlockedAddress("::1")).toBe(true);
    expect(isBlockedAddress("fc00::1")).toBe(true);
    expect(isBlockedAddress("fe80::1")).toBe(true);
    expect(isBlockedAddress("2001:db8::1")).toBe(true);
    expect(isBlockedAddress("93.184.216.34")).toBe(false);
  });
});
