import { lookup } from "node:dns/promises";
import { BlockList, isIP } from "node:net";

const blockedAddressRanges = new BlockList();

for (const [network, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
]) {
  blockedAddressRanges.addSubnet(network, prefix, "ipv4");
}

for (const [network, prefix] of [
  ["::", 128],
  ["::1", 128],
  ["2001:db8::", 32],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
]) {
  blockedAddressRanges.addSubnet(network, prefix, "ipv6");
}

const excludedHosts = new Set(["localhost", "127.0.0.1", "example.com"]);
const firstPartyHosts = new Set(["bastienlopez.fr", "www.bastienlopez.fr"]);

// Keep this list intentionally explicit. New external hosts must be reviewed
// before the CI job is allowed to contact them.
const approvedExternalHosts = new Set([
  "altme-documentation.gitbook.io",
  "apps.apple.com",
  "bastienlopez.github.io",
  "doc.wallet-provider.io",
  "github.com",
  "schema.org",
  "share.google",
  "talao.co",
  "talao.io",
  "www.google.com",
  "www.github.com",
  "www.linkedin.com",
  "www.talao.io",
]);

export const MAX_REDIRECTS = 3;

const normalizeHostname = (hostname) => hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");

export const isExcludedHost = (hostname) => excludedHosts.has(normalizeHostname(hostname));

export const isFirstPartyHost = (hostname) => firstPartyHosts.has(normalizeHostname(hostname));

export const isApprovedHost = (hostname) => {
  const normalized = normalizeHostname(hostname);
  return firstPartyHosts.has(normalized) || approvedExternalHosts.has(normalized);
};

export const isBlockedAddress = (address) => {
  const normalized = String(address).split("%", 1)[0];
  const family = isIP(normalized);
  if (family === 0) return false;

  return blockedAddressRanges.check(normalized, family === 4 ? "ipv4" : "ipv6");
};

export const parseApprovedUrl = (input) => {
  let parsed;
  try {
    parsed = new URL(input);
  } catch {
    return { ok: false, reason: "malformed URL" };
  }

  if (!new Set(["http:", "https:"]).has(parsed.protocol)) {
    return { ok: false, reason: `unsupported protocol ${parsed.protocol}` };
  }

  if (parsed.username || parsed.password) {
    return { ok: false, reason: "credentials in URL are not allowed", securityBlocked: true };
  }

  if (parsed.port && !new Set(["80", "443"]).has(parsed.port)) {
    return { ok: false, reason: `port ${parsed.port} is not allowed`, securityBlocked: true };
  }

  const hostname = normalizeHostname(parsed.hostname);
  if (!isApprovedHost(hostname)) {
    return { ok: false, reason: `host ${hostname} is not in the approved allowlist`, securityBlocked: true };
  }

  return { ok: true, url: parsed, hostname };
};

export const validatePublicUrl = async (input) => {
  const parsed = parseApprovedUrl(input);
  if (!parsed.ok) return parsed;

  try {
    const records = isIP(parsed.hostname)
      ? [{ address: parsed.hostname }]
      : await lookup(parsed.hostname, { all: true, verbatim: true });

    if (records.length === 0) {
      return { ok: false, reason: `DNS returned no address for ${parsed.hostname}`, retryable: true };
    }

    const blocked = records.find(({ address }) => isBlockedAddress(address));
    if (blocked) {
      return {
        ok: false,
        reason: `DNS for ${parsed.hostname} resolves to a private or reserved address (${blocked.address})`,
        securityBlocked: true,
      };
    }

    const resolvedAddress = records[0];
    return {
      ...parsed,
      resolvedAddress: resolvedAddress.address,
      resolvedFamily: resolvedAddress.family ?? isIP(resolvedAddress.address),
    };
  } catch (error) {
    return {
      ok: false,
      reason: `DNS lookup failed for ${parsed.hostname}: ${error instanceof Error ? error.message : String(error)}`,
      retryable: true,
    };
  }
};
